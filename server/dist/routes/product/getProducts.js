"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const getProducts_1 = __importDefault(require("../../controllers/product/getProducts"));
const router = express.Router();
router.get("/", getProducts_1.default);
exports.default = router;
