import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link, useParams } from "react-router-dom";
import CardProducts from "../../components/CardProducts/CardProducts";
import "./CategoryPage.css";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { categoria } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, categoria), where("categoria", "==", categoria));
        const querySnapshot = await getDocs(q);
        
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [categoria]);

  return (
    <div className="CategoryContainer">
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/detail/${categoria}/${product.id}`} style={{ textDecoration: "none" }}>
            <CardProducts product={product} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
