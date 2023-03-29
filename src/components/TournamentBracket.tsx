import { Grid } from "@mui/material";
import { Bracket } from "react-tournament-bracket";
import { Game } from "react-tournament-bracket/lib/components/model";
import { GameServerType } from "../pages/tournaments/tournament";

export default function TournamentBracket(props: { schedule: GameServerType[] }) {
    function ConvertToGames(schedule: GameServerType[]) {
        let games : Game[] = [];
        schedule.sort((a, b) => a.orderId > b.orderId ? 1 : -1)
        .map((item,i) => {
          /* TODO: Qualifying !!! Hardcoded */
          if (item.name !== 'Qualifying')
          {
            games.push({
              id: item.id.toString(),
              name: item.name,
              scheduled: item.scheduled,
              sides: {
                home: {
                  team: {
                    id: item.home.id.toString(),
                    name: item.home.name
                  },
                  score: {
                    score: item.home.score
                  }
                },
                visitor: {
                  team: {
                    id: item.visitor.id.toString(),
                    name: item.visitor.name
                  },
                  score: {
                    score: item.visitor.score
                  }
                }
              }
            });
          }
          return {};
        });
        return games;
    };

    function ConvertToBracketGame(index: number, game: Game, games: Game[]) {
      /* set left (home) */
      let homeIndex = (index * 2) + 1;
      if (games.length > homeIndex) {
        game.sides.home.seed = {
          displayName: "",
          rank: 1,
          sourceGame: games[homeIndex],
          sourcePool: {}
        };
        ConvertToBracketGame(homeIndex, games[homeIndex], games);
      }

      /* set right (visitor) */
      let visitorIndex = (index * 2) + 2;
      if (games.length > visitorIndex) {
        game.sides.visitor.seed = {
          displayName: "",
          rank: 1,
          sourceGame: games[visitorIndex],
          sourcePool: {}
        };
        ConvertToBracketGame(visitorIndex, games[visitorIndex], games);
      }

      return game;
    };

    const index = 0;
    const games: Game[] = ConvertToGames(props.schedule);
    const bracket = ConvertToBracketGame(index, games[index], games);

    return (
        <Grid container spacing={2}>
            <Bracket game={bracket} />
            {/* <BracketGame game={game_default} /> */}
        </Grid>
    );
}
