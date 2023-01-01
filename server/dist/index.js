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
const productRoutes_1 = __importDefault(require("./routes/product/productRoutes"));
// import verifyJWT from "./middleware/verifyJWT";
const cookieParse = require("cookie-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '50mb' }));
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
app.use("/api/products", productRoutes_1.default);
app.all("*", (req, res) => {
    res.status(404).json({ message: "not found" });
});
const port = process.env.PORT || 8000;
// mongodb://localhost:27017/OLCdb
mongoose_1.default.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@olc.jysveqm.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("database connected succesfully");
    app.listen(port, () => {
        console.log(`server listening on port ${port}`);
    });
}).catch((err) => { console.log(err); });
