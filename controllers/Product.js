const { rdb } = require('../services/firebase/firebase');
const serverConfig = require('../configs/server-config');

exports.createProduct = (req, res, next) =>
{
    const title = req.body.title;
    const price = parseFloat(req.body.price);
    const image = req.file;
    if(!image || title == '' || (price || -1) <= 0)
    {
        return res.status(402).json({
            message: 'Error al agregar producto'
        });
    }
    const imageUrl = (image.path).replace(/public\\/, '').replace('\\', '/');
    const newProduct = {
        title,
        price,
        imageUrl
    }
    rdb.ref('products').push(newProduct)
    .then((ref) => {
        newProduct.imageUrl = `${serverConfig.scheme}://${serverConfig.server}:${serverConfig.port}/${newProduct.imageUrl}`;
        res.status(201).json({
            message: 'Producto agregado correctamente',
            product: { id: ref.key, ...newProduct}
        });
    });

    // const id = Math.floor(Math.random() * 100);
    /*const newProduct = {
        title: req.body.title,
        price: req.body.price
    }
    rdb.ref('products').push(newProduct)
    .then((ref) => {
        res.status(201).json({
            message: 'Producto agregado correctamente',
            product: { id: ref.key, ...newProduct}
        });
    });*/
    // db
    /*res.status(201).json({
        message: 'Producto agregado correctamente',
        product: {...newProduct}
    });*/
}

exports.readProducts = (req, res, next) => {
    rdb.ref('products').once('value', (snapshot) => {
        let products = snapshot.val();
        products = Object.keys(products).map(key => ({ id: key, ...products[key] }));
        res.status(200).json({
            products
        });
    });

    // db
    /*res.status(200).json({
        products : [
            { id: 0, title: 'Product0', price: 10},
            { id: 1, title: 'Product1', price: 5},
            { id: 2, title: 'Product2', price: 8}
        ]
    });*/
}

exports.readProduct = (req, res, next) => {
    const productId = req.params.productId;
    // db
    let products = [
        { id: 0, title: 'Product0', price: 10},
        { id: 1, title: 'Product1', price: 5},
        { id: 2, title: 'Product2', price: 8}
    ];
    const product = products.filter(p => p.id == productId)[0] || {};
    res.status(200).json({
        product: product
    });
}

exports.updateProduct = (req, res, next) => { 

}

exports.deleteProduct = (req, res, next) => { 
    
}