import mongoose from "mongoose";

let PartySchema = new mongoose.Schema({
    partyname: {
        type: String,
        required: true,
        unique: true
    },

    shortname: {
        type: String,
        required: true,
        unique: true
    }
})

let PartyModel = mongoose.model("party", PartySchema);

export default PartyModel;