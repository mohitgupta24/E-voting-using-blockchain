import React, { useContext, useState, useEffect } from "react";
import { GlobalInfo } from "../Apps";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "../componentcss/info.css";
import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";

export default function (props) {
  const { val, acc } = useContext(GlobalInfo);
  const [Voter, setVoter] = useState([]);

  useEffect(() => {
    const checkVoted = async () => {
      const { web3, contract } = val;
      var p = contract.returnId(acc).then((q) => {
        setVoter(q);
        console.log(q);
      });
    };
    val.web3 && checkVoted();
  }, []);

  const votes = async () => {
    const { web3, contract } = val;

    try {
      await contract
        .vote(Voter.voterId, props.info.candidateId, {
          from: acc,
          gas: 480000,
        })
        .then(() => toast("Vote Cast Successfull!"));
    } catch (error) {
      alert(" here is problem" + error);
      var q = contract.returnId(acc).then((q) => {
        setVoter(q);
        console.log(q);
      });
    }
  };
  return (
    <>
      <div className="Req">
        <div
          className="card"
          style={{ width: "25rem", border: "2px solid black" }}
        >
          <img
            src={
              "https://images.cdn1.stockunlimited.net/preview1300/election-candidate_1534283.jpg"
            }
            className="card-img-top"
            alt="img Not Available"
            style={{ width: "17rem", margin: "auto" }}
          />
          <div className="card-body">
            <h5 className="card-title" id="cat">
              Name:- {props.info.name}
            </h5>
            <h5 className="card-title" id="des">
              Party:- {props.info.party}
            </h5>
            <h5 className="card-title" id="aprove">
              Address:- {props.info.candidateAddress}
            </h5>
          </div>
          <button
            className="Candbut"
            onClick={votes}
            hidden={
              props.status == "Voting Ended" || Voter.voteCandidateId != 0
            }
          >
            votes
          </button>
          <br></br>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}
