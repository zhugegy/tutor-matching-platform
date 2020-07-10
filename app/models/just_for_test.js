var connectDB = require("./connectDB");

// add example
module.exports.JFT_add_sample = async function(strRaw){
    try{
        let dCollection = connectDB.getdb().collection('users');
        let objToAdd = JSON.parse(strRaw);
        let result = await dCollection.insertOne(objToAdd);

        return result;
        //console.log(result);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

// query example
module.exports.JFT_query_sample = async function(strRaw){
    let client, db;
    try{
        let dCollection = connectDB.getdb().collection('users');
        let query = JSON.parse(strRaw);
        let result = await dCollection.findOne(query);

        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
}



