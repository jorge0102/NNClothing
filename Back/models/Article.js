const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    name: String,
    description: String,
    preci: String,
    img: String,
    categori: String,
    stock: [{
        color: String,
        talla: String,
        unidades: String
    }]
});

module.exports = mongoose.model('Article', ArticleSchema);