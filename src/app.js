const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const { router } = require("./router");

const app = express();
app.use(cors()); // Make sure this line comes right after express()
app.use(bodyParser.json());
app.use(router);

module.exports = app;
