"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const speakerController_1 = require("../controllers/speakerController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/profile', auth_1.authenticate, (0, auth_1.authorize)(['speaker']), speakerController_1.addSpeakerDetails);
exports.default = router;
