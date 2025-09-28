import express from "express";
import AdminModel from "../Models/Admin.js";
import PartyModel from "../Models/Party.js";
import CandidateModel from "../Models/Candidate.js";
import candidates from "../StateWiseCandidates.js";

let AdminRouter = express.Router();


AdminRouter.get("/admin/getCandidates", async (req, res) => {
    try {
        let party = req.query.party;
        party = party.toLowerCase();

        let candidates = await CandidateModel.find({ partyname: party });

        res.send({ response: candidates });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

AdminRouter.put("/admin/changeCandidate", async (req, res) => {
    let { newCandidate, partyname, state } = req.body;
    
    try {
        let candidate = await CandidateModel.findOne({partyname: partyname, state: state});
        let id = candidate._id;
        let response = await CandidateModel.findByIdAndUpdate(id, {candidatename: newCandidate});

        res.send({msg: "Candidate Updated"});
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

//create account for admin
AdminRouter.post("/admin/signup", async (req, res) => {
    try {
        let body = req.body;
        let data = new AdminModel(body);
        let response = await data.save();

        console.log(response);
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

//login for admin
AdminRouter.post("/admin/login", async (req, res) => {
    try {
        let body = req.body;
        let user = await AdminModel.findOne({ username: body.username });

        if (!user) {
            return res.send({ msg: "User Not Found" });
        }

        let compare_password = await body.password == user.password && body.party == user.party;

        if (compare_password) {
            res.status(200).json({ success: true, msg: "You Have Successfully Logged In" });
        } else {
            res.send({ msg: "Login Credentials Are Mismatch" });
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

//add a new candidate in election
AdminRouter.post("/admin/addEntry", async (req, res) => {
    let bjp = await PartyModel.findOne({ shortname: "bjp" });
    let congress = await PartyModel.findOne({ shortname: "congress" });
    let aap = await PartyModel.findOne({ shortname: "aap" });

    try {
        let data;

        for (let i = 0; i < candidates.length; i++) {


            if (candidates[i].partyname == "BJP_PARTY_ID") {

                candidates[i].partyname = bjp.shortname;
                data = new CandidateModel(candidates[i]);

            } else if (candidates[i].partyname == "CONGRESS_PARTY_ID") {

                candidates[i].partyname = congress.shortname;
                data = new CandidateModel(candidates[i]);

            } else if (candidates[i].partyname == "AAP_PARTY_ID") {

                candidates[i].partyname = aap.shortname;
                data = new CandidateModel(candidates[i]);

            }

            let response = await data.save();
            console.log(response);

        }
        res.send({ msg: "Data Saved Successfully" });

    } catch (err) {

        console.log(err);
        res.send(err);

    }
})

//update candidate info
AdminRouter.put("/admin/changeCandidate/", async (req, res) => {
    let body = req.body;
    let { newCandidate, partyname, state } = body;

    try {

        let candidate = await CandidateModel.findOne({ partyname: partyname, state: state });
        candidate.candidatename = newCandidate;
        let response = await candidate.save();

        console.log(response);
        res.send(response);

    } catch (err) {

        console.log(err);
        res.send(err);

    }
})

//remove candidate from election
AdminRouter.delete("/admin/removeCandidate", async (req, res) => {
    let body = req.body;
    let { partyname, state } = body;

    try {

        let candidate = await CandidateModel.findOne({ partyname: partyname, state: state });
        let candidateID = candidate._id;
        let response = await CandidateModel.findByIdAndDelete(candidateID);

        console.log(response);
        res.send(response);

    } catch (err) {

        console.log(err);
        res.send(err);

    }
})

AdminRouter.post("/admin/addCandidate", async (req, res) => {
  try {
    const { candidatename, partyname, state } = req.body;

    if (!candidatename || !partyname || !state) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    const newCandidate = new CandidateModel({
      candidatename,
      partyname,
      state,
    });

    await newCandidate.save();
    res.json({ success: true, msg: "Candidate added", newCandidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

//to empty the votelist of a candidate
AdminRouter.post("/admin/removeVotes/:state/:pname", async (req, res) => {
    let State = req.params.state;
    let Pname = req.params.pname;

    try {
        let candidate = await CandidateModel.findOne({ state: State, partyname: Pname });
        candidate.votecount = [];

        let savedData = await candidate.save();
        res.send(savedData);
        console.log(savedData);
    } catch (err) {

        console.log(err);
        res.send(err);

    }
})

export default AdminRouter;