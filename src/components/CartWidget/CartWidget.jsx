import React from 'react';
import { useCart } from '../CartContext/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWidget = () => {
  const { getTotalPrice } = useCart(); // Aquí debes tener getTotalPrice en lugar de getTotalQuantity

  return (
    <div id='carrito'>
      <ShoppingCartIcon />
      <span>Total: ${String(getTotalPrice())}</span>
    </div>
  );
}

export default CartWidget;
