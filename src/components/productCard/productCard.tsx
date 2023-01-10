import React from "react";
import "./productCard.scss";

type Props = {
  title: string;
  thumbnail: string;
  description: string;
  handleAddToCart: Function;
};

function ProductCard({
  title,
  thumbnail,
  description,
  handleAddToCart,
}: Props) {
  return (
    <div className="productCard">
      <h1 className="productCard__title">{title}</h1>
      <img className="productCard__img" src={thumbnail} alt="product" />
      <p className="productCard__descr">{description}</p>
      <div className="productCard__btnWrapper">
        <button onClick={handleAddToCart} className="bntAdd">
          add
        </button>
      </div>
      <button className="bntDeteils">details</button>
    </div>
  );
}

export default ProductCard;
