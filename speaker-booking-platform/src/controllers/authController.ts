import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

export const signup = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, user_type } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, user_type) 
      VALUES ($1, $2, $3, $4, $5) RETURNING id, email, user_type;`,
      [first_name, last_name, email, hashedPassword, user_type]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
  
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, user_type: user.user_type },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (err) {
    const error = err as Error; // Cast to Error
    res.status(500).json({ error: error.message });
  }
  
};
