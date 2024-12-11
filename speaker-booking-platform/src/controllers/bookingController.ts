import { Request, Response } from 'express';
import pool from '../config/db';

export const bookSession = async (req: Request, res: Response) => {
  const { speaker_id, date, time_slot } = req.body;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `INSERT INTO bookings (user_id, speaker_id, date, time_slot) 
      VALUES ($1, $2, $3, $4) RETURNING *;`,
      [userId, speaker_id, date, time_slot]
    );
    res.status(201).json({ booking: result.rows[0] });
  } catch (err) {
    const error = err as Error; // Cast to Error
    res.status(400).json({ error: error.message });
  }
  
};
