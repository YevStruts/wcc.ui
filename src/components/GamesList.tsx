import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { FormatDateTime } from "../helpers/DateTimeHelper"
import { GameServerType } from '../pages/tournaments/tournament';
import Strings from './LocalizedStrings';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { WhoAmIContext } from './WhoAmIContext';
import { Constants } from '../helpers/ConstantHelper';

interface GamesListProps {
  schedule: GameServerType[],
  on_edit: (id : number) => void,
  on_delete: (id : number) => void,
}

export default function GamesList({ schedule, on_edit, on_delete } : GamesListProps) {
  const whoAmI = useContext(WhoAmIContext);

  function editGameHeader() {
    if (whoAmI === undefined || (whoAmI.role !== Constants.Roles.Admin && whoAmI.role !== Constants.Roles.Manager)) {
        return;
    }
    return (
      <TableCell sx={{ width: 120 }}></TableCell>
    )
  }

  function editGameColumn(id : number) {
    if (whoAmI === undefined || (whoAmI.role !== Constants.Roles.Admin && whoAmI.role !== Constants.Roles.Manager)) {
        return;
    }
    return (
      <TableCell>
        <IconButton aria-label="edit" onClick={() => on_edit(id)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => on_delete(id)}>
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
            <TableCell align="left">{Strings.tournament_games_date}</TableCell>
            {/* <TableCell align="center">{Strings.tournament_games_phase}</TableCell> */}
            <TableCell align="center">{Strings.tournament_games_games}</TableCell>
            <TableCell align="center">{Strings.tournament_games_score}</TableCell>
            {/* <TableCell align="right">Replay</TableCell> */}
            <TableCell align="left">{Strings.tournament_games_youtube}</TableCell>
            {editGameHeader()}
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.filter(rec => rec.name != 'none').map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{FormatDateTime(row.scheduled, "yyyy-MM-dd")}</TableCell>
              {/* <TableCell align="center">{row.name}</TableCell> */}
              <TableCell component="th" scope="row" align="center">
                {row.home.name} - {row.visitor.name}
              </TableCell>
              <TableCell align="center">{row.home.score} - {row.visitor.score}</TableCell>
              {/* <TableCell align="right">
                {row.replayUrls?.map((url, index) => (
                  <Link key={index} to={url}>
                    <FileDownloadIcon htmlColor='white'/>
                  </Link>
                ))}
              </TableCell> */}
              <TableCell align="left">
                {row.youtubeUrls?.filter(rec => rec != '').map((url, index) => (
                  <a key={index} href={url} target="_blank">
                    <SmartDisplayIcon htmlColor='#F30F0A' />
                  </a>
                ))}
              </TableCell>
              {editGameColumn(row.id)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}