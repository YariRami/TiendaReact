import React, { createContext, useState, useContext } from 'react';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    try {
        // Obtener la referencia al documento en Firestore
        const productRef = doc(db, product.categoria, product.id);

        // Obtener la información actual del producto
        const productSnapshot = await getDoc(productRef);

        // Verificar si el documento existe y tiene la propiedad 'stock'
        if (productSnapshot.exists() && productSnapshot.data().stock !== undefined) {
            const currentStock = productSnapshot.data().stock;

            // Verificar si hay suficiente stock antes de agregar al carrito
            if (currentStock > 0) {
                // Verificar si el producto ya está en el carrito
                const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
                if (existingItemIndex !== -1) {
                    const updatedCartItems = [...cartItems];
                    updatedCartItems[existingItemIndex].quantity += 1;
                    setCartItems(updatedCartItems);
                } else {
                    // Agregar al carrito
                    setCartItems([...cartItems, { ...product, quantity: 1 }]);
                }

                // Actualizar el stock en Firestore
                await updateDoc(productRef, { stock: currentStock - 1 });
            } else {
                console.log(`No hay suficiente stock para ${product.nombre}`);
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
    // Obtener la referencia al documento en Firestore
    const productRef = doc(db, categoria, productId);
    
    // Obtener la información actual del producto
    const productSnapshot = await getDoc(productRef);

    // Verificar si el documento existe y tiene la propiedad 'stock'
    if (productSnapshot.exists() && productSnapshot.data().stock !== undefined) {
      // Actualizar el stock en Firestore
      await updateDoc(productRef, { stock: productSnapshot.data().stock + 1 });
      
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = cartItems.findIndex(item => item.id === productId);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity -= 1;
        // Si la cantidad llega a cero, eliminamos completamente el elemento del carrito
        if (updatedCartItems[existingItemIndex].quantity === 0) {
          updatedCartItems.splice(existingItemIndex, 1);
        }
        setCartItems(updatedCartItems);
      }
    } else {
      console.log(`El documento ${productId} no existe o no tiene la propiedad 'stock'.`);
    }
  } catch (error) {
    console.error('Error al remover del carrito:', error);
  }
};


  // Función para limpiar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Agrega una función para calcular la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };  

// Agrega una función para calcular el total de precios de los productos en el carrito
const getTotalPrice = () => {
  return cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
};  
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalQuantity, getTotalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartContext;
