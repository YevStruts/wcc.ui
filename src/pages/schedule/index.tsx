import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Grid, Pagination, Stack, TextField } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Strings from "../../components/LocalizedStrings";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import DenseTable, { ScheduleProps } from "../../components/DenseTable";
import { GetSchedule, GetScheduleCount } from "../../services/ScheduleService";
import { GetTournamentsList } from "../../services/TournamentsService";

const Title = Strings.schedule;

interface TournamentProps {
    id: string,
    name: string
}

const Schedule = () => {
    const [tournamentList, setTournamentList] = useState<TournamentProps[]>();
    const [tournament, setTournament] = useState<string>("");
    const [count] = useState<number>(20);
    const [pageCount, setPageCount] = useState<number>(1);
    const [games, setGames] = useState<ScheduleProps[]>([]);

    useEffect(() => {
        GetTournamentsList().then(tournaments => {
            setTournamentList(tournaments);
        })
    },[]);

    useEffect(() => {
        LoadSchedule(tournament, 1, count);
    }, []);

    function LoadSchedule(tournamentId: string, page: number, count: number) {
        debugger;
        GetSchedule(tournamentId.toString(), page.toString(), count.toString())
        .then((data) => {
            GetScheduleCount(tournamentId).then(data => {
                setPageCount(Math.ceil(data / count));
            })
            setGames(data);
        });
    }

    function handleChange(event: ChangeEvent<unknown>, page: number): void {
        LoadSchedule(tournament, page, count);
    }

    function onTournamentChange(event: SyntheticEvent<Element, Event>, value: TournamentProps | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<TournamentProps> | undefined): void {
        setTournament(value?.id ?? "");
        LoadSchedule(value?.id ?? "", 1, count);
    }

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={3} mb={3}>
                    <Autocomplete
                        options={tournamentList ?? []}
                        getOptionLabel={(option) => option.name}
                        disableCloseOnSelect
                        renderInput={(params) => (
                            <TextField {...params} label="Tournaments" variant="standard" />
                        )}
                        onChange={onTournamentChange}
                    />
                </Grid>
                <Grid item xs={12} mb={1}>
                    <DenseTable  games={games} />
                </Grid>
                <Grid item xs={12}>
                    <Stack alignItems="center">
                        <Pagination count={pageCount} onChange={handleChange} />
                    </Stack>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Schedule;