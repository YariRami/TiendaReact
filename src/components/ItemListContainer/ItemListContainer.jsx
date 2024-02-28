import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import CardList from "../CardList/CardList";

const ItemListContainer = ({ categoria }) => {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
    try {
        const q = query(collection(db, categoria));
        const querySnapshot = await getDocs(q);
        const productsData = [];

        querySnapshot.forEach((doc) => {
        productsData.push({ ...doc.data(), id: doc.id });
        });

        setProducts(productsData);
        setLoading(false); 
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
    };

    fetchData();
}, [categoria]);

return (
    <div>
    {loading ? (
        <p>Cargando productos...</p>
    ) : (
        <CardList products={products} />
    )}
    </div>
);
};

export default ItemListContainer;
