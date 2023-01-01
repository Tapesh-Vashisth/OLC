import { Express, Response } from "express";
import userModel from "../../models/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const login = async (req: any, res: Response) => {
    console.log("login");
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({"message": "username and password are required!"});
    
    const foundUser = await userModel.findOne({email}).exec();
    if (!foundUser) return res.sendStatus(401);
    
    const match = await bcrypt.compare(password, foundUser.password);
    if (match){
        // create JWTs 
        const accessToken = jwt.sign(
            {email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "10s"}
        )
            
        const refreshToken = jwt.sign(
            {email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "60m"}
        )

        // saving refreshtoken with current user
        foundUser.refreshToken = refreshToken
        await foundUser.save()
        
        res.cookie("jwt", refreshToken, {httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({userId: foundUser.userId, accessToken, products: foundUser.products, name: foundUser.name, bought: foundUser.bought, email: foundUser.email, profileImage: foundUser.profileImage ? foundUser.profileImage : null, description: foundUser.description, phoneNumber: foundUser.phoneNumber});
    }else{
        res.sendStatus(401)
    }
}

export default login;