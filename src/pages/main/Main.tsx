import React, { useEffect } from "react";
import ProductCard from "../../components/productCard/productCard";
import products from "../../assets/data/products";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Main.scss";

const Main = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [searchResults, setSearchResults] = React.useState([]);

  useEffect(() => {
    const results = products.filter((item) =>
      item.title.toLocaleLowerCase().includes(value)
    );
    setSearchResults(results);
  }, [value]);

  const onClick = (id: string | number) => {
    navigate(id.toString());
  };

  return (
    <div className="main-page container">
      <div className="main-page__filters">
        <p className="btn">Reset Filters</p> <p className="btn">Copy Link</p>
        <div className="filters filters__category">Category</div>
        <div className="filters filters__brand">Brand</div>
        <div className="filters filters__price">Price</div>
        <div className="filters filters__stock">Stock</div>
      </div>
      <div className="main-page__product-list">
        <div className="product-list__header">
          <p className="btn product-list__sort-options">Sort options:</p>
          <p className="product-list__found">Found:</p>
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
              onClick={() => onClick(item.id)}
              className="product-container__wrapper"
            >
              <ProductCard
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
