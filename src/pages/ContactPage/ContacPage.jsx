import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Contact Page</h1>
      <button onClick={() => navigate("/")}>Volver a Home</button>
    </div>
  );
};

export default ContactPage;