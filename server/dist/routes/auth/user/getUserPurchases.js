"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUserPurchases_1 = __importDefault(require("../../../controllers/auth/getUserPurchases"));
const express = require("express");
const router = express.Router();
router.get("/:userId", getUserPurchases_1.default);
exports.default = router;
