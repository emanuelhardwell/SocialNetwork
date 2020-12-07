/*  */
/*  */

const { Image, Comment } = require("../models/indexModels");

async function imageCount() {
  return await Image.countDocuments();
}

async function commentCount() {
  return await Comment.countDocuments();
}

async function viewCount() {
  const view = await Image.aggregate([
    {
      $group: {
        _id: "1",
        viewTotal: { $sum: "$views" },
      },
    },
  ]);
  return view[0].viewTotal;
}

async function likeCount() {
  const like = await Image.aggregate([
    {
      $group: {
        _id: "1",
        likeTotal: { $sum: "$likes" },
      },
    },
  ]);
  return like[0].likeTotal;
}

module.exports = async () => {
  const popularResult = await Promise.all([
    imageCount(),
    commentCount(),
    viewCount(),
    likeCount(),
  ]);
  return {
    imageFinally: popularResult[0],
    commentFinally: popularResult[1],
    viewFinally: popularResult[2],
    likeFinally: popularResult[3],
  };
};
