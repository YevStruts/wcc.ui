import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Strings from "../../components/LocalizedStrings";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetSettings, SaveSettings } from "../../services/SettingsService";

const Title = Strings.settings;

interface SettingsProps {
    id: number,
    nickname: string
}

const Settings = () => {
    const [settings, setSettings] = useState<SettingsProps>();
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        GetSettings().then((response) => {
            setSettings(response);
        });
    }, []);

    useEffect(() => {
        setNickname(settings?.nickname ?? "");
    }, [ settings ]);

    function onSaveSettingsClick(): void {
        SaveSettings(nickname).then((response) => {
            alert("saved");
        });
    }

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={12} mb={5}>
                    {/* <TextField id="outlined-basic" label={Strings.settings_nickname} variant="outlined" value={nickname} /> */}
                    <TextField
                        onChange={(newValue) => { setNickname(newValue.target.value) }}
                        id="filled-1"
                        label="Nickname"
                        variant="outlined"
                        value={nickname}
                        sx={{mb:2}}
                    />
                </Grid>
                <Grid item xs={12} textAlign={"center"}>
                    <Button size="small" variant="contained" onClick={onSaveSettingsClick}>{Strings.settings_save}</Button>
                </Grid>
            </Grid>
        </Layout>
    )
};
export default Settings;