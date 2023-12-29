
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const CardProducts = ({ product }) => {
    const { name, category, description} = product || {};
    return (
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
        <CardMedia component="img" height="300" image={products.image_link} alt="makeup"/>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {name} | {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {description}
        </Typography>
        </CardContent>
    </CardActionArea>
    </Card>
);
}

export default CardProducts;