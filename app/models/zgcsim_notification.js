let connectDB = require("./connectDB");

const strCurrentCollection ="notification";

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

/**
 * As name states.
 * @param strUserID
 * @param strTitle
 * @param strContent
 * @param objectIDMenteeID
 * @param objectIDMentorID
 * @param objectIDApprovedApprovementID
 * @returns {Promise<Object._id|ObjectId|null>}
 */
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

/**
 * As name states.
 * @param strNotificationID
 * @returns {Promise<null>}
 */
module.exports.tagNotificationAsScriptedViaID = async function (strNotificationID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strNotificationID);

        let objNewValues = { $set: {isAddedByScript: true} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strNotificationID
 * @returns {Promise<null>}
 */
module.exports.markNotificationAsReadViaID = async function (strNotificationID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strNotificationID);

        let objNewValues = { $set: {unRead: false} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strNotificationID
 * @param strResult
 * @returns {Promise<null>}
 */
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