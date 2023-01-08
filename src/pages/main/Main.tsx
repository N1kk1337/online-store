import React, { useCallback, useEffect } from "react";
import ProductCard from "../../components/productCard/productCard";
import products from "../../assets/data/products";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./Main.scss";
import Product from "../../assets/model/product";
import PriceSlider from "../../components/priceSlider/PriceSlider";
import QueryData from "../../components/queryData/QueryData";
import CheckboxList from "../../components/checkboxList/CheckboxList";
import { SortOptions } from "../../types/types";

const Main = () => {
  // URL generation
  // filters
  // TODO move to one reusable component
  const [queryParams, setQueryParams] = useSearchParams({ search: "" });

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    queryParams.get("brands") !== null
      ? queryParams.get("brands")!.split(",")
      : []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    queryParams.get("categories") !== null
      ? queryParams.get("categories")!.split(",")
      : []
  );
  const [searchFieldValue, setSearchFieldValue] = useState<string>(
    queryParams.get("search") || ""
  );
  const [searchResults, setSearchResults] = useState<Array<Product>>([]);

  const [sort, setSort] = useState<SortOptions>(
    (queryParams.get("sort") as SortOptions) || "By Name"
  );

  const [minPrice, setMinPrice] = useState<number>(
    Number(queryParams.get("minPrice")) || 0
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    Number(queryParams.get("maxPrice")) ||
      Math.max(...products.map((o) => o.price))
  );
  const [minStock, setMinStock] = useState<number>(
    Number(queryParams.get("minStock")) || 0
  );
  const [maxStock, setMaxStock] = useState<number>(
    Number(queryParams.get("maxStock")) ||
      Math.max(...products.map((o) => o.stock))
  );
  const queryObject = QueryData.getInstance(
    searchFieldValue,
    selectedBrands,
    selectedCategories,
    minPrice,
    maxPrice,
    minStock,
    maxStock
  );

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

  // search field
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFieldValue(event.target.value);
    queryObject.search = event.target.value;
    setQueryParams(queryObject.generateUrl());
  };

  //price slider
  // const handlePriceChange = ({ min, max }: { min: number; max: number }) => {
  //   setMinPrice(min);
  //   setMaxPrice(max);
  //   queryObject.minPrice = min;
  //   queryObject.maxPrice = max;
  //   setQueryParams(queryObject.generateUrl());
  // };

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
      })
      .filter((item) => {
        return (
          item.price >= (Number(queryParams.get("minPrice")) || 0) &&
          item.price <=
            (Number(queryParams.get("maxPrice")) ||
              Math.max(...products.map((o) => o.price)))
        );
      });
    if (sort === "By Name")
      results = results.sort((a, b) => a.title.localeCompare(b.title));
    else results = results.sort((a, b) => a.price - b.price);
    queryObject.brands = selectedBrands;
    queryObject.categories = selectedCategories;

    setQueryParams(queryObject.generateUrl());
    setSearchResults(results);
  }, [
    searchFieldValue,
    selectedBrands,
    selectedCategories,
    sort,
    minPrice,
    maxPrice,
    queryParams,
  ]);
  // TODO should I add 'queryObject' and 'setQueryParams' ?
  // TODO also consider to add "search" button, to not overload API and improve performance

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
          queryObject={queryObject}
          name="Price"
          min={0}
          max={Math.max(...products.map((o) => o.price))}
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
