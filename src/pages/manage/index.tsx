import { Autocomplete, Button, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetTournament, GetTournamentParticipants, GetTournamentsList } from "../../services/TournamentsService";
import { GetSchedule } from "../../services/GameService";
import { GameServerType } from "../tournaments/tournament";

const Title = "MANAGE";

interface TournamentProps {
    id: number,
    label: string
}

interface PlayerProps {
    id: number,
    name: string,
    avatarUrl: string
}

const Manage = () => {
    const [tournamentList, setTournamentList] = useState<TournamentProps[]>();
    const [tournament, setTournament] = useState<TournamentProps>();
    const [schedule, setSchedule] = useState<GameServerType[]>();
    const [players, setPlayers] = useState<PlayerProps[]>();
    const [gameName, setGameName] = useState<string>();

    const [player1, setPlayer1] = useState<PlayerProps>();
    const [player2, setPlayer2] = useState<PlayerProps>();

    const [score1, setScore1] = useState<number>();
    const [score2, setScore2] = useState<number>();

    const [youtube1, setYouTube1] = useState<string>();
    const [youtube2, setYouTube2] = useState<string>();
    const [youtube3, setYouTube3] = useState<string>();

    useEffect(() => {
        GetTournamentsList().then(data => {
            let tmp : TournamentProps[] = [];
            data.forEach((item : { id: number, name: string }) => {
                tmp.push({ id: item.id, label: item.name });
            });
            setTournamentList(tmp);
        })
    },[]);
    
    useEffect(() => {
        if (tournament !== undefined) {
            GetTournamentParticipants(tournament.id).then((data) => {
                let tmp : PlayerProps[] = [];
                data.forEach((item : { id: number, name: string }) => {
                    tmp.push({ id: item.id, name: item.name, avatarUrl: `` });
                });
                setPlayers(tmp);
            });
            // GetTournament(tournament.id).then((data) => {
            //     debugger;
            //     setTournament(data);
            //     let tmp : PlayerProps[] = [];
            //     data.participant.forEach((item : { id: number, name: string }) => {
            //         tmp.push({ id: item.id, name: item.name });
            //     });
            //     setPlayers(tmp);
            // });
            GetSchedule(tournament.id).then((schedule: GameServerType[]) => {
                schedule.sort((a, b) => a.orderId > b.orderId ? 1 : -1);
                setSchedule(schedule);
                console.log(schedule)
            });
        };
    }, [ tournament ]);

    function onTournamentChange (event: object, value: any) {
        setTournament(value);
    };

    function onGameChange (event: object, value: any) {
        setGameName(value.name);

        setPlayer1({ id: value.home.id, name: value.home.name, avatarUrl: `` });       
        setPlayer2({ id: value.visitor.id, name: value.visitor.name, avatarUrl: `` });

        setScore1(value.home.score);
        setScore2(value.visitor.score);

        setYouTube1(value.youtubeUrls.length >= 1 ? value.youtubeUrls[0] : ``);
        setYouTube2(value.youtubeUrls.length >= 2 ? value.youtubeUrls[1] : ``);
        setYouTube3(value.youtubeUrls.length >= 3 ? value.youtubeUrls[2] : ``);
    };

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={12} mb={5}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Autocomplete
                                options={tournamentList ?? []}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField {...params} label="tournament" />
                                )}
                                onChange={onTournamentChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} mb={3}>
                    <Grid container>
                        <Grid container>
                            <Grid item xs={5}>
                                <Autocomplete
                                    options={schedule ?? []}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField {...params} label="games" />
                                    )}
                                    onChange={onGameChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} mb={3}>
                    
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container p={5}>
                            <Grid item xs={12} mb={3}>
                                <TextField id="game-name" placeholder="Name" variant="outlined" value={gameName} size="small" fullWidth  />
                            </Grid>
                            <Grid item xs={12} mb={3}>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="cb-player-1"
                                                    options={players ?? []}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => <TextField {...params} label="Player" />}
                                                    size="small"
                                                    value={player1 || null}
                                                />
                                            </Grid>
                                            <Grid item xs={2} textAlign={"center"} pl={1}>
                                                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  size="small" value={score1} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} textAlign={"center"} p={2}>
                                        -
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Grid container>
                                            <Grid item xs={2} textAlign={"center"} pr={1}>
                                                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} size="small" value={score2} />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="cb-player-2"
                                                    options={players ?? []}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => <TextField {...params} label="Player" />}
                                                    size="small"
                                                    value={player2 || null}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} mb={1}>
                                <TextField id="game-yt-1" placeholder="YouTube #1" variant="outlined" size="small" fullWidth value={youtube1} />
                            </Grid>
                            <Grid item xs={12} mb={1}>
                                <TextField id="game-yt-1" placeholder="YouTube #2" variant="outlined" size="small" fullWidth value={youtube2} />
                            </Grid>
                            <Grid item xs={12} mb={3}>
                                <TextField id="game-yt-1" placeholder="YouTube #3" variant="outlined" size="small" fullWidth value={youtube3} />
                            </Grid>
                            <Grid item xs={12} mb={1}>
                                <Button variant="contained">Save</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Manage;