const express = require("express");
import addProduct from "../../controllers/product/addProduct";

const router = express.Router();

router.post("/", addProduct);

export default router;