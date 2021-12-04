const User = require("../models/user");
const Post = require("../models/post");
const comment = require("../models/comment");


Post.belongsTo(User);
comment.belongsTo(User);
User.hasMany(Post, {foreignKey:{allowNull:false}});

