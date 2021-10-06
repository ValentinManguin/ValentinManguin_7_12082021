const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const post = {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    }};
  