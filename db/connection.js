const { MONGO_URL } = require("../config/index");
const mongoose = require("mongoose");

module.exports = async function db() {
    try {
        await mongoose.connect(MONGO_URL , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DATABASE CONNECTED.....");
    }
    catch(err){
        console.log("Error while connecting database",err);
    }
}