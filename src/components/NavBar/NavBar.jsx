import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "./NavBar.css";
import logo from "../../assets/Logo.png";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const collections = ["higiene", "serums", "mascaras"];

        const promises = collections.map(async (collectionName) => {
          const q = query(collection(db, collectionName));
          const querySnapshot = await getDocs(q);
          const categoryNames = querySnapshot.docs.map((doc) => doc.data().categoria);
          return categoryNames;
        });

        const categoriesData = await Promise.all(promises);
        const uniqueCategories = Array.from(new Set(categoriesData.flat()));

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="NavBar">
      <ul>
        <img src={logo} alt="logo" id="logo" />
        <h1>New Moon Skin</h1>
        <Link className="li" to="/">
          Home
        </Link>
        <Link className="li" to="/about">
          About
        </Link>
        <Link className="li" to="/contact">
          Contact
        </Link>
        {categories.map((category) => (
          <Link key={category} className="li" to={`/category/${category}`}>
            {category}
          </Link>
        ))}
        <Link to="/cart">
        Mi Compra
        </Link>
        <Link className="li" to="/shop">
          <CartWidget />
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;