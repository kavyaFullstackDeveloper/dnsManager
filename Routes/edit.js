const express = require("express");
const isValid = require("./isValid.js");
const edit = require("../controllers/edit.js");
const route = express.Router();

route.patch("/edit", isValid, edit);

module.exports.route = route;