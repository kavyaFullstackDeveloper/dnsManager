const jwt = require("jsonwebtoken");

const isValid = (req, res, next) => {
  function extractToken(authorizationHeader) {
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return null;
    }
    return authorizationHeader.slice(7);
  }
  const token = extractToken(req.headers.authorization);
  jwt.verify(token, process.env.KEY, async (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ mssg: "Unauthorized" });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};

module.exports.isValid = isValid;