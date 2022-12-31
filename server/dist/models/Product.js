"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        default: []
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sold: {
        type: Boolean,
        default: false
    },
    images: {
        type: [String],
        default: []
    },
    description: {
        type: String
    },
    seller: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});
const productModel = mongoose.model("Product", productSchema);
exports.default = productModel;
