class Cart {
  private static instance: Cart;
  private data: { [id: number]: number } = {};

  private constructor() {}

  static getInstance(): Cart {
    if (!Cart.instance) {
      Cart.instance = new Cart();
    }
    return Cart.instance;
  }

  getData(): { [key: number]: number } {
    return this.data;
  }

  setData(data: { [key: number]: number }): void {
    this.data = data;
  }
  addItem(searchID: number): void {
    if (searchID in this.data) {
      this.data[searchID] += 1;
    } else {
      this.data[searchID] = 1;
    }
  }

  deleteItem(searchID: number): void {
    if (searchID in this.data) {
      this.data[searchID] -= 1;
      if (this.data[searchID] === 0) {
        delete this.data[searchID];
      }
    }
  }
  getValueById(searchID: number): number {
    return this.data[searchID];
  }
}

export default Cart;
