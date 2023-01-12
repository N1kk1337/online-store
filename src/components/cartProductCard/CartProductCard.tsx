import Product from "../../assets/model/product";
import "./CartProductCard.scss";
import CartStorage from "../../components/cartObject/cart";
import { useEffect, useState } from "react";

type CartProductCardProps = {
  item: Product;
  cartStorage: CartStorage;
  itemCount: number;
  handleChangeCart: Array<() => void>;
};

function CartProductCard({
  handleChangeCart,
  item,
  cartStorage,
  itemCount,
}: CartProductCardProps) {
  const [currentToBuy, setCurrentToBuy] = useState<number>(itemCount);
  return (
    <div className="product">
      <img
        className="product__img"
        alt="img productCart"
        src={item.thumbnail}
      />
      <div className="product__discription">
        <h3 className="title">{item.title}</h3>
        <h5 className="subtitle">{item.description}</h5>
        <div className="product__discription other">
          <p>Rating:{item.rating}</p>
          <p>
            Discount:
            {item!.discountPercentage}
          </p>
        </div>
      </div>
      <div className="product__numver-control">
        {<p className="stock">Stock:{item.stock}</p>}
        <div className="number">
          <button
            onClick={() => {
              cartStorage.deleteItem(item.id);
              setCurrentToBuy(cartStorage.getValueById(item.id));
              handleChangeCart[0]();
              handleChangeCart[1]();
            }}
            className="btnAddPiece"
          >
            -
          </button>
          {<p className="curent">{currentToBuy}</p>}
          <button
            onClick={() => {
              if (item.stock !== cartStorage.getValueById(item.id))
                cartStorage.addItem(item.id);
              setCurrentToBuy(cartStorage.getValueById(item.id));
              handleChangeCart[0]();
              handleChangeCart[1]();
            }}
            className="btnDeletePiece"
          >
            +
          </button>
        </div>
        <p className="price">
          {item.price * cartStorage.getValueById(item.id)}
        </p>
      </div>
    </div>
  );
}

export default CartProductCard;
