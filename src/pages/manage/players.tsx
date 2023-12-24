import { Autocomplete, Button, Checkbox, Grid, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetPlayers, UpdatePlayer } from "../../services/PlayerService";
import { GetCountries } from "../../services/CountriesService";
import { CheckBox } from "@mui/icons-material";

export interface PlayersProps {
    id: number;
    name: string;
    image_url: string;
    countryId: number;
    isActive: boolean;
}

interface CountryProps {
    id: number;
    name: string;
    code: string;
}

const Players = () => {
    // const params = useParams();

    const [players, setPlayers] = useState<PlayersProps[]>();
    const [countries, setCountries] = useState<CountryProps[]>();
    
    const [player, setPlayer] = useState<PlayersProps>();

    const [name, setName] = useState<string>();
    const [country, setCountry] = useState<CountryProps>();

    const [isActive, setIsActive] = useState<boolean>(true);

    useEffect(() => {
        GetCountries().then((data) => {
            setCountries(data);
        });
        GetPlayers().then((data) => {
            setPlayers(data);
        });
    }, []);

    useEffect(() => {
        if (player !== undefined) {
            setName(player.name);

            var country = countries?.filter((element) => {
                return element.id === player.countryId
            })[0];
            setCountry(country);

            setIsActive(player.isActive);
        }
    }, [player]);

    function onPlayerChange(event: object, value: any): void {
        setPlayer(value);

        var country = countries?.filter((element) => {
            return element.id === value.countryId
        })[0];
        setCountry(country);

        setIsActive(value.isActive);
    }

    function onCountryChange(event: object, value: any): void {
        setCountry(value);
    }

    function handleIsActiveChange(event: object, checked: boolean): void {
        setIsActive(checked);
    }

    function OnSavePlayerClick(event: object): void {
        if (player === null || player === undefined) return;

        if (name !== null && name !== undefined)
            player.name = name;

        if (country !== null && country !== undefined)
            player.countryId = country.id;

        if (isActive !== null && isActive !== undefined)
            player.isActive = isActive;

        UpdatePlayer(player).then((response) => {
            if(response.status === 200 && response.data === true) {
                alert("Saved");
            } else {
                console.log(response.status + ':' + response.data);
            }
        });
    }

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text="PLAYERS" />
                </Grid>
                <Grid item xs={12} mb={5}>
                    <Autocomplete
                        options={players ?? []}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField {...params} label="players" />
                        )}
                        onChange={onPlayerChange}
                    />
                </Grid>
                <Grid item xs={12} mb={2}>
                    <Grid item xs={4} pr={2} textAlign={"center"}>
                        <TextField id="player-name" placeholder="Name" variant="outlined" value={name} size="small" fullWidth
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setName(event.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} mb={2}>
                    <Autocomplete
                        options={countries ?? []}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField {...params} label="countries" />
                        )}
                        value={country || null}
                        onChange={onCountryChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    Is Active:
                    <Checkbox
                        defaultChecked={false}
                        checked={isActive}
                        onChange={handleIsActiveChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Grid>
                <Grid item xs={12} mt={3} textAlign={"right"}>
                    <Button variant="contained" onClick={OnSavePlayerClick}>Save</Button>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Players;