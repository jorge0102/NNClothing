const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: String,
    idProduct: String
});

module.exports = mongoose.model('ShoppingCart', UserSchema);