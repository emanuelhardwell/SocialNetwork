/*  */
/*  */
const mongoose = require("mongoose");
const { Schema } = mongoose;
const path = require("path");

const ImageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

/* esquema virtual nos servira para ocultar la extension de las imagenes
 y mostrar solo el nombre en la URL */
ImageSchema.virtual("uniqueId").get(function () {
  return this.filename.replace(path.extname(this.filename), "");
});

module.exports = mongoose.model("Image", ImageSchema);
