import React, { createContext, useState, useContext, useEffect } from 'react';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    try {
      
      const productRef = doc(db, product.categoria, product.id);
      
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists() && productSnapshot.data().stock !== undefined) {
        const currentStock = productSnapshot.data().stock;

        if (currentStock > 0) {
          setCartItems([...cartItems, product]);

          await updateDoc(productRef, { stock: currentStock - 1 });
        } else {
          console.log(`No hay suficiente stock para ${product.name}`);
        }
      } else {
        console.log(`El documento ${product.id} no existe o no tiene la propiedad 'stock'.`);
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  const removeFromCart = async (productId, categoria) => {
    try {
      const productRef = doc(db, categoria, productId);
      
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists() && productSnapshot.data().stock !== undefined) {
        
        await updateDoc(productRef, { stock: productSnapshot.data().stock + 1 });
        
        setCartItems(cartItems.filter(item => item.id !== productId));
      } else {
        console.log(`El documento ${productId} no existe o no tiene la propiedad 'stock'.`);
      }
    } catch (error) {
      console.error('Error al remover del carrito:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartContext;
