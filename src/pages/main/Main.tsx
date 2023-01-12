import React, { useEffect } from "react";
import ProductCard from "../../components/productCard/productCard";
// import productsArray from "../../assets/data/products";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import products from "../../assets/data/products";
import CartStorage from "../../components/cartObject/cart";
import "./Main.scss";
import Product from "../../assets/model/product";
import CustomSlider from "../../components/CustomSlider/CustomSlider";
import QueryData from "../../components/queryData/QueryData";
import CheckboxList from "../../components/checkboxList/CheckboxList";
import { SortOptions } from "../../types/types";
import ProductCardLarge from "../../components/productCardLarge/productCardLarge";

type MainProps = {
  handleChangeCart: Array<() => void>;
};

const Main: React.FC<MainProps> = ({ handleChangeCart }) => {
  // filters
  const overallMinPrice = Math.min(...products.map((o) => o.price));
  const overallMaxPrice = Math.max(...products.map((o) => o.price));
  const overallMinStock = Math.min(...products.map((o) => o.stock));
  const overallMaxStock = Math.max(...products.map((o) => o.stock));

  // TODO move to one reusable component
  const [queryParams, setQueryParams] = useSearchParams({ search: "" });
  const [copyButtonText, setCopyButtonText] = useState("Copy Link");
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
  const [view, setView] = useState<boolean>(queryParams.get("view") !== null);
  const cartStorage = CartStorage.getInstance();

  const [sort, setSort] = useState<SortOptions>(
    (queryParams.get("sort") as SortOptions) || "By Name"
  );

  const [minPrice, setMinPrice] = useState<number>(
    Number(queryParams.get("minPrice")) || overallMinPrice
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    Number(queryParams.get("maxPrice")) || overallMaxPrice
  );
  const [minStock, setMinStock] = useState<number>(
    Number(queryParams.get("minStock")) || overallMinStock
  );
  const [maxStock, setMaxStock] = useState<number>(
    Number(queryParams.get("maxStock")) || overallMaxStock
  );
  const [reset, setReset] = useState<boolean>(false);
  const queryObject = QueryData.getInstance(
    searchFieldValue,
    selectedBrands,
    selectedCategories,
    minPrice,
    maxPrice,
    minStock,
    maxStock,
    sort,
    view
  );
  const brands: Set<string> = new Set(products.map((product) => product.brand));

  const brandsItems = Array.from(brands);
  const categories: Set<string> = new Set(
    products.map((product) => product.category)
  );
  const categoryItems = Array.from(categories);

  //reset all filters button
  const handleReset = () => {
    setSearchFieldValue("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setMinPrice(overallMinPrice);
    setMaxPrice(overallMaxPrice);
    setMinStock(overallMinStock);
    setMaxStock(overallMaxStock);
    setSort("ByNameAscending");
    setReset(true);
  };
  useEffect(() => {
    if (reset === true) {
      queryObject.setSearch(searchFieldValue);
      queryObject.setBrands(selectedBrands);
      queryObject.setCategories(selectedCategories);

      queryObject.setMinPrice(overallMinPrice);
      queryObject.setMaxPrice(overallMaxPrice);
      queryObject.setMinStock(overallMinStock);
      queryObject.setMaxStock(overallMaxStock);
      queryObject.setSort(sort);

      setQueryParams(queryObject.generateUrl());
      setReset(false);
    }
  }, [reset]);

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
  const handlePriceChange = ({ min, max }: { min: number; max: number }) => {
    // setMinPrice(min);
    // setMaxPrice(max);
    // queryObject.minPrice = min;
    // queryObject.maxPrice = max;
    //setQueryParams(queryObject.generateUrl());
  };

  const handleStockChange = ({ min, max }: { min: number; max: number }) => {
    // setMinStock(min);
    // setMaxStock(max);
    //setQueryParams(queryObject.generateUrl());
  };

  // final showdown
  useEffect(() => {
    let results = products
      .filter(
        (item) =>
          item.title
            .toLocaleLowerCase()
            .includes(searchFieldValue.toLocaleLowerCase()) ||
          item.description
            .toLocaleLowerCase()
            .includes(searchFieldValue.toLocaleLowerCase()) ||
          item.category
            .toLocaleLowerCase()
            .includes(searchFieldValue.toLocaleLowerCase()) ||
          item.price === Number(searchFieldValue) ||
          item.stock === Number(searchFieldValue)
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
      })
      .filter((item) => {
        return (
          item.stock >= (Number(queryParams.get("minStock")) || 0) &&
          item.stock <=
            (Number(queryParams.get("maxStock")) ||
              Math.max(...products.map((o) => o.stock)))
        );
      });
    switch (sort) {
      case "ByNameDescending":
        results = results
          .sort((a, b) => a.title.localeCompare(b.title))
          .reverse();
        break;
      case "ByNameAscending":
        results = results.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "ByPriceAscending":
        results = results.sort((a, b) => a.price - b.price);
        break;

      case "ByPriceDescending":
        results = results.sort((a, b) => a.price - b.price).reverse();
        break;
    }
    queryObject.brands = selectedBrands;
    queryObject.categories = selectedCategories;
    // setMinPrice(queryObject.minPrice);
    // setMaxPrice(queryObject.maxPrice);
    queryObject.view = view;
    setCopyButtonText("Copy Link");
    setQueryParams(queryObject.generateUrl());
    setSearchResults(results);
  }, [
    searchFieldValue,
    selectedBrands,
    selectedCategories,
    sort,
    minPrice,
    maxPrice,
    minStock,
    maxStock,
    queryParams,
    queryObject,
    setQueryParams,
    view,
  ]);
  // TODO should I add 'queryObject' and 'setQueryParams' ?
  // TODO also consider to add "search" button, to not overload API and improve performance

  // navigate to individual product page
  const navigate = useNavigate();
  const onProductClick = (id: string | number) => {
    navigate("/details/" + id.toString());
  };

  //localStorage.setItem("arr", JSON.stringify(idCart));
  return (
    <div className="main-page container">
      <div className="filters">
        <button className="btn" onClick={handleReset}>
          Reset Filters
        </button>{" "}
        <button
          className="btn"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopyButtonText("Copied URL to clipboard");
          }}
        >
          {copyButtonText}
        </button>
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
        <CustomSlider
          name="Price"
          min={Math.min(...products.map((o) => o.price))}
          max={Math.max(...products.map((o) => o.price))}
          onChange={handlePriceChange}
          typeOfData="Price"
          minValProp={minPrice}
          maxValProp={maxPrice}
          queryObject={queryObject}
        />
        <CustomSlider
          name="Stock"
          min={Math.min(...products.map((o) => o.stock))}
          max={Math.max(...products.map((o) => o.stock))}
          onChange={handleStockChange}
          typeOfData="Stock"
          minValProp={minStock}
          maxValProp={maxStock}
          queryObject={queryObject}
        />
      </div>
      <div className="main-page__product-list">
        <div className="product-list__header">
          <p className="btn product-list__sort-options">
            Sort{" "}
            <select value={sort} onChange={handleSortChange}>
              <option value="ByNameAscending">By Name A - Z</option>
              <option value="ByNameDescending">By Price Z - A</option>
              <option value="ByPriceAscending">Low Price First</option>

              <option value="ByPriceDescending">High Price First</option>
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
          <button
            onClick={() => setView(!view)}
            className="product-list__view-switch"
          >
            {view ? <p>Switch to Small Cards</p> : <p>Switch to Large Cards</p>}
          </button>
        </div>
        <div className="product-container">
          {searchResults.length === 0 && (
            <h2>Ничего не нашлось, попробуйте сузить критерии поиска </h2>
          )}
          {searchResults.map((item) => (
            <div key={item.id} className="product-container__wrapper">
              {view ? (
                <ProductCardLarge
                  price={item.price}
                  id={item.id}
                  handleChangeCart={handleChangeCart}
                  handleNavigate={() => onProductClick(item.id)}
                  title={item.title}
                  thumbnail={item.thumbnail}
                  description={item.description}
                />
              ) : (
                <ProductCard
                  price={item.price}
                  id={item.id}
                  handleChangeCart={handleChangeCart}
                  handleNavigate={() => onProductClick(item.id)}
                  title={item.title}
                  thumbnail={item.thumbnail}
                  description={item.description}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
