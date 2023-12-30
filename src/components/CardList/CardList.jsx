import { useState, useEffect } from "react";
import axios from "axios";
import CardProducts from "../CardProducts/CardProducts"
import "./CardList.css";
import { Link } from "react-router-dom";

const CardList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios("https://fakestoreapi.com/products").then((res) =>
      setProducts(res.data)
    );
  }, []);

  return (
    <div className="grid">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Link to={`/detail/${product.id}`} style={{ textDecoration: "none" }}>
              <CardProducts product={product} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;