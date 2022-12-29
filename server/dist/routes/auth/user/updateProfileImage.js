"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const updateProfileImage_1 = __importDefault(require("../../../controllers/auth/updateProfileImage"));
const multer_1 = __importDefault(require("../../../controllers/multer"));
const router = express.Router();
router.post("/", multer_1.default.single('file'), updateProfileImage_1.default);
exports.default = router;
