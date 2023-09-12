import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/header/Header";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import Homepage from "./components/Homepage/Homepage.js";
import Footer from "./components/footer/Footer";
import NftsCreate from './components/NftsCreate/NftsCreate'
import NftsEdit from './components/NftsEdit/NftsEdit'
import NftsMarket from "./components/nftsMarket/NftsMarket";

export default () => {
  const [isLoggedIn, setIsloggedIn] = useState(true); //Šioje eilutėje pakeite false galėsite peržiūrėti login ir register langus, nes būsite atsijunge//
  const [userRole, setUserRole] = useState(0);
  const [email, setEmail] = useState("");
  const [UserId, setUserId] = useState(0);

  // useEffect(() => {
  //   axios.get("/checkAuth", { withCredentials: true }).then((resp) => {
  //     console.log(resp);
  //     if (resp.data.id) {
  //       setIsloggedIn(true);
  //       setUserRole(resp.data.role);
  //       setEmail(resp.data.email);
  //       setUserId(resp.data.id);
  //     }
  //   });
  // }, []);


  const handleLoginState = (
    loggedIn,
    role = false,
    email = false,
    UserId = false
  ) => {
    setIsloggedIn(loggedIn);
    setUserRole(role);
    setEmail(email);
    setUserId(UserId);
  };

  return (
    <div className="App">
      <Router>
        <Header
          loggedIn={isLoggedIn}
          userRole={userRole}
          email={email}
          handleLoginState={handleLoginState}
        />
        <Routes>
          {!isLoggedIn && (
            <Route path="/registration" element={<Registration />} />
          )}
          {!isLoggedIn && (
            <Route path="/login" element={<Login state={handleLoginState} />} />
          )}
          <Route path="/" element={<Homepage
            loggedIn={isLoggedIn}
            userRole={userRole} />}
          />
          {isLoggedIn && (
            <Route
              path="/createCrowdFounding"
              element={<NftsCreate UserId={UserId} />}
            />
          )}
          {isLoggedIn && (
            <Route path="/mycrowdfunder/:id" element={<NftsEdit email={email} />} />
          )}
          {isLoggedIn && (
            <Route
              path="/mycrowdfunders"
              element={<NftsMarket UserId={UserId} />}
            />
          )}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

