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
const Product_1 = __importDefault(require("../../models/Product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    let products;
    try {
        if (req.query.notUserId) {
            products = yield Product_1.default.find({ seller: { $ne: req.query.notUserId }, sold: false }, { images: { $slice: 1 } });
        }
        else if (req.query.userId) {
            products = yield Product_1.default.find({ seller: req.query.userId, sold: false }, { images: { $slice: 1 } });
        }
        else {
            products = yield Product_1.default.find({ sold: false }, { images: { $slice: 1 } });
        }
        res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});
exports.default = getProducts;
