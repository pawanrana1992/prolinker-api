//Set up mongoose connection
console.log('in db config');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/prolinker';
mongoose.connect(mongoDB, {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
module.exports = mongoose;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));