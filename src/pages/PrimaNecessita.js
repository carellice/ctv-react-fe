import React, { useEffect, useState } from 'react';
import MyPopUpInsert from '../components/MyPopUpInsert';
import MyPopUpEdit from '../components/MyPopUpEdit';
import ListPersonal from '../components/ListPersonal';
import * as DataBaseUtils from "./../utils/DataBaseUtils";
import * as SnackBarUtils from "./../utils/SnackBarUtils";
import * as ImportoUtils from "./../utils/ImportoUtils";
import { Grow, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { isApp } from '../Config';

function PrimaNecessita({ setSelectedPage, snackBarFunc, primaNecessita, update }) {
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

  // BACK BUTTON PRESSED
  window.addEventListener("popstate", () => {
    setSelectedPage("HomePage");
  });

  const editElement = () => {
    setOpenPopUpEdit(true);
  };

  const saveElement = (scadenza, nome, note, dataDa, dataA, costo) => {
    DataBaseUtils.savePrimaNecessita(scadenza, nome, note, dataDa, dataA, costo).then((r) => {
      if (r === 200) {
        snackBarFunc("INSERITO CORRETTAMENTE!", SnackBarUtils.SNACKBAR_SUCCESS);
        update();
      } else {
        snackBarFunc("ERRORE INSERIMENTO!", SnackBarUtils.SNACKBAR_ERROR);
      }
    });
  };

  const [openPopUpInsert, setOpenPopUpInsert] = useState(false);
  const [openPopUpEdit, setOpenPopUpEdit] = useState(false);

  return (
    <>
      {primaNecessita.length === 0 ? (
        <></>
      ) : (
        <Box display="flex" justifyContent="center">
          <FormControl style={{ marginTop: isApp ? 20 : 80 }}>
            <FormLabel id="demo-radio-buttons-group-label">Ordina per</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
            >
              <FormControlLabel value="nome" control={<Radio onClick={() => DataBaseUtils.orderPrimaNecessitaByNome().then(() => update())} />} label="Nome" />
              <FormControlLabel value="costo" control={<Radio onClick={() => DataBaseUtils.orderPrimaNecessitaByCosto().then(() => update())} />} label="Costo" />
            </RadioGroup>
          </FormControl>
        </Box>
      )}

      {primaNecessita.length === 0 ? (
        <>
          <Grow in={true}>
            <Typography style={{ textAlign: 'center', marginTop: isApp ? 20 : 80, fontWeight: 'bold' }} variant='h5'>PRIMA NECESSITA'</Typography>
          </Grow>
          <Grow in={true}>
            <Typography style={{ textAlign: 'center', marginTop: 20, marginBottom: 40, marginLeft: 20, marginRight: 20 }} variant='h6'>Non ci sono dati, clicca "+" per inserirne</Typography>
          </Grow>
        </>
      ) : (
        <>
          <Typography style={{ textAlign: 'center', marginTop: 20, fontWeight: 'bold' }} variant='h5'>PRIMA NECESSITA' ({ImportoUtils.getImportoFormatted(ImportoUtils.sommaPrimaNecessita())} €)</Typography>
        </>
      )}
      <ListPersonal array={primaNecessita} editElement={editElement} openPopUpInsert={openPopUpInsert} setOpenPopUpInsert={setOpenPopUpInsert} />
      <MyPopUpInsert saveFunc={saveElement} snackBarFunc={snackBarFunc} open={openPopUpInsert} setOpen={setOpenPopUpInsert} title={'INSERISCI PRIMA NECESSITA\''} />
      {localStorage.getItem("elToEdit") !== null ? (
        <MyPopUpEdit update={update} snackBarFunc={snackBarFunc} open={openPopUpEdit} setOpen={setOpenPopUpEdit} title={'MODIFICA PRIMA NECESSITA\''} />
      ) : (
        <></>
      )}

      {/* FLOATING ACTION BUTTON - FAB */}
      {/* {showFab ? ( */}
      {true ? (
        <Fab onClick={() => {setOpenPopUpInsert(true)}} color="primary" aria-label="add" sx={{
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

export default PrimaNecessita;
