const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const router = express.Router();

router.post("/login", async (req, res) => {
  function extractToken(authorizationHeader) {
    // Check if the authorizationHeader is present and starts with 'Bearer '
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return null; // Invalid or missing authorization header
    }
    // Remove 'Bearer ' and return the token
    return authorizationHeader.slice(7);
  }

  const { id: clientId, cred: credential } = req.body;
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: clientId,
  });

  const payload = ticket.getPayload();
  const token = extractToken(req.headers.authorization);

  if (token) {
    // returns decoded other wise error

    jwt.verify(token, process.env.KEY, async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ mssg: err });
      } else {
        const firstName = payload.given_name;
        const lastName = payload.family_name;
        const email = payload.email;
        const token = jwt.sign(payload, process.env.KEY);
        if (decodedToken.email !== payload.email) {
          try {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
              const newUser = new User({
                firstName,
                lastName,
                email,
              });
              await newUser.save();
            }
            res.status(200).json({ success: true, token, firstName, lastName });
          } catch (error) {
            console.error("Error during login:", error);
            res
              .status(401)
              .json({ success: false, error: "Invalid credentials" });
          }
        } else {
          res.status(200).json({
            mssg: "Successfully logged In",
            token,
            firstName,
            lastName,
          });
        }
      }
    });
  } else {
    try {
      const firstName = payload.given_name;
      const lastName = payload.family_name;
      const email = payload.email;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        const newUser = new User({
          firstName,
          lastName,
          email,
        });
        await newUser.save();
      }

      //generating token
      const token = jwt.sign(payload, process.env.KEY);

      res.status(200).json({ success: true, token, firstName, lastName });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  }
});
module.exports.router = router;