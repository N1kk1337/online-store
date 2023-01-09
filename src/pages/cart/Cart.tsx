import { useState } from "react";
import ModalCheckout from "../../components/modalCheckout/ModalCheckout";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>HERE WILL BE CART</h1>
      <button onClick={() => setIsOpen(true)}>TEMP MODAL BUTTON</button>
      {isOpen && <ModalCheckout setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Cart;
