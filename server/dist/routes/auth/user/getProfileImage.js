"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getProfileImage_1 = __importDefault(require("../../../controllers/auth/getProfileImage"));
const express = require("express");
const router = express.Router();
router.get("/", getProfileImage_1.default);
exports.default = router;
