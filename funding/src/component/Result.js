import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { GlobalInfo } from "../Apps";
import Candinfo from "./Candinfo";
import "../componentcss/Result.css";
export default function Result(props) {
  const { val, acc } = useContext(GlobalInfo);
  const [status, setStatus] = useState("Voting Not Started Yet");
  const [winner, setWinner] = useState("Result Not Declared Yet");
  const [win, findwin] = useState([]);

  useEffect(() => {
    var d;
    const { web3, contract } = val;
    const getStatus = async () => {
      var s = contract.winnerid().then((s) => {
        contract.returncId(s.toNumber()).then((x) => {
          findwin(x);
        });
        // console.log("s=", s.toNumber());
      });

      // var x = contract.returncId(d).then((x) => {
      //   console.log("x:-" + x);
      //   findwin(x);
      // });

      var p = await contract.votingStatus().then((p) => {
        setStatus(p);

        var q = contract.winner().then((q) => {
          setWinner(q);
          console.log("winner" + q);
        });
      });
    };

    val.contract && getStatus();
  }, [val]);
  return (
    <>
      <Navbar acc={props.acc} man={props.manager} />
      <div className="stat">
        <b>Winner</b>
        <div>
          <Candinfo info={win} status={status} />
        </div>
      </div>
    </>
  );
}
