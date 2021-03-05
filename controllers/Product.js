const Product = require('../models/product');

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
    const product = new Product(title, price, imageUrl);
    product.saveMongo()
    .then((response) => res.status(201).json(response))
    .catch((err) => res.status(402).json({message: err}));
}

exports.readProducts = (req, res, next) => 
{

    Product.getAllMongo()
    .then((response) => res.status(201).json(response))
    .catch((err) => res.status(402).json({message: err}));

    /*
    rdb.ref('products').once('value', (snapshot) => {
        let products = snapshot.val();
        if(products)
        {
            products = Object.keys(products).map(key => {
                products[key].imageUrl = `${serverConfig.scheme}://${serverConfig.server}:${serverConfig.port}/${products[key].imageUrl}`;
                return ({ id: key, ...products[key] })
            });
        }
        products = products || [];
        res.status(200).json({
            products
        });
    });*/
}

exports.readProduct = (req, res, next) => 
{
    const productId = req.params.productId;
    Product.getByIdMongo(productId)
    .then((response) => res.status(201).json(response))
    .catch((err) => res.status(402).json({message: err}));
    /*
    const productId = req.params.productId;
    rdb.ref('products').child(productId).once('value', (snapshot) => {
        let product = snapshot.val();
        if(product != null)
        {
            product.imageUrl = `${serverConfig.scheme}://${serverConfig.server}:${serverConfig.port}/${product.imageUrl}`;
            product = { id: productId, ...product};
        }
        res.status(200).json({
            product: {...product}
        });
    });
    */
}

exports.updateProduct = (req, res, next) => 
{ 
    const image = req.file;
    const productId = req.params.productId;
    let imageUrlToResponse = '';
    if(req.body.price)
    {
        req.body.price = parseFloat(req.body.price);
    }
    if(image)
    {
        const imageUrl = (image.path).replace(/public\\/, '').replace('\\', '/');
        req.body.imageUrl = imageUrl ;
        imageUrlToResponse = `${serverConfig.scheme}://${serverConfig.server}:${serverConfig.port}/${imageUrl}`;
    }
    const product = new Product(req.body.title, req.body.price, req.body.imageUrl, productId)
    product.updateMongo()
    .then((response) => res.status(201).json(response))
    .catch((err) => res.status(402).json({message: err}));
    /*
    const image = req.file;
    const productId = req.params.productId;
    let imageUrlToResponse = '';
    if(req.body.price)
    {
        req.body.price = parseFloat(req.body.price);
    }
    if(image)
    {
        const imageUrl = (image.path).replace(/public\\/, '').replace('\\', '/');
        req.body.imageUrl = imageUrl ;
        imageUrlToResponse = `${serverConfig.scheme}://${serverConfig.server}:${serverConfig.port}/${imageUrl}`;
    }
    rdb.ref('products').child(productId).update({...req.body})
    .then(() => {
        if(req.body.imageUrl)
        {
            req.body.imageUrl = imageUrlToResponse;
        }
        res.status(201).json({
            id: productId,
            ...req.body
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            message: "Error al actualizar producto"
        });
    });
    */
}

exports.deleteProduct = (req, res, next) => 
{ 
    /*
    const productId = req.params.productId;
    rdb.ref('products').child(productId).remove()
    .then(() => res.status(200).json({message: "Producto eliminado correctamente"}))
    .catch(() => res.status(401).json({message: "Error al eliminar producto"}));
    */
}