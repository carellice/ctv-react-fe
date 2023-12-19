import HomeGrid from './../components/HomeGrid';
import { Button, Grid, Typography } from '@mui/material';
import * as BackupUtils from "./../utils/BackupUtils";
import * as SnackBarUtils from "./../utils/SnackBarUtils";
import React, { useState } from 'react';
import DialogPersonal from '../components/DialogPersonal';

function HomePage({setSelectedPage, ctv, update, snackBarFunc}) {
  // const fileInputRef = useRef(null);

  const [openDialogCopiaDati, setOpenDialogCopiaDati] = useState(false);
  const [openDialogIncollaDati, setOpenDialogIncollaDati] = useState(false);
  const [openDialogCancellaDati, setOpenDialogCancellaDati] = useState(false);

  // const handleClick = () => {
  //   // Attiva l'input file nascosto
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  const ripristinaDati = (dati) => {
    BackupUtils.ripristinoBackup(dati).then((r) => {
      if(r === 200){
        snackBarFunc("BACKUP RIPRISTINATO CORRETTAMENTE", SnackBarUtils.SNACKBAR_SUCCESS);
        setOpenDialogIncollaDati(false);
        update();
      } else if(r === 500){
        snackBarFunc("DATI NON CORRETTI", SnackBarUtils.SNACKBAR_ERROR);
      }
    })
  }

  return (
    <>
      {ctv.length === 0 ? <Typography style={{textAlign:'center', marginTop:80, marginBottom:40, marginLeft: 20, marginRight: 20}} variant='h6'>Non ci sono dati, clicca "AGGIUNGI" per inserirne</Typography> : <></>}
      <HomeGrid snackBarFunc={snackBarFunc} update={update} setSelectedPage={setSelectedPage} ctv={ctv}/>

      {/* <Grid container justifyContent="center" alignItems="center" style={{marginTop: 50}}>
        <Grid item>
          <div>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={(e) => {BackupUtils.handleFileChange(e).then(() => update())}}
              style={{ display: 'none' }}
            />
            <Button variant="text" color="warning" onClick={handleClick}>
              CARICA DATI
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" style={{marginTop: 0}}>
        <Grid item>
            <Button variant="text" color="success" onClick={() => BackupUtils.scaricaBackup().then(() => {})}>
              SCARICA DATI
            </Button>
        </Grid>
      </Grid> */}

      <Grid container justifyContent="center" alignItems="center" style={{marginTop: 50}}>
        <Grid item>
            <Button variant="outlined" color="warning" onClick={() => setOpenDialogCopiaDati(true)}>
              COPIA DATI
            </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" style={{marginTop: 10}}>
        <Grid item>
            <Button onClick={() => setOpenDialogIncollaDati(true)} variant="outlined" color="success">
              INCOLLA DATI
            </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" style={{marginTop: 10}}>
        <Grid item>
            <Button onClick={() => setOpenDialogCancellaDati(true)} variant="outlined" color="error">
              CANCELLA DATI
            </Button>
        </Grid>
      </Grid>

      {/* DIALOG CONFERMA CANCELLA DATI */}
      <DialogPersonal textInput={false} open={openDialogCancellaDati} setOpen={setOpenDialogCancellaDati} text={"SE CLICCHI 'OK' VERRanno cancellati tutti i dati".toUpperCase()} title={"CANCELLA DATI"} okFunc={() => {
        snackBarFunc("DATI CANCELLATI CORRETTAMENTE", SnackBarUtils.SNACKBAR_SUCCESS);
        setOpenDialogCancellaDati(false);
        localStorage.clear();
        update();
      }}/>

      {/* DIALOG CONFERMA COPIA DATI */}
      <DialogPersonal textInput={false} open={openDialogCopiaDati} setOpen={setOpenDialogCopiaDati} text={"SE CLICCHI 'OK' VERRà COPIATO NEGLI APPUNTI IL BACKUP, INCOLLALO COSì COM'è DA QUALCHE PARTE".toUpperCase()} title={"COPIA DATI"} okFunc={() => BackupUtils.copiaBackup().then(() => {
        snackBarFunc("BACKUP COPIATO NEGLI APPUNTI", SnackBarUtils.SNACKBAR_INFO);
        setOpenDialogCopiaDati(false);
      })}/>

      {/* DIALOG CONFERMA INCOLLA DATI */}
      <DialogPersonal textInput={true} open={openDialogIncollaDati} setOpen={setOpenDialogIncollaDati} text={"INCOLLA IN QUESTO CAMPO DI TESTO I DATI ESPORTATI PRECEDENTEMENTE E CLICCA 'OK' PER CONFERMARE IL RIPRISTINO DEI DATI"} title={"INCOLLA DATI"} okFunc={ripristinaDati}/>
    </>
  );
}

export default HomePage;
