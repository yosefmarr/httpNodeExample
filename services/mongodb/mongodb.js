const mongodb = require('mongodb');
const stringConnection = require('../../credentials/mongodb/credential.json');
const MongoClient = mongodb.MongoClient;

let mdb;

const mongoConnect = (cb) => {
    MongoClient.connect(stringConnection.connection_string, { useUnifiedTopology: true })
    .then(client => {
        console.log('Mongo Connected');
        mdb = client.db();
        cb();
    })
    .catch(err => {
        throw err;
    });
}

const getDb = () => {
    if(mdb) return mdb;
    throw 'MongoDb is not found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;