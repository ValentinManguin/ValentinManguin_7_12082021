const express = require('express');
const path = require('path');
const dotenv = require("dotenv").config();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const db = require("./middleware/db-config");
const dbassoc = require("./models/db_association");


db.authenticate()
    .then(() => {
        console.log('Connection à la BDD réussie !');
        db.sync({ alter: true });
    })
    .catch((error) => {
        console.error('Impossible de se connecter à la BDD', error);
    });



const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


module.exports = app;