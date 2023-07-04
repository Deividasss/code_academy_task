import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../NftsCreate/NftsCreate.scss";

export default (props) => {
  const UserId = props.UserId;
  const navigate = useNavigate();

  const [cfForm, setcfForm] = useState({
    title: "",
    collection: "",
    UserId: UserId,
  });

  const [messages, setMessages] = useState({ message: "", status: "" });

  const handleInputChange = (e) => {
    setcfForm({
      ...cfForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    for (let index of Object.keys(cfForm)) {
      if (index === "cf_goal" && cfForm[index] < 50) {
        return false;
      }
      if (cfForm[index] === "") {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cfForm);
    if (!handleValidation()) {
      setMessages({
        message: "Quostion form filled incorrectly",
        status: "danger",
      });
      return false;
    }

    const form = new FormData();
    Object.entries(cfForm).map((data) => {
      form.append(data[0], data[1]);
    });

    axios
      .post("/api/crowdfunder/create", form)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  };

  return (
    <Container className="createNftMain">
      <div className="crowdFundCreate">
        {messages.message && (
          <Alert variation={messages.status}>{messages.message}</Alert>
        )}
        <h1 className="createNftHeader">Ask Quostion</h1>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <div className="createNftForm">
            <div className="field mb-5">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Write quostion title"
                value={cfForm.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="field mb-3">
              <label className="form-label">Quostion</label>
              <input
                type="text"
                name="collection"
                className="form-control"
                placeholder="Write your quostion"
                value={cfForm.collection}
                onChange={handleInputChange}
              />
            </div>
            <button className="createNftBtn2" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </Container>
  );
};
