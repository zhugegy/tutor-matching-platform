var connectDB = require("./connectDB");
const ObjectId = require('mongodb').ObjectId;
const strCurrentCollection ="notification";
var ModelOperationsTimeUtility = require("./time_utility")

//add function
/**
 * As name states.
 * @param strUserID
 * @param strTitle
 * @param strContent
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addNotificationReadOnly = async function (strUserID, strTitle, strContent){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.insertOne({type:"ReadOnly", title: strTitle, content: strContent, userID:o_id, unRead: true});
        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.addNotificationActionableMentorPairing = async function (strUserID, strTitle, strContent,
                                                                        objectIDMenteeID, objectIDMentorID,
                                                                        objectIDApprovedApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        let o_idMenteeID = new ObjectId(objectIDMenteeID);
        let o_idMentorID = new ObjectId(objectIDMentorID);
        let o_idApprovementID = new ObjectId(objectIDApprovedApprovementID);

        let result = await dCollection.insertOne({type:"Actionable", subType: "mentor_pairing", title: strTitle,
            content: strContent, userID:o_id, unRead: true, menteeID: o_idMenteeID, mentorID: o_idMentorID,
            actionResult: "undecided", approvementID: o_idApprovementID});
        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

//query function
module.exports.getCurrentUserNotificationsReadOnly = async function(strUserID){
    let client, db;
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.find( { unRead: true, type:"ReadOnly" ,userID:o_id}).limit(20).toArray();

        for (let i = 0; i < result.length; i++)
        {
            let objTimeStamp = result[i]._id.getTimestamp();
            //result[i].establishedTS = objTimeStamp.toJSON();
            result[i].establishedTS = await ModelOperationsTimeUtility.getOutputTimeString(objTimeStamp);
            result[i]._id = result[i]._id.toString();
        }

        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};


module.exports.getCurrentUserNotificationsActionable = async function(strUserID){
    let client, db;
    try{

        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        let    result = await dCollection.find( { unRead:true, type:"Actionable",userID:o_id }).limit(20).toArray();
        for (let i = 0; i < result.length; i++)
        {
            let objTimeStamp = result[i]._id.getTimestamp();
            //result[i].establishedTS = objTimeStamp.toJSON();
            result[i].establishedTS = await ModelOperationsTimeUtility.getOutputTimeString(objTimeStamp);
            result[i]._id = result[i]._id.toString();
        }

        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getWholeActionableNotificationResultViaID = async function (strNotificationID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strNotificationID);

        return await dCollection.findOne({_id:o_id});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getUserIDViaNotificationID = async function (strNotificationID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strNotificationID);
        let result = await dCollection.findOne({_id:o_id});
        return result.userID;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};
//update function



module.exports.markNotificationAsRead = async function(strNotificationID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strNotificationID);
        var newvalues = { $set: {unRead: false} };
        let result = await dCollection.updateOne({_id:o_id}, newvalues);
        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};


module.exports.markActionableNotificationResultViaID = async function (strNotificationID, strResult){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strNotificationID);

        let objNewValues = { $set: {actionResult: strResult} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};