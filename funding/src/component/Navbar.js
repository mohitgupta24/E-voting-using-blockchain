import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../componentcss/Navbar.css";
export default function Navbar(props) {
  return (
    <>
      {console.log("manager:-", props.man)}
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              E-vote
            </a>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button> */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/homes"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Votermanual">
                    Manual
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Voterregister">
                    Register
                  </Link>
                </li>

                <li className="nav-item">
                  {props.acc == "0x14DCFa67973EE2ACdeb26e35dB5643A57E80Db9C" ? (
                    <Link className="nav-link" to="/Conduct">
                      Conduct
                    </Link>
                  ) : (
                    <>
                      {console.log(
                        "account:-" + props.acc + " manager:-" + props.man
                      )}
                    </>
                  )}
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Candidateregister">
                    Candidate Register
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Vote">
                    Vote
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Result">
                    Result
                  </Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link disabled">Account:{props.acc} </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
