import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link, useParams } from "react-router-dom";
import CardProducts from "../../components/CardProducts/CardProducts";
import { CartProvider } from "../../components/CartContext/CartContext";
import "./Detail.css";

const DetailPage = () => {
  const { categoria, id } = useParams();
  const [product, setProduct] = useState({});
  const { addToCart } = useContext(CartProvider); // Usa el contexto

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collections = ["higiene", "serums", "mascaras"];
        for (const collectionName of collections) {
          const q = query(collection(db, collectionName), where(documentId(), "==", id));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.docs.length === 1) {
            const doc = querySnapshot.docs[0];
            setProduct({ id: doc.id, ...doc.data() });
            return;
          }
        }

        console.error(`No se encontró ningún producto con ID ${id} en ninguna de las colecciones.`);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [categoria, id]);

  const handleAddToCart = () => {
  
    addToCart(product);
  };

  return (
    <div className="DetailContainer">
      {product.id ? (
        <div key={product.id}>
          <Link to={`/detail/${categoria}/${product.id}`} style={{ textDecoration: "none" }}>
            <CardProducts product={product} />
          </Link>
          <button onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
      ) : null}
    </div>
  );
};

export default DetailPage;
