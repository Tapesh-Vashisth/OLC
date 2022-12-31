import loginRouter from "./user/login";
import signupRouter from "./user/signup";
import refreshRouter from "./refresh";
import logoutRouter from "./user/logout";
import userDetailsRouter from "./user/userDetails";
import updateDetailsRouter from "./user/updateDetails";
import updateProfileImageRouter from "./user/updateProfileImage";
import getProfileImageRouter from "./user/getProfileImage";
import getUserPurchasesRouter from "./user/getUserPurchases"
import verifyJWT from "../../middleware/verifyJWT";
import getUserProductsRouter from "./user/getUserProducts";
const express = require("express");

const router = express.Router();

router.use("/user/login", loginRouter);
router.use("/user/signup", signupRouter);
router.use("/user/logout", logoutRouter);
router.use("/refresh", refreshRouter);
router.use("/user/getUserProducts", getUserProductsRouter);
router.use("/user/getUserPurchases", getUserPurchasesRouter);
router.use(verifyJWT);
router.use("/user/userDetails", userDetailsRouter);
router.use("/user/updateDetails", updateDetailsRouter);
router.use("/user/updateProfileImage", updateProfileImageRouter);
router.use("/user/getProfileImage", getProfileImageRouter);

export default router;