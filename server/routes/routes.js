const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");

const router = express.Router();
const registrantTemplateCopy = require("../models/registerModels");
const newIdTemplateCopy = require("../models/memberIdModels");

const registeredMember = mongoose.model("registeredMembers");
const yearOfRegistration = new Date().getFullYear().toString();

function idToFourSf(id) {
  let zeroes = new Array(4 + 1).join("0");
  return (zeroes + id).slice(-4);
}

router.post("/register", (req, res) => {
  newIdTemplateCopy.findOneAndUpdate(
    { id: "autoval" },
    { $inc: { seq: 1 } },
    { new: true },
    (err, counterData) => {
      let seqId;
      if (counterData == null) {
        const newID = new newIdTemplateCopy({ id: "autoval", seq: 1 });
        newID.save();
        seqId = 1;
      } else {
        seqId = counterData.seq;
      }

      const registeredPerson = new registrantTemplateCopy({
        fullName: req.body.fullName,
        program: req.body.program,
        level: req.body.level,
        membershipNumber: yearOfRegistration + idToFourSf(seqId),
        constituency: req.body.constituency,
        phone: req.body.phone,
        dateOfJoining: moment(req.body.dateOfJoining).utc().format("DD/MM/YYYY"),
        passportPhoto: req.body.passportPhoto,
      });

      registeredPerson
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
});

router.get("/registered", async (req, res) => {
  try {
    const registeredMembers = await registeredMember.find({});
    res.send(registeredMembers);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", (req, res) => res.send("Testing!"));

module.exports = router;
