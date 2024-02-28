import React, { useState } from "react";
import "./ShopPage.css";
import MessageSuccess from "../../components/MessageSuccess/MessageSuccess";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import TextField from "@mui/material/TextField";
import { useCart } from "../../components/CartContext/CartContext";

const styles = {
  containerShop: {
    textAlign: "center",
    paddingTop: 20,
  },
};

const initialState = {
  nombre: "",
  apellido: "",
  ciudad: "",
};

const ShopPage = () => {
  const [values, setValues] = useState(initialState);
  const [purchaseID, setPurchaseId] = useState(null);
  const { cartItems, clearCart } = useCart(); // Agrega la función clearCart

  // Función para calcular el total de la compra
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.precio * item.quantity;
    });
    return total;
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const docRef = await addDoc(collection(db, "purchasesCollection"), {
      values,
    });
    setPurchaseId(docRef.id);
    setValues(initialState);

    // Vaciar el carrito después de realizar la compra
    clearCart();
  };

  return (
    <div style={styles.containerShop}>
      <h1>Shop</h1>
      {/* Mostrar el total de la compra */}
      <h2>Total de la compra: ${calculateTotal()}</h2>
      <form className="FormContainer" onSubmit={onSubmit}>
        <TextField
          placeholder="Nombre"
          style={{ margin: 10, width: 400 }}
          name="nombre"
          value={values.nombre}
          onChange={onChange}
          required
        />
        <TextField
          placeholder="Apellido"
          style={{ margin: 10, width: 400 }}
          name="apellido"
          value={values.apellido}
          onChange={onChange}
          required
        />
        <TextField
          placeholder="Ciudad"
          style={{ margin: 10, width: 400 }}
          name="ciudad"
          value={values.ciudad}
          onChange={onChange}
          required
        />
        <button className="btnASendAction">Enviar</button>
      </form>
      {purchaseID ? <MessageSuccess purchaseID={purchaseID} /> : null}
    </div>
  );
};

export default ShopPage;