"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const addProduct_1 = __importDefault(require("../../controllers/product/addProduct"));
const router = express.Router();
router.post("/", addProduct_1.default);
exports.default = router;
