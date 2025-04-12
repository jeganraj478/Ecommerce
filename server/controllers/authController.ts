// controllers/authController.ts
import { Request, Response } from 'express';
import authService from '../services/authService';
import { IUserRegistration, IUserLogin } from '../types/userTypes';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body as IUserRegistration;
    await authService.registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as IUserLogin;
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Server error' });
  }
};