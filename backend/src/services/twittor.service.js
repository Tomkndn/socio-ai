import puppeteer from 'puppeteer';

const fetchTweetDataWithMedia = async (url) => {
    if (!url) {
        console.error('No URL provided');
        return;
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 60000,
    });

    const page = await browser.newPage();

    // Set custom user agent
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('article');

        const tweetData = await page.evaluate(() => {
            const content =
                document.querySelector('div[data-testid="tweetText"]')
                    ?.innerText || 'No text found';

            const images = Array.from(
                document.querySelectorAll('img')
            )
                .map((img) => img.src)
                .filter((src) => src.includes('media'));

            // Timestamp
            const timestamp =
                document
                    .querySelector('time')
                    ?.getAttribute('datetime') || 'N/A';

            return {
                content,
                images,
                timestamp,
            };
        });

        const username = url.split('/')[3];
        const videoLink = url.replace(username, 'i');

        const data = {
            ...tweetData,
            videoLink,
            username,
        };

        return data;
    } catch (error) {
        console.error('Error fetching tweet data:', error);
    } finally {
        await browser.close();
    }
};

export default fetchTweetDataWithMedia;