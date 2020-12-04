/*  */
/*  */
const path = require("path");
const fs = require("fs-extra");
const { randomNumber } = require("../helpers/lib");
const { Image } = require("../models/indexModels");

const controller = {};

controller.index = (req, res) => {};

controller.create = (req, res) => {
  const { title, description } = req.body;
  let image = req.file;
  const nameExt = path.extname(req.file.originalname).toLowerCase();

  let errors = [];

  if (!image) {
    errors.push({ text: "Image required" });
  }
  if (
    nameExt !== ".jpg" &&
    nameExt !== ".jpeg" &&
    nameExt !== ".png" &&
    nameExt !== ".gif"
  ) {
    errors.push({ text: "Image extension no valid" });
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
    const saveImageFinal = async () => {
      console.log(req.file);

      const newNameImage = randomNumber();
      const searchImage = await Image.find({ filename: newNameImage });
      if (searchImage.length > 0) {
        saveImageFinal();
      } else {
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
          /* save the image */
          const newImage = new Image({
            filename: newNameImage + nameExtension,
            title: req.body.title,
            description: req.body.description,
          });

          const imageSaved = await newImage.save();
          res.send("OKKKKKK");
        } else {
          await fs.unlink(imageTempPath);
        }
      }
    };

    /* excecute the function recursive */
    saveImageFinal();
  }
};

controller.like = (req, res) => {};

controller.comment = (req, res) => {};

controller.remove = (req, res) => {};

module.exports = controller;
