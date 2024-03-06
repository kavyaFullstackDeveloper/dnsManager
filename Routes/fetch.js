const dnsRecord =require("../models/dnsRecord")

const fetch = async (req, res) => {
  try {
    const email = req.decodedToken.email;
    const result = await dnsRecord.find({ "email": email });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: err })
  };
}
module.exports.fetch=  fetch;