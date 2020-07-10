const connectDB = require("./connectDB");

const strCurrentCollection = "users";



module.exports.getContactObjectViaID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        let result = await dCollection.findOne({_id:o_id});
        return result.contact;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getFacultyObjectViaID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        let result = await dCollection.findOne({_id:o_id});
        return result.faculty;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getCampusObjectViaID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        let result = await dCollection.findOne({_id:o_id});
        return result.campus;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getMentorPairID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        // fake matching
        let result = await dCollection.aggregate([{ $match: {isMentor: true, _id: {$ne: o_id}} },
            { $sample: { size: 1 } }]).toArray();
        return result[0]._id;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.changeIsTutorToProcessViaID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let objNewValues = { $set: {isTutor: processing} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.changeIsMentorToProcessViaID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let objNewValues = { $set: {isMentor: "processing"} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.checkIfUserIsAMentorViaID = async function (strUserID){
    let bResult = false;

    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let objectRes = await dCollection.findOne({_id: o_id});

        if (objectRes.isMentor === true)
        {
            bResult = true;
        }
        else
        {
            bResult = false;
        }

        return bResult;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return bResult;
};

//need improvement in the future to happen
module.exports.checkIfUserIsATutorViaID = async function (strUserID){
    let bResult = false;

    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let objectRes = await dCollection.findOne({_id: o_id});

        if (objectRes.isTutor === true)
        {
            bResult = true;
        }
        else
        {
            bResult = false;
        }

        return bResult;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return bResult;
};

module.exports.checkIfUserIsAdminViaID = async function (strUserID){
    let bResult = false;

    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let objectRes = await dCollection.findOne({_id: o_id});

        if (objectRes.isAdmin === true)
        {
            bResult = true;
        }
        else
        {
            bResult = false;
        }

        return bResult;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return bResult;
};

module.exports.getDescriptionViaID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        let result = await dCollection.findOne({_id:o_id});
        return result.description;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};