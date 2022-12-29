import { Response } from "express";
import userModel from "../../models/User";

const updateDetails = async (req: any, res: Response) => {
    const details = req.body;
    console.log(details);
    const user = await userModel.findOne({email: req.email});
    if (!user) return res.status(404).send();

    user.description = details.description;
    user.phoneNumber = details.phoneNumber;
    user.name = details.name;

    await user.save();

    return res.status(200).send();
};

export default updateDetails;