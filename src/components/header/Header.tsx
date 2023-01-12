import "./Header.scss";
import { useNavigate } from "react-router-dom";
// TODO add cart icon with counter of added products
type HeaderProps = {
  title: string;
  cartTotalCount: number;
  cartTotalPrice: number;
};

const Header = ({ title, cartTotalCount, cartTotalPrice }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <ul className="header__nav">
        <li className="nav__item">
          <h1 className="header-logo" onClick={() => navigate("/")}>
            {title}
          </h1>
        </li>
        <li className="nav__item">
          Cart total: {cartTotalPrice}$ for {cartTotalCount} items
        </li>
        <li className="nav__item">
          <img src="./assets/images/shopping-cart.png" alt="" />
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            To cart
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
