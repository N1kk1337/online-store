import React from "react";
import "./productCard.scss";

type Props = {
  title: string;
  thumbnail: string;
  description: string;
  handler: any;
};

function ProductCard({ title, thumbnail, description, handler }: Props) {
  return (
    <div className="productCard">
      <h1 className="productCard__title">{title}</h1>
      <img className="productCard__img" src={thumbnail} alt="img product" />
      <p className="productCard__descr">{description}</p>
      <div className="productCard__btnWrapper">
        <button onClick={handler} className="bntAdd">
          add
        </button>
      </div>
      <button className="bntDeteils">details</button>
    </div>
  );
}

export default ProductCard;
