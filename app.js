const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const routes = require("./routes/index");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: new Date().getTime().toLocaleString(),
    saveUninitialized: true,
    resave: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(8001);
