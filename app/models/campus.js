const connectDB = require("./connectDB");

const strCurrentCollection = "campus";

/**
 * As name states.
 * @returns {Promise<null|Array>}
 */
module.exports.getAllAvailableCampusNames = async function (){
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
 * If this campus does not exist, add an new entry.
 * @param strCampusName
 * @returns {Promise<Object._id|ObjectId|boolean|null>}
 */
module.exports.addCampusViaName = async function (strCampusName){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let findResult = await dCollection.findOne({name: strCampusName});

        if (findResult != null)
        {
            return false;
        }

        let addResult = await dCollection.insertOne({name: strCampusName, isApproved: false});

        return addResult.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

