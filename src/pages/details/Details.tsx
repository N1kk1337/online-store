import React from "react";

import "./details.scss";

const Details = () => {
  return (
    <div className="details container">
      <div className="details__route">
        <p></p>
      </div>
      <div className="details-card">
        <div className="details-card__header">iPHONE 9</div>
        <div className="details-card__images-container">
          {/* TODO main img and small buttons to switch them, edit layout if needed  */}
          <img
            src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
            alt=""
          />
        </div>
        {/* use IDs to inject real data from json (or API)  */}
        <div className="details-card__info">
          <div className="details-card__info-block">
            <div className="info-block__header">Description:</div>
            <div
              className="info-block__content"
              id="info-block__description"
            ></div>
          </div>
          <div className="details-card__info-block">
            <div className="info-block__header">Discount Percentage:</div>
            <div
              className="info-block__content"
              id="info-block__discount"
            ></div>
          </div>
          <div className="details-card__info-block">
            <div className="info-block__header">Rating:</div>
            <div className="info-block__content" id="info-block__rating"></div>
          </div>
          <div className="details-card__info-block">
            <div className="info-block__header">Stock:</div>
            <div className="info-block__content" id="info-block__stock"></div>
          </div>
          <div className="details-card__info-block">
            <div className="info-block__header">Brand:</div>
            <div className="info-block__content" id="info-block__brand"></div>
          </div>
          <div className="details-card__info-block">
            <div className="info-block__header">Category:</div>
            <div
              className="info-block__content"
              id="info-block__category"
            ></div>
          </div>
        </div>
        <div className="details-card__controls">
          <p className="details-card__price">PRICE PLACEHOLDER</p>
          <button className="details__button">DROP FROM CART</button>
          <button className="details__button">BUY NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
