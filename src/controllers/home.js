/*  */
/*  */
const { Image } = require("../models/indexModels");
const sidebar = require("../helpers/sidebar");
const controller = {};

controller.index = async (req, res) => {
  const imageFind = await Image.find().sort({ date: -1 });
  let viewModel = { imageFind: {} };
  viewModel.imageFind = imageFind;
  viewModel = await sidebar(viewModel);
  console.log(viewModel.sidebar); /*  */
  res.render("index", viewModel);
};

module.exports = controller;
