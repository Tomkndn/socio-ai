import fs from 'fs';
import path from 'path';
import Post from '../models/post.model.js';
import { getInsta, getTweet } from "../utils/socialMedia.util.js";
import { generateWithGemini } from '../services/gemini.service.js'

export const getPost = async (req, res, next) => {
    const urlString = req.body.url;
    const url = new URL(
        urlString.includes('?')
            ? urlString.substring(0, urlString.indexOf('?'))
            : urlString
    );

    const shortCode = path.basename(url.toString());
    const assetCwd = path.resolve(
        process.cwd(),
        `../media/${shortCode}`
    );

    let data;

    try {
        if (url.hostname.includes('instagram.com')) {
            data = await getInsta(url.href, assetCwd);
        } else if (url.hostname.includes('x.com') || url.hostname.includes('twitter.com')) {
            data = await getTweet(url.href, assetCwd);
        } else {
            return res.status(400).json({
                source: 'unknown',
                message: 'The URL is not from Twitter or Instagram.',
            });
        }

        if (!data) {
            return res.status(400).json({
                message: 'No data found.',
            });
        }
        req.body = {...data, url: urlString};
        next();
    } catch (error) {
        console.error('Error in getPost:', error.message);
        return res.status(400).json({
            source: 'error',
            message: 'Invalid URL provided.',
        });
    } finally {
        if (fs.existsSync(assetCwd)) {
            fs.rmdirSync(assetCwd, { recursive: true });
        }
    }
};

export const getAnalysis = async (req, res, next) => {
    try {
        const getPost = await Post.findById(req.params.id);

        if(!getPost) {
            return res.status(404).json({
                success: false,
                message: "No Posts Found. Please try again."
            });
        }

        const response = await generateWithGemini([
            ...getPost.images,
            ...getPost.videos
        ], getPost.content);

        if(!response) {
            return res.status(500).json({
                success: false,
                message: "Analysis Failed"
            })
        }

        req.body = {...response, url: getPost.url};
        next();
    } catch (error) {
        console.error(error.message || error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    } finally {
        // console.log('getAnalysis finally:', req.params);
        const assetCwd = path.resolve(
            process.cwd(),
            `./../final/final.txt`
        );
        console.log('final.txt deletion log --> assetCwd:', assetCwd);

        if (fs.existsSync(assetCwd)) {
            fs.rmSync(assetCwd);
        }
    }
}