const express = require("express");
import updateProfileImage from "../../../controllers/auth/updateProfileImage";
import upload from "../../../controllers/multer";

const router = express.Router();

router.post("/", upload.single('file'), updateProfileImage);

export default router;