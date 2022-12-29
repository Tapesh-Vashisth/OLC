const express = require("express");
import updateDetails from "../../../controllers/auth/updateDetails";

const router = express.Router();

router.post("/", updateDetails);

export default router;