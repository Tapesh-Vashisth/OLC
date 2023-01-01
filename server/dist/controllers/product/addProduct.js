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
const User_1 = __importDefault(require("../../models/User"));
const { v4: uuidv4 } = require('uuid');
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(addProduct);
    if (req.email) {
        const data = Object.assign(Object.assign({}, req.body), { productId: uuidv4() });
        const user = yield User_1.default.findOne({ email: req.email });
        if (!user)
            return res.sendStatus(404);
        try {
            yield user.updateOne({ $push: { products: data.productId } });
            yield user.save();
            const product = new Product_1.default(data);
            yield product.save();
            return res.status(200).send();
        }
        catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }
});
exports.default = addProduct;
