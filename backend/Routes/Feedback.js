import express from "express";
import feedbackModel from "../Models/Feedback.js";
import { verifyToken } from "../jwt/jwt.js";

let feedbackRouter = express.Router();

feedbackRouter.post("/feedback", async (req, res) => {
    try {
        let { name, email, message } = req.body;
        let data = new feedbackModel({
            name,
            email,
            message
        });

        let response = await data.save();

        console.log(response);
        res.send({msg: "Feedback Submitted Successfully"});
    }catch(err) {
        console.log(err);
        res.status(500).send({ msg: "Something went wrong", error: err.message });
    }
})

export default feedbackRouter;