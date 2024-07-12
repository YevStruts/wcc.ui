import { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import Layout from "../../layout/layout";
import { GetRating } from "../../services/PlayerService";
import PageTitle from "../../components/PageTitle";
import GridRating, { PlayerProps } from "../../components/GridRating";
import Strings from "../../components/LocalizedStrings";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { grey } from "@mui/material/colors";

const Title = Strings.ratings_title;

const Ratings = () => {
    const [playersDefault, setPlayersDefault] = useState<PlayerProps[]>([]);
    const [players, setPlayers] = useState<PlayerProps[]>([]);

    useEffect(() => {
        GetRating().then((players) => {
            var playersDefault = players.filter((p: PlayerProps) => p.name != "");
            setPlayers(playersDefault);
            setPlayersDefault(playersDefault);
        });
    }, []);

    function filterPlayers(filterName : string, param : string) {
        switch(filterName) {
            case 'all':
                setPlayers(playersDefault);
                break;
            case 'country':
                setPlayers(playersDefault.filter((p: PlayerProps) => p.nation == param));
                break;
            case 'clan':
                setPlayers(playersDefault.filter((p: PlayerProps) => p.name.includes(param) ));
                break;
        }
    }

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={12} mt={2} textAlign="right">
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            filterPlayers('all', '');
                        }}
                        >
                        All
                    </Link>
                    <> | </>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            filterPlayers('country', 'ua');
                        }}
                        >
                        Ukraine
                    </Link>
                    <> | </>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            filterPlayers('country', 'pl');
                        }}
                        >
                        Poland
                    </Link>
                    <> | </>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            filterPlayers('clan', '[-CPS-]');
                        }}
                        >
                        CPS
                    </Link>
                    <> | </>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            filterPlayers('clan', '[CD]');
                        }}
                        >
                        CD
                    </Link>
                    <> | </>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            filterPlayers('clan', '[-H-]');
                        }}
                        >
                        H
                    </Link>
                    <> | </>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            filterPlayers('clan', '[-WN-]');
                        }}
                        >
                        WN
                    </Link>
                </Grid>
                <Grid item xs={12} pb={2}>
                    <Paper elevation={1}>
                        <Grid container pb={1} pt={1} pl={3} pr={3}>
                            <Grid item xs={10}>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', minWidth: 170 }}>
                                        <EmojiEventsIcon style={{ color: 'gold' }} fontSize="medium"></EmojiEventsIcon>
                                        <Typography fontSize={16} ml={1}>{Strings.ratings_worldchampion}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', minWidth: 210,  alignItems: "center" }}>
                                        {/* <Avatar alt={"[-UNION-]Artempro"} src={"https://cdn.discordapp.com/avatars/328305220582899712/f46b07356d766b5c228dc3fcae3a29b6.png"} sx={{ width: 24, height: 24 }}/>
                                        <Link href={"/profile/41"} underline="none" fontSize={16} color="white" ml={1} mr={1}>[-UNION-]Artempro</Link>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13"><path d="m0 0h15v18H0" fill="#fff"/><path d="m0 4h15v5H0" fill="#0083d6"/></svg> */}
                                        <Typography color={grey}>vacant</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <GridRating players={players}></GridRating>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Ratings;
