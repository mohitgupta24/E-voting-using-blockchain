var mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const connectToMysql = () => {
  connection.connect((err) => {
    let message = !err ? "connected" : "Connection failed";
    console.log(`${message} : ${err}`);
  });
};

setInterval(function () {
  const ans = connection.query("SELECT 1");
}, 28000000);

const getInfo = async (adhaarno) => {
  // connectToMysql();
  const user = await connection
    .promise()
    .query(`SELECT * from details WHERE adhaarno=?`, [adhaarno]);
  // connection.end();
  return user;
};

const insertToken = async (token, adhaarno, date) => {
  // connectToMysql();
  await connection
    .promise()
    .query(`delete from tokens where adhaarno=?`, [adhaarno]);
  const user = await connection
    .promise()
    .query(`INSERT into tokens(adhaarno, otp, date) values(?, ?, ?)`, [
      adhaarno,
      token,
      date,
    ]);
  // connection.end();
  return user;
};

const verifyOTP = async (adhaarno, otp, date) => {
  // connectToMysql();
  await connection.promise().query(`delete from tokens where date<?`, [date]);
  const user = await connection
    .promise()
    .query(`SELECT * from tokens WHERE adhaarno=? and date>?`, [
      adhaarno,
      date,
    ]);
  // await connection.promise().query(`delete from tokens where adhaarno=?`, [adhaarno]);
  // connection.end();
  return user;
};

module.exports = { getInfo, connectToMysql, insertToken, verifyOTP };
