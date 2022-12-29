"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const refreshToken_1 = __importDefault(require("../../controllers/auth/refreshToken"));
const Router = express.Router();
Router.get("/", refreshToken_1.default);
exports.default = Router;
