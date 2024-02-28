import React, { useState, useEffect } from 'react';
import { useCart } from '../../components/CartContext/CartContext';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import CardProducts from '../../components/CardProducts/CardProducts';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
const { categoria, id } = useParams();
const { addToCart, removeFromCart } = useCart();
const [product, setProduct] = useState(null); 

useEffect(() => {
    const fetchProduct = async () => {
    try {

        const productRef = doc(db, categoria, id);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {

        setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        } else {
        console.error(`No se encontró ningún producto con ID ${id} en la colección ${categoria}.`);
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
    }
    };

    fetchProduct();
}, [categoria, id]); 

const handleAddToCart = () => {
    if (product) {
    addToCart(product);
    }
};

const handleRemoveFromCart = () => {
    if (product) {
    removeFromCart(product.id, categoria);
    }
};

if (!product) {
    return <p>Cargando producto...</p>;
}

return (
    <div className="ItemDetailContainer">
    <div key={product.id}>
        <CardProducts product={product} />
        <button onClick={handleAddToCart}>Agregar al carrito</button>
        <button onClick={handleRemoveFromCart}>Quitar del carrito</button>
    </div>
    </div>
);
};

export default ItemDetailContainer;
