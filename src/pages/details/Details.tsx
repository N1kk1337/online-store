import React from "react";
import { useParams } from "react-router-dom";

import "./details.scss";
import getProductById from "./productById";

const Details = () => {
  let t = useParams().detailsId;
  const productById = getProductById(t);
  console.log(productById);

  return (
    <div className="details container">
      <div className="details__route">
        <p></p>
      </div>
      <div className="details-card">
        <div className="details-card__header">{productById?.brand}</div>
        <div className="details-card__images-container">
          {/* TODO main img and small buttons to switch them, edit layout if needed  */}
          <img src={productById?.thumbnail} alt="" />
        </div>
        {/* use IDs to inject real data from json (or API)  */}
        <div className="details-card__info">
          <div className="details-card__info-block">
            <div className="info-block__header">{productById?.description}</div>
            <div
              className="info-block__content"
              id="info-block__description"
            ></div>
          </div>
          <div className="details-card__info-block">
            <div className="info-block__header">
              {productById?.discountPercentage}
            </div>
            <div
              className="info-block__content"
              id="info-block__discount"
            ></div>
          </div>
          <div className="details-card__info-block">
            <div className="info-block__header">
              Rating:{productById?.rating}
            </div>
            <div className="info-block__content" id="info-block__rating"></div>
          </div>
          <div className="details-card__info-block">
            <div className="info-block__header">Stock:{productById?.stock}</div>
            <div className="info-block__content" id="info-block__stock"></div>
          </div>
          <div className="details-card__info-block">
            <div className="info-block__header">Brand:{productById?.brand}</div>
            <div className="info-block__content" id="info-block__brand"></div>
          </div>
          <div className="details-card__info-block">
            <div className="info-block__header">
              Category:{productById?.category}
            </div>
            <div
              className="info-block__content"
              id="info-block__category"
            ></div>
          </div>
        </div>
        <div className="details-card__controls">
          <p className="details-card__price">{productById?.price}</p>
          <button className="details__button">DROP FROM CART</button>
          <button className="details__button">BUY NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
