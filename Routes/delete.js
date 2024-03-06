const express =require("express");
const isValid =require("./isValid.js")
const del = require("../controllers/delete.js");
const router = express.Router();

router.delete("/delete/:id", isValid, del);

module.exports.router = router;