import React from "react";
import { useState } from "react";
import "../login/Login.scss"
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default (props) => {
  const navigate = useNavigate();

  //Čia į useState patalpiname įrašytą info //

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [messages, setMessages] = useState({ message: "", status: "" });

  const handleInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  //Čia validationas, kur jei netinkamai užpildysi forma mes žinutę jog netinkamai užpildėte formą//
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      setMessages({
        message: "Form was filled out incorrectly",
        status: "danger",
      });
      return false;
    }

    //Čia backend perduodam įrašytus duomenis formoje ir tada tikrina ar toks useris yra užregistruotas, jei užregistruotas tada prijungia//
    axios
      .post("/api/users/login", loginForm)
      .then((resp) => {
        if (resp.data.status === "success") {
          setMessages({ message: "Login was successful", status: "success" });
          props.state(
            true,
            resp.data.message.role,
            resp.data.message.email,
            resp.data.message.UserId
          );
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 500);
        } else {
          setMessages({ message: resp.data.message, status: resp.data.status });
        }
      })
      .catch(() => {
        setMessages({ message: "Server side error", status: "danger" });
      });
  };

  const handleValidation = () => {
    for (let index of Object.keys(loginForm)) {
      if (loginForm[index] === "") {
        return false;
      }
    }

    return true;
  };
  return (
    <>
      <section class="vh-90">
        <div class="container loginMain">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col">
              <div class="card loginMainCard">
                <div class="row g-0 formBackground">
                  <div class=" col-lg-6 d-none d-md-block">
                    <img src="https://ipfs.pixura.io/ipfs/QmZMEp9HnW56LPWNXPKC293RtBXp4RD7N3A1eApg4rr5ju/PrideII.jpg"
                      alt="login form" class="img-fluid" />
                  </div>
                  <div class=" col-6">
                    <div class="card-body p-md-5 text-black">
                      {messages.message && (
                        <Alert variation={messages.status}>{messages.message}</Alert>
                      )}
                      <div className="loginLogo">
                        <img className="loginLogoImg" src="https://static.wixstatic.com/media/dfa345_1a5420375dfe442992cd34cba3db47e8~mv2.png/v1/fill/w_1150,h_425,al_c,lg_1,q_90,enc_auto/Home_logo_v03.png"></img>
                      </div>
                      <h5 className="signInHeading" >Sign into your account</h5>
                      <hr></hr>
                      <form onSubmit={handleSubmit} className="formMain">
                        <div class="form-outline mb-3">
                          <input
                            type="email"
                            name="email"
                            value={loginForm.email}
                            onChange={handleInputChange}
                            class="form-control form-control-lg" />
                          <label class="form-label">Email address</label>
                        </div>
                        <div class="form-outline mb-4">
                          <input
                            type="password"
                            name="password"
                            value={loginForm.password}
                            onChange={handleInputChange}
                            class="form-control form-control-lg" />
                          <label class="form-label">Password</label>
                        </div>
                        <div class="pt-1 mb-4">
                          <button className="loginFormBtn" type="submit">SIGN IN</button>
                        </div>
                        <p class="mb-5 pb-lg-2" >Don't have an account? <a className="registerLink" onClick={() => navigate('/registration')}
                        > Register here</a></p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
