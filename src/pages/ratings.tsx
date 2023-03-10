import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Layout from "../layout/layout";
import { GetRating } from "../services/PlayerService";
import PageTitle from "../components/PageTitle";
import GridRating, { PlayerProps } from "../components/GridRating";
import Strings from "../components/LocalizedStrings";

const Title = Strings.ratings_title + " БЕРЕЗЕНЬ 2023";

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
                <Grid item xs={12}>
                    <GridRating players={players}></GridRating>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Ratings;
