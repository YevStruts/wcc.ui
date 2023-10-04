import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import { Icon, Typography } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';
import { FormatDateTime } from '../helpers/DateTimeHelper';

export interface LastFightsList {
  date: number,
  name: string,
  wins: number,
  losses: number,
  last6: string[],
  tournament: string,
  wld: number,
}

// function createData(
//   date: Date,
//   name: string,
//   wins: number,
//   losses: number,
//   last6: string[],
//   tournament: string,
//   wld: number,
// ) {
//   return { date, name, wins, losses, last6, tournament, wld };
// }

// const rows = [
//   createData(new Date(), 'Frozen yoghurt',      10,  3, [ '#080', '#800', '#800', '#080', '#080', '#080'], "Rating Games",  1),
//   createData(new Date(), 'Ice cream sandwich',   8,  2, [ '#800', '#080', '#800', '#080', '#080', '#800'], "Rating Games",  1),
//   createData(new Date(), 'Eclair',               3,  1, [ '#800', '#800', '#080', '#800', '#080', '#800'], "Rating Games",  0),
//   createData(new Date(), 'Cupcake',              5,  6, [ '#080', '#080', '#080', '#800', '#800', '#800'], "Rating Games",  -1),
//   createData(new Date(), 'Gingerbread',          7,  0, [ '#080', '#080', '#080', '#080', '#080', '#800'], "Rating Games",  1),
// ];

export default function BasicTable(props: { fights: LastFightsList[] | undefined }) {
  function WinLossDrawIcon(props: { wld: number; }) {
    const wld = props.wld;
    if (wld === 1) {
      return <Typography bgcolor="#080" width={40} align='center' sx={{ borderRadius: '5px' }}>W</Typography>;
    } else if (wld === -1) {
      return <Typography bgcolor="#800" width={40} align='center' sx={{ borderRadius: '5px' }}>L</Typography>;
    }
    return <Typography bgcolor="#888" width={40} align='center' sx={{ borderRadius: '5px' }}>D</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">w-l</TableCell>
            <TableCell align="right">Last fights</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="right" width={40}>Result</TableCell>
            <TableCell align="right">YouTube</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.fights?.map((row, index) => (
            <TableRow
              hover={true}
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell>{format(row.date, "yyyy-MM-dd")}</TableCell> */}
              <TableCell>{FormatDateTime(row.date, "yyyy-MM-dd")}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.wins}-{row.losses}</TableCell>
              <TableCell align="right">
                {row.last6.map((last6row) => (
                  <SquareIcon fontSize='small' htmlColor={last6row}></SquareIcon>
                ))
                }
                {/* <SquareIcon fontSize='small' htmlColor='#080'></SquareIcon>
                <SquareIcon fontSize='small' htmlColor='#080'></SquareIcon>
                <SquareIcon fontSize='small' htmlColor='#080'></SquareIcon>
                <SquareIcon fontSize='small' htmlColor='#800'></SquareIcon>
                <SquareIcon fontSize='small' htmlColor='#080'></SquareIcon>
                <SquareIcon fontSize='small' htmlColor='#080'></SquareIcon> */}
              </TableCell>
              <TableCell align="center">{row.tournament}</TableCell>
              <TableCell align="center" sx={{ textAlign: 'right' }}>
                <WinLossDrawIcon wld={row.wld} />
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}