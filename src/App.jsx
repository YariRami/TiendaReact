import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContacPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import { CartProvider } from "./components/CartContext/CartContext"; 

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <CartProvider>
          <NavBar higiene="higiene" serums="serums" mascaras="mascaras" />
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/category/:categoria" element={<CategoryPage />} />
          <Route path="/detail/:categoria/:id" element={<DetailPage />} />
          <Route path="/shop" element={<ShopPage />} />
          </Routes>
        </CartProvider>
      </div>
    </Router>
  );
};

export default App;
