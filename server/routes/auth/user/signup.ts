const express = require("express");
import signup from "../../../controllers/auth/signup";

const router = express.Router();

router.post("/", signup);

export default router;