const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    products: {
        type: [String],
        default: []
    },
    bought: {
        type: [String],
        default: []
    },
    profileImage: {
        type: String,
        default: ""
    },
    refreshToken: String
})

const userModel = mongoose.model("User", userSchema);
export default userModel; 