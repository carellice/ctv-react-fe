import React, { useState } from 'react';
import ListPersonal from '../components/ListPersonal';
import MyPopUpInsert from '../components/MyPopUpInsert';
import MyPopUpEdit from '../components/MyPopUpEdit';
import * as DataBaseUtils from "./../utils/DataBaseUtils";
import * as SnackBarUtils from "./../utils/SnackBarUtils";
import { Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Svago({ setSelectedPage, snackBarFunc, svago, update }) {
  // BACK BUTTON PRESSED
  window.addEventListener("popstate", () => {
    setSelectedPage("HomePage");
  });

  const editElement = () => {
    setOpenPopUpEdit(true);
  };

  const saveElement = (scadenza, nome, note, dataDa, dataA, costo) => {
    DataBaseUtils.saveSvago(scadenza, nome, note, dataDa, dataA, costo).then((r) => {
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
      {svago.length === 0 ? (
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
              <FormControlLabel value="nome" control={<Radio onClick={() => DataBaseUtils.orderSvagoByNome().then(() => update())} />} label="Nome" />
              <FormControlLabel value="costo" control={<Radio onClick={() => DataBaseUtils.orderSvagoByCosto().then(() => update())} />} label="Costo" />
            </RadioGroup>
          </FormControl>
        </Box>
      )}

      <Typography style={{ textAlign: 'center', marginTop: 20, fontWeight: 'bold' }} variant='h5'>SVAGO</Typography>
      {svago.length === 0 ? (
        <Typography style={{ textAlign: 'center', marginTop: 40, marginBottom: 40, marginLeft: 20, marginRight: 20 }} variant='h6'>Non ci sono dati, clicca "AGGIUNGI" per inserirne</Typography>
      ) : (
        <></>
      )}
      <ListPersonal array={svago} editElement={editElement} openPopUpInsert={openPopUpInsert} setOpenPopUpInsert={setOpenPopUpInsert} />
      <MyPopUpInsert saveFunc={saveElement} snackBarFunc={snackBarFunc} open={openPopUpInsert} setOpen={setOpenPopUpInsert} title={'INSERISCI SVAGO'} />
      {localStorage.getItem("elToEdit") !== null ? (
        <MyPopUpEdit update={update} snackBarFunc={snackBarFunc} open={openPopUpEdit} setOpen={setOpenPopUpEdit} title={'MODIFICA SVAGO'} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Svago;
