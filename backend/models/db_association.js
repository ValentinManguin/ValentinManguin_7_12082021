const User = require("../models/user");
const Post = require("../models/post");


Post.belongsTo(User);
User.hasMany(Post);
