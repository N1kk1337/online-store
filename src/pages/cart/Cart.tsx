import { useEffect, useState } from "react";
import newMoviesArray from "../../assets/data/products";
import "./Cart.scss";
import ReactPaginate from "react-paginate";

const Cart = () => {
  const arrIds = JSON.parse(localStorage.getItem("arr") || null);

  const testList = newMoviesArray.filter((e) => arrIds.includes(e.id));

  const [count, setCount] = useState(testList);

  const addCoun = (val:) => {
    const resTest = count.map((count) => {
      if (count.id == val) {
        count.count++;
      }
      return count;
    });
    setCount(resTest);
  };

  const deleteCount = (val) => {
    const resTest = count.map((count) => {
      if (count.id == val) {
        count.count--;
      }
      return count;
    });
    setCount(resTest);
  };

  const addTotalMoney = () => {
    const money:Array<Number> = [];
    const addMoney = count.map((product) =>
      money.push(product.count * product.price)
    );

    let result = money.reduce(function (sum:Number, elem:Number) {
      return sum + elem;
    }, 0);

    return result;
  };

  const addTotal = () => {
    const arr = [];
    const total = count.map((t) => arr.push(t.count));

    let result = arr.reduce(function (sum, elem) {
      return sum + elem;
    }, 0);

    return result;
  };

  console.log(addTotalMoney());

  const [itemOffset, setItemOffset] = useState(0);

  const [num, setNumber] = useState(3);

  const handleChange = (event: any) => {
    setNumber(event.target.value);
  };

  const endOffset = itemOffset + +num;

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
            <h1>Products in card : </h1>
            <label>
              <span className="textInpunNumber">product in page</span>
              <input
                className="inputNumber"
                type="number"
                defaultValue="3"
                max="6"
                min="1"
                onChange={handleChange}
              />
            </label>
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
                  <p className="stock">
                    Stock:{cartProduct.stock - cartProduct.count}
                  </p>
                  <div className="number">
                    <button
                      id={cartProduct.id}
                      onClick={() => deleteCount(cartProduct.id)}
                      className="btnAddPiece"
                    >
                      -
                    </button>
                    <p className="curent">{cartProduct.count}</p>
                    <button
                      id={cartProduct.id}
                      onClick={() => addCoun(cartProduct.id)}
                      className="btnDeletePiece"
                    >
                      +
                    </button>
                  </div>
                  <p className="price">
                    ${cartProduct.price * cartProduct.count}
                  </p>
                </div>
              </div>
            ))}
            <div className="paginator">
              <ReactPaginate
                className="row"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                previousLabel="<prev"
              />
            </div>
          </div>
        </div>
        <div className="cartProducts__summary">
          <div className="summaryWrapper">
            <h3 className="title">Info your products</h3>
          </div>

          <p className="text">Products piece: {addTotal()}</p>
          <p className="text">Total Price : {addTotalMoney()} $</p>
          <input placeholder="promo code" />
          <button>Buy now</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
