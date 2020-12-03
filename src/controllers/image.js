/*  */
/*  */
const path = require("path");
const fs = require("fs-extra");
const { randomNumber } = require("../helpers/lib");

const controller = {};

controller.index = (req, res) => {};

controller.create = async (req, res) => {
  const { title, description } = req.body;
  let image = req.file;

  let errors = [];

  if (!image) {
    errors.push({ text: "Image required" });
  }
  if (!title) {
    errors.push({ text: "Title required" });
  }
  if (!description) {
    errors.push({ text: "Description required" });
  }
  if (errors.length > 0) {
    res.render("index", {
      errors,
      title,
      description,
    });
  } else {
    console.log(req.file);

    const newNameImage = randomNumber();
    const imageTempPath = req.file.path;
    const nameExtension = path.extname(req.file.originalname).toLowerCase();
    const savePath = path.resolve(
      `src/public/uploads/${newNameImage}${nameExtension}`
    );

    if (
      nameExtension === ".jpg" ||
      nameExtension === ".jpeg" ||
      nameExtension === ".png" ||
      nameExtension === ".gif"
    ) {
      await fs.rename(imageTempPath, savePath);
    }

    res.send("OKKKKKK");
  }
};

controller.like = (req, res) => {};

controller.comment = (req, res) => {};

controller.remove = (req, res) => {};

module.exports = controller;
