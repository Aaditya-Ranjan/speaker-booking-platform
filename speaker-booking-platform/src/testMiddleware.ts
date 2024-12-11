import { Request, Response, NextFunction } from 'express';

const testMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user); // Check if TypeScript recognizes `user`
    next();
};

export default testMiddleware;
