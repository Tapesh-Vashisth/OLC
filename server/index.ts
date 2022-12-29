import dotenv from "dotenv";
import express, { Express, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth/authRoutes";
import verifyJWT from "./middleware/verifyJWT";
const cookieParse = require("cookie-parser");
dotenv.config();

const app: Express = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParse());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin:["http://localhost:3000"],
    methods:['POST','GET','HEAD','PUT','DELETE'],
    credentials: true
}))


// routing 
app.use("/api/auth", authRouter);
app.use(verifyJWT);

app.all("*", (req, res) => {
    res.status(404).json({message: "not found"});
})

const port = process.env.PORT || 8000;
 
mongoose.connect("mongodb://localhost:27017/OLCdb").then(() => {
    console.log("database connected succesfully");
    app.listen(port, () => {
        console.log(`server listening on port ${port}`)
    });
}).catch((err) => {console.log(err)});