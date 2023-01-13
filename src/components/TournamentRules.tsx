import { Grid, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export interface Rule {
    id: string,
    name: string,
    season: string,
    mapShape: string,
    terrainType: string,
    startingResources: string,
    minerals: string,
    mapSize: string,
    startOptions: string,
    baloonOptions: string,
    cannons: string,
    peaceTime: string,
    eighteenthCenturyOptions: string,
    capture: string,
    dipCenterAndMarket: string,
    allies: string,
    limitOfPopulation: string,
    gameSpeed: string
}

const TournamentRules = (props: { rule : Rule }) => {

    function RuleRow(props: { name: string, description: string }) {
        return (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.description}</TableCell>
            </TableRow>
        )
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography>some text</Typography>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Setting</TableCell>
                            <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <RuleRow name="Season" description={props.rule.season}></RuleRow>
                            <RuleRow name="Map shape" description={props.rule.mapShape}></RuleRow>
                            <RuleRow name="Terrain type" description={props.rule.terrainType}></RuleRow>
                            <RuleRow name="Starting resources" description={props.rule.startingResources}></RuleRow>
                            <RuleRow name="Minerals" description={props.rule.minerals}></RuleRow>
                            <RuleRow name="Map size" description={props.rule.mapSize}></RuleRow>
                            <RuleRow name="Start options" description={props.rule.startOptions}></RuleRow>
                            <RuleRow name="Baloon options" description={props.rule.baloonOptions}></RuleRow>
                            <RuleRow name="Cannons" description={props.rule.cannons}></RuleRow>
                            <RuleRow name="Peace time" description={props.rule.peaceTime}></RuleRow>
                            <RuleRow name="Eighteenth century options" description={props.rule.eighteenthCenturyOptions}></RuleRow>
                            <RuleRow name="Capture" description={props.rule.capture}></RuleRow>
                            <RuleRow name="Dip. center and market" description={props.rule.dipCenterAndMarket}></RuleRow>
                            <RuleRow name="Allies" description={props.rule.allies}></RuleRow>
                            <RuleRow name="Limit of population" description={props.rule.limitOfPopulation}></RuleRow>
                            <RuleRow name="Game speed" description={props.rule.gameSpeed}></RuleRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default TournamentRules;