var express = require('express');
var router = express.Router();
var products = require('../controllers/product')

router.get('/test', function(req, res, next) {
    res.send('Product is Up and Running.');
});

router.post('/saveProduct', function(req, res) {
    products.ProductSave(req, res);
});

router.get('/getAllProducts', function(req, res, next) {
    products.getAll(req, res);

});

router.delete('/deleteAllProducts', function(req, res, next) {
    products.deleteAll(req, res);

});

module.exports = router;