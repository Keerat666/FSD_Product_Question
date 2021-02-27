//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
// var mongoDB = 'mongodb://localhost/soaps';
// mongoose.connect(mongoDB, { useNewUrlParser: true });
//Cloud Atlas : mongodb+srv://admin:PLgTOTRSbaapogZn@ascential.biggr.mongodb.net/Ascential_Dev?retryWrites=true&w=majority
var conn = mongoose.connect("mongodb://admin:Interview1234@cluster0-shard-00-00.w8z90.gcp.mongodb.net:27017,cluster0-shard-00-01.w8z90.gcp.mongodb.net:27017,cluster0-shard-00-02.w8z90.gcp.mongodb.net:27017/FSDQuestions?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false })
    .then((db) => {
        //console.log('Database connected');

        return db
    })
    .catch((error) => {
        console.log('Error connecting to database');
    });

module.exports = conn