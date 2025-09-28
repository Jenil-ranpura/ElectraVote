import express from "express";
import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../jwt/jwt.js";

let AccountRouter = express.Router();

//create account for user
AccountRouter.post("/signup", async (req, res) => {
    try {
        let body = req.body;
        let data = new UserModel(body);
        let response = await data.save();

        let obj = {
            adharno: body.adharno
        }
        let token = createToken(obj);
        console.log(response);
        res.send({ response: response, token: token, success: true });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})


//login for user
AccountRouter.post("/login", async (req, res) => {
    try {
        let body = req.body;
        let user = await UserModel.findOne({ adharno: body.adharno });

        if (!user) {
            return res.send({ msg: "User Not Found" });
        }

        let compare_password = await bcrypt.compare(body.password, user.password);

        if (compare_password) {
            let obj = {
                adharno: body.adharno
            }
            let token = createToken(obj);
            res.status(200).json({ success: true, msg: "You Have Successfully Logged In" , token: token});
        } else {
            res.send({ msg: "Login Credentials Are Mismatch" });
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

export default AccountRouter;