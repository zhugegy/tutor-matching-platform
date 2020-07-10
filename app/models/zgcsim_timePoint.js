const connectDB = require("./connectDB");

const strCurrentCollection = "timePoint";

/**
 * As name states.
 * @param strID
 * @returns {Promise<null|*>}
 */
module.exports.getTutorAvailableTimePoints = async function (strID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strID);
        return await dCollection.find({tutorID: o_id, status: "unbooked"},
            { projection: {"_id": 1, "startTime": 1, "duration": 1, "location": 1 } }).toArray();
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.__addTutorTimePointsTest = async function (){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let addNewUoS = await dCollection.insertOne({tutorID: "5d8a04e730fa00f8517db3b7", strTime: new Date()});

        return addNewUoS;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getTutorLatestTimePoints = async function (strID){
    let client, db;
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strID);
            //ok okk
        let result = await dCollection.find({tutorID: o_id}, { projection: {"_id": 0, "startTime": 1, "duration": 1, "campus": 1 } }).toArray();

        let nBig = null;
        for (let i = 0; i < result.length; i++)
        {
            if (nBig == null)
            {
                nBig = result[i].startTime;
            }

            if (nBig < result[i].startTime)
            {
                nBig = result[i].startTime;
            }
        }

        return nBig;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.addTutorTimePoint = async function (strTutorID, strLocation, objDate, nDuration){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strTutorID);

        let addNewUoS = await dCollection.insertOne({status: "unbooked", tutorID: o_id, startTime: objDate, location: strLocation, duration: nDuration});

        //console.log(addNewUoS.insertedId);

        return addNewUoS.insertedId;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.tagTimePointAsScriptedViaID = async function (strTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;

        let o_id = new ObjectId(strTimePointID);

        var newvalues = { $set: {isAddedByScript: true} };
        let result = await dCollection.updateOne({_id:o_id}, newvalues);

        return result;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.markTimePointStatusViaID = async function (strTimePointID, strNewStatus){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strTimePointID);

        let objNewValues = { $set: {status: strNewStatus} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getWholeTimePointObjectViaID = async function (strTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strTimePointID);

        return await dCollection.findOne({_id:o_id});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};