const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/product');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST, DELETE, PATCH, PUT');
    res.setHeader('Access-Control-Allow-Header', '*');
    next();
});

app.use('/product', productRoutes);

const PORT = process.env.PORT || 2500;

app.listen(PORT, ()=> { console.log(`Server start on ${PORT}`); });