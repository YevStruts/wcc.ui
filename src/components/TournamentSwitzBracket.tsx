import { Avatar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Bracket } from "react-tournament-bracket";
import { Game } from "react-tournament-bracket/lib/components/model";
import { GameServerType, TableItemType } from "../pages/tournaments/tournament";
import Strings from "./LocalizedStrings";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rowstmp = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

export default function TournamentSwitzBracket(props: { record: TableItemType[] }) {
    // function createData(
    //     name: string,
    //     calories: number,
    //     fat: number,
    //     carbs: number,
    //     protein: number,
    // ) { 
    //     return { name, calories, fat, carbs, protein };
    // }
    debugger;

    return (
        <Grid container spacing={2}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell width={30}></TableCell>
            <TableCell>{Strings.tournament_table_name}</TableCell>
            <TableCell align="center">{Strings.tournament_table_games}</TableCell>
            <TableCell align="center">{Strings.tournament_table_scoreswon}</TableCell>
            <TableCell align="center">{Strings.tournament_table_scoresloss}</TableCell>
            {/* <TableCell align="center">AverageRatingoppWon</TableCell>
            <TableCell align="center">AverageRatingoppLoss</TableCell> */}
            <TableCell align="center">{Strings.tournament_table_scores}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.record.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index+1}</TableCell>
              <TableCell>
                <Avatar alt={row.name} src={row.avatar} sx={{ width: 24, height: 24 }}/>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.gamesCount}</TableCell>
              <TableCell align="center">{row.scoresWon}</TableCell>
              <TableCell align="center">{row.scoresLoss}</TableCell>
              {/* <TableCell align="center">{row.averageRatingOppWon}</TableCell>
              <TableCell align="center">{row.averageRatingOppLoss}</TableCell> */}
              <TableCell align="center">{row.scores}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
    );
}