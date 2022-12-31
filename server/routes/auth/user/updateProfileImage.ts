const express = require("express");
import updateProfileImage from "../../../controllers/auth/updateProfileImage";
const router = express.Router();

router.post("/", updateProfileImage);

export default router;