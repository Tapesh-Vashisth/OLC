const express = require("express");
import logout from "../../../controllers/auth/logout";
const Router = express.Router();

Router.get("/", logout);

export default Router;
