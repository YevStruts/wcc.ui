import { Autocomplete, AutocompleteProps, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import GroupSizesColors from "../../components/GroupSizesColors";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";

const Title = "MANAGE";

// One time slot every 30 minutes.
const countPlayersOptions = [ 2, 4, 8, 16, 32 ];

interface TournamentProps {
    id: number,
    label: string
}

interface PlayerProps {
    id: number,
    name: string
}

const Manage = () => {
    const [tournament, setTournament] = useState<TournamentProps>();
    const [tournamentSize, setTournamentSize] = useState<number>();
    const [players, setPlayers] = useState<PlayerProps[]>([]);

    function onTournamentChange (event: object, value: any) {
        setTournament(value);
    }

    function onCountPlayersChange (event: object, value: any) {
        setTournamentSize(value);
        setPlayers([
            { id: 1, name: "Johnson"},
            { id: 2, name: "Kelly"},
            { id: 3, name: "Bellew"},
            { id: 4, name: "Stevenson"}
        ]);
    }

    const options = [
        { label: 'Lords of Kingdom', id: 1 },
    ];

    function getCountOfPlayersList() {
        return (
            <Autocomplete
                id="count-of-players"
                options={countPlayersOptions}
                getOptionLabel={(option) => option.toString() }
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Count of Players" />}
                onChange={onCountPlayersChange}
            />
        )
    }

    function getListOfGames() {
        if (tournamentSize !== undefined && tournamentSize > 0) {
            var stage = tournamentSize / 2;
            console.log("stage:" + stage);
        }
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
                                options={options}
                                renderInput={(params) => (
                                    <TextField {...params} label="tournament" />
                                )}
                                onChange={onTournamentChange}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={5}>
                            <GroupSizesColors />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} mb={3}>
                    
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container p={5}>
                            <Grid item xs={6}>
                                {players.map(({ id, name }: PlayerProps) => {
                                    return (
                                        <div>{name}</div>
                                    )
                                })}
                            </Grid>
                            <Grid item xs={6}>
                                {/* {[...Array(tournamentSize)].map((e, i) => 
                                    <Autocomplete
                                        key={i}
                                        options={players}
                                        disableCloseOnSelect
                                        renderInput={(params) => (
                                        <TextField {...params} label="player" variant="standard" />
                                    )}
                                />
                                )} */}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Manage;