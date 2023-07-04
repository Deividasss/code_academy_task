import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../NftsListBox/NftsListBox.scss"

export default (props) => {

  return (
    <>
      <div class="productBox">
        <Link className="boxLink" to={`${props.link}` + props.crowdfunder.id}>
          <div class="product-grid">
            <div class="product-content">
              <h3 className="product-title">{props.crowdfunder.title}</h3>
              <hr className="line"></hr>
              <h3 className="product-collection">{props.crowdfunder.quostion}</h3>
            </div>
          </div>
        </Link>
      </div>
    </>

  );
};
