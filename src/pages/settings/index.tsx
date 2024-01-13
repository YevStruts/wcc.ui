import { Button, Grid, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Strings from "../../components/LocalizedStrings";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetSettings, SaveSettings } from "../../services/SettingsService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Title = Strings.settings;

interface SettingsProps {
    id: number,
    nickname: string,
    token: string
}

const Settings = () => {
    const [settings, setSettings] = useState<SettingsProps>();
    const [nickname, setNickname] = useState("");
    const [token, setToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        GetSettings().then((response) => {
            setSettings(response);
        });
    }, []);

    useEffect(() => {
        setNickname(settings?.nickname ?? "");
        setToken(settings?.token ?? "");
    }, [ settings ]);

    function onSaveSettingsClick(): void {
        SaveSettings(nickname).then((response) => {
            alert("saved");
        });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();   
    }
    
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(token.toString());
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
                <Grid item xs={12} mb={1}>
                    {/* <TextField id="outlined-basic" label={Strings.settings_nickname} variant="outlined" value={nickname} /> */}
                    {/* {token !== "" && 
                        <TextField
                            
                            onChange={(newValue) => { setToken(newValue.target.value) }}
                            id="filled-1"
                            label="Token"
                            variant="outlined"
                            value={token}
                            sx={{mb:2}}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                    } */}
                  
                    {token !== "" && 
                        <TextField
                        label="Token"
                        variant="outlined"
                        type={showPassword ? "text" : "password"} 
                        value={token}
                        InputProps={{
                            readOnly: true, 
                          endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            <IconButton onClick={handleClick} color="primary">
                            <ContentCopyIcon style={{ color: "white" }}/>
                            </IconButton>
                            <Snackbar
                                message="Copied to clibboard"
                                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                autoHideDuration={2000}
                                onClose={() => setOpen(false)}
                                open={open}
                            />
                            </InputAdornment>
                          )
                        }}
                
                        />}


                </Grid>
                <Grid item xs={12} textAlign={"center"}>
                    <Button size="small" variant="contained" onClick={onSaveSettingsClick}>{Strings.settings_save}</Button>
                </Grid>
            </Grid>
        </Layout>
    )
};
export default Settings;