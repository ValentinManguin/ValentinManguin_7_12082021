const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post("/:id", auth, commentCtrl.createComment);
router.delete("/:id",auth, commentCtrl.deleteComment);
router.get("/:id", auth, commentCtrl.getCommentsByPost);






module.exports = router;