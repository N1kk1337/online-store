import React from "react";
import "./productCard.scss";

type Props = {
  title: string;
  thumbnail: string;
  description: string;
};

function ProductCard({ title, thumbnail, description }: Props) {
  return (
    <div className="productCard">
      <h1 className="productCard__title">{title}</h1>
      <img className="productCard__img" src={thumbnail} alt="img product" />
      <p className="productCard__descr">{description}</p>
    </div>
  );
}

export default ProductCard;
