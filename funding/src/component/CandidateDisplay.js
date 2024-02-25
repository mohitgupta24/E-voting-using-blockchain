import React, { useContext, useState } from "react";
import { useEffect, createContext } from "react";
import "../componentcss/Display.css";
import Candinfo from "./Candinfo";
import Navbar from "./Navbar";
import { GlobalInfo } from "../Apps";
export default function CandidateDisplay(props) {
  const { val, acc } = useContext(GlobalInfo);
  const [all, setAll] = useState([]);

  const { web3, contract } = val;
  useEffect(() => {
    const getArrs = async () => {
      var p = await contract.candidateList().then((p) => {
        setAll(p);
        console.log(p);
      });
    };

    val.contract && getArrs();
  }, []);
  return (
    <>
      <div className="containers " id="back">
        <center>
          <div className="row" id="drow">
            {all.map((element) => {
              return (
                <>
                  <div className="col-md-5" key={element.aadhar}>
                    {" "}
                    <Candinfo info={element} />{" "}
                  </div>
                </>
              );
            })}
          </div>
        </center>
      </div>
    </>
  );
}
