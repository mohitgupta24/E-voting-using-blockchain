import React, { useContext, useState } from "react";
import { GlobalInfo } from "../Apps";
import "../componentcss/Conductd.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
export default function Conduct(props) {
  const { val, acc } = useContext(GlobalInfo);
  const [on, seton] = useState(false);
  const [ons, setons] = useState(false);

  //start voting Function
  async function VotingStart(event) {
    const { web3, contract } = val;
    event.preventDefault();
    const vstart = document.querySelector("#start").value;
    const vend = document.querySelector("#end").value;

    const p =
      Date.parse(vstart) > Date.parse(new Date())
        ? (Date.parse(vstart) - Date.parse(new Date())) / 1000
        : 120;
    const q = (Date.parse(vend) - Date.parse(new Date())) / 1000;
    console.log("start-", p);
    console.log("end-", q);

    try {
      await contract
        .voteTime(p, q, {
          from: acc,
        })
        .then(() => toast("Election Conduction Successful!"));
      seton(!on);
    } catch (error) {
      alert(error);
    }
  }

  //Emergency Call
  async function Emergencycall(event) {
    const { web3, contract } = val;
    event.preventDefault();

    try {
    } catch (error) {
      alert(error);
    }
  }

  //result declaration

  async function ResultCall(event) {
    const { web3, contract } = val;
    event.preventDefault();

    try {
      await contract.result({ from: acc }).then(() => {});
      var k = contract.winner().then((k) => {
        console.log("winner " + k);
      });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Navbar acc={props.acc} man={props.manager} />
      {
        props.acc == "0x14DCFa67973EE2ACdeb26e35dB5643A57E80Db9C" ? (
          <div className="conOuter">
            <div className="conImage"></div>
            <div className="conForm">
              <h3>Election Conduct</h3>

              <form className="form" onSubmit={VotingStart}>
                <label className="label2" htmlFor="start">
                  <b>Start Time:</b>
                </label>

                <input
                  type="date"
                  className="innerBoxVote"
                  // type="text"
                  id="start"
                  placeholder="in seconds"
                ></input>
                <br></br>
                <label className="label2" htmlFor="end">
                  <b>End Time:</b>
                </label>

                <input
                  className="innerBoxVote"
                  type="date"
                  // type="text"
                  id="end"
                  placeholder="in seconds"
                ></input>
                <br></br>
                <br></br>
                <div className="formbut">
                  <button className="regBtn" type="submit" disabled={on}>
                    Voting Start
                  </button>
                  <button
                    className="emerBtn"
                    onClick={Emergencycall}
                    hidden={ons}
                  >
                    Emergency
                  </button>
                  <button className="resultBtn" onClick={ResultCall}>
                    Result
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div>
              <center>
                <h1>You don't have access!</h1>
              </center>
            </div>
          </>
        )
        // <div className="space">
        //   {/* <button className="emerBtn" onClick={Emergencycall}>
        //     Emergency
        //   </button> */}
        //   {/* <button className="resultBtn" onClick={ResultCall}>
        //     Result
        //   </button> */}
        // </div>
      }
      <ToastContainer></ToastContainer>
    </>
  );
}
