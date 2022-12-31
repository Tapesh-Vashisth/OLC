const express = require("express");
import getProducts from "../../controllers/product/getProducts";

const router = express.Router();

router.get("/", getProducts);

export default router;