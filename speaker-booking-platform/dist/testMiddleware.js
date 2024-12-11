"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testMiddleware = (req, res, next) => {
    console.log(req.user); // Check if TypeScript recognizes `user`
    next();
};
exports.default = testMiddleware;
