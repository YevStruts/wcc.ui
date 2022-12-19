import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Layout from "../layout/layout";
import { GetRating } from "../services/PlayerService";
import PageTitle from "../components/PageTitle";
import { Player } from "../models/Player";
import GridRating from "../components/GridRating";

const Title = "WORLD COSSACKS ORGANISATION RANKING JANUARY 2022";

const Ratings = () => {
    const [players, setPlayers] = useState<Player[]>([]);

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
                <Grid item xs={12}>
                    <GridRating players={players}></GridRating>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Ratings;
