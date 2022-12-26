import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import TournamentCard, { TournamentCardProps } from "../../components/TournamentCard";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetTournamentsList } from "../../services/TournamentsService";

const Title = "Tournaments";

const Tournaments = () => {
    const [tournamentsList, setTournamentsList] = useState<TournamentCardProps[]>([]);

    useEffect(() => {
        GetTournamentsList().then((tournaments) => {
            setTournamentsList(tournaments);
        });
    }, []);

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {tournamentsList.map(({ id, name, image_url, count_players, date_start, date_created }: TournamentCardProps) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={id}>
                                    <TournamentCard
                                        id={id}
                                        name={name}
                                        image_url={image_url}
                                        count_players={count_players}
                                        date_start={date_start}
                                        date_created={date_created}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Tournaments;