const express =require("express");
const route = express.Router();
const isValid =require("./isValid");

route.get("/auth", isValid, (req, res) => {
  res.status(200).json({
    firstName: req.decodedToken.given_name,
    lastName: req.decodedToken.family_name,
  });
});

module.exports.route = route;