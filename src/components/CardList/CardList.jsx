import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import CardProducts from "../CardProducts/CardProducts";
import "./CardList.css";

const CardList = ({ categoria }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const q = query(collection(db, categoria));
      const docs = [];
      const querySnapshot = await getDocs(q);
    
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setProducts(docs);
    };
    fetchData();
  }, [categoria]);

  return (
    <div className="grid">
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/detail/${product.id}`} style={{ textDecoration: "none" }}>
            <CardProducts product={product} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardList;