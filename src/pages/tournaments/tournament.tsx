import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonProps, Grid, styled, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GamesList from "../../components/GamesList";
import PageTitle from "../../components/PageTitle";
import TournamentBracket from "../../components/TournamentBracket";
import Layout from "../../layout/layout";
import { GetParticipationStatus, GetTournament, Join, Leave } from "../../services/TournamentsService";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetSchedule } from "../../services/GameService";
import { GetRule } from "../../services/RuleService";
import { grey, orange } from "@mui/material/colors";
import Strings from "../../components/LocalizedStrings";

var decode = require('decode-html');

export interface PlayerServerType {
    id: number,
    name: string,
    score: number
}

export interface TournamentProps {
    id: number;
    name: string;
    description: string;
    image_url: string;
    participant: PlayerServerType[];
    isEnrollment: boolean,
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

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: grey[600],
    '&:hover': {
      backgroundColor: orange[700],
    },
}));

const Tournament = () => {
    const params = useParams();

    const [tournament, setTournament] = useState<TournamentProps>();
    const [schedule, setSchedule] = useState<GameServerType[]>();
    const [showJoin, setShowJoin] = useState(false);
    const [showLeave, setShowLeave] = useState(false);

    // TODO: temporary solution to disable bracket section
    const [displayBracket, setDisplayBracket] = useState(true);

    useEffect(() => {
        let id = parseInt(params.id ?? "0");
        GetTournament(id).then((tournament) => {
            setTournament(tournament);
            setDisplayBracket(id !== 4);
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
            GetParticipationStatus(tournament.id).then((result) => {
                /* result => true - already participated */
                if (tournament.isEnrollment) {
                    setShowJoin(!result);
                    setShowLeave(result);
                }
            });
        }
    }, [ tournament ]);

    function join() {
        if (tournament !== undefined) {
            Join(tournament.id).then((result) => {
                /* result => true - joined successfully */
                setShowJoin(!result);
                setShowLeave(result);
                window.location.reload();
            });
        }
    }

    function leave() {
        if (tournament !== undefined) {
            Leave(tournament.id).then((result) => {
                /* result => true - leaved successfully */
                setShowLeave(!result);
                setShowJoin(result);
                window.location.reload();
            });
        }
    }

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={tournament?.name ?? ""} />
                </Grid>
                <Grid item xs={12}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography>{Strings.tournament_rules}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{padding: 5}}>
                            <div dangerouslySetInnerHTML={{__html: decode(tournament?.description ?? "")}} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{Strings.tournament_participants}</Typography>
                        </AccordionSummary>
                        <AccordionDetails  sx={{padding: 5}}>
                            <Grid container spacing={5}>
                                {tournament?.participant.map(({ id, name }: PlayerServerType, index) => {
                                    return (
                                        <Grid  item xs={12} sm={6} md={4} key={id}>
                                            {index+1}. {name}
                                        </Grid>
                                    );
                                })}
                            </Grid>                            
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>{Strings.tournament_games}</Typography>
                        </AccordionSummary>
                        <AccordionDetails  sx={{padding: 5}}>
                            <GamesList schedule={schedule ?? schedule_default}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>{Strings.tournament_bracket}</Typography>
                        </AccordionSummary>
                        <AccordionDetails  sx={{padding: 5}}>
                            {displayBracket &&
                                <TournamentBracket schedule={schedule ?? schedule_default}></TournamentBracket>
                            }
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12} textAlign={"center"} m={1}>
                    {showJoin && 
                        <ColorButton variant="outlined" onClick={() => { join() }}>
                            {Strings.tournament_join}
                        </ColorButton>
                    }
                    {showLeave && 
                        <ColorButton variant="outlined" onClick={() => { leave() }}>
                            {Strings.tournament_leave}
                        </ColorButton>
                    }
                </Grid>
                <Grid item xs={12} mb={4}>
                    <Typography fontSize={14}>TL: {Strings.tournament_technical_lose}</Typography>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Tournament;