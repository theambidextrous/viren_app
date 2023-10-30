const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes/index");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(8001);
