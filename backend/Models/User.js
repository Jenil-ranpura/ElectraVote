import mongoose from "mongoose";
import bcrypt from "bcrypt";

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    adharno: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    phoneno: {
        type: String,
        required: true,
        unique: true
    },

    state: {
        type: String,
        required: true
    },

    isVoted: {
        type: Boolean,
        required: true,
        default: false
    },

    votedParty: {
        type: String,
        default: null
    }
})

UserSchema.pre("save", async function(next) {
    if(this.isModified('password')) {
        let salt = await bcrypt.genSalt(10);
        let hashed_pass = await bcrypt.hash(this.password, salt);
        this.password = hashed_pass;
    }
    next();
})

let UserModel = mongoose.model("user", UserSchema);

export default UserModel;