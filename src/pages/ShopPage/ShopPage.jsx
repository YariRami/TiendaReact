import React, { useState } from "react";
import "./ShopPage.css";
import MessageSuccess from "../../components/MessageSuccess/MessageSuccess";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import TextField from "@mui/material/TextField";

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
  };

  return (
    <div style={styles.containerShop}>
      <h1>Shop</h1>
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
