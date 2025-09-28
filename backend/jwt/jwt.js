import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let createToken = (userPayload) => {
    return jwt.sign(userPayload, process.env.SECRET_KEY, {expiresIn: "1h"});
}

let verifyToken = async (req, res, next) => {
    try {

        let token = req.headers.authorization.split(" ")[1];

        let decoded =  jwt.verify(token, process.env.SECRET_KEY);

        req.userPayload = decoded;
        next();

    }catch(err) {

        console.log("Token Is Invalid");
        res.send({msg: "Token Is Invalid"});
    }
}

export {createToken, verifyToken};