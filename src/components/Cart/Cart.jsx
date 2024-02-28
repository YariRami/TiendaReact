import React from 'react';
import { useCart } from '../CartContext/CartContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Cart = () => {
const { cartItems } = useCart();

    return (
        <div>
            <h2>Carrito de Compras</h2>
            <div   div className="cart-items">
            {cartItems.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 345, marginBottom: '20px' }}>
            <CardActionArea>
            <CardMedia
            component="img"
            height="500"
            image={item.img}
            alt={item.nombre}/>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Precio: {item.precio}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Cantidad: {item.quantity}
            </Typography>
            </CardContent>
            </CardActionArea>
            </Card>
        ))}
    </div>
    </div>
);
}

export default Cart;
