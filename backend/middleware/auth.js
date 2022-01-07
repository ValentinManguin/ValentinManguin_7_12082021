const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {    // Exportation d'un middleware 
    try {
        console.log(req.headers)
        const token = req.headers.authorization; // Récupération du token et on retourne le 2ème élément //
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.jwt_secret); // décodage du token, la clé doit correspondre à celle de la fontion login //
        console.log(decodedToken)
        const userId = decodedToken.userId; // On récupére l'userId //
        console.log(userId);
        req.decodedToken = decodedToken;
        if (req.body.userId && req.body.userId !== userId) { // Si l'userId du corps de la requête est différent de userId //
            throw 'User ID non valable'; // Throw pour renvoyer l'erreur //
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({ error });
    }
};