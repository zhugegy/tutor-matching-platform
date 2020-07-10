const connectDB = require("./connectDB");

const strCurrentCollection = "appointment";

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

        let result = await dCollection.insertOne({status:"waiting_for_complete",
            tuteeID: o_id_tutee, tutorID:o_id_tutor, unitOfStudyID: o_id_unitOfStudy, timePointID: o_id_TimePoint,
            isTuteeDecidedToComplete: false, isTutorDecidedToComplete: false});

        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.tagAppointmentAsScriptedViaID = async function (strAppointmentID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strAppointmentID);

        let objNewValues = { $set: {isAddedByScript: true} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};