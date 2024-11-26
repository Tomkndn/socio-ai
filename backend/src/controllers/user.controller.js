import User from '../models/user.model.js';
import generateToken from "../utils/generateToken.util.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        if (req.body.username.toLowerCase().includes('guest')) {
            return res.status(400).json({ message: 'Username cannot contain the word "guest"' });
        }
        if (req.body.email === 'guest000@guest.com') {
            return res.status(400).json({ message: 'Email cannot be @guest.com.' });
        }
        const { username, email, password } = req.body;
        const user = new User({
            username,
            email,
            password
        });
        const newUser = await user.save();
        req.status = 201;
        req.user = newUser;
        req.json = {
            message: 'Guest user created successfully',
            data: newUser,
        };

        return generateTokenCont(req, res);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const guestUser = async (req, res) => {
    try {
        let random = '0000';
        while (await User.findOne({ username: 'guest ' + random })) {
            random = Math.floor(Math.random() * 10000).toString();
        }
        const user = new User({
            username: `guest${random}`, // example: guest 1234
            email: `guest${random}@guest.com`,
            password: `guest${random}`
        });
        const newUser = await user.save();
        req.status = 201;
        req.user = newUser;
        req.json = {
            message: 'Guest user created successfully',
            data: newUser
        }

        return generateTokenCont(req, res);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'Please enter email and password' });
        }
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (!user || !(await user?.matchPassword(password))) {

            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.user = user;

        req.status = 200;
        req.json = {
            message: 'User logged in successfully',
            data: user
        }

        return generateTokenCont(req, res);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: 'You are not logged in' });
        }

        // console.log('here');
        return res
            .clearCookie('token')
            .status(200)
            .json({ message: 'User logged out successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const logoutGuest = async (req, res) => {
    try {
        if(!req.user) {
            return res.status(403).json({ message: 'You are not logged in' });
        }
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: 'Guest user logged & deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        if (req.body._id) {
            return res.status(400).json({ message: 'User ID is not allowed' });
        } else if (req.body.email || req.body.username) {
            const existingUser = await User.findOne({
                $or: [{ email: req.body.email }, { username: req.body.username }]
            });
            if (existingUser && existingUser._id != req.params.id) {
                return res.status(400).json({ message: 'Email or username already exists' });
            }
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const generateTokenCont = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res
                .status(403)
                .json({
                    message:
                        'You are not authorized to create this product',
                });
        }
        const token = await generateToken(req.user._id);

        const user = await User.findById(req.user._id);
        if (!user)
            return res
                .status(404)
                .json({ message: 'User not found' });

        return res
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'None', // csrf
                secure: true,
            })
            .status(req.status || 201)
            .json(
                req.json || {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isGuest: user.username.includes('guest'),
                }
            );
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};


export const verifyTokenCont = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res
                .status(404)
                .send({ success: false, message: 'User not Found!' });
        }
        const user = await User.findById(req.user._id);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ success: false, message: error.message });
    }
};