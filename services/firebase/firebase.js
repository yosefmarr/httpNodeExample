const firebaseAdmin = require('firebase-admin');
var serviceAccount = require('../../credentials/firebase/credential.json');

let rdb;

const firebaseConnect = () => {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: 'https://enode-88b22-default-rtdb.firebaseio.com/'
    });
    rdb = firebaseAdmin.database();
}

const getDb = () => {
    if(rdb) return rdb;
    throw 'MongoDb is not found';
}

exports.firebaseConnect = firebaseConnect;
exports.getDb = getDb;