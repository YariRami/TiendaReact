import React from 'react';
import "./ContacPage.css";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
  };

  return (
    <div className="contact-container">
      <h1>Contacto</h1>

      <p>¡Gracias por visitar New Moon Skin! Para cualquier pregunta o comentario, no dudes en ponerte en contacto con nosotros.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />

        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" rows="4" required></textarea>

        <button type="submit">Enviar mensaje</button>
      </form>
    </div>
  );
};

export default ContactPage;
