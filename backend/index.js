const express = require("express");
const { connectToMysql } = require("./db");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

require("dotenv").config();
const port = process.env.PORT;

connectToMysql();

// we need to use this middleware to access req.body
app.use(express.json());

// available routes
app.use('/api/otp', require('./routes/OTP'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
