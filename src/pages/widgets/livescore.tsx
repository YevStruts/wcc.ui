import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import { Box, Grid, Typography } from "@mui/material";
import { GetLiveScore } from "../../services/WidgetService";
import { useParams } from "react-router-dom";

export interface LiveScoreType {
    id: string,
    sideA: string,
    sideB: string,
    scoreA: number,
    scoreB: number,
    width: number,
    marginTop: number,
    marginRight: number
}

const LiveScore = () => {
    const params = useParams();
    const [id, setId] = useState<string>(``);
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
        let paramId = params.id;
        if (paramId === null || paramId === undefined) return;
        GetLiveScore(paramId).then(data => {
            setLiveScore(data);
            setId(data.id);
        })
    }, []);

    useEffect(() => {
        const interval = setInterval(function() {
            GetLiveScore(id).then(data => {
                setLiveScore(data);
            })
        }, 10000);        
        return () => clearInterval(interval);
    }, [ id ]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: liveScore?.marginTop, marginRight: liveScore?.marginRight }}>
            <Paper elevation={10} style={{ paddingLeft:'1.0em', paddingRight:'1.0em', background: "black" }}>
                <Grid container direction='row' spacing={2}>
                    <Grid item width={liveScore?.width} style={{ height:'100%', textAlign: 'center' }}>
                        <Typography>{liveScore?.sideA}</Typography>
                    </Grid>
                    <Grid item style={{ height:'100%', width:'100px', textAlign: 'center' }}>
                        <Typography style={{ backgroundColor: "red", fontWeight: 500 }}>{liveScore?.scoreA} - {liveScore?.scoreB}</Typography>
                    </Grid>
                    <Grid item width={liveScore?.width} style={{ height:'100%', textAlign: 'center'}}>
                        <Typography>{liveScore?.sideB}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
export default LiveScore;