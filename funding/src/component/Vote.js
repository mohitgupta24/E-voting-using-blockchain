import React from "react";
import CandidateDisplay from "./CandidateDisplay";
import Navbar from "./Navbar";
import "../componentcss/Vote.css";
export default function Vote(props) {
  return (
    <>
      <Navbar acc={props.acc} man={props.manager} />
      <div className="Voteouter">
        <CandidateDisplay />
      </div>
    </>
  );
}
