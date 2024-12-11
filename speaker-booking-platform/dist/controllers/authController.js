"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password, user_type } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const result = yield db_1.default.query(`INSERT INTO users (first_name, last_name, email, password, user_type) 
      VALUES ($1, $2, $3, $4, $5) RETURNING id, email, user_type;`, [first_name, last_name, email, hashedPassword, user_type]);
        res.status(201).json({ user: result.rows[0] });
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.message });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield db_1.default.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        const user = result.rows[0];
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, user_type: user.user_type }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (err) {
        const error = err; // Cast to Error
        res.status(500).json({ error: error.message });
    }
});
exports.login = login;
