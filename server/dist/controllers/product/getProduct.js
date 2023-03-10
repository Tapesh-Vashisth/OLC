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
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getProduct");
    const productId = req.params.productId;
    // get product 
    const product = yield Product_1.default.findOne({ productId });
    if (!product)
        return res.status(404).send();
    // get the seller 
    const seller = yield User_1.default.findOne({ userId: product.seller });
    if (!seller)
        return res.status(404).send();
    return res.status(200).json({ product, seller: { name: seller.name, profileImage: seller.profileImage, email: seller.email } });
});
exports.default = getProduct;
