import { useEffect, useState } from "react";
import newMoviesArray from "../../assets/data/products";
import "./Cart.scss";
import ReactPaginate from "react-paginate";
import CartStorage from "../../components/cartObject/cart";

const Cart = () => {
  const cartStorage = CartStorage.getInstance();
  const arrIds = JSON.parse(localStorage.getItem("arr") || "0");

  const testList = newMoviesArray.filter((e) => arrIds.includes(e.id));

  const [count, setCount] = useState(testList);

  const getProductsCount = () => {
    return cartStorage.getData.length;
  };

  const deleteCount = (val: number) => {
    // const resTest = count.map((count) => {
    //   if (count.id === val) {
    //     count.count--;
    //   }
    //   return count;
    // });
    // setCount(resTest);
    return 0;
  };

  const getTotalPrice = () => {
    const result = 0;
    cartStorage.getData();
    return result;
  };

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
                  <p className="stock">Stock:{cartProduct.stock}</p>
                  <div className="number">
                    <button
                      // id={cartProduct.id}
                      onClick={() => deleteCount(cartProduct.id)}
                      className="btnAddPiece"
                    >
                      -
                    </button>
                    {/* <p className="curent">{cartProduct}</p> */}
                    <button
                      //id={cartProduct.id}
                      // onClick={() => addCount(cartProduct.id)}
                      className="btnDeletePiece"
                    >
                      +
                    </button>
                  </div>
                  <p className="price">
                    ${cartProduct.price}
                    {/*умножить на число в корзине */}
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

          <p className="text">Total Products: {getProductsCount()}</p>
          <p className="text">Total Price {getTotalPrice()} $</p>
          <input placeholder="promo code" />
          <button>Buy now</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
