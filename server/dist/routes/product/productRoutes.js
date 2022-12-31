"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyJWT_1 = __importDefault(require("../../middleware/verifyJWT"));
const addProduct_1 = __importDefault(require("./addProduct"));
const getProduct_1 = __importDefault(require("./getProduct"));
const getProducts_1 = __importDefault(require("./getProducts"));
const buyProduct_1 = __importDefault(require("./buyProduct"));
const express = require("express");
const router = express.Router();
router.use("/getProducts", getProducts_1.default);
router.use("/getProduct", getProduct_1.default);
router.use(verifyJWT_1.default);
router.use("/buyProduct", buyProduct_1.default);
router.use("/addProduct", addProduct_1.default);
exports.default = router;
