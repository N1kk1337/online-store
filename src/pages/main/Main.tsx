import React, { useEffect } from "react";
import ProductCard from "../../components/productCard/productCard";
import products from "../../assets/data/products";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Main.scss";
import Product from "../../assets/model/product";
import PriceSlider from "../../components/priceSlider/PriceSlider";

const Main = () => {
  // filters
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [searchResults, setSearchResults] = useState<Array<Product>>([]);

  const brands: Set<string> = new Set(products.map((product) => product.brand));
  const brandsItems = Array.from(brands);
  const categories: Set<string> = new Set(
    products.map((product) => product.category)
  );
  const categoryItems = Array.from(categories);

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearchFieldValue("");
  };

  const handleBrandsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedBrand = e.target!.value;
    if (selectedBrands.includes(selectedBrand)) {
      setSelectedBrands(
        selectedBrands.filter((option) => option !== selectedBrand)
      );
    } else {
      setSelectedBrands([...selectedBrands, selectedBrand]);
    }
  };

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCategory = e.target!.value;
    if (selectedCategories.includes(selectedCategory)) {
      setSelectedCategories(
        selectedCategories.filter((option) => option !== selectedCategory)
      );
    } else {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };

  // search field

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFieldValue(event.target.value);
  };

  // final showdown
  useEffect(() => {
    let results = products
      .filter((item) =>
        item.title.toLocaleLowerCase().includes(searchFieldValue)
      )
      .filter((item) => {
        if (selectedBrands.length === 0) return item;
        else return selectedBrands.includes(item.brand);
      })
      .filter((item) => {
        if (selectedCategories.length === 0) return item;
        else return selectedCategories.includes(item.category);
      });
    setSearchResults(results);
  }, [searchFieldValue, selectedBrands, selectedCategories]);

  // navigate to individual product page
  const navigate = useNavigate();
  const onProductClick = (id: string | number) => {
    navigate(id.toString());
  };

  return (
    <div className="main-page container">
      <div className="filters">
        <button className="btn" onClick={handleReset}>
          Reset Filters
        </button>{" "}
        <p className="btn">Copy Link</p>
        <div className="filters filters__brand">
          Brand:
          {brandsItems.map((brand) => (
            <label key={brand}>
              <input
                value={brand}
                checked={selectedBrands.includes(brand)}
                type="checkbox"
                onChange={handleBrandsChange}
              />
              {brand}
            </label>
          ))}
        </div>
        <div className="filters filters__category">
          Category:
          {categoryItems.map((category) => (
            <label key={category}>
              <input
                value={category}
                checked={selectedCategories.includes(category)}
                type="checkbox"
                onChange={handleCategoriesChange}
              />
              {category}
            </label>
          ))}
        </div>
        <div className="filters filters__price">
          Price: <PriceSlider />
        </div>
        <div className="filters filters__stock">Stock</div>
      </div>
      <div className="main-page__product-list">
        <div className="product-list__header">
          <p className="btn product-list__sort-options">Sort options:</p>
          <p className="product-list__found">Found:{searchResults.length}</p>
          <div className="product-list__search-container">
            <form action="">
              <input
                value={searchFieldValue}
                onChange={handleSearchChange}
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
