import { useEffect, useState } from "react";
import products from "../../assets/data/products";
import "./Cart.scss";
import ReactPaginate from "react-paginate";
import { count } from "console";

const Cart = () => {
  const arrIds = JSON.parse(localStorage.getItem("arr"));

  const testList = products.filter((e) => arrIds.includes(e.id));

  const [count, setCount] = useState(1);

  const [itemOffset, setItemOffset] = useState(0);

  const [num, setNumber] = useState(3);

  const handleChange = (event: any) => {
    setNumber(event.target.value);
  };

  const endOffset = itemOffset + +num;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = testList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(testList.length / +num);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * +num) % testList.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="cart">
      <div className="cartProducts">
        <div className="cardProducts__bord">
          <div className="cardProducts__bord-header">
            <h1>Header</h1>
            <input
              type="number"
              defaultValue="3"
              max="6"
              min="1"
              onChange={handleChange}
            />
          </div>
          <div>
            {currentItems.map((cartProduct) => (
              <div key={cartProduct.description} className="product">
                <div className="product__number"></div>
                <img
                  className="product__img"
                  alt="img productCart"
                  src={cartProduct.thumbnail}
                />
                <div className="product__discription">
                  <h3 className="title">{cartProduct.title}</h3>
                  <h5 className="subtitle">{cartProduct.description}</h5>
                  <div className="product__discription other">
                    <p>Rating:{cartProduct.rating}</p>
                    <p>Discount:{cartProduct.discountPercentage}</p>
                  </div>
                </div>
                <div className="product__numver-control">
                  <p className="stock">Stock:{cartProduct.stock}</p>
                  <div className="number">
                    <button
                      onClick={() => setCount((count) => count - 1)}
                      className="btnAdd"
                    >
                      -
                    </button>
                    <p className="curent">{count}</p>
                    <button
                      onClick={() => setCount((count) => count + 1)}
                      className="btnAdd"
                    >
                      +
                    </button>
                  </div>
                  <p className="price">${cartProduct.price}</p>
                </div>
              </div>
            ))}

            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageCount={pageCount}
              previousLabel="<previous"
            />
          </div>
        </div>
        <div className="cartProducts__summary">
          <h3 className="title">{}</h3>
          <div>
            <p>Products</p>
            <p>Total</p>
            <input placeholder="promo code" />
            <button>Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
