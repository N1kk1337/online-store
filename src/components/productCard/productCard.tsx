import React, { useEffect, useState } from "react";
import "./productCard.scss";
import CartStorage from "../cartObject/cart";

type Props = {
  title: string;
  thumbnail: string;
  description: string;
  id: number;
  price: number;
  handleNavigate: (arg: number) => void;
  handleChangeCart: Array<() => void>;
};

function ProductCard({
  title,
  thumbnail,
  description,
  price,
  handleNavigate,
  handleChangeCart,
  id,
}: Props) {
  const [buttonState, setButtonState] = useState(false);
  const cartStorage = CartStorage.getInstance();
  const handleAddClick = () => {
    if (cartStorage.getValueById(id) === 0) cartStorage.addItem(id);
    else {
      cartStorage.deleteItem(id);
    }

    setButtonState(cartStorage.getValueById(id) === 0);
    handleChangeCart[0]();
    handleChangeCart[1]();
  };
  useEffect(() => {
    setButtonState(cartStorage.getValueById(id) === 0);
  }, []);

  return (
    <div className="productCard">
      <h1 className="productCard__title">{title}</h1>
      <img className="productCard__img" src={thumbnail} alt="product" />
      <p className="productCard__descr">{description}</p>
      <div className="productCard__btnWrapper">
        <button onClick={handleAddClick} className="bntAdd">
          {buttonState ? <p>Add to Cart</p> : <p>Drop from Cart</p>}{" "}
        </button>
      </div>
      <button onClick={() => handleNavigate(id)} className="bntDeteils">
        Product Details
      </button>
    </div>
  );
}

export default ProductCard;
