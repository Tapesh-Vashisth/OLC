import verifyJWT from "../../middleware/verifyJWT";
import addProductRouter from "./addProduct";
import getProductRouter from "./getProduct";
import getProductsRouter from "./getProducts";
import buyProductRouter from "./buyProduct";
const express = require("express");

const router = express.Router();


router.use("/getProducts", getProductsRouter);
router.use("/getProduct", getProductRouter);
router.use(verifyJWT);
router.use("/buyProduct", buyProductRouter);
router.use("/addProduct", addProductRouter);

export default router;