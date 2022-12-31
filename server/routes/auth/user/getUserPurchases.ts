import getUserPurchases from "../../../controllers/auth/getUserPurchases";
const express = require("express");

const router = express.Router();

router.get("/:userId", getUserPurchases);

export default router;