/*  */
/*  */
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const CommentSchema = new Schema({
  image_id: { type: ObjectId },
  name: { type: String },
  email: { type: String },
  gravatar: { type: String },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});

CommentSchema.virtual("image")
  .set(function (image) {
    this._image = image;
  })
  .get(function () {
    return this._image;
  });

module.exports = mongoose.model("Comment", CommentSchema);
