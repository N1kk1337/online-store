import { ChangeEvent, FC } from "react";
import "./ModalCheckout.scss";

type ModalCheckoutProps = { setIsOpen: Function };

const ModalCheckout: FC<ModalCheckoutProps> = ({ setIsOpen }) => {
  const formatDate = (event: ChangeEvent) => {
    let input = event.target as HTMLInputElement;

    // Limit the input to 5 characters
    if (input.value.length > 5) {
      input.value = input.value.slice(0, 5);
    }

    if (input.value.length === 3 && !input.value.match(/^\d{2}\/\d{2}$/)) {
      input.value = input.value.slice(0, 2);
    }

    // Add a forward slash '/' after the first two characters
    if (input.value.length === 2 && input.value.match(/^\d+$/)) {
      input.value = input.value + "/";
    }

    // Ensure that the first two characters represent a valid month (01 to 12)
    if (input.value.length >= 2) {
      let month = input.value.slice(0, 2);
      if (Number(month) > 12) {
        input.value = "12/";
      } else if (Number(month) < 1) input.value = "01/";
    }
  };

  const formatCCV = (event: ChangeEvent) => {
    let input = event.target as HTMLInputElement;
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
  };

  const formatCard = (event: ChangeEvent) => {
    let input = event.target as HTMLInputElement;
    if (input.value.length > 16) {
      input.value = input.value.slice(0, 16);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2 className="header-text">Personal details</h2>
        <input
          pattern="^[a-zA-Z]{3,}\s[a-zA-Z]{3,}(?:\s[a-zA-Z]{3,})*$"
          placeholder="Name"
          className="name"
          type="text"
        />
        <input
          pattern="^\+\d{9,}$"
          placeholder="Phone Number"
          className="phone-number"
          type="tel"
        />
        <input
          pattern="^[a-zA-Z]{5,}\s[a-zA-Z]{5,}\s[a-zA-Z]{5,}(?:\s[a-zA-Z]{5,})*$"
          placeholder="Address"
          className="address"
          type="text"
        />
        <input
          pattern="^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$"
          placeholder="E-Mail"
          className="email"
          type="text"
        />
        <h2 className="subheader-text">Credit card details</h2>
        <img className="card-img" src="" alt="" />
        <div className="card-container">
          <input
            onChange={formatCard}
            placeholder="Card Number"
            className="card-number"
            type="number"
            pattern="^\d{16}$"
          />
          <input
            onChange={formatDate}
            placeholder="MM/DD"
            className="valid-thru"
            type="text"
          />
          <input
            onChange={formatCCV}
            pattern="^\d{3}$"
            placeholder="CCV"
            className="ccv"
            type="number"
          />
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
