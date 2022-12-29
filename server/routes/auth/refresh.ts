const express = require("express");
import refreshToken from "../../controllers/auth/refreshToken";
const Router = express.Router();

Router.get("/", refreshToken);

export default Router;