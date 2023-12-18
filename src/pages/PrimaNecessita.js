import React, { useState } from 'react';
import MyPopUpInsert from '../components/MyPopUpInsert';
import MyPopUpEdit from '../components/MyPopUpEdit';
import ListPersonal from '../components/ListPersonal';
import * as DataBaseUtils from "./../utils/DataBaseUtils";
import * as SnackBarUtils from "./../utils/SnackBarUtils";
import { Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function PrimaNecessita({ setSelectedPage, snackBarFunc, primaNecessita, update }) {
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
          <FormControl style={{ marginTop: 80 }}>
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

      <Typography style={{ textAlign: 'center', marginTop: 20, fontWeight: 'bold' }} variant='h5'>PRIMA NECESSITA'</Typography>
      {primaNecessita.length === 0 ? (
        <Typography style={{ textAlign: 'center', marginTop: 60, marginBottom: 40, marginLeft: 20, marginRight: 20 }} variant='h6'>Non ci sono dati, clicca "AGGIUNGI" per inserirne</Typography>
      ) : (
        <></>
      )}
      <ListPersonal array={primaNecessita} editElement={editElement} openPopUpInsert={openPopUpInsert} setOpenPopUpInsert={setOpenPopUpInsert} />
      <MyPopUpInsert saveFunc={saveElement} snackBarFunc={snackBarFunc} open={openPopUpInsert} setOpen={setOpenPopUpInsert} title={'INSERISCI PRIMA NECESSITA\''} />
      {localStorage.getItem("elToEdit") !== null ? (
        <MyPopUpEdit update={update} snackBarFunc={snackBarFunc} open={openPopUpEdit} setOpen={setOpenPopUpEdit} title={'MODIFICA PRIMA NECESSITA\''} />
      ) : (
        <></>
      )}
    </>
  );
}

export default PrimaNecessita;
