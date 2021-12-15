const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");


Post.belongsTo(User);
User.hasMany(Post, {foreignKey:{allowNull:false}});

Comment.belongsTo(User);
User.hasMany(Comment, {foreignKey:{allowNull:false}});

Comment.belongsTo(Post);
Post.hasMany(Comment, {foreignKey:{allowNull:false}});

