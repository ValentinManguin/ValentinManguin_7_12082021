// Importation des packages
const multer = require('multer');

// Déclaration des formats autorisés
const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
};



const storage = multer.diskStorage({                // Déclaration de storage qui permet de sauvegarder les images
	destination: (req, file, callback) => {
		callback(null, 'images');
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(' ').join('_');
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + Date.now() + '.' + extension);
	},
});

module.exports = multer({storage: storage}).single('inputFile');