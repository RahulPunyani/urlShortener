import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "Boogeyman@321";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: 'User already exists' });
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered' });
  };

// POST /auth/login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'User does not exist' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ token });
  };