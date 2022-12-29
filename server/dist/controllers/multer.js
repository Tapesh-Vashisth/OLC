"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { diskStorage } = require("multer");
const multer = require("multer");
// multer setup 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./dist/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const upload = multer({ storage: storage, fileFilter });
exports.default = upload;
