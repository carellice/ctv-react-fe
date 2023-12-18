import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';
import * as SnackBarUtils from "./../utils/SnackBarUtils"

const MyPopUpInsert = ({open, setOpen, title, snackBarFunc, saveFunc}) => {
  const [nome, setNome] = useState('');
  const [nota, setNota] = useState('');
  const [costo, setCosto] = useState('0');
  const [dataInizio, setDataInizio] = useState(new Date().toISOString().split('T')[0]);
  const [dataFine, setDataFine] = useState(new Date().toISOString().split('T')[0]);
  const [scadenzaSi, setScadenzaSi] = useState(false);
  const [scadenzaNo, setScadenzaNo] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const svuotaForm = () => {
    setNome("");
    setNota("");
    setCosto("0");
    setScadenzaSi(false);
    setScadenzaNo(true);
    setDataInizio(new Date().toISOString().split('T')[0]);
    setDataFine(new Date().toISOString().split('T')[0]);
  }

  const handleSave = () => {
    if(nome === '' || nota === '' || costo === ''){
      snackBarFunc("POPOLARE TUTTI I CAMPI!", SnackBarUtils.SNACKBAR_ERROR);
    }else{
      saveFunc(scadenzaSi, nome, nota, dataInizio, dataFine, costo);
      svuotaForm();
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{fontWeight:'bold'}}>{title}</DialogTitle>
        <DialogContent>

          {/* NOME */}
          <TextField
            style={{marginTop:0}}
            label="NOME"
            variant="filled"
            fullWidth
            required
            error={nome === ""}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          {/* NOTA */}
          <TextField
            style={{marginTop:10}}
            label="NOTA"
            variant="filled"
            fullWidth
            required
            error={nota === ""}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />

          {/* COSTO */}
          <TextField
            style={{marginTop:10}}
            label="COSTO"
            variant="filled"
            type="number"
            fullWidth
            required
            error={costo === ""}
            value={costo}
            onChange={(e) => setCosto(e.target.value)}
          />

          {/* SCADENZA */}
          <Typography style={{marginTop:10, fontWeight:'bold'}}>Scadenza</Typography>
          <FormControlLabel
            style={{ marginTop: 0 }}
            control={<Checkbox checked={scadenzaSi} onChange={() => { setScadenzaSi(true); setScadenzaNo(false); }} />}
            label="Sì"
          />
          <FormControlLabel
            style={{ marginTop: 0 }}
            control={<Checkbox checked={scadenzaNo} onChange={() => { setScadenzaNo(true); setScadenzaSi(false); }} />}
            label="No"
          />

          {scadenzaSi ? (
            <>
              {/* DATA - DA */}
              <TextField
                style={{marginTop:10}}
                label="DATA: DA"
                variant="filled"
                type="date"
                fullWidth
                required
                value={dataInizio}
                onChange={(e) => setDataInizio(e.target.value)}
              />
              {/* DATA - A */}
              <TextField
                style={{marginTop:10}}
                label="DATA: A"
                variant="filled"
                type="date"
                fullWidth
                required
                value={dataFine}
                onChange={(e) => setDataFine(e.target.value)}
              />
            </>
          ) : <></>}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annulla</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Salva
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyPopUpInsert;
