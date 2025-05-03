// services/authService.ts
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserDocument, IUserRegistration, IUserLogin, ILoginResponse } from '../types/userTypes';

const JWT_SECRET = process.env.JWT_SECRET as string;

const authService = {
    registerUser: async (
        username: string,
        email: string,
        password: string
    ): Promise<IUserDocument> => {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        return user;
    },

    loginUser: async (
        email: string,
        password: string
    ): Promise<ILoginResponse> => {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign(
            { userId: user._id, role: user.role, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            token,
            user: {
                id: user._id.toString(),
                email: user.email,
                role: user.role,
            },
        };
    }
};

export default authService;