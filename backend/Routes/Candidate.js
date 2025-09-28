import express from "express";
import CandidateModel from "../Models/Candidate.js";
import UserModel from "../Models/User.js";
import { verifyToken } from "../jwt/jwt.js";

let candidateRouter = express.Router();

candidateRouter.get("/candidate", verifyToken ,async (req, res) => {
    let adharno = req.userPayload.adharno;

    try {
        let user = await UserModel.findOne({adharno: adharno});
        let state = user.state;
        let candidate = await CandidateModel.find({state: state});

        res.send({candidate: candidate, voted: user.votedParty});

        
    }catch(err) {
        console.log(err);
        res.send({response: "Error Occurs On Candidate"});
    }
})

export default candidateRouter;