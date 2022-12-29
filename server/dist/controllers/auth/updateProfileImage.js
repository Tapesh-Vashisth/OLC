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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const updateProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("updateProfileImage");
    console.log("what the hell");
    const f = req.file;
    const email = req.email;
    if (f) {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.sendStatus(404);
        const img = {
            data: fs_1.default.readFileSync(path_1.default.join(__dirname + `/../../uploads/${f.filename}`)),
            contentType: `${f.mimetype}`
        };
        user.profileImage = {
            imageName: email,
            image: img
        };
        yield user.save();
        return res.status(200).json({
            imageName: email,
            image: img
        });
    }
    else {
        return res.status(400).send();
    }
});
exports.default = updateProfileImage;
