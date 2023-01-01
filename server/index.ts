import dotenv from "dotenv";
import express, { Express, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth/authRoutes";
import productRouter from "./routes/product/productRoutes";
// import verifyJWT from "./middleware/verifyJWT";
const cookieParse = require("cookie-parser");
dotenv.config();

const app: Express = express();


app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(cookieParse());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin:["http://localhost:3000", "https://olcsell.netlify.app"],
    methods:['POST','GET','HEAD','PUT','DELETE'],
    credentials: true
}))


// routing 
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.all("*", (req, res) => {
    res.status(404).json({message: "not found"});
})

const port = process.env.PORT || 8000;

// mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@olc.jysveqm.mongodb.net/?retryWrites=true&w=majority
// mongodb://localhost:27017/OLCdb
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@olc.jysveqm.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("database connected succesfully");
    app.listen(port, () => {
        console.log(`server listening on port ${port}`)
    });
}).catch((err) => {console.log(err)});