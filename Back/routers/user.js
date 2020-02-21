const { Router } = require("express");
const nodemailer = require("nodemailer");
const sha1 = require('sha1');
const express = require("express");
const jwt = require('jsonwebtoken')
const router = Router();

const Users = require('../models/User');
const Article = require('../models/Article');
const myKey = "myprivatekey";

router.use(express.static("public")); // Imagenes

// Mandamos datos para comprobar si puedes logearte o no
router.post("/auth", (req, res) => {

    const { username, password } = req.body;
    const pass = sha1(password);

    Users.findOne({ username: username, password: pass },

        (_error, results) => {

            try {
                if (results.isAdmin === false) {

                    const { _id, username } = results;
                    const token = jwt.sign({ _id, username, isAdmin: false }, myKey);

                    res.send({ token });

                } else {

                    const { _id, username } = results;
                    const token = jwt.sign({ _id, username, isAdmin: true }, myKey);

                    res.send({ token });
                }
            } catch (error) {
                res.sendStatus(400)
            }
        }
    );
});

// Insertamos id de carrito de la compra
router.post('/cart/:id', (req, res) => {
    Users.findById(req.params.id, req.body,
        (err, results) => {
            if (err) return console.error(err);

            results.shopCart.push(req.body.shopCart);

            results.save((err) => {
                res.send("ok")
            });
        });
});

// Mandamos Usuarios a la base de datos para registrarse y enviamos email.
router.post("/create/user", async (req, res) => {

    const { username, password, email, text } = req.body;
    const user = new Users();

    user.username = username;
    user.password = sha1(password);
    user.email = email;

    user.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar ' + err });
            console.log("Error")
        }
        res.status(200).send({ user: userStored });
        console.log("Correcto")
    });

    contenHTML = `
        
        <h1>Informacion</h1>
        <ul>
            <li>Nombre: ${username}</li>
            <li>Email: ${email}</li>
            <li>password: ${password}</li>
        </ul>
        <p>Texto: ${text}</p>

    `
    const transporter = nodemailer.createTransport({
        host: 'smtp.nnclothing.store',
        port: 25,
        secure: false,
        auth: {
            user: 'info@nnclothing.store',
            pass: '010203040506'
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const info = await transporter.sendMail({
        from: "'NnClothing' <info@nnclothing.store>",
        // to: user.email,
        subject: 'Comprobacion',
        html: contenHTML
    });
    console.log("enviado", info.messageId);
});

// ver todos los usuarios que hay
router.get('/get', (_, res) => {
    Users.find({}, (error, results) => {
        error ? res.sendStatus(400) : res.json(results)
        //  console.log(results)
    })
})

// Carrito de la compra
router.get('/user/:id',
    (req, res) => {
        Users.find({ _id: req.params.id },
            (err, results) => {
                Article.find({ _id: results[0].shopCart }, (error, results) => {
                    error ? res.sendStatus(400) : res.json(results);
                });
            });
    });

// Ver datos del Usuario
router.get('/userCan/:id',
    (req, res) => {
        Users.find({ _id: req.params.id },
            error ? res.sendStatus(400) : res.json(results)
        )
    }
);

router.post('/eliminar/carrito/:id', (req, res) => {
    Users.find({ _id: req.params.id },
        (err, results) => {
            if (err) return console.error(err);
            const producto = req.body.id;
            const arrayProductos = [];
            console.log(arrayProductos)

            for (let i = 0; i < results[0].shopCart.length; i++) {
                console.log(results[0].shopCart[i] + "-------" + i)

                if (producto !== results[0].shopCart[i]) {
                    arrayProductos.push(results[0].shopCart[i])
                }
            }

            results[0].shopCart = arrayProductos;

            results[0].save((err, results) => {
                res.send("ok")
            });
        });
});


module.exports = router;


