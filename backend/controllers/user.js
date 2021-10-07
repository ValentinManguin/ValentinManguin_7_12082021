const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async(req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = User.build({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = async(req, res, next) => {
    if ( !req.body.email || !req.body.password ) {
        return res.status(400).json({message: "au moins un champ est vide"})
    }
    User.findOne({
        where: {
          email: req.body.email
        }
        })       
      .then(user => {
        if (!user) {  
          return res.status(404).json({ message: 'email non valide' }); 
        }
        bcrypt.compare(req.body.password, user.password)        
        .then(valid => {    
          if (!valid) {                                             
            return res.status(401).json({ message: "mot de passe non valide" });           
          } 
          res.status(200).json({
            message: "Connexion réussie",
            userId:     user.id,
            role:       user.isAdmin,
            userName :  user.userName,
            token: jwt.sign( { userId: user.id, role: user.isAdmin }, process.env.TKN_SECRET , { expiresIn: '24h' } )
          })
        })
        .catch(error => res.status(500).json({ error: error.message }));                             
        })
      .catch(error => res.status(500).json({ error: error.message }));                                 
    };



exports.getAllUsers = async(req, res, next) => {

    const users = await User.findAll();

    res.status(200).json({ users: users });
};