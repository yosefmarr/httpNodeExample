exports.getProducts = (req, res, next) => {
    // db
    res.status(200).json({
        products : [
            { id: 0, title: 'Product0', price: 10},
            { id: 1, title: 'Product1', price: 5},
            { id: 2, title: 'Product2', price: 8}
        ]
    });
}


exports.getProduct = (req, res, next) => {
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
