/*  */
/*  */
const timeago = require("timeago.js");

const timeModify = {};

timeModify.timeago = (timestamp) => {
  return timeago.format(timestamp);
};

module.exports = timeModify;
