"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const updateDetails_1 = __importDefault(require("../../../controllers/auth/updateDetails"));
const router = express.Router();
router.post("/", updateDetails_1.default);
exports.default = router;
