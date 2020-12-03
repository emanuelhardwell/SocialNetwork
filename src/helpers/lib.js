/*  */
/*  */

const helpers = {};

helpers.randomNumber = () => {
  const abc = "abcdefghijklmnopqrstuvwxyz123456789";
  let randomFinal = 0;
  for (let i = 0; i < 6; i++) {
    randomFinal += abc.charAt(Math.floor(Math.random() * abc.length));
  }
  return randomFinal;
};

module.exports = helpers;
