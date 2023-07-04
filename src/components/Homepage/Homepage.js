import "./homepage.scss";
import 'react-slideshow-image/dist/styles.css'
import Carousel from 'react-bootstrap/Carousel'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegClock, FaRegCalendarAlt } from 'react-icons/fa';


export default (props) => {

  const navigate = useNavigate()

  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <>
      <div className="homePageMain">
        <div className="homePageHeading">
          <h1 className="heading" >Unleash your creativity!</h1>
          <h3 className="paragraph">With Chavo Crypto Forum verified Chavo users can ask questions related to crypto in just a few clicks!</h3>
          {props.loggedIn === true && props.userRole === 0 && (
            <button onClick={() => navigate('createCrowdFounding')} className="learnMoreBtn">Ask Quostion!</button>
          )}
          {props.loggedIn === false && (
            <button onClick={() => navigate('/login')} className="learnMoreBtn">Login!</button>
          )}
        </div>
        <div className="homePageSlider">
          <Carousel className="sliderMain">
            <Carousel.Item>
              <img
                className="d-block w-150 sliderImg"
                src="https://public.nftstatic.com/static/nft/res/e75ca8a5f9d34131bccca0d6c70c3c42.png"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-150 sliderImg"
                src="https://public.nftstatic.com/static/nft/res/e75ca8a5f9d34131bccca0d6c70c3c42.png"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-150 sliderImg"
                src="https://public.nftstatic.com/static/nft/res/e75ca8a5f9d34131bccca0d6c70c3c42.png"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <div className="currentTime">
        <p className="timeDate">
          <FaRegClock className="currentTimeIcons" />
          {dateState.toLocaleString('lt-LT', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
          <FaRegCalendarAlt className="currentTimeIcons" />
          {' '}
          {dateState.toLocaleDateString('lt-LT', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>
      <a onClick={() => navigate("mycrowdfunders")} className="homepageInfo container">
        <img className="homepageImg" src="https://lh3.googleusercontent.com/cfn1D3xGaA7I3yWw0okwoxk_n27rlYQV1g3-Os3RXng1SE3Bq4cnYFGqb9my8tNlB_DVHO4vDb2pcjCFnlepnwgT7k8QXH3jPki0=w600"></img>
        <div className="nftsMarket">
          <h3 className="nftsMarketHeading">Crypto Forum</h3>
          <hr></hr>
          <p className="nftsMarketParagraph">Chavo Crypto Forum brings together artists, creators, and crypto enthusiasts on a single platform to share thoughts and learn something new about crypto.</p>
        </div>
      </a>
    </>
  );
};
