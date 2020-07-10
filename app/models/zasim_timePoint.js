const connectDB = require("./connectDB");

const strCurrentCollection = "timePoint";

module.exports.getDurationObjectViaID = async function (strTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strTimePointID);

        let objRes = await dCollection.findOne({_id:o_id});

        return objRes.duration;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return -1;
};

module.exports.getStartTimeObjectViaID = async function (strTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strTimePointID);

        let objRes = await dCollection.findOne({_id:o_id});

        return objRes.startTime;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return -1;
};

module.exports.getCampusObjectViaID = async function (strTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strTimePointID);

        let objRes = await dCollection.findOne({_id:o_id});

        return objRes.location;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return -1;
};