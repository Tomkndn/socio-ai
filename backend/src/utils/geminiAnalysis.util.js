import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import fs from 'fs';

export async function geminiAnalysis(pathOfListing, content) {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const fileManager = new GoogleAIFileManager(API_KEY);

    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: `
    You are an expert Amazon listing generator. Your task is to create highly optimized, accurate, and engaging Amazon listings that adhere to Amazon's specific category guidelines.
    `,
    });

    const uploadResponse = await fileManager.uploadFile(
        pathOfListing,
        {
            mimeType: 'text/plain',
            displayName: 'final text',
        }
    );

    console.log(
        `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
    );

    const params = {
        temperature: 0.88,
        topP: 0.85,
        maxOutputTokens: 1000,
    };

    const result = await model.generateContent(
        [
            {
                fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri,
                },
            },
            {
                text: `
                    Analyze all the text of uploaded text file, the keyword "another listing" seperates out all the listing in the file. You need to analyze all the lisitngs as it is of a single product,On your analysis return me the result in a format that amazon seller account accepts as product listing with all the required details. For more precision you may also surf the web accordingly for the analysis and listing according to the context ${content}. and ensure if any details is missing fill with some arbitary details in indian format and the response must be single product as JSON Object and dont pass any comments.

                    The analysis should be in compliance with the following parameters and the name should be exact:
                    Title:
                    Brand:
                    Description:
                    Price:
                    Currency:
                    Keywords:
                    Category:
                `,
            },
        ],
        params
    );

    const data = result.response.text();
    const finalJson = await convertListingToJSON(data);

    if (Array.isArray(finalJson)) {
        console.log('Final Json:', finalJson[0]);
        return finalJson[0];
    }

    return finalJson;
}

function saveResponseToFile(filePath, data) {
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('Error saving the file:', err);
        } else {
            console.log(`File saved successfully as ${filePath}!`);
        }
    });
}

async function convertListingToJSON(listingText) {
    const lines = listingText.split('\n');

    const startIndex = lines.findIndex((line) =>
        line.trim().startsWith('{')
    );

    const reversedLines = [...lines].reverse();
    const endIndexFromEnd = reversedLines.findIndex((line) =>
        line.trim().endsWith('}')
    );

    const endIndex =
        endIndexFromEnd !== -1
            ? lines.length - endIndexFromEnd - 1
            : -1;

    if (startIndex !== -1 && endIndex !== -1) {
        const updatedText = lines
            .slice(startIndex, endIndex + 1)
            .join('\n');
        return updatedText;
    }

    return {};
}
