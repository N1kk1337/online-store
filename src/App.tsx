import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.scss";
import Main from "./pages/main/Main";
import Cart from "./pages/cart/Cart";
import Details from "./pages/details/Details";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details" element={<Details />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
