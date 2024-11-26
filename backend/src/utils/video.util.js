import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { saveToFile } from './saveToFile.util.js';

export async function generateWithVideo(url, model, fileManager) {
    const temp = path.basename(url);

    if (
        fs.existsSync(`${temp.slice(0, temp.lastIndexOf('.'))}.txt`)
    ) {
        // saveToFile(`${temp}.txt`, 'Video');
        // console.log('File already exists');
        return;
    }

    if (!url.startsWith('http')) {
        console.error('wrong url');
        return;
    }

    const response = await axios.get(url, {
        responseType: 'arraybuffer',
    });

    const tempFileName = `temp_${temp}`;
    const tempFilePath = path.join('../temp', tempFileName);
    fs.mkdirSync('../temp', { recursive: true });
    fs.writeFileSync(tempFilePath, response.data);

    const uploadResponse = await fileManager.uploadFile(
        tempFilePath,
        {
            mimeType: 'video/mp4',
            displayName: 'Product Video',
        }
    );

    const result_video = await model.generateContent([
        {
            fileData: {
                mimeType: uploadResponse.file.mimeType,
                fileUri: uploadResponse.file.uri,
            },
        },
        {
            text: 'Generate an Amazon product listing based on this video.',
        },
    ]);

    fs.unlinkSync(tempFilePath);

    // if (`${temp}.txt`) {
    saveToFile(
        `../temp/${temp.slice(0, temp.lastIndexOf('.'))}.txt`,
        result_video.response.text()
    );
    // }
}
