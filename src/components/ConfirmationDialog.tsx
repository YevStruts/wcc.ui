import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

interface ConfirmationDialogProps {
    state: boolean,
    setState: (value: boolean) => void,
    callback: () => void,
}

export default function ConfirmationDialog({ state, setState, callback } : ConfirmationDialogProps) {

    const handleClickOpen = () => {
        setState(true);
    };

    const handleClose = () => {
        setState(false);
    };

    const onClickNo = () => {
        setState(false);
    }

    const onClickYes = () => {
        callback();
    }

    return (
        <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
            Open alert dialog
        </Button>
        <Dialog
            open={state}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Do you want to delete ?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={onClickNo} autoFocus>No</Button>
            <Button onClick={onClickYes}>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}