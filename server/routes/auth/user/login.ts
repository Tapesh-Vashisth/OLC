import login from "../../../controllers/auth/login";
const express = require("express");

const router = express.Router();

router.post("/", login);

export default router;