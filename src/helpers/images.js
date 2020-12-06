/*  */
/*  */
const { Image } = require("../models/indexModels");

module.exports = {
  async popular() {
    const image = await Image.find().limit(6).sort({ likes: -1 });
    return image;
  },
};
