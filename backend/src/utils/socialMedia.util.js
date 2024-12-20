import fs from 'fs';
import path from 'path';
import axios from 'axios';
import fetchInstagramDataWithMedia from '../services/instagram.service.js';
import { categorizeFiles } from './saveToFile.util.js';
import fetchTweetDataWithMedia from '../services/twittor.service.js';
import { uploadToCloudinary } from '../services/cloudinary.service.js';

export const getTweet = async (url, assetCwd) => {
    try {
        // console.log("url", url);
        // console.log("assetCwd", assetCwd);

        const data = await fetchTweetDataWithMedia(url);
        if (!data) return null;

        // console.log('Data:', data);

        data.images = data.images?.length ? await Promise.all(
            data.images.map(async (image) => {
                const result = await uploadToCloudinary(image);
                return result;
            })
        ) : [];

        const videoData = await axios.post(
            `${process.env.FLASK_URL}/api/url`,
            { url }
        );

        if (
            !videoData.data ||
            videoData.data.message.toString().includes('No video')
        ) {
            return {
                ...data,
                videoData: undefined,
                videoLink: undefined,
            };
        } else {
            let { videos } = await categorizeFiles(assetCwd);
            // console.log('Videos:', videos);

            videos = videos?.length ? await Promise.all(
                videos.map(async (video) => {
                    const videoPath = path.join(
                        assetCwd,
                        video
                    );
                    const result = await uploadToCloudinary(
                        videoPath
                    );
                    return result;
                })
            ) : [];

            return {
                ...data,
                videos: videos,
                videoData: undefined,
                videoLink: undefined,
            };
        }
    } catch (error) {
        console.error('Error fetching tweet data:', error);
        return null;
    }
    // finally {
        // if(fs.existsSync(assetCwd))
        //     fs.rmSync(assetCwd, { recursive: true });
    // }
};

export const getInsta = async (url, assetCwd) => {
    try {
        // console.log("assetCwd", assetCwd);

        let data = await fetchInstagramDataWithMedia(url);
        // console.log('Data:', data);
        if (!data) return null;

        data = await categorizeFiles(assetCwd);

        if (data.content && data.content[0]) {
            const contentPath = path.join(assetCwd, data.content[0]);
            data.content = fs.readFileSync(contentPath, 'utf8');
            fs.unlinkSync(contentPath); // Delete after reading
        } else {
            data.content = "No content found";
        }

        data.images = data.images?.length ? await Promise.all(
            data.images.map((image) => {
                const imagePath = path.join(assetCwd, image);
                return uploadToCloudinary(imagePath);
            })
        ) : [];

        data.videos = data.videos?.length ? await Promise.all(
            data.videos.map((video) => {
                const videoPath = path.join(assetCwd, video);
                return uploadToCloudinary(videoPath);
            })
        ) : [];

        return data;
    } catch (error) {
        console.error('Error fetching Insta data:', error);
        return null;
    }
    // finally {
        // if(fs.existsSync(assetCwd))
        //     fs.rmSync(assetCwd, { recursive: true });
    // }
};
