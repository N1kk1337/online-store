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
    <div className="wrapper">
      <Header title={"Online Store"} cartTotal={1234} />
      <Routes>
        <Route path="/online-store/" element={<Main />} />
        <Route path="/online-store/details/:detailsId" element={<Details />} />
        <Route path="/online-store/cart" element={<Cart />} />
        <Route path="/online-store/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/online-store/404" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
