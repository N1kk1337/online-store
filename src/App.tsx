import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.scss";
import Main from "./pages/main/Main";
import Cart from "./pages/cart/Cart";
import Details from "./pages/details/Details";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Error404 from "./pages/404/Error404";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header title={"Online Store"} cartTotal={1234} />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="details/:detailsId" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details" element={<Details />} />
          <Route path="/404" element={<Error404 />} />

          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
