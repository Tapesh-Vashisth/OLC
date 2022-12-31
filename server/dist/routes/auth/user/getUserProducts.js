"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUserProducts_1 = __importDefault(require("../../../controllers/auth/getUserProducts"));
const express = require("express");
const router = express.Router();
router.get("/:userId", getUserProducts_1.default);
exports.default = router;
