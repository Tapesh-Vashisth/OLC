import { Response } from "express";
import userModel from "../../models/User";

const logout = async (req: any, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    
    const refreshToken = cookies?.jwt;

    // is refreshToken in db 
    const foundUser = userModel.findOne({refreshToken});
    if (!foundUser){
        res.clearCookie("jwt", {httpOnly: true, sameSite: "none", secure: true})
        res.sendStatus(204);
    }
    
    // delete refreshToken in the database 
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie("jwt", {httpOnly: true, sameSite: "none", secure: true})
    res.sendStatus(204);
}

export default logout;