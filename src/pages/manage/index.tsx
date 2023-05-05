import { Autocomplete, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetTournamentsList } from "../../services/TournamentsService";
import { GetSchedule } from "../../services/GameService";
import { GameServerType } from "../tournaments/tournament";

const Title = "MANAGE";

interface TournamentProps {
    id: number,
    label: string
}

const Manage = () => {
    const [tournamentList, setTournamentList] = useState<TournamentProps[]>();
    const [tournament, setTournament] = useState<TournamentProps>();
    const [schedule, setSchedule] = useState<GameServerType[]>();

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
        console.log(value);
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
                                <TextField id="game-name" label="Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} mb={3}>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={[ "player1" ]}
                                                    renderInput={(params) => <TextField {...params} label="Player" />}
                                                />
                                            </Grid>
                                            <Grid item xs={2} textAlign={"center"} p={2}>
                                                0
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} textAlign={"center"} p={2}>
                                        -
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Grid container>
                                            <Grid item xs={2} textAlign={"center"} p={2}>
                                                0
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={[ "player2" ]}
                                                    renderInput={(params) => <TextField {...params} label="Player" />}
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