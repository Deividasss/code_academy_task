import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../NftsListBox/NftsListBox.scss"
import { FaHeart } from 'react-icons/fa';

export default (props) => {

  //Sitame komponente tiesiog atvaizduojame kaip atrodo klausimai forume//

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);


//Paspaude like mygtuką iškviečiam šią funkciją, jeigu liked useState nėra užsetintas tada ji užsetina ir per if padarome, kad jei liked
//uzsetintas tada prie likes useState pridedame po 1 laiką//
  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  //O čia tą iš useState atimame 1 laiką//
  const handleDislike = () => {
    if (likes > 0) {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  return (
    <>
      <div class="productBox">
        <div class="product-grid">
          <div class="product-content">
            <Link className="boxLink" to={`${props.link}` + props.crowdfunder.id}>
              <h3 className="product-title">{props.crowdfunder.title}</h3>
            </Link>
            <hr className="line"></hr>
            <h3 className="product-collection">{props.crowdfunder.quostion}</h3>
            <div className="likeContainer">
              <h5 className="likesTitle">{likes} Likes</h5>
              <button className="likeBtn" onClick={liked ? handleDislike : handleLike} style={{ backgroundColor: liked ? 'red' : 'grey' }}><FaHeart /></button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};
