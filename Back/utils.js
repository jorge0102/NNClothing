const multer = require('multer');

// Manadar imagenes se utiliza en el formulario solo se utiliza el storage
const storage = multer.diskStorage({
    destination: "public/avatars",
    filename: (_req, file, cb) => {
        const extension = file.originalname.slice(
            file.originalname.lastIndexOf(".")
        );
        cb(null, new Date().valueOf() + extension);
    }
});

const upload = multer({ storage });

module.exports = upload;