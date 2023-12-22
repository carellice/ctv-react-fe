import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function DialogPersonal({open, setOpen, okFunc, title, text, textInput, showAnnulla}) {

  const [dati, setDati] = useState("");

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
          {textInput ? (
            <>
              <TextField
                style={{marginTop:20}}
                id="outlined-multiline-static"
                label="DATI"
                multiline
                fullWidth
                rows={10}
                value={dati}
                required
                error={dati === ""}
                onChange={(e) => setDati(e.target.value)}
              />
            </>
          ) : <></>}
        </DialogContent>
        <DialogActions>
          {showAnnulla ? <Button onClick={() => setOpen(false)}>Annulla</Button> : <></>}
          <Button onClick={textInput ? () => okFunc(dati) : okFunc} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
  );
}