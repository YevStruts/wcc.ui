import { useEffect, useState } from "react";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import Layout from "../layout/layout";
import { GetRating } from "../services/PlayerService";
import PageTitle from "../components/PageTitle";
import GridRating, { PlayerProps } from "../components/GridRating";
import Strings from "../components/LocalizedStrings";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Title = Strings.ratings_title;

const Ratings = () => {
    const [players, setPlayers] = useState<PlayerProps[]>([]);

    useEffect(() => {
        GetRating().then((players) => {
            setPlayers(players);
        });
    }, []);

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={12} pt={2} pb={2}>
                    <Paper elevation={1}>
                        <Grid container pb={1} pt={1} pl={3} pr={3}>
                            <Grid item xs={10}>
                                <Stack direction="row" spacing={2}>
                                    <EmojiEventsIcon style={{ color: 'gold' }} fontSize="large"></EmojiEventsIcon>
                                    <Typography fontSize={20}>{Strings.ratings_worldchampion}</Typography>
                                    <Typography color="grey" fontSize={20}>vacant</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <GridRating players={players}></GridRating>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Ratings;
