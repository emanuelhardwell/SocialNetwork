/*  */
/*  */
const { Image, Comment } = require("../models/indexModels");

module.exports = {
  async newest() {
    const commentSearch = await Comment.find().limit(5).sort({ date: -1 });
    for (const comment of commentSearch) {
      const imageSearch = await Image.find({ _id: comment.image_id });
      comment.imageSearch = imageSearch;
    }
    return commentSearch;
  },
};
