import React, { useEffect } from "react";
import ProductCard from "../../components/productCard/productCard";
import products from "../../assets/data/products";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import "./Main.scss";
import Product from "../../assets/model/product";
import PriceSlider from "../../components/priceSlider/PriceSlider";
import QueryData from "../../components/queryData/QueryData";
import CheckboxList from "../../components/checkboxList/CheckboxList";
import { SortOptions } from "../../types/types";

const Main = () => {
  // filters
  // TODO move to one reusable component
  const [queryParams, setQueryParams] = useSearchParams({ search: "" });

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    queryParams.get("brands") !== null
      ? queryParams.get("brands")!.split(",")
      : []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    queryParams.get("brands") !== null
      ? queryParams.get("categories")!.split(",")
      : []
  );
  const [searchFieldValue, setSearchFieldValue] = useState<string>(
    queryParams.get("search") || ""
  );
  const [searchResults, setSearchResults] = useState<Array<Product>>([]);

  const [sort, setSort] = useState<SortOptions>("By Name");

  const brands: Set<string> = new Set(products.map((product) => product.brand));

  const brandsItems = Array.from(brands);
  const categories: Set<string> = new Set(
    products.map((product) => product.category)
  );
  const categoryItems = Array.from(categories);

  //reset all filters button
  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearchFieldValue("");
    setSort("By Name");
    queryObject.reset();
    setQueryParams(queryObject.generateUrl());
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

    queryObject.brands = selectedBrands;
    setQueryParams(queryObject.generateUrl());
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
    queryObject.categories = selectedCategories;
    setQueryParams(queryObject.generateUrl());
  };

  // sort selector
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value as SortOptions);
    queryObject.sort = event.target.value as SortOptions;
    setQueryParams(queryObject.generateUrl());
  };

  // URL generation
  const queryObject = new QueryData(
    searchFieldValue,
    selectedBrands,
    selectedCategories,
    0,
    0,
    0,
    0,
    "By Name"
  );

  // search field
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFieldValue(event.target.value);
    queryObject.search = event.target.value;
    setQueryParams(queryObject.generateUrl());
  };

  // final showdown
  const applyFilters = () => {
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
    queryObject.brands = selectedBrands;
    queryObject.categories = selectedCategories;

    setQueryParams(queryObject.generateUrl());
    setSearchResults(results);
  };

  useEffect(() => {
    applyFilters();
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
        <CheckboxList
          name="Brand"
          items={brandsItems}
          checkedItems={selectedBrands}
          handleChange={handleBrandsChange}
          currentProducts={searchResults}
          maxProducts={products}
        />
        <CheckboxList
          name="Category"
          items={categoryItems}
          checkedItems={selectedCategories}
          handleChange={handleCategoriesChange}
          currentProducts={searchResults}
          maxProducts={products}
        />
        <PriceSlider
          name="Price"
          min={0}
          max={1000}
          onChange={({ min, max }: { min: number; max: number }) =>
            console.log(`min = ${min}, max = ${max}`)
          }
        />
        <div className="filters filters__stock">Stock</div>
      </div>
      <div className="main-page__product-list">
        <div className="product-list__header">
          <p className="btn product-list__sort-options">
            Sort{" "}
            <select value={sort} onChange={handleSortChange}>
              <option value="By Name">By Name</option>
              <option value="By Price">By Price</option>
            </select>
          </p>
          <p className="product-list__found">Found:{searchResults.length}</p>
          <div className="product-list__search-container">
            <form>
              <input
                value={queryParams.get("search") || ""}
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
