const Items = require("../db/models/items");
const Users = require("../db/models/users");

class BidService {
    constructor() {
        this.items = Items;
        this.users = Users;
    }

    async placeBid(userID, itemID, bidAmount) {
        try {
            const itemInfo = await this.items.find({ id: itemID });
            if (Object.keys(itemInfo).length === 0) {
                return "No item found with passed item ID"
            }
            else {
                if (itemInfo.bid_end_time.getTime() >= new Date().getTime() &&
                    bidAmount > itemInfo.bid_amount
                ) {
                    await this.items.updateOne({ "id": itemID }, {
                        $set: { "highest_bid_amount": bidAmount, "highest_bidder_user_id": userID }, $push: {
                            "all_bids_placed": {
                                "user_id": userID,
                                "bid_amount": bidAmount
                            }
                        }
                    })
                    const userInfo = await this.users.findOne({ id: userID });
                    let userBids = userInfo.bids;
                    let bidExist = false;
                    if (userBids[itemID]) {
                        bidExist = true;
                    }
                    userBids[itemID] = bidAmount;
                    await this.users.updateOne({ "id": userId }, { $set: { "bids": userBids } });
                    if (bidExist === true) {
                        return "Bid sucessfully updated"
                    }
                    else {
                        return "Bid sucessfully placed"
                    }
                }
                else {
                    return "Bid to be placed is inactive"
                }
            }
        }
        catch (err) {
            console.log("Error occured in placeBid");
        }
    }

    async getAllBidsForUser(userID) {
        try {
            const userInfo = await this.users.findOne({ id: userID });
            let userBids = userInfo.bids;
            return userBids;
        }
        catch (err) {
            console.log("Error occured in getAllBidsForUser");
        }
    }

    async getAllBidsForItem(itemID){
        try{
            const itemInfo = await this.items.find({ id: itemID });
            return itemInfo.all_bids_placed;
        }
        catch(err){
            console.log("Error occured in getAllBidsForItem");
        }
    }
}

module.exports = BidService;