import products from "../../assets/data/products";

const getProductById = (id: string | number | undefined) => {
  const searchId = products.find(function (val) {
    console.log(val);
    return val.id === id;
  });
  return searchId;
};

export default getProductById;
