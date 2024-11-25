import axios from "axios";

const fetchInstagramDataWithMedia = async (url) => {
    console.log("Fetching Instagram data with media.");
    const flask_url = (process.env.FLASK_URL || 'http://localhost:5000') + '/api/url'
    const download = await axios.post(flask_url, { url }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!download || !download.data) {
        console.error('Error fetching Instagram data.');
        return;
    }
    if (download?.data.error) {
        console.error('Error fetching Instagram data;', download.data.error);
        return;
    }

    // console.log('Download:', download.data);

    return download.data;
};

export default fetchInstagramDataWithMedia;