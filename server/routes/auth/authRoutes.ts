import loginRouter from "./user/login";
import signupRouter from "./user/signup";
import refreshRouter from "./refresh";
import logoutRouter from "./user/logout";
import userDetailsRouter from "./user/userDetails";
import updateDetailsRouter from "./user/updateDetails";
import updateProfileImageRouter from "./user/updateProfileImage";
import getProfileImage from "./user/getProfileImage";
import verifyJWT from "../../middleware/verifyJWT";
const express = require("express");

const router = express.Router();

router.use("/user/login", loginRouter);
router.use("/user/signup", signupRouter);
router.use("/user/logout", logoutRouter);
router.use("/refresh", refreshRouter);
router.use(verifyJWT);
router.use("/user/userDetails", userDetailsRouter);
router.use("/user/updateDetails", updateDetailsRouter);
router.use("/user/updateProfileImage", updateProfileImageRouter);
router.use("/user/getProfileImage", getProfileImage);

export default router;