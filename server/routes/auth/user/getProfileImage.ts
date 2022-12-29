import getProfileImage from "../../../controllers/auth/getProfileImage";
const express = require("express");

const router = express.Router();

router.get("/", getProfileImage);

export default router;