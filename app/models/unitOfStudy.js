const connectDB = require("./connectDB");

const strCurrentCollection = "unitOfStudy";

/**
 * As name states.
 * @returns {Promise<null|Array>}
 */
module.exports.queryAllAvailableUnitOfStudy = async function (){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let result = await dCollection.find({}, { projection: {"_id": 0, "name": 1} }).toArray();

        let aryStrResult = [];
        for (let i = 0; i < result.length; i++)
        {
            aryStrResult.push(result[i].name);
        }

        return aryStrResult;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * If this name of unit of study does not exist, add an new entry.
 * @param strUnitOfStudyName
 * @returns {Promise<Object._id|ObjectId|boolean|null>}
 */
module.exports.addUnitOfStudyViaName = async function (strUnitOfStudyName){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let findResult = await dCollection.findOne({name: strUnitOfStudyName});

        if (findResult != null)
        {
            return false;
        }

        let addResult = await dCollection.insertOne({name: strUnitOfStudyName, isApproved: false});

        return addResult.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getRandomUnitOfStudyNames = async function (nNum){
    if (nNum <= 0)
    {
        return null;
    }

    let aryStrRes = [];

    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let result = await dCollection.aggregate([{ $sample: { size: nNum } }]).toArray();

        for (let i = 0; i < result.length; i++)
        {
            aryStrRes.push(result[i].name);
        }

        return aryStrRes;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUnitOfStudyName
 * @returns {Promise<null|*>}
 */
module.exports.queryUnitOfStudyIDViaName = async function (strUnitOfStudyName){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let findResult = await dCollection.findOne({name: strUnitOfStudyName});

        if (findResult == null)
        {
            return null;
        }

        return findResult._id;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUnitOfStudyID
 * @returns {Promise<string|null|*>}
 */
module.exports.queryUnitOfStudyNameViaID = async function (strUnitOfStudyID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUnitOfStudyID);

        let result = await dCollection.findOne({_id:o_id});

        if (result === null)
        {
            return "unit of study name not find";
        }

        return result.name;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getRandomUnitOfStudyIDs = async function (nNum){
    if (nNum <= 0)
    {
        return null;
    }

    let aryStrRes = [];

    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let result = await dCollection.aggregate([{ $sample: { size: nNum } }]).toArray();

        for (let i = 0; i < result.length; i++)
        {
            aryStrRes.push(result[i]._id);
        }

        return aryStrRes;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * Like the 'like' matching in SQL.
 * @param strInput
 * @returns {Promise<null|Array>}
 */
module.exports.getUnitOfStudyIDsViaFuzzyString = async function (strInput){
    let aryStrRes = [];

    // if (strInput.length < 3)
    // {
    //     strInput = "200";
    // }

    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let strReg = '.*' + strInput + '.*';
        let result = await dCollection.find({name: { $regex: strReg, $options: 'i'}}).toArray();

        for (let i = 0; i < result.length; i++)
        {
            aryStrRes.push(result[i]._id);
        }

        return aryStrRes;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.tagUnitOfStudyAsScriptedViaID = async function (strUnitOfStudyID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;

        let o_id = new ObjectId(strUnitOfStudyID);

        var newvalues = { $set: {isAddedByScript: true} };
        let result = await dCollection.updateOne({_id:o_id}, newvalues);

        return result;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};
