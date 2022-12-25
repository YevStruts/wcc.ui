import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface ActionAreaCardProps {
    id: number;
    name: string;
    description: string;
    image_url: string;
}

const handleOnCartClick = (id: number) => {
    window.location.href = "/news/article?id=" + id;
};

const ActionAreaCard = ({ id, name, description, image_url }: ActionAreaCardProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => handleOnCartClick(id)}>
                <CardMedia component="img" height="140" image={image_url} alt="green iguana" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ActionAreaCard;
