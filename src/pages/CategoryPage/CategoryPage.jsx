import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CardProducts from "../../components/CardProducts/CardProducts";

const CategoryPage = () => {
  const [product, setProducts] = useState([]);
  let { categoryId } = useParams();

  useEffect(() => {
    axios("https://fakestoreapi.com/products").then((res) =>
      setProducts(res.data)
    );
  }, []);

  const filteredCharacters = product.filter((product) => {
    return product.category === categoryId;
  });

  return (
    <div className="Cards-List">
      {filteredCharacters.map((product) => {
        return (
          <div key={product.id}>
            <CardProducts product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryPage;