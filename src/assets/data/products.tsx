import data from "./products.json";
import Product from "../model/product";

const products: Array<Product> = data.products;

const newMoviesArray = products.map(function (current) {
  let product = Object.assign({}, current);
  product.count = 1;
  return product;
});

export default newMoviesArray;
