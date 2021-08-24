const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async(req, res, next) => {
    bcrypt.hash("azert123", 10)
        .then(hash => {
            const user = User.build({
                email: "test@test.com",
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = async(req, res, next) => {

};



exports.getAllUsers = async(req, res, next) => {

    const users = await User.findAll();

    res.status(200).json({ users: users });
};