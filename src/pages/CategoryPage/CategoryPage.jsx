import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Categorias</h1>
      <button onClick={() => navigate("/")}>Volver a Home</button>
    </div>
  )
}

export default CategoryPage
