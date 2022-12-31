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
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password)
        return res.status(400).json({ "message": "username and password are required!" });
    // checking for duplicate email in the database 
    const duplicate = yield User_1.default.findOne({ email }).exec();
    if (duplicate)
        return res.sendStatus(409);
    try {
        // encrypt the password                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        const hashedpassword = yield bcrypt.hash(password, 10);
        const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
        const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "15s" });
        // store the new user 
        const newUser = new User_1.default({
            userId: uuidv4(),
            name,
            email,
            password: hashedpassword,
            description: "",
            refreshToken: refreshToken
        });
        yield newUser.save();
        res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken, email, name: name, userId: newUser.userId });
    }
    catch (err) {
        res.status(500).json({ "message": err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.default = signup;
