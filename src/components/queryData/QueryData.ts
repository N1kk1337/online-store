import { SortOptions } from "../../types/types";

interface QueryDataInterface {
  search: string;
  brands: string[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
  minStock: number;
  maxStock: number;
  sort: SortOptions;
  setSearch: (search: string) => void;
  setBrands: (brands: string[]) => void;
  setCategories: (categories: string[]) => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setMinStock: (minStock: number) => void;
  setMaxStock: (maxStock: number) => void;
  generateUrl: () => string;
  reset: (
    search: string,
    brands: string[],
    categories: string[],
    minPrice: number,
    maxPrice: number,
    minStock: number,
    maxStock: number,
    sort: SortOptions
  ) => void;
}
class QueryData implements QueryDataInterface {
  private static instance: QueryData;

  search;
  brands;
  categories;
  minPrice;
  maxPrice;
  minStock;
  maxStock;
  sort;

  private constructor(
    search: string = "",
    brands: string[] = [],
    categories: string[] = [],
    minPrice = 0,
    maxPrice: number,
    minStock = 0,
    maxStock: number,
    sort: SortOptions = "By Name"
  ) {
    this.search = search;
    this.brands = brands;
    this.categories = categories;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.minStock = minStock;
    this.maxStock = maxStock;
    this.sort = sort;
  }

  static getInstance(
    search: string = "",
    brands: string[] = [],
    categories: string[] = [],
    minPrice: number = 0,
    maxPrice: number,
    minStock: number = 0,
    maxStock: number,
    sort: SortOptions = "By Name"
  ): QueryData {
    if (!QueryData.instance) {
      QueryData.instance = new QueryData(
        search,
        brands,
        categories,
        minPrice,
        maxPrice,
        minStock,
        maxStock,
        sort
      );
    }
    return QueryData.instance;
  }

  setSort(sort: SortOptions) {
    this.sort = sort;
  }
  setSearch(search: string) {
    this.search = search;
  }

  setBrands(brands: string[]) {
    this.brands = brands;
  }

  setCategories(categories: string[]) {
    this.categories = categories;
  }

  setMinPrice(minPrice: number) {
    this.minPrice = minPrice;
  }

  setMaxPrice(maxPrice: number) {
    this.maxPrice = maxPrice;
  }

  setMinStock(minStock: number) {
    this.minStock = minStock;
  }

  setMaxStock(maxStock: number) {
    this.maxStock = maxStock;
  }
  generateUrl() {
    let url: string = "";
    url += this.search !== "" ? "search=" + this.search : "";
    url += this.brands.length !== 0 ? "&brands=" + this.brands : "";
    url += this.categories.length !== 0 ? "&categories=" + this.categories : "";

    url += this.minPrice !== 0 ? "&minPrice=" + this.minPrice : "";

    url += this.maxPrice !== 0 ? "&maxPrice=" + this.maxPrice : "";

    url += this.minStock !== 0 ? "&minStock=" + this.minStock : "";
    url += this.maxStock !== 0 ? "&maxStock=" + this.maxStock : "";
    url += this.sort !== "By Name" ? "&sort=" + this.sort : "";

    return url;
  }
  reset(
    search: string,
    brands: string[],
    categories: string[],
    minPrice: number,
    maxPrice: number,
    minStock: number,
    maxStock: number,
    sort: SortOptions
  ) {
    this.search = search;
    this.brands = brands;
    this.categories = categories;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.minStock = minStock;
    this.maxStock = maxStock;
    this.sort = sort;
  }
}

export default QueryData;
