const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    isAdmin: { type: Boolean, default: false },
    shopCart: [{}],
    cantidad: [{}]
});

module.exports = mongoose.model('User', UserSchema);