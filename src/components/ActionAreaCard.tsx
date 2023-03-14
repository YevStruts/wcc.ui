import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

var decode = require('decode-html');

interface ActionAreaCardProps {
    id: number;
    name: string;
    description: string;
    image_url: string;
    on_click: () => void;
}

const ActionAreaCard = ({ id, name, description, image_url, on_click }: ActionAreaCardProps) => {
    return (
        <Card>
            <CardActionArea onClick={on_click}>
                <CardMedia component="img" height="140" image={image_url} alt="green iguana" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div dangerouslySetInnerHTML={{__html: decode(description ?? "")}} />
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ActionAreaCard;
