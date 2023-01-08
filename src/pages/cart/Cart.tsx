import products from "../../assets/data/products";
import "./Cart.scss";

const Cart = () => {
  const testList = products.filter((it) => {
    if (it.price > 1000) {
      return it;
    }
  });

  let count = 1;

  console.log(testList);
  return (
    <div className="cart">
      <div className="cartProducts">
        <div className="cardProducts__bord">
          <div className="cardProducts__bord-header">
            <h1>Header</h1>
          </div>
          {testList.map((cartProduct) => (
            <div
              className="product
            "
            >
              <div className="product__number">{count++}</div>
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
                  <button className="btnAdd">-</button>
                  <p className="curent">44</p>
                  <button className="btnAdd">+</button>
                </div>
                <p className="price">${cartProduct.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cartProducts__summary">
          <h3 className="title">Summary</h3>
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
