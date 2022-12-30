import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GamesList from "../../components/GamesList";
import PageTitle from "../../components/PageTitle";
import TournamentBracket from "../../components/TournamentBracket";
import Layout from "../../layout/layout";
import { GetTournament } from "../../services/TournamentsService";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        let id = parseInt(params.id ?? "0");
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
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography>Rules</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Games</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <GamesList />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>Bracket</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TournamentBracket id={1}></TournamentBracket>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Tournament;