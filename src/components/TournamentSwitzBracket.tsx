import { Grid } from "@mui/material";
import { Bracket } from "react-tournament-bracket";
import { Game } from "react-tournament-bracket/lib/components/model";
import { GameServerType } from "../pages/tournaments/tournament";

export default function TournamentSwitzBracket(props: { tournamentId: number }) {

    return (
        <Grid container spacing={2}>
            {/* <BracketGame game={game_default} /> */}
        </Grid>
    );
}