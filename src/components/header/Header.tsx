import "./Header.scss";
import React, { Component } from "react";

// TODO add cart icon with counter of added products
type HeaderProps = {
  title: string;
  cartTotal: number;
};

export default class Header extends Component<HeaderProps> {
  render() {
    return (
      <header className="header">
        <ul className="header__nav">
          <li className="nav__item">
            <h1>{this.props.title}</h1>
          </li>
          <li className="nav__item">Cart total: {this.props.cartTotal}</li>
          <li className="nav__item">
            <img src="./assets/images/shopping-cart.png" alt="" />
            <a href="/online-store/cart">To cart</a>
          </li>
        </ul>
      </header>
    );
  }
}
