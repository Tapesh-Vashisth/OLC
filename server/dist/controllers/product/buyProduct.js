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
const buyProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("buyProduct");
    const productId = req.body;
    const email = req.email;
    const product = yield Product_1.default.findOne({ productId: productId.productId });
    if (!product)
        return res.status(404).send();
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return res.status(404).send();
    // update the status 
    try {
        yield product.updateOne({ sold: true, buyer: user.userId });
        yield user.updateOne({ $push: { bought: productId.productId } });
        product.save();
        user.save();
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});
exports.default = buyProduct;
