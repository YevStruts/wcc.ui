import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { GetGame } from '../services/GameService';
import { GameServerType } from '../pages/tournaments/tournament';
import EditGame from './EditGame';

interface EditGameDialogProps {
    game: GameServerType,
    state: boolean,
    setState: (value: boolean) => void,
    on_close_dialog: () => void
}

export default function EditGameDialog({ game, state, setState, on_close_dialog } : EditGameDialogProps) {

    const handleClickOpen = () => {
        setState(true);
    };

    const handleClose = () => {
        setState(false);
    };

    const handleEditGameSave = () => {
        setState(false);
        on_close_dialog();
    };

    return (
        <React.Fragment>
            <Dialog open={state} onClose={handleClose} maxWidth='lg'>
            <DialogTitle>Edit Game</DialogTitle>
            <DialogContent>
                <EditGame game={game} on_save_click={handleEditGameSave}/>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Save</Button> */}
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
