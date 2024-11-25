import path from 'path';
import { getInsta, getTweet } from "../utils/socialMedia.util.js";
import Post from '../models/post.model.js';
import { generateWithGemini } from '../services/gemini.service.js'
import fs from 'fs';

export const getPost = async (req, res, next) => {
    const urlString = req.body.url;

    try {
        const url = new URL(
            urlString.includes('?')
                ? urlString.substring(0, urlString.indexOf('?'))
                : urlString
        );

        const shortCode = path.basename(url.toString());
        const assetCwd = path.join(
            process.cwd(),
            `../media/${shortCode}`
        );

        let data;
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
    }
};

export const getAnalysis = async (req, res, next) => {
    try {
        const { url, id } = req.query;
        if(!url && !id) {
            return res.status(400).json({
                success: false,
                message: "No Url's provided."
            })
        }
        // console.log(url, id);

        const getPost = await Post.findOne({ $or: [
            {url: url},
            {_id: id}
        ]});

        if(!getPost) {
            return res.status(404).json({
                success: false,
                message: "No Posts Found."
            });
        }
        // console.log(getPost);


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

        // TODO:- Save The response.json Product.
        req.body = {...response, url, id};
        next();
    } catch (error) {
        console.error(error.message || error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}