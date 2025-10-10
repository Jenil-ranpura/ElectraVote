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
                votedId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user"
                }
            }
        ],

        default: []
    }
});

let CandidateModel = mongoose.model("candidate", CandidateSchema);

export default CandidateModel;

