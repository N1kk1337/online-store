interface Product {
  id: any;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

interface Products {
  products: Array<Product>;
  total: number;
  skip: number;
  limit: number;
}

export default Product;
