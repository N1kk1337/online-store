import Product from "../../assets/model/product";
import productById from "../../pages/details/productById";

class Cart {
  private static instance: Cart;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): Cart {
    if (!Cart.instance) {
      Cart.instance = new Cart();
    }
    return Cart.instance;
  }

  // to iterate over storage, for some reason localStorage itself return [string, any][]
  // instead of [string, any]
  getData(): Array<[key: string, value: string]> {
    const items: [string, string][] = Object.entries(localStorage).map(
      ([key, value]) => {
        return [key, JSON.parse(value)];
      }
    );
    return items;
  }

  // setData(data: { [key: string]: string }): Storage {
  //   localStorage = data;
  // }
  //localStorage.setItem(myData.key, JSON.stringify(myData.value));

  addItem(searchID: number): void {
    if (searchID in localStorage) {
      localStorage.setItem(
        searchID.toString(),
        (Number(localStorage.getItem(searchID.toString()))! + 1).toString()
      );
    } else {
      localStorage.setItem(searchID.toString(), "1");
    }
  }

  deleteItem(searchID: number): void {
    if (searchID in localStorage) {
      localStorage.setItem(
        searchID.toString(),
        (Number(localStorage.getItem(searchID.toString()))! - 1).toString()
      );
      if (localStorage[searchID] <= 0) {
        localStorage.removeItem(searchID.toString());
      }
    }
  }

  getValueById(searchID: number): number {
    return Number(localStorage.getItem(searchID.toString()));
  }

  getProductFromCart(searchID: number): Product | undefined {
    return productById(searchID);
  }
}

export default Cart;
