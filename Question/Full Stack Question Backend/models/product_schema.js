//Require Mongoose
var mongoose = require('mongoose');
require("dotenv").config();
//Define a schema
var Schema = mongoose.Schema;

var productSchema = new Schema({
    product_name: { type: String },
    product_id: { type: String },
    product_created_at: { type: Date, default: Date.now() },
    product_sellingprice: { type: Number },
    isDiscounted: { type: String, enum: ['True', 'False'], required: true },
    product_costprice: { type: Number },
    product_picture: { type: String, default: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" }





}, { collection: 'products' });

var ProductModel = mongoose.model('fullstack_question', productSchema);

module.exports = ProductModel;