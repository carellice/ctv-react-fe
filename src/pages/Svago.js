import React, { useState, useEffect } from 'react';
import ListPersonal from '../components/ListPersonal';
import MyPopUpInsert from '../components/MyPopUpInsert';
import MyPopUpEdit from '../components/MyPopUpEdit';
import * as DataBaseUtils from "./../utils/DataBaseUtils";
import * as OrderByUtils from "./../utils/OrderByUtils";
import * as SnackBarUtils from "./../utils/SnackBarUtils";
import * as ImportoUtils from "./../utils/ImportoUtils";
import {Grow, InputAdornment, InputLabel, OutlinedInput, Typography} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { isApp } from '../Config';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';


function Svago({ setSelectedPage, snackBarFunc, svago, update, openPopUpInsert, setOpenPopUpInsert}) {

  //NASCONDE AUTOMATICAMENTE IL FAB
  const [showFab, setShowFab] = useState(true);

  // const [openPopUpInsert, setOpenPopUpInsert] = useState(false);
  const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
  //ORDER BY
  const [orderBy, setOrderBy] = useState(OrderByUtils.orderByNome);

  // LISTA DI SVAGO
  const [svagoArray, setSvagoArray] = useState(svago);
  //BARRA DI RICERCA
  const [searchValue, setSearchValue] = useState("");

  //FUNZIONE PER LA RICERCA DI SVAGO
  const ricerca = (searchValue) => {
    const newSvagoArray1 = svago.filter(s => s.nome.toLowerCase().includes(searchValue.toLowerCase()));
    const newSvagoArray2 = svago.filter(s => s.note.toLowerCase().includes(searchValue.toLowerCase()));

    // Unisci i due array
    let mergedArray = [...newSvagoArray1, ...newSvagoArray2];

    //controllo se ordinato per nome o per costo
    if (OrderByUtils.orderByNome === orderBy) {
      mergedArray = mergedArray.sort((a, b) => {
        const nomeA = a.nome.toUpperCase(); // Converti in maiuscolo per l'ordinamento senza distinzione tra maiuscole e minuscole
        const nomeB = b.nome.toUpperCase();

        if (nomeA < nomeB) {
          return -1;
        }
        if (nomeA > nomeB) {
          return 1;
        }
        return 0;
      });
    } else if (OrderByUtils.orderByCosto === orderBy) {
      mergedArray = mergedArray.sort((a, b) => {
        const nomeA = parseFloat(a.costo);
        const nomeB = parseFloat(b.costo);

        if (nomeA < nomeB) {
          return -1;
        }
        if (nomeA > nomeB) {
          return 1;
        }
        return 0;
      });
    }

    // Utilizza un Set per ottenere valori univoci per id
    const uniqueArray = Array.from(new Set(mergedArray.map(obj => obj.id))).map(id => {
      return mergedArray.find(obj => obj.id === id);
    });

    setSvagoArray(uniqueArray);
  }


  useEffect(() => {
    DataBaseUtils.orderSvagoByNome().then(() => update());
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
  // window.addEventListener("popstate", () => {
  //   setSelectedPage("HomePage");
  // });

  const editElement = () => {
    setOpenPopUpEdit(true);
  };

  const saveElement = (scadenza, nome, note, dataDa, dataA, costo) => {
    DataBaseUtils.saveSvago(scadenza, nome, note, dataDa, dataA, costo).then((r) => {
      if (r === 200) {
        snackBarFunc("INSERITO CORRETTAMENTE!", SnackBarUtils.SNACKBAR_SUCCESS);
        if(orderBy === OrderByUtils.orderByNome){
          DataBaseUtils.orderSvagoByNome().then(() =>  {
            DataBaseUtils.getData().then(datas => setSvagoArray(datas.svago));
            update();
          });
        }else if(orderBy === OrderByUtils.orderByCosto){
          DataBaseUtils.orderSvagoByCosto().then(() => {
            DataBaseUtils.getData().then(datas => setSvagoArray(datas.svago));
            update();
          });
        }
      } else {
        snackBarFunc("ERRORE INSERIMENTO!", SnackBarUtils.SNACKBAR_ERROR);
      }
    });
  };

  return (
    <>
      {svago.length === 0 ? (
        <></>
      ) : (
          <Box display="flex" justifyContent="center">
            <FormControl style={{ marginTop: isApp ? 20 : 80 }}>
              <FormLabel id="demo-radio-buttons-group-label">Ordina per</FormLabel>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="nome"
                  name="radio-buttons-group"
                  row // Aggiungi questa proprietà per allineare orizzontalmente i radio button
              >
                <FormControlLabel
                    value="nome"
                    control={<Radio onClick={() => {
                      DataBaseUtils.orderSvagoByNome().then(() => update());
                      setOrderBy(OrderByUtils.orderByNome);
                      const newArray = svagoArray.sort((a, b) => {
                        const nomeA = a.nome.toUpperCase(); // Converti in maiuscolo per l'ordinamento senza distinzione tra maiuscole e minuscole
                        const nomeB = b.nome.toUpperCase();

                        if (nomeA < nomeB) {
                          return -1;
                        }
                        if (nomeA > nomeB) {
                          return 1;
                        }
                        return 0;
                      });
                      setSvagoArray(newArray);
                    }} />}
                    label="Nome"
                    labelPlacement="end" // Imposta la posizione della label a destra del radio button
                    style={{ marginRight: 20 }} // Aggiungi uno spazio tra i radio button
                />
                <FormControlLabel
                    value="costo"
                    control={<Radio onClick={() => {
                      DataBaseUtils.orderSvagoByCosto().then(() => update());
                      setOrderBy(OrderByUtils.orderByCosto);
                      const newArray = svagoArray.sort((a, b) => {
                        const nomeA = parseFloat(a.costo);
                        const nomeB = parseFloat(b.costo);

                        if (nomeA < nomeB) {
                          return -1;
                        }
                        if (nomeA > nomeB) {
                          return 1;
                        }
                        return 0;
                      });
                      setSvagoArray(newArray);
                    }} />}
                    label="Costo"
                    labelPlacement="end" // Imposta la posizione della label a destra del radio button
                />
              </RadioGroup>
            </FormControl>
          </Box>
      )}

      {svago.length === 0 ? (
        <>
          <Grow in={true}>
            <Typography style={{ textAlign: 'center', marginTop: isApp ? 20 : 80, fontWeight: 'bold' }} variant='h5'>SFIZIO</Typography>
          </Grow>
          <Grow in={true}>
            <Typography style={{ textAlign: 'center', marginTop: 20, marginBottom: 40, marginLeft: 20, marginRight: 20 }} variant='h6'>Non ci sono dati, clicca "+" per inserirne</Typography>
          </Grow>
        </>
      ) : (
        <>
          <Typography style={{ textAlign: 'center', marginTop: 20, fontWeight: 'bold' }} variant='h5'>SFIZIO ({ImportoUtils.getImportoFormatted(ImportoUtils.sommaSvago())} €)</Typography>

          {/*BARRA DI RICERCA*/}
          <Box display="flex" justifyContent="center" style={{marginTop:20, marginBottom:20}}>
            <OutlinedInput
                onChange={(event) => {
                  setSearchValue(event.target.value);
                  ricerca(event.target.value);
                }}
                value={searchValue}
                id="outlined-adornment-password"
                type={'text'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setSearchValue("");
                          ricerca("");
                        }}
                        onMouseDown={() => {}}
                        edge="end"
                    >
                      {searchValue !== "" ? <BackspaceIcon /> : <SearchIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label=""
            />
          </Box>

          {/*IN CASO NON CI FOSSERO RISULTATI DALLA RICERCA*/}
          {svagoArray.length === 0 ? <Typography style={{ textAlign: 'center', marginTop: 20, marginBottom: 40, marginLeft: 20, marginRight: 20 }} variant='h6'>Nessun risultato!</Typography> : <></>}
        </>
      )}
      <ListPersonal array={svagoArray} editElement={editElement} openPopUpInsert={openPopUpInsert} setOpenPopUpInsert={setOpenPopUpInsert} />
      <MyPopUpInsert saveFunc={saveElement} snackBarFunc={snackBarFunc} open={openPopUpInsert} setOpen={setOpenPopUpInsert} title={'INSERISCI SFIZIO'} />
      {localStorage.getItem("elToEdit") !== null ? (
        <MyPopUpEdit setSearchValue={setSearchValue} orderBy={orderBy} update={() => {
          DataBaseUtils.getData().then(datas => setSvagoArray(datas.svago));
          update();
        }} snackBarFunc={snackBarFunc} open={openPopUpEdit} setOpen={setOpenPopUpEdit} title={'MODIFICA SFIZIO'} />
      ) : (
        <></>
      )}

      {/* FLOATING ACTION BUTTON - FAB */}
      {/* {showFab ? ( */}
      {/*{searchValue === "" ? (*/}
      {/*  <Fab onClick={() => {setOpenPopUpInsert(true)}} color="primary" aria-label="add" sx={{*/}
      {/*    position: 'fixed',*/}
      {/*    bottom: '64px',  // Puoi personalizzare la distanza dal basso*/}
      {/*    right: '32px',   // Puoi personalizzare la distanza da destra*/}
      {/*  }}>*/}
      {/*    <AddIcon />*/}
      {/*  </Fab>*/}
      {/*) : <></>}*/}
    </>
  );
}

export default Svago;
