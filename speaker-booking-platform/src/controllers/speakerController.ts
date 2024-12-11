import { Request, Response } from 'express';
import pool from '../config/db';

export const addSpeakerDetails = async (req: Request, res: Response) => {
  const { expertise, price_per_session } = req.body;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `INSERT INTO speakers (user_id, expertise, price_per_session) 
      VALUES ($1, $2, $3) RETURNING *;`,
      [userId, expertise, price_per_session]
    );
    res.status(201).json({ speaker: result.rows[0] });
  } catch (err) {
    const error = err as Error; // Cast to Error
    res.status(400).json({ error: error.message });
  }
  
};
