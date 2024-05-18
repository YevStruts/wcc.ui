import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Grid, Pagination, Stack, TextField } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Strings from "../../components/LocalizedStrings";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import DenseTable, { ScheduleProps } from "../../components/DenseTable";
import { GetSchedule, GetScheduleCount } from "../../services/ScheduleService";
import { GetTournamentsList } from "../../services/TournamentsService";
import { DeleteGame, GetGame } from "../../services/GameService";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import EditGameDialog from "../../components/EditGameDialog";

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

    const [editGameDialog, setEditGameDialog] = useState<boolean>(false);
    const [game, setGame] = useState<ScheduleProps>();

    const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
    const [gameDelete, setGameDelete] = useState<string>("");

    useEffect(() => {
        GetTournamentsList().then(tournaments => {
            setTournamentList(tournaments.reverse());
        })
    },[]);

    useEffect(() => {
        LoadSchedule(tournament, 1, count);
    }, []);

    function LoadSchedule(tournamentId: string, page: number, count: number) {
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

    function OnGameEdit(id : string) {
        GetGame(id).then((game) => {
            // console.log(game);
            setGame(game);

            setEditGameDialog(true);
        });
    }

    function OnGameDelete(id : string) {
        setGameDelete(id);
        setConfirmationDialog(true);
    }

    function OnGameDeleteConfirmed() {
        DeleteGame(gameDelete).then((result) => {
            /* result => true - leaved successfully */
            setConfirmationDialog(false);
            window.location.reload();
        });
    }
    
    function OnEditGameDialogClose() {
        window.location.reload();
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
                    <DenseTable  games={games} on_edit={OnGameEdit} on_delete={OnGameDelete}/>
                    <EditGameDialog game={game} state={editGameDialog} setState={setEditGameDialog} on_close_dialog={OnEditGameDialogClose}></EditGameDialog>
                    <ConfirmationDialog state={confirmationDialog} setState={setConfirmationDialog} callback={() => OnGameDeleteConfirmed()} />
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