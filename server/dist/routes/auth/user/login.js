"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../../../controllers/auth/login"));
const express = require("express");
const router = express.Router();
router.post("/", login_1.default);
exports.default = router;
