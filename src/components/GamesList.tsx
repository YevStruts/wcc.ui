import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Link } from 'react-router-dom';
import { FormatDateTime } from "../helpers/DateTimeHelper"
import { GameServerType } from '../pages/tournaments/tournament';

export default function GamesList(props: { schedule: GameServerType[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="center">Games</TableCell>
            <TableCell align="center">Score</TableCell>
            {/* <TableCell align="right">Replay</TableCell> */}
            <TableCell align="left">Youtube</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.schedule.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{FormatDateTime(row.scheduled, "MMMM dd, yyyy")}</TableCell>
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
                {row.youtubeUrls?.map((url, index) => (
                  <Link key={index} to={url}>
                    <SmartDisplayIcon htmlColor='#F30F0A' />
                  </Link>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}