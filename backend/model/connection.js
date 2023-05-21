const mongoose = require("mongoose");
const config = require("../config");

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongooseURL);
        console.log("mongodb connected")
    } catch (err) {
        console.log("mongodb connection fail ", err.message);
    }
}
connectDB();