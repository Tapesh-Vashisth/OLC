"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/auth/authRoutes"));
const verifyJWT_1 = __importDefault(require("./middleware/verifyJWT"));
const cookieParse = require("cookie-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(cookieParse());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
    credentials: true
}));
// routing 
app.use("/api/auth", authRoutes_1.default);
app.use(verifyJWT_1.default);
app.all("*", (req, res) => {
    res.status(404).json({ message: "not found" });
});
const port = process.env.PORT || 8000;
mongoose_1.default.connect("mongodb://localhost:27017/OLCdb").then(() => {
    console.log("database connected succesfully");
    app.listen(port, () => {
        console.log(`server listening on port ${port}`);
    });
}).catch((err) => { console.log(err); });
