import "./Header.scss";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

// TODO add cart icon with counter of added products
type HeaderProps = {
  title: string;
  cartTotal: number;
};

const Header = ({ title, cartTotal }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <ul className="header__nav">
        <li className="nav__item">
          <h1>{title}</h1>
        </li>
        <li className="nav__item">Cart total: {cartTotal}</li>
        <li className="nav__item">
          <img src="./assets/images/shopping-cart.png" alt="" />
          <button onClick={() => navigate("/cart")}>To cart</button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
