import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetStanding } from "../../services/StandingService";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from "@mui/material";

interface Standing {
    player: string;
    games: number;
    wins: number;
    losses: number;
    wl_wins: number;
    wl_losses: number;
    points: number;
}

const RoundRobin = () => {
    const params = useParams();
    const [standings, setStandings] = useState<Standing[]>([]);

    useEffect(() => {
        let id = params.id;
        if (id === null || id === undefined) return;
        GetStanding(id).then((data) => {
            const standingsMap: Map<string, Standing> = new Map();
            data.forEach((match: { result: string; sideA: string; sideB: string; }) => {
                const result = match.result.split('-').map(Number);
                const scoreA = result[0];
                const scoreB = result[1];
                if (!standingsMap.has(match.sideA[0])) {
                    standingsMap.set(match.sideA[0], {
                        player: match.sideA[0],
                        games: 0,
                        wins: 0,
                        losses: 0,
                        wl_wins: 0,
                        wl_losses: 0,
                        points: 0
                    });
                }
                if (!standingsMap.has(match.sideB[0])) {
                    standingsMap.set(match.sideB[0], {
                        player: match.sideB[0],
                        games: 0,
                        wins: 0,
                        losses: 0,
                        wl_wins: 0,
                        wl_losses: 0,
                        points: 0
                    });
                }
                const teamA = standingsMap.get(match.sideA[0])!;
                const teamB = standingsMap.get(match.sideB[0])!;
                teamA.games++;
                teamB.games++;

                teamA.points += scoreA;
                teamB.points += scoreB;

                if (scoreA > scoreB) {
                    teamA.wins++;
                    teamB.losses++;
                } else if (scoreA < scoreB) {
                    teamB.wins++;
                    teamA.losses++;
                }
                teamA.wl_wins += scoreA;
                teamA.wl_losses += scoreB;
                teamB.wl_wins += scoreB;
                teamB.wl_losses += scoreA;
            });
            const standings: Standing[] = Array.from(standingsMap.values());
            standings.sort((a, b) => a.wl_losses - b.wl_losses);
            standings.sort((a, b) => b.wl_wins - a.wl_wins);
            standings.sort((a, b) => (b.wl_wins - b.wl_losses) - (a.wl_wins - a.wl_losses));
            standings.sort((a, b) => b.points - a.points);
            setStandings(standings);
        });
    }, []);

    var position = 0;
    var positionState = ``;
    var positionValue = 0;
    function DeterminePosition(record: Standing) {
        let newState = `${record.points}-${record.wl_wins}-${record.wl_losses}-${record.wins}-${record.losses}`;
        position++;
        if (positionState !== newState)
        {
            positionState = newState;
            positionValue = position;
            return positionValue;   
        }
        return positionValue;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TableContainer component={Paper} sx={{ maxWidth:850 }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><Typography color="grey">#</Typography></TableCell>
                            <TableCell align="left"><Typography color="grey">name</Typography></TableCell>
                            <TableCell align="right"><Typography color="grey">g</Typography></TableCell>
                            <TableCell align="right"><Typography color="grey">w</Typography></TableCell>
                            <TableCell align="right"><Typography color="grey">l</Typography></TableCell>
                            <TableCell align="right"><Typography color="grey">w-l</Typography></TableCell>
                            <TableCell align="right"><Typography color="grey">p</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {standings.map((row) => (
                        <TableRow
                            key={row.player}
                        >
                            <TableCell align="center">{DeterminePosition(row)}</TableCell>
                            <TableCell align="left">{row.player}</TableCell>
                            <TableCell align="right">{row.games}</TableCell>
                            <TableCell align="right">{row.wins}</TableCell>
                            <TableCell align="right">{row.losses}</TableCell>
                            <TableCell align="right">{row.wl_wins}-{row.wl_losses}</TableCell>
                            <TableCell align="right">{row.points}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default RoundRobin;