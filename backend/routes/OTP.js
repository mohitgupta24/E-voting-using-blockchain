const express = require("express");
const router = express.Router();
const { getInfo, insertToken, verifyOTP } = require("../db");
const crypto = require("crypto");
const Sendotp = require("./Sendotp");

require("dotenv").config();

// Route-1 Create User
router.post("/sendotp", async (req, res) => {
  try {
    // check whether Faculty with same  facultyid exist in Faculty list
    const { adhaarno } = req.body;
    const user = await getInfo(adhaarno);
    if (user[0].length === 0) {
      return res
        .status(502)
        .json({ success: false, message: "Adhaar not found" });
    }

    const token = crypto.randomInt(100000, 999999);
    let date = new Date(new Date().getTime() + 15 * 60000); //valid for 5 minuts only
    const tok_save = await insertToken(token, adhaarno, date);
    Sendotp(token, user[0][0].email);

    // if (r2[0].affectedRows === 1) {
    return res.json({
      success: true,
      message: "OTP send to your mail",
      tok_save,
      adhaarno,
    });
    // }
  } catch (error) {
    return res.status(505).json({
      success: false,
      message: error.message,
      from: "Catch Section | Create User",
    });
  }
});

// Router -1.2 For Email verification***********
router.post("/verifyotp", async (req, res) => {
  try {
    const { otp, adhaarno } = req.body;
    let date = new Date();
    const user = await verifyOTP(adhaarno, otp, date);

    console.log(user[0]);

    if (user[0].length === 0) {
      return res.status(404).send({
        success: false,
        message: "Your token expired",
      });
    }

    return res.send({
        success: true,
        message: "token verified",
      });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message,
      from: "Verify OTP | Catch Section",
    });
  }
});

module.exports = router;
