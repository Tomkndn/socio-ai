import fs from 'fs';
import path from 'path';

export async function saveToFile(filename, data) {
    fs.writeFile(filename, data, (err) => {
        if (err) {
            console.error(`Error writing to file: ${err}`);
        } else {
            console.log(`Data saved successfully to ${filename}`);
        }
    });
}

export async function categorizeFiles(folderPath) {
    try {
        const categorizedFiles = {
            content: [],
            images: [],
            videos: [],
        };

        console.log("inside before" + folderPath);
        const items = fs.readdirSync(path.resolve(folderPath));
        console.log("after" + items);
        items.forEach((item) => {
            const itemPath = path.join(folderPath, item);
            const stat = fs.statSync(itemPath);

            if (stat.isFile()) {
                const ext = path.extname(item).toLowerCase();

                if (ext === '.txt') {
                    categorizedFiles.content.push(item);
                } else if (ext === '.jpg') {
                    categorizedFiles.images.push(item);
                } else if (ext === '.mp4') {
                    categorizedFiles.videos.push(item);
                }
            }
        });

        return categorizedFiles;
    } catch (error) {
        console.error('Error categorizing files:', error);
        return null;
    }
}
