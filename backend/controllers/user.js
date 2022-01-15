const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });

exports.signup = async (req, res, next) => {
  console.log(req.body)
  const sha256hasher = crypto.createHmac('sha256', process.env.hash_secret);
  const emailhash = sha256hasher.update(req.body.email).digest('hex');
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = User.build({
        email: emailhash,
        password: hash,
        username: req.body.username
      });




      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => {
          console.log(error);
          res.status(400).json({ error: 'Utilisateur déjà existant' })
        });


    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error })
    });

};

exports.login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "au moins un champ est vide" })
  }
  const sha256hasher = crypto.createHmac('sha256', process.env.hash_secret);
  const emailhash = sha256hasher.update(req.body.email).digest('hex');
  User.findOne({
    where: {
      email: emailhash
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
            userId: user.id,
            isAdmin: user.isAdmin,
            test: 'test',
            userName: user.username,
            token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.jwt_secret, { expiresIn: '24h' })
          })
        })
        .catch(error => res.status(500).json({ error: error.message }));
    })
    .catch(error => res.status(500).json({ error: error.message }));
};


exports.getAllUsers = async (req, res, next) => {

  const users = await User.findAll();

  res.status(200).json({ users: users });
};

exports.getOneAccount = async (req, res, next) => {

  const user = await User.findOne({ where: { id: req.decodedToken.userId } });

  res.status(200).json({ user: user });
};

exports.deleteAccount = (req, res, next) => {

  User.destroy({ where: { id: req.decodedToken.userId } })
    .then(() => res.status(200).json({ message: 'Compte supprimé' }))
    .catch(error => res.status(400).json({ error }));
};