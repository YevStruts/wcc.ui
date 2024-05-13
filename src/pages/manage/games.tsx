import { Autocomplete, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetTournamentParticipants, GetTournamentsList } from "../../services/TournamentsService";
import { GetSchedule, SaveGame } from "../../services/GameService";
import { GameServerType } from "../tournaments/tournament";

const Title = "Games";

interface TournamentProps {
    id: number,
    label: string
}

interface PlayerProps {
    id: number,
    name: string,
    avatarUrl: string
}

const Games = () => {
    const [tournamentList, setTournamentList] = useState<TournamentProps[]>();
    const [tournament, setTournament] = useState<TournamentProps>();
    const [schedule, setSchedule] = useState<GameServerType[]>();
    const [players, setPlayers] = useState<PlayerProps[]>();

    const [gameId, setGameId] = useState<number>();
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
        var game = schedule?.filter((element) => {
            return element.id === value.id
        })[0];

        if (game !== undefined) {
            setGameId(game.id);
            setGameName(value.name);

            setPlayer1({ id: value.home.id, name: value.home.name, avatarUrl: `` });       
            setPlayer2({ id: value.visitor.id, name: value.visitor.name, avatarUrl: `` });
    
            setScore1(value.home.score);
            setScore2(value.visitor.score);
    
            setYouTube1(value.youtubeUrls.length >= 1 ? value.youtubeUrls[0] : ``);
            setYouTube2(value.youtubeUrls.length >= 2 ? value.youtubeUrls[1] : ``);
            setYouTube3(value.youtubeUrls.length >= 3 ? value.youtubeUrls[2] : ``);
        }
    };

    function OnSaveClicked(): void {
        // if (gameId === undefined || gameId === null) return;
        // var game = schedule?.filter((element) => {
        //     return element.id === gameId
        // })[0];
        // if (game === undefined || game === null) return;

        // game.name = gameName ?? game.name;
        // game.scheduled = new Date().getTime();

        // game.home.id = player1?.id ?? 0;
        // game.home.name = player1?.name ?? ``;
        // game.home.score = score1 ?? 0;

        // game.visitor.id = player2?.id ?? 0;
        // game.visitor.name = player2?.name ?? ``;
        // game.visitor.score = score2 ?? 0;

        // game.youtubeUrls[0] = youtube1 ?? ``;
        // game.youtubeUrls[1] = youtube2 ?? ``;
        // game.youtubeUrls[2] = youtube3 ?? ``;

        // SaveGame(game);
    }

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
                                    getOptionLabel={(option) => option.name + ` ` + option.home.name + ` - ` + option.visitor.name}
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
                                <TextField id="game-name" placeholder="Name" variant="outlined" value={gameName} size="small" fullWidth
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setGameName(event.target.value);
                                    }}
                                />
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
                                                    onChange={(event: object, value: any) => {
                                                        setPlayer1(value);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={2} textAlign={"center"} pl={1}>
                                                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  size="small" value={score1}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        setScore1(Number(event.target.value));
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} textAlign={"center"} p={2}>
                                        -
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Grid container>
                                            <Grid item xs={2} textAlign={"center"} pr={1}>
                                                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} size="small" value={score2} 
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        setScore2(Number(event.target.value));
                                                    }}
                                                />
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
                                                    onChange={(event: object, value: any) => {
                                                        setPlayer2(value);
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} mb={1}>
                                <TextField id="game-yt-1" placeholder="YouTube #1" variant="outlined" size="small" fullWidth value={youtube1} 
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setYouTube1(event.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} mb={1}>
                                <TextField id="game-yt-1" placeholder="YouTube #2" variant="outlined" size="small" fullWidth value={youtube2} 
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setYouTube2(event.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} mb={3}>
                                <TextField id="game-yt-1" placeholder="YouTube #3" variant="outlined" size="small" fullWidth value={youtube3} 
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setYouTube3(event.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} mb={1}>
                                <Button variant="contained" onClick={() => OnSaveClicked() }>Save</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Games;