import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & {
      id: number;
      user_type: string;
    };
    req.user = { id: decoded.id, user_type: decoded.user_type };
    next();
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
  
};
