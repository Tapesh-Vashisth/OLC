const express = require("express");
import getProduct from "../../controllers/product/getProduct";

const router = express.Router();

router.get("/:productId", getProduct);

export default router;