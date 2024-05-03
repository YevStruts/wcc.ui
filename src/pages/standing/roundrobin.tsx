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
import { Typography } from "@mui/material";

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
                if (!standingsMap.has(match.sideA)) {
                    standingsMap.set(match.sideA, {
                        player: match.sideA,
                        games: 0,
                        wins: 0,
                        losses: 0,
                        wl_wins: 0,
                        wl_losses: 0,
                        points: 0
                    });
                }
                if (!standingsMap.has(match.sideB)) {
                    standingsMap.set(match.sideB, {
                        player: match.sideB,
                        games: 0,
                        wins: 0,
                        losses: 0,
                        wl_wins: 0,
                        wl_losses: 0,
                        points: 0
                    });
                }
                const teamA = standingsMap.get(match.sideA)!;
                const teamB = standingsMap.get(match.sideB)!;
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
                } else {
                    teamA.points++;
                    teamB.points++;
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

    return (
        <TableContainer component={Paper}>
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
                    <TableCell align="right"></TableCell>
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
    );
}
export default RoundRobin;