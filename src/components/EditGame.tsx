import { useEffect, useState } from "react";
import { GameServerType, PlayerServerType } from "../pages/tournaments/tournament";
import { Paper, Grid, TextField, Autocomplete, Button } from "@mui/material";
import { SaveGame } from "../services/GameService";
import { GetPlayers } from "../services/PlayerService";
import { ScheduleProps } from "./DenseTable";

interface EditGameProps {
    game: ScheduleProps | undefined,
    on_save_click: () => void
}

interface PlayerProps {
    id: string,
    name: string,
    avatarUrl: string
    score: number
}

const EditGame = ({ game, on_save_click }: EditGameProps) => {

    const [gameId, setGameId] = useState<string>();
    const [gameName, setGameName] = useState<string>();

    const [player1, setPlayer1] = useState<PlayerProps>({ id: '', name: `TBD`, avatarUrl: ``, score: 0 });
    const [player2, setPlayer2] = useState<PlayerProps>({ id: '', name: `TBD`, avatarUrl: ``, score: 0 });

    const [score1, setScore1] = useState<number>();
    const [score2, setScore2] = useState<number>();

    const [youtube1, setYouTube1] = useState<string>();
    const [youtube2, setYouTube2] = useState<string>();
    const [youtube3, setYouTube3] = useState<string>();
    
    const [players, setPlayers] = useState<PlayerServerType[]>();

    useEffect(() => {
        GetPlayers().then((data) => {
            setPlayers(data);

            if (game !== undefined) {
                setGameId(game.id);
                // setGameName(game.name);

                var playerA = data.find((player: { id: string; name: string }) => {
                    return player.id === game.sideA[0]
                });

                var playerB = data.find((player: { id: string; name: string }) => {
                    return player.id === game.sideB[0]
                });

                setPlayer1({ id: playerA.id, name: playerA.name, avatarUrl: ``, score: 0 });       
                setPlayer2({ id: playerB.id, name: playerB.name, avatarUrl: ``, score: 0 });
        
                setScore1(game.scoreA);
                setScore2(game.scoreB);
        
                setYouTube1(game.youtube.length >= 1 ? game.youtube[0] : ``);
                setYouTube2(game.youtube.length >= 2 ? game.youtube[1] : ``);
                setYouTube3(game.youtube.length >= 3 ? game.youtube[2] : ``);
            }
        });
    }, []);

    function OnSaveClicked(): void {
        if (game === undefined || game === null) return;

        // game.name = gameName ?? game.name;
        // game.date = new Date().getTime();

        // game.id = player1?.id ?? 0;
        // game.sideA = player1?.name ?? ``;
        // game.scoreA = score1 ?? 0;

        // game.id = player2?.id ?? 0;
        // game.sideB = player2?.name ?? ``;
        // game.scoreB = score2 ?? 0;

        // game.youtube[0] = youtube1 ?? ``;
        // game.youtube[1] = youtube2 ?? ``;
        // game.youtube[2] = youtube3 ?? ``;
        debugger;

        SaveGame({
            id: game.id,
            date: game.date,
            // Name: string,
            gameType: game.gameType,
            sideA: player1?.id ?? 0,
            sideB: player2?.id ?? 0,
            scoreA: score1 ?? 0,
            scoreB: score2 ?? 0,
            tournamentId: game.tournamentId,
            youtube: [
                youtube1 ?? ``,
                youtube2 ?? ``,
                youtube3 ?? ``
            ] 
        });

        on_save_click();
    }

    return (
        <>
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
                                            options={/*players ??*/ []}
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
        </>
    );
};

export default EditGame;
