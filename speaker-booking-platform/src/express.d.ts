import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        user_type: string;
      };
    }
  }
}
