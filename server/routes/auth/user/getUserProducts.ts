import getUserProducts from "../../../controllers/auth/getUserProducts";
const express = require("express");

const router = express.Router();

router.get("/:userId", getUserProducts);

export default router;