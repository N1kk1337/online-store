import React, { useEffect } from "react";
import ProductCard from "../../components/productCard/productCard";
// import productsArray from "../../assets/data/products";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../../assets/data/products";
import CartStorage from "../../components/cartObject/cart";

import "./Main.scss";
import Product from "../../assets/model/product";

const Main = () => {
  const cartStorage = CartStorage.getInstance();
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const [idCart, setIdCart] = useState<Array<number>>([]);

  const [checked, setChecked] = useState(false);
  const checkboxChange = () => {
    setChecked(!checked);
  };
  const [searchResults, setSearchResults] = useState<Array<Product>>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const results = products.filter((item) =>
      item.title.toLocaleLowerCase().includes(value)
    );
    setSearchResults(results);
  }, [value]);

  const onProductClick = (id: string | number) => {
    navigate("/" + id.toString());
  };

  const clickId = (val: number) => {
    if (idCart.includes(val)) {
      setIdCart(
        idCart.filter((f) => {
          return f !== val;
        })
      );
    } else setIdCart([...idCart, val]);
  };

  localStorage.setItem("arr", JSON.stringify(idCart));

  console.log(localStorage);
  return (
    <div className="main-page container">
      <div className="filters">
        <p className="btn">Reset Filters</p> <p className="btn">Copy Link</p>
        <div className="filters__brand">
          {products.map((it) => (
            <label key={it.title}>
              {it.brand}
              <input id={it.category} type="checkbox" />
            </label>
          ))}
        </div>
        <div className="filters filters__brand">Brand</div>
        <div className="filters filters__price">Price</div>
        <div className="filters filters__stock">Stock</div>
      </div>
      <div className="main-page__product-list">
        <div className="product-list__header">
          <p className="btn product-list__sort-options">Sort options:</p>
          <p className="product-list__found">Found:{searchResults.length}</p>
          <div className="product-list__search-container">
            <form action="">
              <input
                value={value}
                onChange={handleChange}
                placeholder="Search.."
                name="search"
              />
            </form>
          </div>
          <p className="product-list__view-switch"></p>
        </div>
        <div className="product-container">
          {searchResults.map((item) => (
            <div
              key={item.id}
              onClick={() => onProductClick(item.id)}
              className="product-container__wrapper"
            >
              <ProductCard
                handleAddToCart={() => {
                  cartStorage.addItem(item.id);
                }}
                title={item.title}
                thumbnail={item.thumbnail}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
