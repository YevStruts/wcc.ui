import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, ButtonProps, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, styled, TextField, Typography } from "@mui/material";
import { useState, useEffect, ChangeEvent, ReactNode } from "react";
import { useParams } from "react-router-dom";
import GamesList from "../../components/GamesList";
import PageTitle from "../../components/PageTitle";
import TournamentBracket from "../../components/TournamentBracket";
import Layout from "../../layout/layout";
import { GetParticipationStatus, GetSwitzTable, GetTournament, Join, Leave } from "../../services/TournamentsService";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetSchedule } from "../../services/GameService";
import { GetRule } from "../../services/RuleService";
import { grey, orange } from "@mui/material/colors";
import Strings from "../../components/LocalizedStrings";
import TournamentSwitzBracket from "../../components/TournamentSwitzBracket";

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
    tournamentTypeId: number
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

export interface TableItemType {
    name: string,
    avatar: string,
    gamesCount: number,
    scoresWon: number,
    scoresLoss: number,
    averageRatingOppWon: number,
    averageRatingOppLoss: number,
    scores: number
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

const rows : TableItemType[] = [];
  
const Tournament = () => {
    const params = useParams();

    const [tournament, setTournament] = useState<TournamentProps>();
    const [schedule, setSchedule] = useState<GameServerType[]>();
    const [showJoin, setShowJoin] = useState(false);
    const [showLeave, setShowLeave] = useState(false);
    const [table, setTable] = useState<TableItemType[]>();

    // TODO: temporary solution to disable bracket section
    // const [displayBracket, setDisplayBracket] = useState(true);

    const [round, setRound] = useState<number>(6);
    const [scheduleForRound, setScheduleForRound] = useState<GameServerType[]>();

    useEffect(() => {
        let id = parseInt(params.id ?? "0");
        GetTournament(id).then((tournament) => {
            setTournament(tournament);
            // setDisplayBracket(id !== 4);
        });
    }, []);

    useEffect(() => {
        if (tournament !== undefined) {
            GetSchedule(tournament.id).then((schedule: GameServerType[]) => {
                schedule.sort((a, b) => a.orderId > b.orderId ? 1 : -1);
                setSchedule(schedule);
                
                if (tournament.tournamentTypeId === 3) {
                    var scheduleForRound = schedule?.filter((element) => {
                        return element.name.includes('R' + 6);
                    });
                    // setRound(2);
                    setScheduleForRound(scheduleForRound);
                }
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

    useEffect(() => {
        if (tournament !== undefined && tournament.tournamentTypeId === 3) {
            GetSwitzTable(tournament.id).then((data : TableItemType[]) => {
                data.sort((a, b) => {
                    // 1. Scores
                    if (a.scores < b.scores) return 1;
                    if (a.scores > b.scores) return -1;
                    // 2. Difference ScoresWon - ScoresLoss
                    if (a.scoresWon - a.scoresLoss < b.scoresWon - b.scoresLoss) return 1;
                    if (a.scoresWon - a.scoresLoss > b.scoresWon - b.scoresLoss) return -1;
                    // 3. Who has more scorewon
                    if (a.scoresWon < b.scoresWon) return 1;
                    if (a.scoresWon > b.scoresWon) return -1;
                    // 4. Who has less scoreloss
                    if (a.scoresLoss > b.scoresLoss) return 1;
                    if (a.scoresLoss < b.scoresLoss) return -1;
                    // 5. Who has higher average rating oponent won
                    if (a.averageRatingOppWon > b.averageRatingOppWon) return 1;
                    if (a.averageRatingOppWon < b.averageRatingOppWon) return -1;
                    // 6. Who has less average rating oponent loss
                    if (a.averageRatingOppLoss < b.averageRatingOppLoss) return -1;
                    if (a.averageRatingOppLoss > b.averageRatingOppLoss) return 1;
                    return 0;
                });
                setTable(data);
            });
        }
    }, [ tournament]);

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

    function ConditionalSchedule(props: { isSwitz: boolean; }) {
        const isSwitz = props.isSwitz;

        function handleChange(event: SelectChangeEvent<any>, child: ReactNode): void {
            var scheduleForRound = schedule?.filter((element) => {
                return element.name.includes('R' + event.target.value);
            });
            setRound(event.target.value);
            setScheduleForRound(scheduleForRound);
        }

        return (
          <>
            { isSwitz ?
                <>
                <FormControl style={{width: 120}}>
                        <InputLabel id="demo-simple-select-label">Round</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={round}
                            label="Round"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>1</MenuItem>Ц
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                </FormControl>
                <Box mb={5}></Box>
                <GamesList schedule={scheduleForRound ?? schedule_default} />
                </>
            :
                <GamesList schedule={schedule ?? schedule_default}/>
            }
          </>
        );
    }

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
                            <ConditionalSchedule isSwitz={tournament?.tournamentTypeId === 3 ?? false} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>{Strings.tournament_bracket}</Typography>
                        </AccordionSummary>
                        <AccordionDetails  sx={{padding: 5}}>
                            {tournament?.tournamentTypeId === 3 &&
                                <TournamentSwitzBracket record={table ?? rows }></TournamentSwitzBracket>
                            }
                            {tournament?.tournamentTypeId !== 3 &&
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