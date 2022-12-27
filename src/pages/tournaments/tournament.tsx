import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetTournament } from "../../services/TournamentsService";

export interface TournamentProps {
    id: number;
    name: string;
    description: string;
    image_url: string;
}

const Tournament = () => {
    const params = useParams();

    const [tournament, setTournament] = useState<TournamentProps>();

    useEffect(() => {
        let id = params.id ?? "0";
        GetTournament(id).then((tournament) => {
            setTournament(tournament);
        });
    }, []);

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={tournament?.name ?? ""} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        Single Tournament
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Tournament;