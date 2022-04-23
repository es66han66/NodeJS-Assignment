const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
    bids: {
        type: Map,
        required: false
    },
    id : {
        type: String,
        required: true
    }
});

const Users = mongoose.model("Users", users, "Users");

module.exports = Users;