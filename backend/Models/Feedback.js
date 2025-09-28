import mongoose from "mongoose";

let feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }
})

let feedbackModel = mongoose.model("feedback", feedbackSchema);

export default feedbackModel;