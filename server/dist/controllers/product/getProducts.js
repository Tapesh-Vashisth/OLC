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
    console.log("getProducts");
    // const {limit, notUserId, userId, category, state, price} = req.query;
    const { limit, skip } = req.query;
    let query = {};
    Object.keys(req.query).forEach(function (key, index) {
        switch (key) {
            case "notUserId":
                query.seller = { $ne: req.query.notUserId };
                break;
            case "userId":
                query.seller = req.query.userId;
                break;
            case "category":
                if (req.query.category !== "all") {
                    query.category = req.query.category;
                }
                break;
            case "state":
                if (req.query.state !== "all") {
                    query.state = req.query.state;
                }
                break;
            case "sold":
                query.sold = req.query.sold;
                break;
            case "title":
                query.title = { $regex: `${req.query.title}`, $options: "i" };
                break;
        }
    });
    let products;
    try {
        if (limit) {
            if (skip) {
                products = yield Product_1.default.find(query, { images: { $slice: 1 } }).skip(skip).limit(limit);
            }
            else {
                products = yield Product_1.default.find(query, { images: { $slice: 1 } }).limit(limit);
            }
        }
        else {
            if (skip) {
                products = yield Product_1.default.find(query, { images: { $slice: 1 } }).skip(skip);
            }
            else {
                products = yield Product_1.default.find(query, { images: { $slice: 1 } });
            }
        }
        res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});
exports.default = getProducts;
