import { Navigate, Route, Routes } from "react-router-dom";

import "./App.scss";
import Main from "./pages/main/Main";
import Cart from "./pages/cart/Cart";
import Details from "./pages/details/Details";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Error404 from "./pages/404/Error404";
import CartStorage from "./components/cartObject/cart";
import { useState } from "react";

function App() {
  const cartStorage = CartStorage.getInstance();
  const [cartTotalCount, setTotalCount] = useState<number>(
    cartStorage.getTotalNumber()
  );
  const [cartPrice, setCartPrice] = useState<number>(
    cartStorage.getTotalPrice()
  );
  const handlers = [
    () => setTotalCount(cartStorage.getTotalNumber()),
    () => setCartPrice(cartStorage.getTotalPrice()),
  ];

  return (
    <div className="wrapper">
      <Header
        title={"Online Store"}
        cartTotalCount={cartTotalCount}
        cartTotalPrice={cartPrice}
      />
      <Routes>
        <Route path="/" element={<Main handleChangeCart={handlers} />} />
        <Route
          path="/details/:detailsId"
          element={
            <Details cartVal={cartTotalCount} handleChangeCart={handlers} />
          }
        />
        <Route path="/cart" element={<Cart handleChangeCart={handlers} />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
