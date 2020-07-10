var fs = require('fs');
var path = require("path");
//
// file reading for credentials
var g_strWikipediaCollectionCredential = fs.readFileSync(path.join(__dirname + '/../../public/', "passwords/DBCredentialDetails.txt"), 'utf8').toString().split("\n");
var g_db;

var url = 'mongodb://' +
    g_strWikipediaCollectionCredential[1].trim() + ':' +
    g_strWikipediaCollectionCredential[2].trim() +
    '@' +
    g_strWikipediaCollectionCredential[0].trim();

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
    if (err) throw err;
    console.log("Database connected!");
    var db = client.db('DSDB');
    g_db = db;
});

module.exports.getdb = function ()
{
    return g_db;
}

