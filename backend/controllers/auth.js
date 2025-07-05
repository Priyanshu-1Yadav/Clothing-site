import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User mobile or email already exists, please try logging in.', existingUser });
        }

        const userCount = await User.countDocuments();
        const newUserId = `${userCount + 1}`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            id: newUserId,
            name,
            email,
            mobile,
            role : 'user',
            password: hashedPassword,
        });

        await newUser.save();

        // Generate JWT
        const token = jwt.sign({user:{ id: newUser.id, email: newUser.email }}, JWT_SECRET, { expiresIn: '1d' });

        // Send response with the token
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
            token,
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({user:{ id: user.id, email: user.email }}, JWT_SECRET, { expiresIn: '1d' });

        // Send the response with token
        res.status(200).json({
            message: 'Login successful',
            // user: {
            //     id: user.id,
            //     name: user.name,
            //     email: user.email,
            //     mobile: user.mobile,
            // },
            role : user.role,
            token,
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
