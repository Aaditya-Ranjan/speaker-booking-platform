import pool from '../config/db';

export const createUser = async (userData: any) => {
  const { first_name, last_name, email, password, user_type } = userData;
  const query = `
    INSERT INTO users (first_name, last_name, email, password, user_type, is_verified)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;
  const values = [first_name, last_name, email, password, user_type, false];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Other database models...
