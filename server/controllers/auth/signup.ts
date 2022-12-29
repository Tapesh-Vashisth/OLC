import { Express, Response } from "express";
import userModel from "../../models/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req: any, res: Response) => {   
    const {name, email, password} = req.body;
    console.log(name, email, password)
    if (!name || !email || !password) return res.status(400).json({"message": "username and password are required!"});

    // checking for duplicate email in the database 
    const duplicate = await userModel.findOne({email}).exec();

    if (duplicate) return res.sendStatus(409);

    try {
        // encrypt the password                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        const hashedpassword = await bcrypt.hash(password, 10);
        
        const accessToken = jwt.sign(
            {email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "10s"}
        )
            
        const refreshToken = jwt.sign(
            {email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "15s"}
        )
            
        // store the new user 
        const newUser = new userModel({
            name,
            email,
            password: hashedpassword,
            description: "",
            refreshToken: refreshToken
        })
        
        await newUser.save();

        
        res.cookie("jwt", refreshToken, {httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({accessToken, email, name: name});
    } catch (err: any) {
        res.status(500).json({"message": err?.message});
    }
}

export default signup;
