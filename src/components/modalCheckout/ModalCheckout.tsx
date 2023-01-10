import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageSwitcher from "../imageSwitcher/ImageSwitcher";
import "./ModalCheckout.scss";

type ModalCheckoutProps = { setIsOpen: Function };

const ModalCheckout: FC<ModalCheckoutProps> = ({ setIsOpen }) => {
  const [cardState, setCardState] = useState<string>("0");
  const [cardValid, setCardValid] = useState<boolean>(false);
  const [CVVValid, setCVV] = useState<boolean>(false);
  const [dateValid, setDateValid] = useState<boolean>(false);
  const [nameValid, setNameValid] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const [addressValid, setAddressValid] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);

  //check if date is longer then 5 (2 for months, 2 for year, 1 for slash)
  const formatDate = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 5) {
      input.value = input.value.slice(0, 5);
    }

    // check if user delete YY part of the date, delete slash
    if (input.value.length === 3 && !input.value.match(/^\d{2}\/\d{2}$/)) {
      input.value = input.value.slice(0, 2);
    }

    // check if user entered 2 numbers, add slash
    if (input.value.length === 2 && input.value.match(/^\d+$/)) {
      input.value = input.value + "/";
    }

    if (input.value.length >= 2) {
      const month = input.value.slice(0, 2);
      // if month is not valid, round it to the closest valid number
      if (Number(month) > 12) {
        input.value = "12/";
      } else if (Number(month) < 1) input.value = "01/";
    }

    //  final check for MM/YY format, is everything is fine, date is valid
    if (input.value.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      setDateValid(true);
    } else setDateValid(false);
  };

  const formatCCV = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    // forbid entering more then 3 numbers in the CVV field
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
    setCVV(/^\d{3}$/.test(input.value));
  };

  const formatCard = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;

    // forbid entering more then 16 numbers in the card number field
    if (input.value.length > 16) {
      input.value = input.value.slice(0, 16);
    }

    // check if card number is valid
    if (input.value.match(/^\d{16}$/)) {
      setCardValid(true);
    } else {
      setCardValid(false);
    }
    // card number to determine payment system
    setCardState(input.value);
  };
  const navigate = useNavigate();

  const handleSubmit = () => {
    // if everything is valid, when we click submit button, "process" the payment
    if (cardValid && CVVValid && dateValid) {
      alert("Заказ успешно оформлен!");
      setTimeout(() => {
        navigate("/");
      }, 5000);

      // TODO clear cart
    }
  };

  // TODO I think there is a way to manage first 4 without setState
  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2 className="header-text">Personal details</h2>
        <div className="input-container">
          <input
            onChange={(event) => setNameValid(event.target.checkValidity())}
            pattern="^[a-zA-Z]{3,}\s[a-zA-Z]{3,}(?:\s[a-zA-Z]{3,})*$"
            placeholder="Name"
            className="name"
            type="text"
          />
          {!nameValid && <p className="name-error">Invalid name</p>}
        </div>
        <div className="input-container">
          <input
            onChange={(event) => setPhoneValid(event.target.checkValidity())}
            pattern="^\+\d{9,}$"
            placeholder="Phone Number"
            className="phone-number"
            type="tel"
          />
          {!phoneValid && (
            <p className="phone-number-error">Invalid phone number</p>
          )}
        </div>
        <div className="input-container">
          <input
            onChange={(event) => setAddressValid(event.target.checkValidity())}
            pattern="^[a-zA-Z]{5,}\s[a-zA-Z]{5,}\s[a-zA-Z]{5,}(?:\s[a-zA-Z]{5,})*$"
            placeholder="Address"
            className="address"
            type="text"
          />
          {!addressValid && <p className="address-error">Invalid address</p>}
        </div>
        <div className="input-container">
          <input
            onChange={(event) => setEmailValid(event.target.checkValidity())}
            pattern="^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$"
            placeholder="E-Mail"
            className="email"
            type="text"
          />
          {!emailValid && <p className="email-error">Invalid email</p>}
        </div>
        <h2 className="subheader-text">Credit card details</h2>
        <div className="card-img">
          <ImageSwitcher value={cardState} />
        </div>
        <div className="card-container">
          <input
            onChange={formatCard}
            placeholder="Card Number"
            className="card-number"
            type="number"
            pattern="^\d{16}$"
          />
          <div className="date-n-ccv-container">
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
          </div>
          <div className="cards-errors-container">
            {!cardValid && <p>Card Number Error</p>}
            {!CVVValid && <p>CVV Error</p>}
            {!dateValid && <p>Date Error</p>}
            {cardValid && CVVValid && dateValid && <p>All good!</p>}
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="exit-btn">
          Exit
        </button>
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ModalCheckout;
