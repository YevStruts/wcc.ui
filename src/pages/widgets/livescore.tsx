import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
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

const Show = { display: "flex" };
const Hide = { display: "none" };

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
    const [showInfo, setShowInfo] = useState(false);

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

    // useEffect(() => {
    //     const BarInterval = setInterval(() => {
    //         setShowInfo(true)
    //         const BarTimeout = setTimeout(() => {
    //             setShowInfo(false)
    //         }, 3000);
    //         return () => {
    //             clearTimeout(BarTimeout);
    //         };
    //     }, 13000);
    //     return () => {
    //         clearInterval(BarInterval);
    //         // setNumber({});
    //     };
    // }, []);

    function BasicCard() {
        // const BarInterval = setInterval(() => {
        //     setShowInfo(true)
        //     // const BarTimeout = setTimeout(() => {
        //     //     setShowInfo(false)
        //     //     console.log("5000 run out");
        //     // }, 5000);
        //     // console.log("20000 run out");
        //     // return () => {
        //     //     clearTimeout(BarTimeout);
        //     // };
        // }, 20000);
        // // return () => {
        // //     clearInterval(BarInterval);
        // //     // setNumber({});
        // // };

        return (
            <Card sx={{ width: liveScore.width*1.5, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, paddingTop: 0.5 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        1. 0pt5k (Saxony) - Rippi<br/>
                        2. 0pt1k (England) - Detrom<br/>
                        3. 15pt5k (Turkey)<br/>
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: liveScore?.marginTop, marginRight: liveScore?.marginRight }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }} style={ showInfo ? Show : Hide }>
                {BasicCard()}
            </Box>
        </>
    );
}
export default LiveScore;