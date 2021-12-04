const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('../models/post');
const User = require('../models/user');

// créer un post

exports.createPost = (req, res, next) => {
  const userId = req.decodedToken.userId;
  const post = Post.build({
  UserId: userId,

    content: req.body.content,
   // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  post.save()
    .then(() => {
      res.status(201).json({ message: 'post créée.' });
    })
    .catch((error) => {
      res.status(400).json({ error })
    });
};


// modifier un post

exports.modifyPost = (req, res, _) => {
  Post.updateOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'post modifiée.' }))
    .catch(error => res.status(400).json({ error }));

};






// supprimer un post

exports.deletePost = (req, res, _) => {
  Post.findOne({where :{ id: req.params.id }})
    .then((post) => {
      console.log(post.userId);
      console.log(req.currentUserId);
      if (post.userId !== req.currentUserId) {
        res.status(401).json({ message: "action non autorisée" });  // si les id ne sont pas les même renvoie erreur 401
        return ;
      }

      Post.destroy({where :{ id: req.params.id }})
        .then(() => res.status(200).json({ message: 'post supprimée.' }))
        .catch(error => res.status(400).json({ error }));
    })
};






// accéder à un post

exports.getOnePost = (req, res, _) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => { res.status(200).json(post); })
    .catch((error) => {
      res.status(404).json({ error });
    });
};





// accéder à tous les posts

exports.getAllPost = (req, res, _) => {
  Post.findAll({ include: { model: User, attributes: ['username'] } })
    .then((posts) => { res.status(200).json(posts); })
    .catch((error) => {
      res.status(400).json({ error });
    });
};




  