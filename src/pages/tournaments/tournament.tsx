import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GamesList from "../../components/GamesList";
import PageTitle from "../../components/PageTitle";
import TournamentBracket from "../../components/TournamentBracket";
import Layout from "../../layout/layout";
import { GetTournament } from "../../services/TournamentsService";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetSchedule } from "../../services/GameService";
import TournamentRules, { Rule } from "../../components/TournamentRules";
import { GetRule } from "../../services/RuleService";

export interface TournamentProps {
    id: number;
    name: string;
    description: string;
    image_url: string;
}

export interface PlayerServerType {
    id: number,
    name: string,
    score: number
}
  
export interface GameServerType {
    id: number,
    orderId: number,
    name: string,
    scheduled: number,
    home: PlayerServerType,
    visitor: PlayerServerType,
    replayUrls: string[],
    youtubeUrls: string[],
}

const rule_default : Rule = {
    id: "0",
    name: "Default",
    season: "-",
    mapShape: "-",
    terrainType: "-",
    startingResources: "-",
    minerals: "-",
    mapSize: "-",
    startOptions: "-",
    baloonOptions: "-",
    cannons: "-",
    peaceTime: "-",
    eighteenthCenturyOptions: "-",
    capture: "-",
    dipCenterAndMarket: "-",
    allies: "-",
    limitOfPopulation: "-",
    gameSpeed: "-"
};

const schedule_default : GameServerType[] = [{
    id: 0,
    orderId: 0,
    name: "",
    scheduled: Number(new Date()),
    home: {
        id: 0,
        name: "TBD",
        score: 0
    },
    visitor: {
        id: 0,
        name: "TBD",
        score: 0
    },
    replayUrls: [],
    youtubeUrls: []
}];

const Tournament = () => {
    const params = useParams();

    const [tournament, setTournament] = useState<TournamentProps>();
    const [schedule, setSchedule] = useState<GameServerType[]>();
    const [rule, setRule] = useState<Rule>();

    useEffect(() => {
        let id = parseInt(params.id ?? "0");
        GetTournament(id).then((tournament) => {
            setTournament(tournament);
        });
    }, []);

    useEffect(() => {
        if (tournament !== undefined) {
            GetSchedule(tournament.id).then((schedule: GameServerType[]) => {
                schedule.sort((a, b) => a.orderId > b.orderId ? 1 : -1);
                setSchedule(schedule);
            });
        };
    }, [ tournament ]);

    useEffect(() => {
        if (tournament !== undefined) {
            GetRule(tournament.id).then((rule: Rule) => {
                setRule(rule);
            });
        }
    }, [ tournament ]);

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
                            <TournamentRules rule={rule ?? rule_default} />
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
                            <GamesList schedule={schedule ?? schedule_default}/>
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
                            <TournamentBracket schedule={schedule ?? schedule_default}></TournamentBracket>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Tournament;