import { Grid, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Strings from "./LocalizedStrings";

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
            <Grid item xs={12} sm={6}>
                <Typography>some text</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                            <TableCell>{Strings.tournament_rules_settings_setting}</TableCell>
                            <TableCell>{Strings.tournament_rules_settings_value}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <RuleRow name={Strings.tournament_rules_settings_season} description={props.rule.season}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_map_shape} description={props.rule.mapShape}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_terrain_type} description={props.rule.terrainType}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_starting_resources} description={props.rule.startingResources}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_minerals} description={props.rule.minerals}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_map_size} description={props.rule.mapSize}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_start_options} description={props.rule.startOptions}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_baloon_options} description={props.rule.baloonOptions}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_cannons} description={props.rule.cannons}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_peace_time} description={props.rule.peaceTime}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_18_century_options} description={props.rule.eighteenthCenturyOptions}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_capture} description={props.rule.capture}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_dc_and_mrkt} description={props.rule.dipCenterAndMarket}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_allies} description={props.rule.allies}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_limit_of_population} description={props.rule.limitOfPopulation}></RuleRow>
                            <RuleRow name={Strings.tournament_rules_settings_game_speed} description={props.rule.gameSpeed}></RuleRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default TournamentRules;