import { Response } from "express";
import userModel from "../../models/User";

const getProfileImage = async (req: any, res: Response) => {
    console.log("getProfile");
    const user = await userModel.findOne({email: req.email});

    if (!user) return res.sendStatus(404);

    res.status(200).json(user.profileImage);
}

export default getProfileImage;