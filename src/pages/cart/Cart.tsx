import { useEffect, useMemo, useState } from "react";
import "./Cart.scss";
import ReactPaginate from "react-paginate";
import CartStorage from "../../components/cartObject/cart";
import getProductById from "../details/productById";
import products from "../../assets/data/products";
import CartProductCard from "../../components/cartProductCard/CartProductCard";
import Product from "../../assets/model/product";
import ModalCheckout from "../../components/modalCheckout/ModalCheckout";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return data.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);

  console.log(localStorage);
  const cartStorage = CartStorage.getInstance();
  //const [itemCount, setItemCount] = useState<number>(1);
  const [actualItemsArr, setActualItemsArr] = useState<Array<Product>>([]);

  const getTotalPrice = () => {
    let price = 0;
    for (let i = 0; i < actualItemsArr.length; i++) {
      // console.log(i);
      // console.log("id " + actualItemsArr[i].id);
      console.log(cartStorage.getValueById(actualItemsArr[i].id), "total");
      price =
        price +
        actualItemsArr[i].price *
          cartStorage.getValueById(actualItemsArr[i].id);
    }
    return price;
  };

  const [itemOffset, setItemOffset] = useState(0);
  const [num, setNumber] = useState(3);

  const handleChange = (event: any) => {
    setNumber(event.target.value);
  };

  const endOffset = itemOffset + +num;

  const actualItems = () => {
    const res = products.filter(
      (product) =>
        !!cartStorage
          .getData()
          .find(([key, value]) => Number(key) === product.id)
    );
    return res;
  };
  useEffect(() => {
    setActualItemsArr(actualItems);
  }, []);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * +num) % actualItems().length;
    setItemOffset(newOffset);
  };
  const currentItems = actualItems().slice(itemOffset, endOffset);
  const pageCount = Math.ceil(actualItems().length / +num);

  console.log(actualItems());

  const getProductsCount = () => {
    console.log(actualItemsArr.length);
    return actualItemsArr.length;
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
            {actualItems().map((item) => (
              <div key={item.id}>
                <CartProductCard
                  itemCount={cartStorage.getValueById(item.id)}
                  item={item}
                  cartStorage={cartStorage}
                />
              </div>
            ))}
            {
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
            }
          </div>
        </div>
        <div className="cartProducts__summary">
          <div className="summaryWrapper">
            <h3 className="title">Summary</h3>
          </div>
          <p className="text">Total Products: {getProductsCount()}</p>
          <p className="text">Total Price {getTotalPrice()} $</p>
          <input placeholder="Enter promo code" />
          <button onClick={() => setIsOpen(true)}>To Payment</button>
          {isOpen && <ModalCheckout setIsOpen={setIsOpen} />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
