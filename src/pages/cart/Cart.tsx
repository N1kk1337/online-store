import { useEffect, useState } from "react";
import "./Cart.scss";
import ReactPaginate from "react-paginate";
import CartStorage from "../../components/cartObject/cart";
import products from "../../assets/data/products";
import CartProductCard from "../../components/cartProductCard/CartProductCard";
import Product from "../../assets/model/product";
import ModalCheckout from "../../components/modalCheckout/ModalCheckout";
import PromoCodes from "../../components/promoCodes/PromoCodes";
type CartProps = {
  handleChangeCart: Array<() => void>;
};

const Cart = ({ handleChangeCart }: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [num, setNumber] = useState(3);
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * +num) % actualItems().length;
    setItemOffset(newOffset);
  };

  const cartStorage = CartStorage.getInstance();
  //const [itemCount, setItemCount] = useState<number>(1);
  const [actualItemsArr, setActualItemsArr] = useState<Array<Product>>([]);

  const [itemOffset, setItemOffset] = useState(0);

  const handleChange = (event: any) => {
    if (event.target.value > 0) setNumber(event.target.value);
  };

  const endOffset = itemOffset + +num;

  // Promo
  const [totalPrice, setTotalPrice] = useState<number>(
    cartStorage.getTotalPrice()
  );
  const [discountedPrice, setDiscountedPrice] = useState<number>(totalPrice);
  const [activePromo, setActivePromo] = useState<Array<[string, number]>>([]);
  const [promoText, setPromoText] = useState<string>("");
  const [isPromoValid, setIsPromoValid] = useState<boolean>(false);

  const VALID_PROMO: { [key: string]: number } = {
    epm: 10,
    rs: 20,
  };
  const handlePromoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoText(event.target.value.toLowerCase());
  };
  useEffect(() => {
    // const isValid = VALID_PROMO.some(([code, discount]) => {
    //   return code === promoText;
    // });
    if (VALID_PROMO[promoText]) {
      setIsPromoValid(true);
    } else {
      setIsPromoValid(false);
    }
  }, [promoText]);
  const addPromo = (text: string) => {
    setActivePromo([...activePromo, [text, VALID_PROMO[text]]]);
  };
  const deletePromo = (str: string) => {
    setActivePromo(activePromo.filter((item) => item[0] !== str));
  };
  useEffect(() => {
    const discount = activePromo.reduce((sum, item) => sum + item[1], 0) / 100;
    setDiscountedPrice(totalPrice - totalPrice * discount);
  }, [activePromo, totalPrice]);

  useEffect(() => {
    setTotalPrice(cartStorage.getTotalPrice());
  }, [cartStorage.getTotalPrice()]);

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

  const currentItems = actualItems().slice(itemOffset, endOffset);
  const pageCount = Math.ceil(actualItems().length / +num);

  return (
    <div className="cart">
      <div className="cartProducts">
        <div className="cardProducts__bord">
          <div className="cardProducts__bord-header">
            <h1>
              Different product types in cart :{" "}
              {cartStorage.getData().length - 1}
            </h1>
            <label>
              <span className="textInpunNumber">Product cards per page: </span>
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

          {currentItems.map((item) => (
            <div key={item.id}>
              <CartProductCard
                handleChangeCart={handleChangeCart}
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
        <div className="cartProducts__summary">
          <div className="summaryWrapper">
            <h3 className="title">Summary</h3>
          </div>
          <p className="text">Total Products: {cartStorage.getTotalNumber()}</p>

          {activePromo.length !== 0 && <h2>Active Codes:</h2>}
          {activePromo.length !== 0 && (
            <div className="active-promo-container">
              {activePromo.length !== 0 &&
                activePromo.map(([promo, discount]) => (
                  <div key={promo} className="active-promo-list">
                    <PromoCodes
                      deletePromo={deletePromo}
                      promoObj={[promo, discount]}
                    />
                  </div>
                ))}
            </div>
          )}

          {totalPrice === discountedPrice ? (
            <p className="text">Total Price {totalPrice} $</p>
          ) : (
            <div className="price-container">
              <del>Old Price {totalPrice} $</del>{" "}
              <ins>New Price {discountedPrice} $</ins>
            </div>
          )}
          <input
            className="promo-input"
            onChange={handlePromoText}
            placeholder="Enter promo code"
          />
          {isPromoValid && (
            <div>
              <p>
                {promoText.toUpperCase()} {VALID_PROMO[promoText]}%
              </p>
              {!activePromo.some(([code, discount]) => promoText === code) && (
                <button onClick={() => addPromo(promoText)}>ADD</button>
              )}
            </div>
          )}

          <button className="open-modal-btn" onClick={() => setIsOpen(true)}>
            PROCEED TO CHECKOUT
          </button>
          {isOpen && <ModalCheckout setIsOpen={setIsOpen} />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
