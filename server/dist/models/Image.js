"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ImageSchema = new mongoose.Schema({
    imageName: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String
    }
}, { versionKey: false });
