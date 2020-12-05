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

module.exports = mongoose.model("Comment", CommentSchema);
