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
import ConfirmationDialog from './ConfirmationDialog';
import { useContext, useState } from 'react';
import { DeleteGame } from '../services/GameService';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { WhoAmIContext } from './WhoAmIContext';
import { Constants } from '../helpers/ConstantHelper';

export interface ScheduleProps {
  id: string,
  scheduled: string,
  gameType: number,
  // Name: string,
  sideA: string,
  sideB: string,
  scoreA: number,
  scoreB: number,
  tournamentId: string,
  youTube: string[] 
}

type DenseTableProps = {
  games: ScheduleProps[],
  on_edit: (id: string) => void,
  on_delete: (id : string) => void,
}

export default function DenseTable({ games, on_edit, on_delete } : DenseTableProps) {
  const whoAmI = useContext(WhoAmIContext);
  
  function deleteGameHeader() {
    if (whoAmI === undefined || (whoAmI.role !== Constants.Roles.Admin && whoAmI.role !== Constants.Roles.Manager)) {
        return;
    }
    return (
      <TableCell></TableCell>
    )
  }

  function deleteGameColumn(id : string) {
    // if (whoAmI === undefined || (whoAmI.role !== Constants.Roles.Admin && whoAmI.role !== Constants.Roles.Manager)) {
    //     return;
    // }
    return (
      <TableCell align="center">
        <IconButton aria-label="edit" onClick={() => on_edit(id)} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => on_delete(id)} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    )
  }

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
            {deleteGameHeader()}
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{format(new Date(row.scheduled), 'MMMM dd, yyyy')}</TableCell>
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
              {deleteGameColumn(row.id)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}