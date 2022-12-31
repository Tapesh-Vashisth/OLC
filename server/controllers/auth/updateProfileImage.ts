import { Response } from "express";
import userModel from "../../models/User";
import fs from "fs";
import path from "path";

const updateProfileImage = async (req: any, res: Response) => {
    console.log("updateProfileImage");
    const email = req.email;
    
    const user = await userModel.findOne({email});
    if (!user) return res.sendStatus(404);

    user.profileImage = req.body.src;

    await user.save();
    return res.status(200).json(req.body);
}

export default updateProfileImage;