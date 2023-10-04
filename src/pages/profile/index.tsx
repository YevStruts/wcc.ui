import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { useParams } from "react-router-dom";
import ShortStatisticsGrid from "../../components/ShortStatisticsGrid";
import LastFightsTable, { LastFightsList } from "../../components/LastFightsTable";
import { GetProfile } from "../../services/PlayerService";
import { FormatDateTime } from "../../helpers/DateTimeHelper";

interface ProfileProps {
    id: number;
    name: string;
    avatar: string;
    age: number;
    wins: number;
    losses: number;
    debut: number,
    lastFight: number,
    lastFightsList: LastFightsList[],
}

const Profile = () => {
    const params = useParams();
    const [profile, setProfile] = useState<ProfileProps>();

    useEffect(() => {
        let id = params.id ?? "0";
        GetProfile(id).then((data) => {
            setProfile(data);
        });
        
        // setProfile({
        //     id: 1,
        //     name: "[-UNION-]Artempro",
        //     avatar: "https://cdn.discordapp.com/avatars/328305220582899712/f46b07356d766b5c228dc3fcae3a29b6.png",
        //     // main statistics
        //     age: 20,
        //     wins: 21,
        //     losses: 0,
        //     debut: new Date("2013-09-11"),
        //     lastfihgt: new Date("2022-01-16")
        // });
    }, []);

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sx={{ margin: "auto" }}>
                            <Avatar alt={profile?.name} src={profile?.avatar} sx={{ width: 160, height: 160 }}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography fontSize={24}>{profile?.name}</Typography>
                                </Grid>
                                <Grid item xs={3}>Age</Grid>
                                <Grid item xs={9}>{profile?.age}</Grid>
                                <Grid item xs={3}>Record</Grid>
                                <Grid item xs={9}>{profile?.wins}-{profile?.losses}</Grid>
                                <Grid item xs={3}>Debut</Grid>
                                <Grid item xs={9}>{FormatDateTime(profile?.debut ?? 0, "yyyy-MM-dd")}</Grid>
                                {/* <Grid item xs={3}>Title Fights</Grid>
                                <Grid item xs={9}>0</Grid> */}
                                <Grid item xs={3}>Last Fight</Grid>
                                <Grid item xs={9}>{FormatDateTime(profile?.lastFight ?? 0, "yyyy-MM-dd")}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} m={4}>
                    <Grid container spacing={6}>
                        <Grid item xs={6}>
                            <ShortStatisticsGrid></ShortStatisticsGrid>
                        </Grid>
                        <Grid item xs={6}>
                            <ShortStatisticsGrid></ShortStatisticsGrid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <LastFightsTable fights={profile?.lastFightsList}></LastFightsTable>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Profile;

