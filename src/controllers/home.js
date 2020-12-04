/*  */
/*  */
const { Image } = require("../models/indexModels");
const controller = {};

controller.index = async (req, res) => {
  const imageFind = await Image.find().sort({ date: -1 }).lean();
  res.render("index", {
    imageFind,
  });
};

module.exports = controller;
