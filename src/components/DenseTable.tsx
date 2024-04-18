import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { format } from 'date-fns'

export interface ScheduleProps {
  id: string,
  date: string,
  // Name: string,
  sideA: string,
  sideB: string,
  scoreA: number,
  scoreB: number,
  youTube: string[] 
}

type DenseTableProps = {
  games: ScheduleProps[]
}

export default function DenseTable({ games } : DenseTableProps) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 160 }}>Date</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="center">Game</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell sx={{ width: 130 }} align="center">Youtube</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{format(new Date(row.date), 'MMMM dd, yyyy')}</TableCell>
              <TableCell align="right">{row.sideA}</TableCell>
              <TableCell align="center">{row.scoreA} - {row.scoreB}</TableCell>
              <TableCell align="left">{row.sideB}</TableCell>
              <TableCell align="center">
                {row.youTube?.map((url, index) => (
                    <a key={index} href={url} target="_blank">
                      <SmartDisplayIcon htmlColor='#F30F0A' />
                    </a>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}