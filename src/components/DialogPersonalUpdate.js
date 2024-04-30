import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { ListItem, List, ListItemButton, ListItemText, ListItemIcon, Typography, Grow, Collapse, Zoom, Divider, Chip, CircularProgress } from '@mui/material';
import ListItemPersonalUpdate from './ListItemPersonalUpdate';
import * as DataBaseUtils from "./../utils/DataBaseUtils";
import * as SnackBarUtils from "./../utils/SnackBarUtils";
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import RedoIcon from '@mui/icons-material/Redo';


export default function DialogPersonalUpdate({open, setOpen, title, text, showAnnulla, svago, primaNecessita, snackBarFunc, stipendio, percentualePrimaNecessita, percentualeSvago, percentualeRisparmi, risultatoSvago, risultatoPrimaNecessita, risultatoRisparmi, update, setSelectedPage, setLoadingFather}) {

  const [loading, setLoading] = useState(false);
  const [toUpdateEl, setToUpdateEl] = useState([]);

  //SAVE
  const save = async () => {
    setLoading(true);

    for (let toUpdate of toUpdateEl) {
      await DataBaseUtils.saveEditWithUpdate(toUpdate.id);
    }

    const insertRes = await DataBaseUtils.insertCtv(stipendio, percentualePrimaNecessita, percentualeSvago, percentualeRisparmi, risultatoSvago, risultatoPrimaNecessita, risultatoRisparmi);
    if(insertRes === 500){
      snackBarFunc("ERRORE INSERIMENTO!", SnackBarUtils.SNACKBAR_ERROR);
    }else{
      setTimeout(() => {
        setLoading(false);
        update();
        snackBarFunc("INSERIMENTO AVVENUTO CON SUCCESSO!", SnackBarUtils.SNACKBAR_SUCCESS);
        setSelectedPage("HomePage");
      }, 1000);
    }
  };

  return (
    <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setLoadingFather(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text} <br/>
            {toUpdateEl.map(el => <Chip style={{marginTop:10, marginLeft:5}} label={el.nome.toUpperCase()} onDelete={() => {
              const newArray = toUpdateEl.filter(p => p.id !== el.id);
              setToUpdateEl(newArray)
            }} />)}
            {svago.length !== 0 ? (
              <>
                <Divider style={{marginTop:10, marginBottom:5}}>
                  <Chip label="SFIZIO" />
                </Divider>
                <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                  {svago.map(el => <ListItemPersonalUpdate el={el} onClickFunc={() => {
                    if(toUpdateEl.filter(p => p.id === el.id).length === 0){
                      const newElToUpdate = [...toUpdateEl, {nome: el.nome, id: el.id}];
                      setToUpdateEl(newElToUpdate);
                    }
                  }}/>)}
                </List>
              </>
            ) : (<></>)}

            {primaNecessita.length !== 0 ? (
              <>
                <Divider style={{marginTop:10, marginBottom:5}}>
                  <Chip label={"PRIMA NECESSITà".toUpperCase()} />
                </Divider>
                <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                  {primaNecessita.map(el => <ListItemPersonalUpdate el={el} onClickFunc={() => {
                    if(toUpdateEl.filter(p => p.id === el.id).length === 0){
                      const newElToUpdate = [...toUpdateEl, {nome: el.nome, id: el.id}];
                      setToUpdateEl(newElToUpdate);
                    }
                  }}/>)}
                </List>
              </>
            ) : (<></>)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {showAnnulla ? <Button onClick={() => {
            setOpen(false);
            setLoadingFather(false);
          }}>Annulla</Button> : <></>}
          {/* <Button onClick={() => {
            setLoading(true);
            save().then((res) => {
              setLoading(false);
            });
          }} endIcon={loading ? <CircularProgress /> : <></>} autoFocus>
            PROCEDI
          </Button> */}
          <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<RedoIcon />}
              variant="contained"
              onClick={() => {
                save().then((res) => {});
              }}
            >
              PROCEDI
            </LoadingButton>
        </DialogActions>
      </Dialog>
  );
}