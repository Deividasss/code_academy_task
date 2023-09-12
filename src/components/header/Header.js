import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { FaRegUser } from 'react-icons/fa';
import { Dropdown } from "react-bootstrap"

export default (props) => {
  const navigate = useNavigate();

  const onLogout = () => {
    axios
      .get("/api/users/logout")
      .then(() => {
        props.handleLoginState(false);
        navigate("/");
      })
      .catch((e) => {
        console.log("Server is offline");
      });
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="headerLogo" src="https://static.wixstatic.com/media/dfa345_1a5420375dfe442992cd34cba3db47e8~mv2.png/v1/fill/w_1150,h_425,al_c,lg_1,q_90,enc_auto/Home_logo_v03.png" alt="logo" />
      </Link>
      {props.loggedIn === true && props.userRole === 0 && (
        <Link className="personalNftsBtn" to="/myCrowdfunders">
          Created NFTS
        </Link>
      )}
      {props.loggedIn === true && props.userRole === 0 && (
        <Link className="createNftBtn" to="/createCrowdFounding">
          Create NFT
        </Link>
      )}
      <div className="headerInfo">
        <div class="dropdown">
          <div className="dropdownInfo">
            <a class="dropBtn"><FaRegUser /></a>
            {props.email && <div className="helloUser">Sveiki, <br></br><strong className="userEmail">{props.email}</strong></div>}
          </div>
          <div class="dropdown-content">
            <hr></hr>
            {props.loggedIn === false && (
              <Link className="loginBtn" to="/login">
                Log-In
              </Link>
            )}
            {props.loggedIn === true && (
              <button
                onClick={onLogout}
                style={{ border: "none" }}
                className="logoutBtn"
                to="/"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};
