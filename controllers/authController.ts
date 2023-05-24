import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { encode } from '../utils/jwtUtils'; // Assuming you have a separate file for JWT utility functions
import User from '../model/User';

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: 'User is already signed up',
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });
            await newUser.save();

            const token = jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: '1d',
                }
            );
            res.status(200).json({
                status: 200,
                message: 'Account created successfully',
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
                token: encode({
                    id: newUser._id,
                    email: newUser.email,
                    name: `${newUser.name}`,
                }),
            });
        }
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
                const token = encode({
                    id: user._id,
                    email: user.email,
                    name: `${user.name}`,
                });
                res.setHeader('Authorization', `Bearer ${token}`);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                });
                res.status(200).json({
                    status: 200,
                    message: 'Login successful',
                    token: token,
                });
            } else {
                res.status(400).json({
                    status: 400,
                    message: 'Wrong password',
                });
            }
        }
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: 'Server problem: ' + error.message,
        });
    }
}
