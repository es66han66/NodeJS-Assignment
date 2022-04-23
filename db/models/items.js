const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const items = new Schema({
    bid_start_time: {
        type: Date,
        required: true
    },
    bid_end_time : {
        type: Date,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    highest_bidder_user_id: {
        type: String,
        required: false,
        default: ""
    },
    highest_bid_amount: {
        type: Number,
        required: false,
        default: 0
    },
    all_bids_placed: {
        type: Map,
        required: false,
        default: {}
    }
});

const Items = mongoose.model("Items", items, "Items");

module.exports = Items;