import { useState, useEffect, createContext } from "react";
import React from "react";
import Web3 from "web3";
import Navbar from "./component/Navbar";
// import Contact from "./component/Contact";
// import About from "./component/About";
// import Home from "./component/Homes";
// import Candidateregister from "./component/Candidateregister";
// import Vote from "./component/Vote";
// import Voterregister from "./component/Voterregister";
// import Votermanual from "./component/Votermanual";
// import Result from "./component/Result";

import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
// import Conduct from "./component/Conduct";
// import Sidebar from "./component/Sidebar";

export const GlobalInfo = createContext();

function App() {
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
        <>
          {/* <Router> */}
          <Navbar
            acc={account ? account : "not connected"}
            bal={balance}
            man={manager ? manager : "no Manager"}
          />

          {/* <Routes> */}
          {/* <Route path="/" element={<Home />} />
              <Route path="/Votermanual" element={<Votermanual />} />
              <Route path="/Voterregister" element={<Voterregister />} />
              <Route
                path="/Candidateregister"
                element={<Candidateregister />}
              />
              <Route path="/Vote" element={<Vote />} />
              <Route path="/Result" element={<Result />} />
              <Route path="/Conduct" element={<Conduct />} /> */}
          {/* </Routes> */}
          {/* </Router> */}
        </>
      </GlobalInfo.Provider>
    </>
  );
}

export default App;
