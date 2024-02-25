import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, createContext } from "react";
// import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import Web3 from "web3";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./component/Navbar";
import Homes from "./component/Homes";
import Candidateregister from "./component/Candidateregister";
import Vote from "./component/Vote";
import Voterregister from "./component/Voterregister";
import Votermanual from "./component/Votermanual";
import Result from "./component/Result";
import Conduct from "./component/Conduct";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const GlobalInfo = createContext();

function Apps() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [manager, setmanager] = useState(null);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
  };

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Vote", provider);

      // console.log(contract);
      if (provider) {
        setAccountListener(provider);
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        });
        console.log(contract);
      } else {
        console.error("Please install MetaMask!");
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const { contract, web3 } = web3Api;
    const setmanagers = async () => {
      const setting = await contract?.electionCommision().then((setting) => {
        setmanager(setting);
      });
    };
    web3Api.contract && setmanagers();
  }, [web3Api.web3]);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  return (
    <>
      <GlobalInfo.Provider
        value={{
          val: web3Api,
          acc: account,
          manager: manager,
        }}
      >
        <div className="outermost">
          {/* <Navbar
            acc={account ? account : "not connected"}
            bal={balance}
            man={manager ? manager : "no Manager"}
          /> */}

          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/homes"
                element={
                  <ProtectedRoute>
                    <Homes
                      acc={account ? account : "not connected"}
                      man={manager ? manager : "no Manager"}
                    />
                  </ProtectedRoute>
                }
              />

              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route
                path="/Votermanual"
                element={
                  <ProtectedRoute>
                    <Votermanual
                      acc={account ? account : "not connected"}
                      man={manager ? manager : "no Manager"}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Voterregister"
                element={
                  <ProtectedRoute>
                    <Voterregister
                      acc={account ? account : "not connected"}
                      man={manager ? manager : "no Manager"}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Candidateregister"
                element={
                  <ProtectedRoute>
                    <Candidateregister
                      acc={account ? account : "not connected"}
                      man={manager ? manager : "no Manager"}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Vote"
                element={
                  <ProtectedRoute>
                    <Vote
                      acc={account ? account : "not connected"}
                      man={manager ? manager : "no Manager"}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Result"
                element={
                  <ProtectedRoute>
                    <Result
                      acc={account ? account : "not connected"}
                      man={manager ? manager : "no Manager"}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Conduct"
                element={
                  <ProtectedRoute>
                    <Conduct
                      acc={account ? account : "not connected"}
                      man={manager ? manager : "no Manager"}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </UserAuthContextProvider>
        </div>
      </GlobalInfo.Provider>
    </>
  );
}

export default Apps;
