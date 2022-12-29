import { Response } from "express";
import userModel from "../../models/User";
import fs from "fs";
import path from "path";

const updateProfileImage = async (req: any, res: Response) => {
    console.log("updateProfileImage");
    console.log("what the hell")
    const f = req.file;
    const email = req.email;
    
    if (f){
        const user = await userModel.findOne({email});
        if (!user) return res.sendStatus(404);

        const img = {
            data: fs.readFileSync(path.join(__dirname + `/../../uploads/${f.filename}`)),
            contentType: `${f.mimetype}`
        }

        user.profileImage = {
            imageName: email,
            image: img
        }

        await user.save();
        return res.status(200).json({
            imageName: email,
            image: img
        });
    } else {
        return res.status(400).send();
    }
}

export default updateProfileImage;