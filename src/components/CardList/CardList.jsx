import { useState, useEffect } from "react";
import axios from "axios";
import CardProducts from "../CardProducts/CardProducts";
import "./CardList.css";
import { Link } from "react-router-dom";

const CardList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
        .then((response )=> setProducts(response.data.products)
        );
    }, []);
    return (
        <div className="grid">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => {
              return (
                <div key={product.id}>
                  <Link to={`detail/${product.id}`}>
                    <CardProducts products={product} />
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No hay productos disponibles</p>
          )}
        </div>
      );
    };

export default CardList;
