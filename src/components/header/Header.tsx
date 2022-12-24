import "./Header.scss";

// TODO add type
const Header = () => {
  return (
    <header className="header">
      <ul className="header__nav">
        <li className="nav__item">
          <h1>online store</h1>
        </li>
        <li className="nav__item">Cart total</li>
        <li className="nav__item">
          <img src="./assets/images/shopping-cart.png" alt="" />
          <a href="/cart">To cart</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
