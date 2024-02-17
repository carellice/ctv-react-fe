import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';
import * as SnackBarUtils from "./../utils/SnackBarUtils";
import * as DataBaseUtils from "./../utils/DataBaseUtils";
import * as OrderByUtils from "../utils/OrderByUtils";

const MyPopUpEdit = ({open, setOpen, title, snackBarFunc, elToEdit, update, orderBy}) => {

  const [nome, setNome] = useState(JSON.parse(localStorage.getItem("elToEdit")).nome);
  const [nota, setNota] = useState(JSON.parse(localStorage.getItem("elToEdit")).note);
  const [costo, setCosto] = useState(JSON.parse(localStorage.getItem("elToEdit")).costo);
  const [dataInizio, setDataInizio] = useState(JSON.parse(localStorage.getItem("elToEdit")).dataDa === null ? new Date().toISOString().split('T')[0] : new Date(JSON.parse(localStorage.getItem("elToEdit")).dataDa).toISOString().split('T')[0]);
  const [dataFine, setDataFine] = useState(JSON.parse(localStorage.getItem("elToEdit")).dataA === null ? new Date().toISOString().split('T')[0] : new Date(JSON.parse(localStorage.getItem("elToEdit")).dataA).toISOString().split('T')[0]);
  const [scadenzaSi, setScadenzaSi] = useState(JSON.parse(localStorage.getItem("elToEdit")).dataDa !== null);
  const [scadenzaNo, setScadenzaNo] = useState(JSON.parse(localStorage.getItem("elToEdit")).dataDa === null);

  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem("elToEdit");
  };

  const saveSvago = (id, scadenza, nome, note, dataDa, dataA, costo) => {
    const dataDaDate = new Date(dataDa);
    const dataADate = new Date(dataA);
    if(dataDaDate > dataADate){
      DataBaseUtils.delElById(id).then(() => {
        snackBarFunc("CANCELLATO POICHè SCADUTO!".toUpperCase(), SnackBarUtils.SNACKBAR_INFO);
        update();
      })
    }else{
      DataBaseUtils.saveSvago(scadenza, nome, note, dataDa, dataA, costo).then( (r) => {
        if(r === 200){
          snackBarFunc("MODIFICATO CORRETTAMENTE!", SnackBarUtils.SNACKBAR_SUCCESS);
          if(orderBy === OrderByUtils.orderByNome){
            DataBaseUtils.orderSvagoByNome().then(() => update());
          }else if(orderBy === OrderByUtils.orderByCosto){
            DataBaseUtils.orderSvagoByCosto().then(() => update());
          }
        }else{
          snackBarFunc("ERRORE MODIFICA!", SnackBarUtils.SNACKBAR_ERROR);
          update();
        }
      })
    }
  }

  const savePrimaNecessita = (id, scadenza, nome, note, dataDa, dataA, costo) => {
    const dataDaDate = new Date(dataDa);
    const dataADate = new Date(dataA);
    if(scadenza && dataDaDate > dataADate){
      DataBaseUtils.delElById(id).then(() => {
        snackBarFunc("CANCELLATO POICHè SCADUTO!".toUpperCase(), SnackBarUtils.SNACKBAR_INFO);
        update();
      })
    }else{
      DataBaseUtils.savePrimaNecessita(scadenza, nome, note, dataDa, dataA, costo).then( (r) => {
        if(r === 200){
          snackBarFunc("MODIFICATO CORRETTAMENTE!", SnackBarUtils.SNACKBAR_SUCCESS);
          if(orderBy === OrderByUtils.orderByNome){
            DataBaseUtils.orderPrimaNecessitaByNome().then(() => update());
          }else if(orderBy === OrderByUtils.orderByCosto){
            DataBaseUtils.orderPrimaNecessitaByCosto().then(() => update());
          }
        }else{
          snackBarFunc("ERRORE MODIFICA!", SnackBarUtils.SNACKBAR_ERROR);
          update();
        }
      })
    }
  }

  const handleSave = () => {
    if(nome === '' || nota === '' || costo === ''){
      snackBarFunc("POPOLARE TUTTI I CAMPI!", SnackBarUtils.SNACKBAR_ERROR);
    } else{
      setOpen(false);
      const id = JSON.parse(localStorage.getItem("elToEdit")).id;
      DataBaseUtils.delElById(id).then(() => {
        setOpen(false);
        localStorage.removeItem("elToEdit");
        if(title.includes("SVAGO")){
          saveSvago(id, scadenzaSi, nome, nota, scadenzaSi ? dataInizio : null, scadenzaSi ? dataFine : null, costo);
        }else{
          savePrimaNecessita(id, scadenzaSi, nome, nota, dataInizio, dataFine, costo);
        }
      });
    }
  };

  const handleDelete = () => {
    const id = JSON.parse(localStorage.getItem("elToEdit")).id;
    DataBaseUtils.delElById(id).then(() => {
      update();
      snackBarFunc("ELIMINATO CORRETTAMENTE!", SnackBarUtils.SNACKBAR_SUCCESS);
      setOpen(false);
      localStorage.removeItem("elToEdit");
    });
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
            error={nome === ''}
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
            error={nota === ''}
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
            error={costo === ''}
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
              <Button variant="text" color='success' onClick={() => {
                const dataInizioDate = new Date(dataInizio);
                dataInizioDate.setMonth(dataInizioDate.getMonth() + 1);
                setDataInizio(dataInizioDate.toISOString().split('T')[0]);
              }}>+ 1 mese</Button>
              <Button variant="text" color='error' onClick={() => {
                const dataInizioDate = new Date(dataInizio);
                dataInizioDate.setMonth(dataInizioDate.getMonth() - 1);
                setDataInizio(dataInizioDate.toISOString().split('T')[0]);
              }}>- 1 mese</Button>
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
              <Button variant="text" color='success' onClick={() => {
                const dataFineDate = new Date(dataFine);
                dataFineDate.setMonth(dataFineDate.getMonth() + 1);
                setDataFine(dataFineDate.toISOString().split('T')[0]);
              }}>+ 1 mese</Button>
              <Button variant="text" color='error' onClick={() => {
                const dataFineDate = new Date(dataFine);
                dataFineDate.setMonth(dataFineDate.getMonth() - 1);
                setDataFine(dataFineDate.toISOString().split('T')[0]);
              }}>- 1 mese</Button>
            </>
          ) : <></>}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="error" variant='contained'>ELIMINA</Button>
          <Button onClick={handleClose}>ANNULLA</Button>
          <Button onClick={() => handleSave()} variant="contained" color="primary">
            SALVA
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyPopUpEdit;
