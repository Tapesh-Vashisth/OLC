"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./user/login"));
const signup_1 = __importDefault(require("./user/signup"));
const refresh_1 = __importDefault(require("./refresh"));
const logout_1 = __importDefault(require("./user/logout"));
const userDetails_1 = __importDefault(require("./user/userDetails"));
const updateDetails_1 = __importDefault(require("./user/updateDetails"));
const updateProfileImage_1 = __importDefault(require("./user/updateProfileImage"));
const getProfileImage_1 = __importDefault(require("./user/getProfileImage"));
const getUserPurchases_1 = __importDefault(require("./user/getUserPurchases"));
const verifyJWT_1 = __importDefault(require("../../middleware/verifyJWT"));
const getUserProducts_1 = __importDefault(require("./user/getUserProducts"));
const express = require("express");
const router = express.Router();
router.use("/user/login", login_1.default);
router.use("/user/signup", signup_1.default);
router.use("/user/logout", logout_1.default);
router.use("/refresh", refresh_1.default);
router.use("/user/getUserProducts", getUserProducts_1.default);
router.use("/user/getUserPurchases", getUserPurchases_1.default);
router.use(verifyJWT_1.default);
router.use("/user/userDetails", userDetails_1.default);
router.use("/user/updateDetails", updateDetails_1.default);
router.use("/user/updateProfileImage", updateProfileImage_1.default);
router.use("/user/getProfileImage", getProfileImage_1.default);
exports.default = router;
