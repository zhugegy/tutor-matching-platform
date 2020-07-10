const connectDB = require("./connectDB");

const strCurrentCollection = "event";

/**
 *
 * @param strEventType
 * @param strEventDescription
 * @param aryObjectIDMembers
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addEvent = async function (strEventType, strEventDescription, aryObjectIDMembers){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let addResult = await dCollection.insertOne({type: strEventType, description: strEventDescription, members: aryObjectIDMembers});

        return addResult.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.tagEventAsScriptedViaID = async function (strEventID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;

        let o_id = new ObjectId(strEventID);

        let objNewValues = { $set: {isAddedByScript: true} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};
