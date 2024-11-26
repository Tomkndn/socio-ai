import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    try {
        const token =
            req?.cookies?.token ||
            req.headers?.authorization?.trim().split(' ')[1];

        if (!token || token === 'null' || token?.length?.trim === 0) {
            return res
                .status(403)
                .send({ message: 'No token provided!' });
        }
        if (!process.env.JWT_SECRET) {
            console.error("JWT Secret Not Found");
            return res.status(500).json({
                message: "Internal Server Error",
            })
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res
                    .status(401)
                    .send({ message: 'Unauthorized!' });
            }
            req.user = decoded;
        });
        if (!req.user?._id) {
            return res.status(403).send({ message: 'Invalid Token' });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

export default verifyToken;
