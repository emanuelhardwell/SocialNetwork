/*  */
/*  */
const path = require("path");
const fs = require("fs-extra");
const md5 = require("md5");
const { randomNumber } = require("../helpers/lib");
const { Image, Comment } = require("../models/indexModels");
const image = require("../models/image");
const sidebar = require("../helpers/sidebar");

const controller = {};

controller.index = async (req, res) => {
  let viewModel = { imageFind: {}, commentFind: {} };

  let idImage = req.params.image_id;
  const imageFind = await Image.findOne({ filename: { $regex: idImage } });
  if (imageFind) {
    imageFind.views = imageFind.views + 1;
    viewModel.imageFind = imageFind;
    await imageFind.save();
    const commentFind = await Comment.find({ image_id: imageFind._id });
    viewModel.commentFind = commentFind;
    viewModel = await sidebar(viewModel);
    res.render("image", viewModel);
  } else {
    res.redirect("/");
  }
};

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
          res.redirect("/image/" + newNameImage);
        } else {
          await fs.unlink(imageTempPath);
        }
      }
    };

    /* excecute the function recursive */
    saveImageFinal();
  }
};

/* IMAGE LIKES -------------------------------------------------------- */
controller.like = async (req, res) => {
  const idImage = req.params.image_id;
  const imageLikeFind = await Image.findOne({ filename: { $regex: idImage } });
  if (imageLikeFind) {
    imageLikeFind.likes = imageLikeFind.likes + 1;
    await imageLikeFind.save();
    res.json({ likes: imageLikeFind.likes });
  } else {
    res.status(500).json({ error: "Error internal" });
  }
};

controller.comment = async (req, res) => {
  let idImage = req.params.image_id;
  const searchImage = await Image.findOne({ filename: { $regex: idImage } });
  if (searchImage) {
    const newComment = new Comment(req.body);
    newComment.gravatar = md5(newComment.email);
    newComment.image_id = searchImage._id;
    await newComment.save();

    res.redirect("/image/" + searchImage.uniqueId);
  } else {
    res.redirect("/");
  }
};

/* IMAGE DELETE AND COMMENTS DELETE */
controller.remove = async (req, res) => {
  let idImage = req.params.image_id;
  const searchImage = await Image.findOne({ filename: { $regex: idImage } });
  if (searchImage) {
    await fs.unlink(
      path.resolve("./src/public/uploads/" + searchImage.filename)
    );
    await Comment.deleteOne({ image_id: searchImage._id });
    await searchImage.remove();
    res.json(true);
  }
};

module.exports = controller;
