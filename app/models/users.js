const connectDB = require("./connectDB");

const strCurrentCollection = "users";


// add example
module.exports.addUserRaw = async function(strRaw){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let objToAdd = JSON.parse(strRaw);
        let result = await dCollection.insertOne(objToAdd);

        return result;
        //console.log(result);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

// query example
module.exports.queryOneUserRaw = async function(strRaw){
    let client, db;
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let query = JSON.parse(strRaw);
        let result = await dCollection.findOne(query);

        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * Any user who has any element of aryStrUnitOfStudy will be found and returned.
 * @param aryStrUnitOfStudy - array of unitOfStudyID(Type - ObjectID)
 * @returns {Promise<null|*>}
 */
module.exports.__queryUsersViaAryUnitOfStudyID = async function (aryStrUnitOfStudy){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        return await dCollection.find({isTutor: true, unitOfStudyTutor: { $elemMatch : {$in : aryStrUnitOfStudy}}},
            { projection: {"name": 1, "image": 1, "unitOfStudyTutor": 1 } }).toArray();
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.queryUsersViaConditions = async function (aryStrUnitOfStudy, strFaculty, strCampus, strTutorName, strGender){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        //let result = await dCollection.find({name: { $regex: strReg, $options: 'i'}}).toArray();
        let strRegFaculty = '.*' + strFaculty.split(' ').join('.*') + '.*';
        let strRegCampus = '.*' + strCampus.split(' ').join('.*') + '.*';
        let strRegTutorName = '.*' + strTutorName.split(' ').join('.*') + '.*';
        let strRegGender = '.*' + strGender.split(' ').join('.*') + '.*';

        return await dCollection.find({isTutor: true,
                faculty: { $regex: strRegFaculty, $options: 'i'}, campus: { $regex: strRegCampus, $options: 'i'},
                name: { $regex: strRegTutorName, $options: 'i'}, gender: { $regex: strRegGender, $options: 'i'},
                unitOfStudyTutor: { $elemMatch : {$in : aryStrUnitOfStudy}}},
            { projection: {"_id": 1, "name": 1, "image": 1, "unitOfStudyTutor": 1 } }).toArray();
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};


/**
 * As name states.
 * @param strUserID
 * @returns {Promise<null>}
 */
module.exports.queryCurrentUserInformation = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        return await dCollection.findOne({_id:o_id},
            { projection: {"name": 1, "image": 1, "description": 1, "faculty": 1, "contact": 1, "campus": 1, "gender": 1, "isTutor": 1, "isMentor": 1, "isAdmin": 1 } });
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @param strFaculty
 * @param strContact
 * @param strDescription
 * @param strCampus
 * @param strGender
 * @returns {Promise<{result: string}|null>}
 */
module.exports.editCurrentUserBasicInformation = async function (strUserID, strFaculty, strContact, strDescription, strCampus, strGender){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let objNewValues = { $set: {faculty: strFaculty, contact: strContact, description: strDescription, campus: strCampus, gender: strGender} };
        await dCollection.updateOne({_id:o_id}, objNewValues);

        return {"result": "success"};
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @returns {Promise<null>}
 */
module.exports.queryCurrentUserTutorInformation = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        return await dCollection.findOne({_id:o_id}, { projection: {"name": 1, "image": 1, "timePreference": 1,"descriptionTutor": 1, "campusTutor": 1, "unitOfStudyTutor":1 } });
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @param aryUnitOfStudyTutor - array of ObjectID
 * @param strCampusTutor
 * @param strDescriptionTutor
 * @param strTimePreference
 * @returns {Promise<{result: string}|null>}
 */
module.exports.editUserTutorInformation = async function (strUserID, aryUnitOfStudyTutor, strCampusTutor,
                                                          strDescriptionTutor, strTimePreference){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let objNewValues = { $set: {unitOfStudyTutor: aryUnitOfStudyTutor, campusTutor: strCampusTutor,
                descriptionTutor: strDescriptionTutor, timePreference: strTimePreference } };
        await dCollection.updateOne({_id:o_id}, objNewValues);

        return {"result": "success"};
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

// Notes: db.getCollection('users').find({'currentSelections.tutor':'Tutor Alice'})
// db.getCollection('users').find({'isTutor':{$ne:true}})

/**
 * Query the user's current "star" selections.
 * @param strUserID
 * @returns {Promise<null|number|*>}
 */
module.exports.queryCurrentUserAdvancedInformation = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.findOne({_id:o_id}, { projection: {"_id":0, "currentSelections": 1} });
        return result.currentSelections;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.queryCurrentUserTagInformation = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        return await dCollection.findOne({_id:o_id}, { projection: {"_id":0, "isTutor": 1, "isMentor": 1, "isAdmin": 1} });

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.makeUserTutor = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        var newvalues = { $set: {isTutor: true, unitOfStudyTutor: []} };
        let result = await dCollection.updateOne({_id:o_id}, newvalues);
        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.unmakeUserTutor = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        var newvalues = { $set: {isTutor: false} };
        let result = await dCollection.updateOne({_id:o_id}, newvalues);
        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.makeUserMentor = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        var newvalues = { $set: {isMentor: true} };
        let result = await dCollection.updateOne({_id:o_id}, newvalues);
        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.unmakeUserMentor = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        var newvalues = { $set: {isMentor: false} };
        let result = await dCollection.updateOne({_id:o_id}, newvalues);
        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.makeUserAdmin = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        var newvalues = { $set: {isAdmin: true} };
        let result = await dCollection.updateOne({_id:o_id}, newvalues);
        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.unmakeUserAdmin = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        var newvalues = { $set: {isAdmin: false} };
        let result = await dCollection.updateOne({_id:o_id}, newvalues);
        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getUserPasswordViaEmail = async function (strAccount){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let result = await dCollection.findOne({account:strAccount}, { projection: {"_id":1, "name": 1, "password":1 } });
        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getTutorPopupInfoViaID = async function (strID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strID);

        return await dCollection.findOne({_id:o_id}, { projection: {"_id": 1, "name": 1, "image": 1, "gender": 1, "campus": 1,
                "descriptionTutor": 1, "campusTutor": 1, "unitOfStudyTutor":1, "timePreference": 1 } });

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.addUserAccount = async function (strAccount, strPassword){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);
        let result = await dCollection.findOne({account:strAccount});

        if (result != null)
        {
            console.log("this account " + strAccount + " already exists. Can not add new user.")
            return false;
        }

        let addRes = await dCollection.insertOne({account:strAccount, password: strPassword});

        return strAccount;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strAccount
 * @param strName
 * @param strFaculty
 * @param strContact
 * @param strDescription
 * @param strCampus
 * @param strGender
 * @param strImage
 * @param aryCurrentSelections
 * @param strHisHerMentorID
 * @returns {Promise<null>}
 */
module.exports.setInitialUserBasicInfo = async function (strAccount, strName, strFaculty, strContact, strDescription,
                                                         strCampus, strGender, strImage, aryCurrentSelections,
                                                         strHisHerMentorID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let objNewValues = { $set: {name: strName, faculty: strFaculty, contact: strContact, description: strDescription,
                campus: strCampus, gender: strGender, image: strImage, currentSelections: aryCurrentSelections,
                hisHerMentorID: strHisHerMentorID, hisHerMentorHistory: []} };

        return await dCollection.updateOne({account:strAccount}, objNewValues);

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @param strMentorStatement
 * @returns {Promise<null>}
 */
module.exports.updateUserMentorStatement = async function (strUserID, strMentorStatement){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let objNewValues = { $set: {mentorStatement: strMentorStatement} };

        return await dCollection.updateOne({_id: o_id}, objNewValues);

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @param strMentorSearchStatement
 * @param aryMentorSearchSecondaryTitle
 * @param aryMentorSearchSecondaryContent
 * @returns {Promise<null>}
 */
module.exports.updateUserMentorSearchStatement = async function (strUserID, strMentorSearchStatement,
                                                                 aryMentorSearchSecondaryTitle,
                                                                 aryMentorSearchSecondaryContent){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let objNewValues = { $set: {mentorSearchStatement: strMentorSearchStatement,
                mentorSearchSecondaryTitle: aryMentorSearchSecondaryTitle,
                mentorSearchSecondaryContent: aryMentorSearchSecondaryContent} };

        return await dCollection.updateOne({_id: o_id}, objNewValues);

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getUserMentorSearchStatement = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let resObj = await dCollection.findOne({_id: o_id});
        return resObj.mentorSearchStatement;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getUserMentorSearchSecondaryContent = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let resObj = await dCollection.findOne({_id: o_id});
        return resObj.mentorSearchSecondaryContent;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};


/**
 * As name states. Currently it is a fake matching, returning any random script-added mentor.
 * @param strUserID
 * @returns {Promise<null|*>}
 */
module.exports.getMentorPairID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        // fake matching
        // let result = await dCollection.aggregate([{ $match: {isMentor: true, _id: {$ne: o_id}, isAddedByScript: true} },
        //     { $sample: { size: 1 } }]).toArray();

        let objStudent = await dCollection.findOne({_id: o_id});

        let strSearchingSecondaryContent = objStudent.mentorSearchSecondaryContent;

        let result = [];

        result = await dCollection.aggregate([{ $match: {isMentor: true,
                _id: {$ne: o_id},
                isAddedByScript: {$ne:true},
                faculty:strSearchingSecondaryContent[0], campus:strSearchingSecondaryContent[1]} },
            { $sample: { size: 1 } }]).toArray();

        if (result.length === 0)
        {
            result = await dCollection.aggregate([{ $match: {isMentor: true,
                    _id: {$ne: o_id},
                    isAddedByScript: {$ne:true}} },
                { $sample: { size: 1 } }]).toArray();
        }

        if (result.length === 0)
        {
            result = await dCollection.aggregate([{ $match: {isMentor: true, _id: {$ne: o_id}, isAddedByScript: true} },
                { $sample: { size: 1 } }]).toArray();
            //console.log("fake mentor");
        }

        if (result.length === 0)
        {
            result.push(strUserID);
        }

        return result[0]._id;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * AsNameStates.
 * @param strUserID
 * @param objectIDMentorID
 * @returns {Promise<void>}
 */
module.exports.pushNewestMentorPair = async function (strUserID, objectIDMentorID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        let o_idMentor = new ObjectId(objectIDMentorID);

        return await dCollection.updateOne({_id: o_id}, { $push: { hisHerMentorHistory: o_idMentor} });
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @returns {Promise<null|*>}
 */
module.exports.getARandomScriptAddedUserIDWhoIsNotTutorOrAdmin = async function (){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let result = await dCollection.aggregate([{ $match: {isTutor:{$ne:true}, isAdmin:{$ne:true}, isAddedByScript: true} },
            { $sample: { size: 1 } }]).toArray();

        return result[0]._id;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @returns {Promise<null|*>}
 */
module.exports.getARandomScriptAddedUserIDWhoDoNotHaveMentor = async function (){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let result = await dCollection.aggregate([{ $match: {hisHerMentorID: null, isAddedByScript: true} },
            { $sample: { size: 1 } }]).toArray();

        return result[0]._id;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getRandomUsersWhoIsTutor = async function (nNumber){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        return await dCollection.aggregate([{ $match: {isTutor: true} },
            { $sample: { size: nNumber } }]).toArray();
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @returns {Promise<null|*>}
 */
module.exports.getARandomScriptAddedUserIDWhoIsNotMentor = async function (){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let result = await dCollection.aggregate([{ $match: {isMentor:{$ne:true}, isAddedByScript: true} },
            { $sample: { size: 1 } }]).toArray();

        return result[0]._id;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getARandomScriptAddedUserIDWhoIsNotAdmin = async function (){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let result = await dCollection.aggregate([{ $match: {isAdmin:{$ne:true}, isAddedByScript: true} },
            { $sample: { size: 1 } }]).toArray();

        return result[0]._id;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @returns {Promise<null|*>}
 */
module.exports.getARandomScriptAddedUserIDWhoIsNotTutorAndHasCurrentSelections = async function (){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let result = await dCollection.aggregate([{ $match: {isTutor:{$ne:true}, isAddedByScript: true,
                currentSelections:{$ne:[]}} }, { $sample: { size: 1 } }]).toArray();

        return result[0]._id;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @returns {Promise<null|*>}
 */
module.exports.getARandomScriptAddedUserIDWhoIsTutor = async function (){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let result = await dCollection.aggregate([{ $match: {isTutor: true, isAddedByScript: true} }, { $sample: { size: 1 } }]).toArray();

        return result[0]._id;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getAllScriptAddedUserIDWhoIsTutor = async function (){
    try{
        // okk!aa
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let findRes = await dCollection.find({isTutor: true, isAddedByScript: true}).toArray();

        let aryObjID = [];

        for (let i = 0; i < findRes.length; i++)
        {
            aryObjID.push(findRes[i]._id);
        }

        return aryObjID;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @returns {Promise<null|*>}
 */
module.exports.getTutorUnitOfStudyList = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.findOne({_id:o_id}, { projection: {"_id": 0, "isTutor":1, "unitOfStudyTutor":1 } });

        if (result.isTutor !== true)
        {
            return null;
        }

        return result.unitOfStudyTutor;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @param objectIdUnitOfStudyID
 * @returns {Promise<string|number|string|*>}
 */
module.exports.queryUsersTutorIDOfAUnitOfStudy = async function (strUserID, objectIdUnitOfStudyID){
    let strTutorID = "None";

    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.findOne({_id:o_id});

        for (let i = 0; i < result.currentSelections.length; i++)
        {
            if (result.currentSelections[i].unitOfStudyID === objectIdUnitOfStudyID)
            {
                return result.currentSelections[i].tutorID;
            }
        }

        return strTutorID;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return strTutorID;
};

/**
 * As name states.
 * @param strUserID
 * @returns {Promise<string|*>}
 */
module.exports.getUserNameViaUserID = async function (strUserID){
    let strDefault = "None";

    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.findOne({_id:o_id}, { projection: {"_id": 0, "name": 1, "uniKey": 1,
                "account": 1} });

        strDefault = result.name;

        let strAppending = "";
        if (result.uniKey == null)
        {
            strAppending = "account: " + result.account;
        }
        else
        {
            strAppending = "uniKey: " + result.uniKey;
        }

        strDefault = strDefault + " (" + strAppending + ")";

        return strDefault;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return strDefault;
};

/**
 * As name states.
 * @param strUserID
 * @param objectSelection
 * @returns {Promise<null>}
 */
module.exports.addUserSelectionInformation = async function (strUserID, objectSelection){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.findOne({_id:o_id}, { projection: {"_id":0, "currentSelections": 1} });

        let aryTmp = result.currentSelections;
        aryTmp.push(objectSelection);

        let objNewValues = { $set: {currentSelections: aryTmp} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @returns {Promise<null|number|*|$match.currentSelections|{$ne}|{$ne}>}
 */
module.exports.getUserCurrentSelectionsViaUserID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.findOne({_id:o_id}, { projection: {"_id":0, "currentSelections": 1} });
        return result.currentSelections;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.tagUserAsScriptedViaAccount = async function (strAccount){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        var newvalues = { $set: {isAddedByScript: true} };
        let result = await dCollection.updateOne({account:strAccount}, newvalues);

        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getTutorObjectIDViaStrID = async function (strID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strID);
        let result = await dCollection.findOne({_id:o_id});
        return result._id;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.setUserMentorID = async function (strUserID, objectIDMentorID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);
        let o_idMentor = new ObjectId(objectIDMentorID);

        let objNewValues = { $set: {hisHerMentorID: o_idMentor} };

        return await dCollection.updateOne({_id: o_id}, objNewValues);

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getUserMentorID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let Res = await dCollection.findOne({_id: o_id});

        return Res.hisHerMentorID;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getUserNeedDemoStatus = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let Res = await dCollection.findOne({_id: o_id});

        return Res.needDemo;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.setUserNeedDemoStatus = async function (strUserID, bStatus){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let objNewValues = { $set: {needDemo: bStatus} };

        return await dCollection.updateOne({_id: o_id}, objNewValues);
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

module.exports.checkIfUserIsAnAdminViaID = async function (strUserID){
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

module.exports.checkIfUserIsAAdminViaID = async function (strUserID){
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

module.exports.__updateUserImageLink = async function (strImgLink){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let objNewValues = { $set: {image: strImgLink} };
        await dCollection.updateMany({}, objNewValues);

        return {"result": "success"};
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getTutorsViaFuzzyNameString = async function (strInput){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let strPreprocessed = strInput.split(' ').join('.*');

        let strReg = '.*' + strPreprocessed + '.*';

        return await dCollection.find({name: { $regex: strReg, $options: 'i'}, isTutor: true}).toArray();
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};