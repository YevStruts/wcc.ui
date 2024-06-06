import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { GetLiveScore, SaveLiveScore } from "../../services/WidgetService";
import { useParams } from "react-router-dom";
import { LiveScoreType } from "./livescore";
import Layout from "../../layout/layout";
import PageTitle from "../../components/PageTitle";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Title = `Widgets`;

const Widgets = () => {
    const params = useParams();
    const [liveScore, setLiveScore] = useState<LiveScoreType>({
        id: ``,
        sideA: ``,
        sideB: ``,
        scoreA: 0,
        scoreB: 0,
        width: 150,
        marginTop: 0,
        marginRight: 0
    });

    useEffect(() => {
        let id = params.id;
        if (id === null || id === undefined) return;
        GetLiveScore(id).then(data => {
            setLiveScore(data);
        })
    }, []);

    function OnSaveLiveScoreClick(event: object): void {
        SaveLiveScore(liveScore).then(data => {
            if (data.data.success == true) {
                alert("saved");
            }
        })
    }
    
    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={12}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>Live Score</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            <Grid item xs={3} alignContent={"center"}>
                                <TextField required id="standard-required" placeholder="Side A" variant="standard" value={liveScore.sideA} 
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setLiveScore(prevState => ({
                                            ...prevState,
                                            sideA: event.target.value
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <TextField required id="standard-required" variant="standard" type="number" value={liveScore.scoreA} 
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setLiveScore(prevState => ({
                                            ...prevState,
                                            scoreA: parseInt(event.target.value)
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField required id="standard-required" placeholder="Side B" variant="standard" value={liveScore.sideB}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setLiveScore(prevState => ({
                                            ...prevState,
                                            sideB: event.target.value
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <TextField required id="standard-required" variant="standard" type="number" value={liveScore.scoreB} 
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setLiveScore(prevState => ({
                                            ...prevState,
                                            scoreB: parseInt(event.target.value)
                                        }));
                                    }}
                                />                                        
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    <AccordionActions>
                        {/* <Button onClick={OnSavePlayerClick}>Load</Button> */}
                        <Button onClick={OnSaveLiveScoreClick}>Save</Button>
                    </AccordionActions>
                </Accordion>
                </Grid>
            </Grid>
        </Layout>
    );
}
export default Widgets;