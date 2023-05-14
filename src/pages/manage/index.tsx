import { Autocomplete, Grid, Paper, TextField } from "@mui/material";
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
                                                    id="combo-box-demo"
                                                    options={players ?? []}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => <TextField {...params} label="Player" />}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={2} textAlign={"center"} pl={1}>
                                                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  size="small"/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} textAlign={"center"} p={2}>
                                        -
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Grid container>
                                            <Grid item xs={2} textAlign={"center"} pr={1}>
                                                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} size="small" />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={players ?? []}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => <TextField {...params} label="Player" />}
                                                    size="small"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Manage;