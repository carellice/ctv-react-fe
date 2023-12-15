import HomeGrid from './../components/HomeGrid';
import { Button, Grid } from '@mui/material';
import * as BackupUtils from "./../utils/BackupUtils";
import React, { useRef } from 'react';

function HomePage({setSelectedPage, ctv, update, snackBarFunc}) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    // Attiva l'input file nascosto
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <HomeGrid snackBarFunc={snackBarFunc} update={update} setSelectedPage={setSelectedPage} ctv={ctv}/>

      <Grid container justifyContent="center" alignItems="center" style={{marginTop: 50}}>
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
      </Grid>
    </>
  );
}

export default HomePage;
