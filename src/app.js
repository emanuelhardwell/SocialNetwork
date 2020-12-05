/*  */
/*  */
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");

/* modules extra */
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//
require("dotenv").config();
require("./db");

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
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: require("./server/helper"),
  })
);
app.set("view engine", ".hbs");

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  multer({ dest: path.join(__dirname, "./public/uploads/temp") }).single(
    "image"
  )
);

//routes
app.use(require("./routes/route.routes"));

//file static
app.use("/public", express.static(path.join(__dirname, "public")));

//listen the server
app.listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});
