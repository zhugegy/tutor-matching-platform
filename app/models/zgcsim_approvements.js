let connectDB = require("./connectDB");

const strCurrentCollection ="approvement";

/**
 * As name states.
 * @param strUserID
 * @param strStatement
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addApprovementTutorApplication = async function (strUserID, strStatement){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.insertOne({type:"tutor_application",status:"need_approvement",userID:o_id, statement: strStatement});
        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.checkIfApprovementTutorApplicationExist = async function (strUserID){

    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        return await dCollection.findOne({type:"tutor_application",status:"need_approvement",userID:o_id});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @param strStatement
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addApprovementMentorApplication = async function (strUserID, strStatement){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.insertOne({type:"mentor_application",status:"need_approvement",userID:o_id, statement: strStatement});
        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.checkIfApprovementMentorApplicationExist = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        return await dCollection.findOne({type:"mentor_application", status:"need_approvement", userID:o_id});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getApprovementViaID = async function (strObjectID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strObjectID);

        return await dCollection.findOne({_id: o_id});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param objectIdTuteeID
 * @param objectIdTutorID
 * @param objectIdUnitOfStudyID
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addApprovementTutorSelection = async function (objectIdTuteeID, objectIdTutorID, objectIdUnitOfStudyID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_tutee = new ObjectId(objectIdTuteeID);
        let o_id_tutor = new ObjectId(objectIdTutorID);
        let o_id_unitOfStudy = new ObjectId(objectIdUnitOfStudyID);

        let result = await dCollection.insertOne({type:"tutor_selection",status:"need_approvement",
            tuteeID: o_id_tutee, tutorID:o_id_tutor, unitOfStudyID: o_id_unitOfStudy});

        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.checkApprovementTutorSelectionExist = async function (objectIdTuteeID, objectIdTutorID, objectIdUnitOfStudyID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_tutee = new ObjectId(objectIdTuteeID);
        let o_id_tutor = new ObjectId(objectIdTutorID);
        let o_id_unitOfStudy = new ObjectId(objectIdUnitOfStudyID);

        return await dCollection.findOne({type:"tutor_selection",status:"need_approvement",
            tuteeID: o_id_tutee, tutorID:o_id_tutor, unitOfStudyID: o_id_unitOfStudy});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param objectIdTuteeID
 * @param objectIdTutorID
 * @param objectIdUnitOfStudyID
 * @param objectIdTimePointID
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addApprovementTutorialAppointment = async function (objectIdTuteeID, objectIdTutorID,
                                                                   objectIdUnitOfStudyID, objectIdTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_tutee = new ObjectId(objectIdTuteeID);
        let o_id_tutor = new ObjectId(objectIdTutorID);
        let o_id_unitOfStudy = new ObjectId(objectIdUnitOfStudyID);
        let o_id_TimePoint = new ObjectId(objectIdTimePointID);

        let result = await dCollection.insertOne({type:"tutorial_appointment",status:"need_approvement",
            tuteeID: o_id_tutee, tutorID:o_id_tutor, unitOfStudyID: o_id_unitOfStudy, timePointID: o_id_TimePoint});

        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.addApprovementMentorMatching = async function (objectIdMenteeID, objectIdMentorID, strDescription){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_mentee = new ObjectId(objectIdMenteeID);
        let o_id_mentor = new ObjectId(objectIdMentorID);

        let result = await dCollection.insertOne({type:"mentor_matching",status:"need_approvement",
            menteeID: o_id_mentee, mentorID:o_id_mentor, mentorDescription: strDescription});

        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.checkIfApprovementMentorMatchingExist = async function (objectIdMenteeID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_mentee = new ObjectId(objectIdMenteeID);

        return await dCollection.findOne({type:"mentor_matching",status:"need_approvement", menteeID: o_id_mentee});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.tagApprovementAsScriptedViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        let objNewValues = { $set: {isAddedByScript: true} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strApprovementID
 * @param strNewStatus
 * @returns {Promise<null>}
 */
module.exports.markApprovementStatusViaID = async function (strApprovementID, strNewStatus){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        let objNewValues = { $set: {status: strNewStatus} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.updateAfterMentorMatchingApprovementIsApprovedViaID = async function (
    strApprovementID, objectIDMenteeActionableNotification, objectIDMentorActionableNotification){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let o_idMenteeNotification = new ObjectId(objectIDMenteeActionableNotification);
        let o_idMentorNotification = new ObjectId(objectIDMentorActionableNotification);

        let objNewValues = { $set: {isMentorAgreed: false, isMenteeAgreed: false,
                menteeNotificationID: o_idMenteeNotification, mentorNotificationID: o_idMentorNotification} };

        return await dCollection.updateOne({_id: o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.updateMentorMatchingApprovementMentorDecisionViaID = async function (strApprovementID, bDecision){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        let objNewValues = { $set: {isMentorAgreed: bDecision} };

        return await dCollection.updateOne({_id: o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.updateMentorMatchingApprovementMenteeDecisionViaID = async function (strApprovementID, bDecision){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        let objNewValues = { $set: {isMenteeAgreed: bDecision} };

        return await dCollection.updateOne({_id: o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getWholeApprovementResultViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        return await dCollection.findOne({_id:o_id});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};