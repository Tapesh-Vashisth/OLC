import { Express, Request, Response } from "express";
import userModel from "../../models/User";
require("dotenv").config();

const jwt = require("jsonwebtoken");

const refreshToken = async (req: any, res: Response) => {
    console.log("refresh");
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshtoken = cookies.jwt;
    const foundUser = await userModel.findOne({refreshToken: refreshtoken}).exec();
    if (!foundUser) return res.sendStatus(403);

    // evaluate jwt 
    jwt.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

            const accessToken = jwt.sign(
                {email: foundUser.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "10s"}
            )

            res.json({accessToken});
        }
    )
}   

export default refreshToken;