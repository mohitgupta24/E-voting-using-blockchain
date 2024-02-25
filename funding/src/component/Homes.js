import React, { useContext, useState, useEffect } from "react";
import { GlobalInfo } from "../Apps";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Navbar from "./Navbar";
import "../componentcss/Home.css";
export default function Homes(props) {
  const { val, acc } = useContext(GlobalInfo);
  const [status, setStatus] = useState("Voting Not Started Yet");

  useEffect(() => {
    const { web3, contract } = val;
    const getStatus = async () => {
      var p = await contract.votingStatus().then((p) => {
        setStatus(p);
      });
    };

    val.contract && getStatus();
    console.log("Candidates are as: " + status);
  }, []);

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Navbar acc={props.acc} man={props.manager} />
      <div className="Outer">
        <h1>{status}</h1>
        <div className="d-grid gap-2">
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </>
  );
}
