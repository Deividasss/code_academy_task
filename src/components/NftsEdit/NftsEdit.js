import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../NftsEdit/NftsEdit.scss"
import { Modal } from 'react-bootstrap';

export default (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cfForm, setcfForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });
  const [modal, setModal] = useState(false)
  const price = (cfForm.starting_bid / 1500)
  const [warning, setWarning] = useState(false)

  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }
  const openWarning = () => {
    setWarning(true)
  }
  const closeWarning = () => {
    setWarning(false)
  }

  const deleteNfts = () => {
    axios
      .delete(`/api/crowdfunder/delete/` + id)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/mycrowdfunders");
          }, 1000);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  }

  useEffect(() => {
    axios
      .get("/api/crowdfunder/single/" + id)
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);

        if (resp.data.status === "success") {
          setcfForm(resp.data.message);
          console.log(cfForm);
        } else {
          navigate("/mycrowdfunders");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setMessages({ message: "Server side error", status: "danger" });
      });
  }, []);

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
    if (!handleValidation()) {
      setMessages({
        message: "Quostion editing form filled incorrectly",
        status: "danger",
      });
      return false;
    }
    axios
      .put(`/api/crowdfunder/update/${id}`, cfForm)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/mycrowdfunders");
          }, 1500);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  };

  return (
    <>
      <Container className="nftEditMain">
        {isLoading ? (
          "Loading...."
        ) : (
          <>
            <div className="crowdFundEdit">
              <div className="nftInfoMain">
                <div className="nftInfo">
                  <h3 className="nftTitle">{cfForm.title}Crypto sukurimas</h3>
                  <h3 className="nftCollection">{cfForm.collection}Kaip sukurti savo crypto?</h3>
                </div>
              </div>
              <div className="nftEditDeleteBtn">
                <button className="nftEditBtn" onClick={openModal}>Edit</button>
                <button className="nftDeleteBtn" onClick={openWarning}>Delete</button>
              </div>
            </div>
          </>
        )}
      </Container>
      <Modal className="itemModal" onHide={closeModal} show={modal} aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="editModal">
          <form className="" onSubmit={handleSubmit}>
            <h3 className="editNftHeading">----- Edit Quostion -----</h3>
            <hr></hr>
            <div className="field mb-3">
              {messages.message && (
                <Alert variation={messages.status}>{messages.message}</Alert>
              )}
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter quostion title"
                value={cfForm.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="field mb-3">
              <label className="form-label">Quostion</label>
              <input
                className="form-control"
                rows="9"
                placeholder="Enter your quostion"
                name="collection"
                value={cfForm.collection}
                onChange={handleInputChange}
              ></input>
            </div>
            <button type="submit" className="editBtn">
              Save Changes
            </button>
          </form>
        </div>
      </Modal>

      <Modal className="itemModal" show={warning} onHide={closeWarning} aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="deleteModal">
          {messages.message && (
            <Alert variation={messages.status}>{messages.message}</Alert>
          )}
          <h3 className="deleteModalHeading">Are you sure you want to delete quostion?</h3>
          <hr></hr>
          <button className="deleteModalBtn" onClick={deleteNfts}>Delete</button>
        </div>
      </Modal>
    </>
  );
};
