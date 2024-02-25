import React, { useContext, useState } from "react";
import { GlobalInfo } from "../Apps";
import "../componentcss/Voterregister.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Voterregister(props) {
let aadhaarno = "";
const host = "http://localhost:3003";
let navigate = useNavigate();
const { val, acc } = useContext(GlobalInfo);

const register = async (event) => {
const { web3, contract } = val;
event.preventDefault();
var a = document.getElementById("name").value;
var b = document.getElementById("age").value;
var c = document.getElementById("gender").value;
var d = document.getElementById("aadhar").value;
console.log("clicked");
await contract
.voterRegister(a, b, c, d, {
from: acc,
})
.then(() => toast("Voter Registered Successfully!"));
window.location.reload();

// console.log(await contract.voterList());
};

const GetOTP = async (event) => {
var d = document.getElementById("aadhar").value;
aadhaarno = d;
console.log(d);
const response = await fetch(`${host}/api/otp/sendotp`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
adhaarno: d,
}),
});
const json = await response.json();
if (json.success) {
alert("OTP Sent");
navigate(`/Voterregister`);
} else {
alert("Wrong OTP");
}
};

const Verify = async (event) => {
var d = document.getElementById("aadhar").value;
console.log(aadhaarno);
var k = document.getElementById("OTP").value;
const response = await fetch(`${host}/api/otp/verifyotp`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
otp: k,
adhaarno: d,
}),
});
const json = await response.json();
if (json.success) {
alert("Successful");
navigate(`/Voterregister`);
} else {
alert("Wrong OTP");
}
};
return (
<>
<Navbar acc={props.acc} man={props.manager} />
<div className="vo1">
<div className="vo2"></div>
<div className="vo3">
  <div className="vo31">
    <h4>Voter Registration</h4>
  </div>
  <div className="vo4">
    <label>Name</label>
    <input id="name"></input>
    <br></br>

    <label>Age</label>
    <input type="number" id="age"></input>
    <br></br>

    <label htmlFor="gender">Gender:</label>
    <select id="gender" name="gender" size={1}>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <br></br>

    <label>Aadhar</label>
    <input type="text" id="aadhar"></input>

    <br></br>

    <label>OTP</label>
    <input type="text" id="OTP"></input>
    <br></br>
  </div>
  <div className="but">
    <button onClick={register}>Submit</button>
    <button onClick={GetOTP}>Send OTP</button>
    <button onClick={Verify}>Verify</button>
  </div>
</div>
</div>
<ToastContainer></ToastContainer>
</>
);
}
