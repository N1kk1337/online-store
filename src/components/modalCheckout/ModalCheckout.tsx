import { FC } from "react";
import "./ModalCheckout.scss";

type ModalCheckoutProps = { setIsOpen: Function };

const ModalCheckout: FC<ModalCheckoutProps> = ({ setIsOpen }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2 className="header-text">Personal details</h2>
        <input placeholder="Name" className="name" type="text" />
        <input placeholder="Phone Number" className="phone-number" type="tel" />
        <input placeholder="Address" className="address" type="text" />
        <input placeholder="E-Mail" className="email" type="text" />
        <h2 className="subheader-text">Credit card details</h2>
        <img className="card-img" src="" alt="" />
        <div className="card-container">
          <input
            placeholder="Card Number"
            className="card-number"
            type="number"
          />
          <input placeholder="DD/MM" className="valid-thru" type="number" />
          <input placeholder="CCV" className="ccv" type="number" />
          <div className="cards-errors-container"></div>
        </div>
        <button onClick={() => setIsOpen(false)} className="exit-btn">
          Exit
        </button>
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default ModalCheckout;
