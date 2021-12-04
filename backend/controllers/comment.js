const jwt = require('jsonwebtoken');
const fs = require('fs');
const comment = require('../models/comment');
const User = require('../models/user');




exports.createComment = (req, res, next) => {
    const userId = req.decodedToken.userId;
    const comment = comment.build({
    UserId: userId,
  
      content: req.body.content,
     
    });
    comment.save()
      .then(() => {
        res.status(201).json({ message: 'commentaire créée.' });
      })
      .catch((error) => {
        res.status(400).json({ error })
      });
  };



  exports.deleteComment = (req, res, _) => {
    comment.findOne({where :{ id: req.params.id }})
      .then((comment) => {
        console.log(comment.userId);
        console.log(req.currentUserId);
        if (comment.userId !== req.currentUserId) {
          res.status(401).json({ message: "action non autorisée" });  
          return ;
        }
  
        comment.destroy({where :{ id: req.params.id }})
          .then(() => res.status(200).json({ message: 'commentaire supprimée.' }))
          .catch(error => res.status(400).json({ error }));
      })
  };


  
  
  
  
  exports.getCommentsByPost = (req, res, _) => {
    comment.findAll({ include: { model: User, attributes: ['username'] } })
      .then((comments) => { res.status(200).json(comments); })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };
  