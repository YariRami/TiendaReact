import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useParams } from 'react-router-dom';
import CardProducts from '../../components/CardProducts/CardProducts';
import { useCart } from '../../components/CartContext/CartContext';
import './Detail.css';

const DetailPage = () => {
  const { categoria, id } = useParams();
  const [product, setProduct] = useState({});
  const { addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allowedCategories = ['higiene', 'serums', 'mascaras'];

        if (!allowedCategories.includes(categoria)) {
          console.error(`La categoría ${categoria} no es válida. Las categorías permitidas son: ${allowedCategories.join(', ')}`);
          return;
        }

        const productRef = doc(db, categoria, id);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        } else {
          console.error(`No se encontró ningún producto con ID ${id} en la colección ${categoria}.`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [categoria, id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id, categoria);
  };

  return (
    <div className="DetailContainer">
      {product.id ? (
        <div key={product.id}>
          <CardProducts product={product} />
          <button onClick={handleAddToCart}>Agregar al carrito</button>
          <button onClick={handleRemoveFromCart}>Quitar del carrito</button>
        </div>
      ) : (
        <p>No se encontró el producto.</p>
      )}
    </div>
  );
};

export default DetailPage;
