const express = require('express');
const isValid = require("./isValid.js");
const add = require("../controllers/add.js")
const router = express.Router();
router.post('/add', isValid, add);

module.exports.router = router;