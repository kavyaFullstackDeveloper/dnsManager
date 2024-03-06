const dnsRecord = require("../models/dnsRecord.js");
const del = async (req, res) => {
  const idToDelete = req.params.id;
  try {
    await dnsRecord.deleteOne({ _id: idToDelete });
    res.status(200).json({ mssg: "successfully deleted" });
  } catch (err) {
    console.log(err);
    res.json({ mssg: err });
  }
};

module.exports.del = del;