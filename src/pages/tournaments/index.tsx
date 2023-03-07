import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import TournamentCard, { TournamentCardProps } from "../../components/TournamentCard";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetTournamentsList } from "../../services/TournamentsService";
import Strings from "../../components/LocalizedStrings";

const Title = Strings.tournaments_title;

function handleOnLearnMoreClick(id: number): void {
    window.location.href = "/tournaments/" + id;
}

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
                    <Grid container spacing={5}>
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
                                        on_learnmore_click={() => handleOnLearnMoreClick(id)}
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