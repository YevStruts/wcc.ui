import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import VoteCard from "../components/VoteCard";
import Layout from "../layout/layout";
import { Player } from "../models/Player";
import { GetPoll } from "../services/PlayerService";

const Title = "POLS";

const Poll = () => {
    const [pollList, setPoll] = useState<Player[]>([]);

    useEffect(() => {
        GetPoll().then((pollList) => {
            setPoll(pollList);
        });
    }, []);

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={1}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={12} textAlign={"center"} mb={4}>
                    <Typography>In your opinion, please define up to 5 TOP players in Cossacks 3</Typography>
                </Grid>
                <Grid item xs={12} alignItems={"center"}>
                    <Grid container>
                        <Grid item xs={1} md={4}></Grid>
                        <Grid item xs={10} md={4}>
                            <Stack spacing={1}>
                                <VoteCard id={1} pollList={pollList}></VoteCard>
                                <VoteCard id={2} pollList={pollList}></VoteCard>
                                <VoteCard id={3} pollList={pollList}></VoteCard>
                                <VoteCard id={4} pollList={pollList}></VoteCard>
                                <VoteCard id={5} pollList={pollList}></VoteCard>
                            </Stack>
                        </Grid>
                        <Grid item xs={1} md={4}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Poll;
