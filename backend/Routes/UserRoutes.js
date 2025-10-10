import express from "express";
import CandidateModel from "../Models/Candidate.js";
import UserModel from "../Models/User.js";
import { verifyToken } from "../jwt/jwt.js";

let UserRouter = express.Router();

//vote a candidate from user

UserRouter.get("/user/profile", verifyToken, async(req, res) => {
    let adharno = req.userPayload.adharno;

    try {
        let User = await UserModel.findOne({adharno: adharno});
        res.send({user: User});
    }catch(err) {
        console.log(err);
        res.send({msg: err});
    }
})

UserRouter.post("/user/vote", verifyToken, async (req, res) => {
    let adharno = req.userPayload.adharno;
    let party = req.body.party;

    try {
        let user = await UserModel.findOne({adharno: adharno});
        let state = user.state;

        let candidate = await CandidateModel.findOne({state: state, partyname: party});
        let obj = {
            votedId: user._id
        }

        candidate.votecount.push(obj);
        user.votedParty = party;

        await candidate.save();
        await user.save();

        res.send({response: candidate});
    }catch(err) {
        console.log(err);
        res.send({msg: "Error"});
    }
})

export default UserRouter;