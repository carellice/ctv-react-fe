import HomeGrid from './../components/HomeGrid';
import { Grid, Grow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { isApp } from '../Config';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as DataBaseUtils from "./../utils/DataBaseUtils";


function HomePage({setSelectedPage, ctv, update, snackBarFunc, censored, setCensored}) {
  //NASCONDE AUTOMATICAMENTE IL FAB
  const [showFab, setShowFab] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setShowFab(!scrolledToBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // const fileInputRef = useRef(null);

  // const handleClick = () => {
  //   // Attiva l'input file nascosto
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  return (
    <>
      <Grow in={true}>
        <Grid container justifyContent="center">
          <Typography
            style={{ textAlign: 'center', marginTop: isApp ? 20 : 80, fontWeight: 'bold' }}
            variant='h5'
          >
            CTV
          </Typography>
          {ctv.length !== 0 ? (
            <IconButton onClick={() => {
              const newCensored = !censored;
              DataBaseUtils.saveCensored(newCensored).then(() => setCensored(newCensored));
            }} style={{marginTop: isApp ? 15 : 75, marginLeft:10}} edge='end' >
              {censored ? <VisibilityOffIcon /> : <VisibilityIcon />} {/* Sostituisci con l'icona desiderata */}
            </IconButton>
          ) : <></>}
        </Grid>
        {/* <Typography style={{ textAlign: 'center', marginTop: isApp ? 20 : 80, fontWeight: 'bold' }} variant='h5'>CTV</Typography> */}
      </Grow>
      {ctv.length === 0 ? (
        <Grow in={true}>
          <Typography style={{textAlign:'center', marginTop:20, marginBottom:40, marginLeft: 20, marginRight: 20}} variant='h6'>Non ci sono dati, clicca "+" per inserirne</Typography>
        </Grow>
      ) : <></>}
      <HomeGrid censored={censored} snackBarFunc={snackBarFunc} update={update} setSelectedPage={setSelectedPage} ctv={ctv}/>
      

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

      {/* FLOATING ACTION BUTTON - FAB */}
      {/* {showFab ? ( */}
      {true ? (
        <Fab onClick={() => {
          window.history.pushState({}, null, null);
          setSelectedPage("InsertNew");
        }} color="primary" aria-label="add" sx={{
          position: 'fixed',
          bottom: '64px',  // Puoi personalizzare la distanza dal basso
          right: '32px',   // Puoi personalizzare la distanza da destra
        }}>
          <AddIcon />
        </Fab>
      ) : <></>}
    </>
  );
}

export default HomePage;
