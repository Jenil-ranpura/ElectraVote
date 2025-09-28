import mongoose from "mongoose";

let AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: true
    },

    party: {
        type: String,
        required: true,
        unique: true
    }
})

let AdminModel = mongoose.model("admin", AdminSchema);

export default AdminModel;