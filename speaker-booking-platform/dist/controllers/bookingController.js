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
exports.bookSession = void 0;
const db_1 = __importDefault(require("../config/db"));
const bookSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { speaker_id, date, time_slot } = req.body;
    const userId = req.user.id;
    try {
        const result = yield db_1.default.query(`INSERT INTO bookings (user_id, speaker_id, date, time_slot) 
      VALUES ($1, $2, $3, $4) RETURNING *;`, [userId, speaker_id, date, time_slot]);
        res.status(201).json({ booking: result.rows[0] });
    }
    catch (err) {
        const error = err; // Cast to Error
        res.status(400).json({ error: error.message });
    }
});
exports.bookSession = bookSession;
