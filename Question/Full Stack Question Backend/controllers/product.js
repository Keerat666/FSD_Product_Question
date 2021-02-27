const ProductModel = require('../models/product_schema')


var products = module.exports = {

    ProductSave(req, res) {
        res.status(200).json({ "status": "ok" });
    },

    getAll(req, res) {
        res.status(200).json({ "status": "ok" });
    },

    deleteAll(req, res) {
        res.status(200).json({ "status": "ok" });
    }

}