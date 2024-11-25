import { Router } from "express";
import prodRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";
import axios from "axios";

const router = Router();

router.get('/', async (req, res) => {
    const test_flask_url = process.env.FLASK_URL || 'http://localhost:5000';
    try {
        const test = await axios.get(test_flask_url + '/testing');
        console.log(
            test?.data, test?.status
        )
        return res.send('API is Running.');
    } catch (error) {
        console.log(test_flask_url);
        console.error('Error in /:', error.message);
        return res.status(500).send('Internal Server Error');
    }
});

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/products', prodRoutes);

export default router;