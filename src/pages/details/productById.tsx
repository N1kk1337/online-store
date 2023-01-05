import products from "../../assets/data/products";

const getProductById = (id: string | number | undefined) => {
  const serchId = products.find(function (val) {
    return val.id == id;
  });
  return serchId;
};

export default getProductById;
