"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    projects: {
        type: [String],
        default: []
    },
    profileImage: {
        type: {
            imageName: { type: String, required: true },
            image: {
                data: Buffer,
                contentType: String
            }
        },
        default: null
    },
    refreshToken: String
});
const userModel = mongoose.model("User", userSchema);
exports.default = userModel;
