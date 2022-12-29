"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const signup_1 = __importDefault(require("../../../controllers/auth/signup"));
const router = express.Router();
router.post("/", signup_1.default);
exports.default = router;
