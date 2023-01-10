import React from "react";
import "./productCard.scss";

type Props = {
  title: string;
  thumbnail: string;
  description: string;
  id: number;

  handleAddToCart: (arg: number) => void;
  handleNavigate: (arg: number) => void;
};

function ProductCard({
  title,
  thumbnail,
  description,
  handleAddToCart,
  handleNavigate,
  id,
}: Props) {
  return (
    <div className="productCard">
      <h1 className="productCard__title">{title}</h1>
      <img className="productCard__img" src={thumbnail} alt="product" />
      <p className="productCard__descr">{description}</p>
      <div className="productCard__btnWrapper">
        <button
          onClick={() => {
            handleAddToCart(id);
            console.log("added " + id);
          }}
          className="bntAdd"
        >
          add
        </button>
      </div>
      <button onClick={() => handleNavigate(id)} className="bntDeteils">
        details
      </button>
    </div>
  );
}

export default ProductCard;
