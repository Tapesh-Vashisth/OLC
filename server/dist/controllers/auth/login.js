"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("login");
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ "message": "username and password are required!" });
    console.log(email, password);
    const foundUser = yield User_1.default.findOne({ email }).exec();
    if (!foundUser)
        return res.sendStatus(401);
    const match = yield bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs 
        const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
        const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "60m" });
        // saving refreshtoken with current user
        foundUser.refreshToken = refreshToken;
        yield foundUser.save();
        res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "strict", secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ userId: foundUser.userId, accessToken, products: foundUser.products, name: foundUser.name, bought: foundUser.bought, email: foundUser.email, profileImage: foundUser.profileImage ? foundUser.profileImage : null, description: foundUser.description, phoneNumber: foundUser.phoneNumber });
    }
    else {
        res.sendStatus(401);
    }
});
exports.default = login;
