const serverConfig = require('../configs/server-config');
const mongodb = require('mongodb');
const getMongoDb = require('../services/mongodb/mongodb').getDb;
const getFirebaseDb = require('../services/firebase/firebase').getDb;

module.exports = class Product
{
    static getAllMongo()
    {
        const mbd = getMongoDb();
        return new Promise((resolve, reject) => 
        {
            mbd.collection('products')
            .find()
            .toArray()
            .then(products => {
                if(products)
                {
                    products = products.map((product) => ({
                            id: product['_id'],
                            title: product.title, 
                            price: product.price,
                            imageUrl: `${serverConfig.scheme}://${serverConfig.server}:${serverConfig.port}/${product.imageUrl}`
                        })
                    );
                }
                products = products || [];
                resolve({message: 'success', products: products});
            })
            .catch(err => {
                reject('Error al agregar producto en MongoDb');
            });
        });
    }

    static getByIdMongo(productId)
    {
        const mbd = getMongoDb();
        return new Promise((resolve, reject) => 
        {
            mbd.collection('products')
            .find({ _id: new mongodb.ObjectId(productId) })
            .next()
            .then(product => {
                if(product)
                {
                    product = {
                        id: product['_id'],
                        title: product.title, 
                        price: product.price,
                        imageUrl: `${serverConfig.scheme}://${serverConfig.server}:${serverConfig.port}/${product.imageUrl}`
                    }
                }
                resolve({message: 'success', product: {...product}});
            })
            .catch(err => {
                reject('Error al agregar producto en MongoDb');
            });
            
        });
    }

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

    updateMongo()
    {
        const mbd = getMongoDb();
        return new Promise((resolve, reject) => 
        {
            let updateProduct = {};
            if(this.title) updateProduct.title = this.title;
            if(this.price) updateProduct.price = this.price;
            if(this.imageUrl) updateProduct.imageUrl = this.imageUrl;
            mbd.collection('products')
            .updateOne({
                _id: new mongodb.ObjectId(this.id)
            },
            {
                $set: updateProduct
            })
            .then(result => {
                resolve({
                    message: 'Producto editado correctamente'
                });
            })
            .catch(err => {
                reject('Error al editar producto en MongoDb');
            });
        });
    }

}