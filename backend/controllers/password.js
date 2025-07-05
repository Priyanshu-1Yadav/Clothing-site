import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const forgetpassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // console.log("id",existingUser.id);
        
        // console.log("token",token);
        

        const resetUrl = `${process.env.BASE_URL}/password/resetpassword/${existingUser.id}/${token}`;

        res.status(200).json({
            message: "Success, please check your email for password reset link.",
            reset_url: resetUrl
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const resetpassword = async (req, res) => {
    try {
        const { userId, token } = req.params;
        // console.log(userId);

        const { password } = req.body;

        if (!userId || !token || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ id: userId });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
        
            const hashedPassword = await bcrypt.hash(password, 12);
        
            await User.findByIdAndUpdate(existingUser._id, { password: hashedPassword });
        
            res.status(200).json({ message: 'Password reset successful.' });
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}