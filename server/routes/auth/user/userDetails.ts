const express = require("express");
import userDetails from "../../../controllers/auth/userDetails";

const router = express.Router();

router.get("/", userDetails);

export default router;