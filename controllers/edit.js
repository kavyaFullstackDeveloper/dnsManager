const dnsRecord =  require("../models/dnsRecord.js");

const edit = async (req, res) => {
  const idToUpdate = req.body.data.id;
  const updatedType = req.body.data.type;
  const updatedValue = req.body.data.value;
  try {
    await dnsRecord.updateOne(
      { _id: idToUpdate },
      {
        $set: {
          value: updatedValue,
          type: updatedType,
        },
      }
    );
    res.status(201).json({ mssg: "Updated successfully" });
  } catch (err) {
    console.log(err);
    res.json({ mssg: err });
  }
};

module.exports.edit = edit;