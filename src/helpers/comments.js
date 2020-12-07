/*  */
/*  */
const { Image, Comment } = require("../models/indexModels");

module.exports = {
  async newest() {
    const commentSearch = await Comment.find().limit(5).sort({ date: -1 });
    for (const comment of commentSearch) {
      const image = await Image.findOne({ _id: comment.image_id });
      comment.image = image;
    }
    return commentSearch;
  },
};
