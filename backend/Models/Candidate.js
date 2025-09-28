import mongoose from "mongoose";

let CandidateSchema = new mongoose.Schema({

    candidatename: {
        type: String,
        required: true
    },

    partyname: {
        type: String,
        ref: "party"
    },

    state: {
        type: String,
        required: true
    },

    votecount: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },

                adharno: {
                    type: String,
                    required: true,
                    unique: true
                },

                phoneno: {
                    type: String,
                    required: true,
                    unique: true
                },

                votedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        default: []
    }
});

let CandidateModel = mongoose.model("candidate", CandidateSchema);

export default CandidateModel;

