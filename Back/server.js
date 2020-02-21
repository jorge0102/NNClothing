const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParse = require('body-parser');
const multer = require('multer');

const port = 5000;
const user = require('./routers/user')
const article = require('./routers/article')

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(cors());
app.use(express.static("public")); // Subir imagenes

app.use('/API/usuarios', user);
app.use('/API/imagenAd', article)


mongoose.connect('mongodb://localhost:27017/NnClothing', { useUnifiedTopology: true, useNewUrlParser: true },
    (err, _) => {

        if (err) throw err, console.log(err);
        console.log('Base de datos conectada')
    });


app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})