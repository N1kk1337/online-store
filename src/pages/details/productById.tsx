import products from "../../assets/data/products";

const getProductById = (id: string | number) => {
  const serchId = products.filter(function (val) {
    return val.id === id;
  });
  return serchId;
};

export default getProductById;
