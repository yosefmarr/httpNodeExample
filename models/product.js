const serverConfig = require('../configs/server-config');
const getMongoDb = require('../services/mongodb/mongodb').getDb;
const getFirebaseDb = require('../services/firebase/firebase').getDb;

module.exports = class Product
{
    constructor(title, price, image, id)
    {
        this.title = title;
        this.price = price;
        this.imageUrl = image;
        this.id = id;
    }

    saveMongo()
    {
        const mbd = getMongoDb();
        return new Promise((resolve, reject) => 
        {
            mbd.collection('products')
            .insertOne({
                title: this.title,
                price: this.price,
                imageUrl: this.imageUrl
            })
            .then(result => {
                const imageUrl = `${serverConfig.scheme}://${serverConfig.server}:${serverConfig.port}/${this.imageUrl}`;
                resolve({
                    message: 'Producto agregado correctamente',
                    product: {
                        id: result.insertedId,
                        title: this.title,
                        price: this.price,
                        imageUrl: imageUrl
                    }
                })
            })
            .catch(err => {
                reject('Error al agregar producto en MongoDb');
            });
        });
    }

    saveFirebase()
    {
        const rdb = getFirebaseDb();
        return new Promise((resolve, reject) => 
        {
            rdb.ref('products').push({
                title: this.title,
                price: this.price,
                imageUrl: this.imageUrl
            })
            .then(result => {
                const imageUrl = `${serverConfig.scheme}://${serverConfig.server}:${serverConfig.port}/${this.imageUrl}`;
                resolve({
                    message: 'Producto agregado correctamente',
                    product: {
                        id: result.key,
                        title: this.title,
                        price: this.price,
                        imageUrl: imageUrl
                    }
                })
            })
            .catch(err => {
                reject('Error al agregar producto en MongoDb');
            });
        });
    }
}