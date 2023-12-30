import { useState, useEffect } from "react";
import axios from "axios";
import CardProducts from "../../components/CardProducts/CardProducts";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const [product, setProduct] = useState({}); 
  const { id } = useParams();

  useEffect(() => {
    axios(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  return (
    <div>
      {product.id ? <CardProducts product={product} /> : null}
    </div>
  );
};

export default DetailPage;