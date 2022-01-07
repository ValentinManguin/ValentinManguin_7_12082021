const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");



User.hasMany(Post, {foreignKey:{allowNull:false}});
Post.belongsTo(User);


User.hasMany(Comment, {foreignKey:{allowNull:false}});
Comment.belongsTo(User);


Post.hasMany(Comment, {foreignKey:{allowNull:false}});
Comment.belongsTo(Post);
