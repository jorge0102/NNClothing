const { Router } = require("express");
const sha1 = require('sha1');
const express = require("express");
const jwt = require('jsonwebtoken')
const router = Router();

const upload = require('../utils');
const Article = require('../models/Article');

router.use(express.static("public")); // Imagenes

// Subir Fotos Admin
router.post("/article/admin", upload.single("avatar"), async (req, res) => {

    const article = new Article();
    const img = req.file.filename;
    const { description, categori, preci, name, stock } = req.body;
    const json = JSON.parse(stock) // Para pasar un objeto pro formData

    article.img = img;
    article.description = description;
    article.categori = categori;
    article.preci = preci;
    article.name = name;

    for (let i = 0; i < json.length; i++) {  // Vamos sacando uno a uno y metiendolos en la base de datos
        article.stock.push(json[i]);
    }

    article.save((err, articleStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar ' + err });
            console.log("Error");
        }
        res.status(200).send({ article: articleStored });
        console.log("Correcto");

    });
});

// mostrar todos los articulos 
router.get('/get/imagen', (_, res) => {
    Article.find({}, (error, results) => {
        error ? res.sendStatus(400) : res.json(results);
    });
});

//Coger un producto por su ID 
router.get('/show/:id',
    (req, res) => {
        Article.find({ _id: req.params.id },
            (err, results) => {
                err ? res.sendStatus(400) : res.json(results);
            });
    });

// Editar
router.put('/edit/:id',
    (req, res) => {
        Article.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false },
            (err, results) => {
                err ? res.sendStatus(400) : res.json(results);
            });
    });

// Borrar
router.delete('/delete/:id',
    (req, res) => {
        Article.findByIdAndRemove(req.params.id, req.body,
            (err, results) => {
                err ? res.sendStatus(400) : res.json(results);

            });
    });



module.exports = router;


