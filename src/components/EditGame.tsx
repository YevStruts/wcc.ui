import { useEffect, useState } from "react";
import { GameServerType, PlayerServerType } from "../pages/tournaments/tournament";
import { Paper, Grid, TextField, Autocomplete, Button } from "@mui/material";
import { SaveGame } from "../services/GameService";
import { GetPlayers } from "../services/PlayerService";

interface EditGameProps {
    game: GameServerType
}

interface PlayerProps {
    id: number,
    name: string,
    avatarUrl: string
    score: number
}

const EditGame = ({ game }: EditGameProps) => {

    const [gameId, setGameId] = useState<number>();
    const [gameName, setGameName] = useState<string>();

    const [player1, setPlayer1] = useState<PlayerProps>({ id: 0, name: `TBD`, avatarUrl: ``, score: 0 });
    const [player2, setPlayer2] = useState<PlayerProps>({ id: 0, name: `TBD`, avatarUrl: ``, score: 0 });

    const [score1, setScore1] = useState<number>();
    const [score2, setScore2] = useState<number>();

    const [youtube1, setYouTube1] = useState<string>();
    const [youtube2, setYouTube2] = useState<string>();
    const [youtube3, setYouTube3] = useState<string>();
    
    const [players, setPlayers] = useState<PlayerServerType[]>();

    useEffect(() => {
        if (game !== undefined) {
            setGameId(game.id);
            setGameName(game.name);

            setPlayer1({ id: game.home.id, name: game.home.name, avatarUrl: ``, score: 0 });       
            setPlayer2({ id: game.visitor.id, name: game.visitor.name, avatarUrl: ``, score: 0 });
    
            setScore1(game.home.score);
            setScore2(game.visitor.score);
    
            setYouTube1(game.youtubeUrls.length >= 1 ? game.youtubeUrls[0] : ``);
            setYouTube2(game.youtubeUrls.length >= 2 ? game.youtubeUrls[1] : ``);
            setYouTube3(game.youtubeUrls.length >= 3 ? game.youtubeUrls[2] : ``);
        }

        GetPlayers().then((data) => {
            setPlayers(data);
        });
    }, []);

    function OnSaveClicked(): void {
        if (game === undefined || game === null) return;

        game.name = gameName ?? game.name;
        game.scheduled = new Date().getTime();

        game.home.id = player1?.id ?? 0;
        game.home.name = player1?.name ?? ``;
        game.home.score = score1 ?? 0;

        game.visitor.id = player2?.id ?? 0;
        game.visitor.name = player2?.name ?? ``;
        game.visitor.score = score2 ?? 0;

        game.youtubeUrls[0] = youtube1 ?? ``;
        game.youtubeUrls[1] = youtube2 ?? ``;
        game.youtubeUrls[2] = youtube3 ?? ``;

        SaveGame(game);
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
        </>
    );
};

export default EditGame;
