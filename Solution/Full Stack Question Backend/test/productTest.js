let mongoose = require("mongoose");
const ProductModel = require('../models/product_schema')

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let app = require('../app');

chai.use(chaiHttp);

describe('Product API Testing', () => {
    it('Input Check 1', (done) => {
        let product = {
            product_sellingprice: 1954,
            product_costprice: 2000
        }
        chai.request(app)
            .post('/products/saveProduct')
            .send(product)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done();
            });
    });


    it('Input Check 2', (done) => {
        let product = {
            product_name: "The Lord of the Rings",
            product_costprice: 2000
        }
        chai.request(app)
            .post('/products/saveProduct')
            .send(product)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done();
            });
    });

    it('Input Check 3', (done) => {
        let product = {
            product_name: "The Lord of the Rings",
            product_sellingprice: 2000
        }
        chai.request(app)
            .post('/products/saveProduct')
            .send(product)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done();
            });
    });

    it('Discount Check 1', (done) => {
        let product = {
            product_name: "The Lord of the Rings",
            product_costprice: 1800,
            product_sellingprice: 2000
        }
        chai.request(app)
            .post('/products/saveProduct')
            .send(product)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('product');
                res.body.product.isDiscounted.should.eql('False');
                done();
            });
    });

    it('Discount Check 2', (done) => {
        let product = {
            product_name: "The Lord of the Rings",
            product_costprice: 2000,
            product_sellingprice: 1800
        }
        chai.request(app)
            .post('/products/saveProduct')
            .send(product)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('product');
                res.body.product.isDiscounted.should.eql('True');
                done();
            });
    });

    it('All Products Check 1', (done) => {

        chai.request(app)
            .get('/products/getAllProducts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('products');
                res.body.products.should.be.a('array');
                done();
            });
    });

    it('Delete Products Check 1', (done) => {

        chai.request(app)
            .delete('/products/deleteAllProducts')
            .end((err, res) => {
                chai.request(app)
                    .get('/products/getAllProducts')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('products');
                        res.body.products.should.be.a('array');
                        res.body.products.length.should.be.eql(0);
                        done();
                    });

            })




    });

});