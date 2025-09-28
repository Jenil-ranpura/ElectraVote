import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import UserRouter from "./Routes/UserRoutes.js";
import AccountRouter from "./Routes/Account.js";
import AdminRouter from "./Routes/Admin.js";
import feedbackRouter from "./Routes/Feedback.js";
import candidateRouter from "./Routes/Candidate.js";
import db from "./db.js";

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", UserRouter);
app.use("/", AccountRouter);
app.use("/", AdminRouter);
app.use("/", feedbackRouter);
app.use("/", candidateRouter);

app.get("/", (req, res) => {
    console.log("You Are At Home Page");
    res.send({msg: "You Are At Home Page"});
})

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server Is Started");
})