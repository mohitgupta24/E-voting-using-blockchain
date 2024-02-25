import React, { useContext, useState } from "react";
import { GlobalInfo } from "../Apps";
import "../componentcss/Candidate.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
export default function Candidateregister(props) {
const { val, acc } = useContext(GlobalInfo);
const [all, setAll] = useState([]);
const creates = async () => {
const { web3, contract } = val;
var a = document.getElementById("Name").value;
var b = document.getElementById("Party").value;
var c = document.getElementById("Age").value;
var d = document.getElementById("Gender").value;
var e = document.getElementById("Aadhar").value;
var f = document.getElementById("Address").value;
console.log("clicked");
await contract
.candidateRegister(a, b, c, d, e, f, {
from: acc,
})
.then(() => toast("Registration Successfull!"));

console.log(await contract.candidateList());

var p = await contract.candidateList().then((p) => {
setAll(p);
});
console.log("Candidates are as: " + all);
};

return (
<>
<Navbar acc={props.acc} man={props.manager} />
<div className="co1">
<div className="co2"></div>
<div className="co3">
  <div className="co31">
    <h4>Candidate Registration</h4>
  </div>
  <div className="co4">
    <label>Name</label>
    <input id="Name"></input>
    <br></br>

    <label>Party</label>
    <input id="Party"></input>
    <br></br>

    <label>Age</label>
    <input type="number" id="Age"></input>
    <br></br>

    <label htmlFor="gender">Gender:</label>
    <select id="Gender" name="gender" size={1}>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <br></br>

    <label>Aadhar</label>
    <input id="Aadhar"></input>
    <br></br>

    <label>Wallet Address</label>
    <input id="Address"></input>

    <br></br>
  </div>
  <button onClick={creates}>
    Submit
  </button>
</div>
</div>
<ToastContainer></ToastContainer>
</>
);
}
