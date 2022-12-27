import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Grid } from '@mui/material';
import { format } from 'date-fns'

export interface TournamentCardProps {
  id: number;
  name: string;
  image_url: string;
  count_players: number;
  date_start: string;
  date_created: string;
  on_learnmore_click: () => void;
}

export default function TournamentCard({ id, name, image_url, count_players, date_start, date_created, on_learnmore_click }: TournamentCardProps) {

  let date_start_formatted = format(new Date(date_start), 'MMMM dd, yyyy');
  let date_created_formatted = format(new Date(date_created), 'MMMM dd, yyyy');

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="green iguana" height="140" image={image_url} />
      <CardContent>
        <Grid container>
          <Grid item xs={12} pb={1}>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <PersonIcon fontSize="small" />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body2" color="text.secondary">
              {count_players} participants
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <CalendarMonthIcon fontSize="small" />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body2" color="text.secondary">
              {date_start_formatted}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Created at {date_created_formatted}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={on_learnmore_click}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
