const jwt = require('jsonwebtoken');
const fs = require('fs');
const Comment = require('../models/comment');
const User = require('../models/user');




exports.createComment = (req, res, next) => {
    const userId = req.decodedToken.userId;
    const comment = Comment.build({
    UserId: userId,
  
      content: req.body.content,
     PostId: req.params.id
    });
    comment.save()
      .then(() => {
        res.status(201).json({ message: 'commentaire créée.' });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message})
      });
  };



  exports.deleteComment = (req, res, _) => {
    Comment.findOne({where :{ id: req.params.id }})
      .then((comment) => {
        console.log(comment.userId);
        console.log(req.currentUserId);
        if (comment.userId !== req.currentUserId) {
          res.status(401).json({ message: "action non autorisée" });  
          return ;
        }
  
        Comment.destroy({where :{ id: req.params.id }})
          .then(() => res.status(200).json({ message: 'commentaire supprimée.' }))
          .catch(error => res.status(400).json({ error }));
      })
  };


  
  
  
  
  exports.getCommentsByPost = (req, res, _) => {
    Comment.findAll({where: {PostId: req.params.id}, include: { model: User, attributes: ['username'] } })
      .then((comments) => { res.status(200).json(comments); })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };
  



 