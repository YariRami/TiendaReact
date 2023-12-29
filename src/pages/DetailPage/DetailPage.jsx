import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CardProducts from "../../components/CardProducts/CardProducts";

const DetailPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
      .then(response => {
        const foundProduct = response.data.find(item => item.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
        }
      })
      .catch(error => {
        console.error('Error al obtener producto:', error);
      });
  }, [id]);

  return (
    <div>
      {Object.keys(product).length > 0 ? <CardProducts products={product} /> : null}
    </div>
  );
};

export default DetailPage;