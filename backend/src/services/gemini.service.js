import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { generateWithImage } from '../utils/image.util.js';
import { generateWithVideo } from '../utils/video.util.js';
import { geminiAnalysis } from '../utils/geminiAnalysis.util.js';
import fs from 'fs/promises';

export const generateWithGemini = async (mediaPath, content) => {
    const API_KEY = process.env.GOOGLE_API_KEY;
    if (!API_KEY) {
        return null;
    }

    const fileManager = new GoogleAIFileManager(API_KEY);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const image_model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
    });
    const video_model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
    });

    await processMediaPaths(
        mediaPath,
        video_model,
        image_model,
        fileManager
    );

    fs.mkdir('../final', { recursive: true });
    const outputFilePath = '../final/final.txt';

    // Appending the text files
    await appendFilesToFile('../temp', outputFilePath);

    // converting to json
    const response = await geminiAnalysis(outputFilePath, content);

    const data = JSON.parse(response);

    // removing unwanted files/folders
    fs.unlink('file_generation_log.txt');
    fs.unlink('processed_files_summary.txt');
    // fs.rm('../final', { recursive: true, force: true });
    // fs.rm('../temp', { recursive: true, force: true });
    // fs.rm('../media', { recursive: true, force: true });

    return data;
};

// Resolving promises properly
async function processMediaPaths(
    mediaPath,
    video_model,
    image_model,
    fileManager
) {
    const processed = [];
    for (const { url, publicId } of mediaPath) {
        try {
            if (url.includes('.mp4')) {
                const result = await processVideo(
                    url,
                    publicId,
                    video_model,
                    fileManager
                );
                processed.push({ type: 'video', publicId, result });
            } else if (
                url.includes('.jpg') ||
                url.includes('.png') ||
                url.includes('.jpeg')
            ) {
                const result = await processImage(
                    url,
                    publicId,
                    image_model,
                    fileManager
                );
                processed.push({ type: 'image', publicId, result });
            }
        } catch (error) {
            await fs.appendFile(
                'file_generation_log.txt',
                `Error processing ${publicId}: ${error.message}\n`
            );
        }
    }

    // Save summary of all processed files
    await fs.writeFile(
        'processed_files_summary.txt',
        JSON.stringify(processed, null, 2)
    );

    console.log('All media processing tasks completed.');
}

async function processVideo(
    url,
    public_id,
    video_model,
    fileManager
) {
    await generateWithVideo(url, video_model, fileManager);
    const logMessage = `Video processing completed for public_id: ${public_id} (${url})\n`;
    await fs.appendFile('file_generation_log.txt', logMessage);
}

async function processImage(
    url,
    public_id,
    image_model,
    fileManager
) {
    await generateWithImage(url, image_model, fileManager);
    const logMessage = `Image processing completed for public_id: ${public_id} (${url})\n`;
    await fs.appendFile('file_generation_log.txt', logMessage);
}

//   appending all the text files to one
async function appendFilesToFile(directoryPath, outputFilePath) {
    try {
        const files = await fs.readdir(directoryPath);

        if (files.length === 0) {
            console.log('No files found in the directory.');
            return;
        }

        for (const file of files) {
            const filePath = `${directoryPath}/${file}`;
            try {
                const content = await fs.readFile(filePath, 'utf8');

                await fs.appendFile(
                    outputFilePath,
                    `listing:\n\n${content}` + '\n\n\n',
                    'utf8'
                );

                console.log(`Appended content from: ${file}`);
            } catch (error) {
                console.error(
                    `Error processing file: ${filePath}`,
                    error
                );
            }
        }

        console.log(`All content appended to: ${outputFilePath}`);
    } catch (error) {
        console.error(
            'Error reading directory or writing to file:',
            error
        );
    }
}
