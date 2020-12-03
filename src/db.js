/*  */
/*  */
const mongoose = require("mongoose");
const { database } = require("./key");

mongoose
  .connect(database.URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((db) =>
    console.log("DB is connected successfully .......................")
  )
  .catch((error) => console.error(error));
