/*  */
/*  */
const express = require("express");
const router = express.Router();

const home = require("../controllers/home");
const image = require("../controllers/image");

router.get("/", home.index);

router.get("/image/:image_id", image.index);

router.post("/image", image.create);

router.post("/image/:image_id/like", image.like);

router.post("/image/:image_id/comment", image.comment);

router.delete("/image/:image_id", image.remove);

module.exports = router;
