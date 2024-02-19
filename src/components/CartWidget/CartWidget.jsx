import { useCart } from '../CartContext/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWidget = () => {
  const { cartItems } = useCart(); // Utiliza useCart para acceder al contexto

  return (
    <div id='carrito'>
      <ShoppingCartIcon />
      <span>{cartItems.length}</span>
    </div>
  );
}

export default CartWidget;
