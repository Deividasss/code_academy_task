import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import NftsListBox from "../NftsListBox/NftsListBox"
import Alert from "react-bootstrap/Alert";
import "../MyNfts/MyNfts.scss"
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';

export default (props) => {
  const [crowdFund, setCrowdFund] = useState([
    //Jeigu prijungsite backend čia tada šitą žemiau esančią info ištrinkite ir palikite tusčią useState masyvą,//
    // nes čia tokia hardcode info, kad puslapyje rodytų užduotus klausimus//
    {
      "title": "Kaip crypto parduoti brangiau?",
      "quostion": "Sveiki noriu paklausti kaip būtų galima parduoti crypto jog daugiau uždirbčiau",
    },
    {
      "title": "Ar saugu crypto turėti paskyroje?",
      "quostion": "Sveiki noriu paklausti ar savo crypto saugu naudoti bianance paskyroje?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });
  const [noCrowdfunders, setNoCrowdfunder] = useState(true);
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  //Čia pagal userio id surandame jam priklausančius užduotus klausimus ir juos atvaizduoja, tai čia reiktu backend prijungti//

  useEffect(() => {
    axios
      .get(`/api/crowdfunder/user/${props.UserId}`)
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);

        if (resp.data.status === "success") {
          setCrowdFund(resp.data.message);
          console.log(resp.data.message);
        }

        if (crowdFund.length < 1) {
          setNoCrowdfunder(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setMessages({ message: "Server error", status: "danger" });
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  //Jeigu užduotų klausimų nėra tada išmes jog nera užduotu klausimu, o jei jų bus tada juos atvaizduos//
  // galite pasibandyti ir ištrint tą klausimu info iš crowdFund useState kur paciam virsuj ir palikt tuscia masyvą, tada rodys jog nera//
  //uzduotu klausimu//
  const List = () => {
    if (crowdFund.length < 1) {
      return (
        <div className="myNfts">
          <h3 className="myNftsNull">There is no questions!</h3>
          <button className="myNftsNullBtn" onClick={() => navigate("/createCrowdFounding")}>
            <strong>Ask Quostion!</strong>
          </button>
        </div>
      );
    } else {
      return crowdFund.map((value, index) => {
        return (
          <NftsListBox
            key={index}
            setMessages={setMessages}
            crowdfunder={value}
            link="/mycrowdfunder/"
          />
        );
      });
    }
  };

  return (
    <Container className="myNftsMain">
      <h1 className="myNftsheader">----- ALL QUOSTIONS -----</h1>
      <hr className="myNftsLine"></hr>
      {messages.message && (
        <Alert variation={messages.status}>{messages.message}</Alert>
      )}
      {isLoading ? (
        "Loading"
      ) : (
        <div className="container">
          <div className="justify-content-center">
            <List />
          </div>
        </div>
      )}
    </Container>
  );
};
