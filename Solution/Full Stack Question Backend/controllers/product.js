const ProductModel = require('../models/product_schema')


var products = module.exports = {

    ProductSave(req, res) {
        if (req.body.product_name == undefined || req.body.product_name == "") {
            res.status(400).json({ "error": "Please provide Product Name" });
        } else if (req.body.product_sellingprice == undefined || req.body.product_sellingprice < 0) {
            res.status(400).json({ "error": "Please provide Product Selling Price" });
        } else if (req.body.product_costprice == undefined || req.body.product_costprice < 0) {
            res.status(400).json({ "error": "Please provide Product Cost Price" });
        } else {
            var discount = "False"

            if (req.body.product_sellingprice < req.body.product_costprice)
                discount = "True"

            req.body.isDiscounted = discount

            ProductModel.create(req.body, (err, response) => {

                if (err) {
                    console.log(err);
                    res.status(500).json({ "err": err });
                } else {

                    return res.status(201).json({ "product": response });

                }
            })

        }


    },

    getAll(req, res) {
        ProductModel.find((err, ProductModel1) => {
            if (err) {
                console.log(err);
                res.status(500).json({ "err": err });
            } else {

                res.status(200).json({ "products": ProductModel1 });
            }
        });
    },

    deleteAll(req, res) {
        ProductModel.deleteMany((err, ProductModel1) => {
            if (err) {
                console.log(err);
                res.status(500).json({ "err": err });
            } else {

                res.status(200).json({ "msg": "Product list is truncated" });

            }
        });
    }

}