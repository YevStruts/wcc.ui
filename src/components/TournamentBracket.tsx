import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetTournamentBracket } from "../services/TournamentsService";
import { Bracket, BracketGame, BracketGenerator } from "react-tournament-bracket";
import { Game } from "react-tournament-bracket/lib/components/model";

export interface TournamentBracketProps {
    id: number;
}

const game_default = {
    id: "1",
    name: "final",
    scheduled: Number(new Date()),
    sides: {
      home: {
        team: {
          id: "1",
          name: "TBD"
        },
        score: {
          score: 0
        }
      },
      visitor: {
        team: {
          id: "2",
          name: "TBD"
        },
        score: {
          score: 0
        }
      }
    }
  };

export default function TournamentBracket({ id }: TournamentBracketProps) {
    const [tournamentBracket, setTournamentBracket] = useState<Game>();

    useEffect(() => {
        GetTournamentBracket(id).then((braket) => {
            setTournamentBracket(braket);
        });
    }, []);

    return (
        <Grid container spacing={2}>
            <Bracket game={tournamentBracket ?? game_default} />
            {/* <BracketGame game={game_default} /> */}
        </Grid>
    );
}
