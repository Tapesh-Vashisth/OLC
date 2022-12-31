const express = require("express");
import buyProduct from "../../controllers/product/buyProduct";

const router = express.Router();

router.post("/", buyProduct);

export default router;