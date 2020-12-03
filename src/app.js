/*  */
/*  */
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");

const app = express();

//config
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./server/helper"),
  })
);
app.set("view engine", ".hbs");

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({ dest: "uploads/temp" }).single("image"));

//file static
app.use(express.static(path.join(__dirname, "public")));

//listen the server
app.listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});
