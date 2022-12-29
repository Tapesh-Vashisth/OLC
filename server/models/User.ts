const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    projects: {
        type: [String],
        default: []
    },
    refreshToken: String
})

const userModel = mongoose.model("User", userSchema);
export default userModel; 