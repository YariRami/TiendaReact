import React from 'react';
import ItemDetailContainer from '../../components/ItemDetailContainer/ItemDetailContainer';
import './Detail.css';

const DetailPage = () => {
  return (
    <div className="DetailPage">
      <ItemDetailContainer /> {/* Renderiza el nuevo componente */}
    </div>
  );
};

export default DetailPage;
