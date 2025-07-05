import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    fullname: { type: String },
    password:{type:String},
    starredFiles: [{ type: String, }],
});

const User = mongoose.model("User", userSchema);
export default User;