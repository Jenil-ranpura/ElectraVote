import mongoose from "mongoose";

let url = "mongodb://localhost:27017/voting";

mongoose.connect(url);

let db = mongoose.connection;

db.on("connected", () => {
    console.log("Database Connected Successfully");
})

db.on("error", () => {
    console.log("Error Occurs");
})

db.on("disconnect", () => {
    console.log("Database Disconnected");
})

export default db;