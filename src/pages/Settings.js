import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DialogPersonal from '../components/DialogPersonal';
import * as SnackBarUtils from "./../utils/SnackBarUtils";
import * as BackupUtils from "./../utils/BackupUtils";
import * as DataBaseUtils from "./../utils/DataBaseUtils";
import Divider from '@mui/material/Divider';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import { isApp } from '../Config';
import { appVersion } from '../Version';
import AndroidIcon from '@mui/icons-material/Android';
import { Grow } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DialogPersonalSommaSpese from '../components/DialogPersonalSommaSpese';

function Settings({ setSelectedPage, data, update, snackBarFunc }) {
  const [openDialogCopiaDati, setOpenDialogCopiaDati] = React.useState(false);
  const [openDialogIncollaDati, setOpenDialogIncollaDati] = React.useState(false);
  const [openDialogCancellaDati, setOpenDialogCancellaDati] = React.useState(false);
  const [openDialogSommaSpeseFisse, setOpenDialogSommaSpeseFisse] = React.useState(false);
  const [openDialogDownloadAppAndroid, setOpenDialogDownloadAppAndroid] = React.useState(false);
  const [openDialogReminderBackup, setOpenDialogReminderBackup] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [ultimoBacukp, setUltimoBackup] = React.useState(null);
  const [ultimoRipristino, setUltimoRipristino] = React.useState(null);
  const [ultimoAggiornamento, setUltimoAggiornamento] = React.useState(null);
  const [easterEggCount, setEasterEggCount] = React.useState(0);

  //USE EFFECT
  useEffect(() => {
    DataBaseUtils.getUltimoBackup().then(r => setUltimoBackup(r));
    DataBaseUtils.getUltimoRipristino().then(r => setUltimoRipristino(r));
    DataBaseUtils.getUltimoAggiornamento().then(r => setUltimoAggiornamento(r));
    //CONTROLLO SE DEVO RICORDARE ALL'UTENTE DI FARE UN BACKUP
    DataBaseUtils.getUltimoAggiornamentoRAW().then((dataUltimoAggiornamentoString) => {
      if(dataUltimoAggiornamentoString !== null){
        DataBaseUtils.getUltimoBackupRAW().then(dataUltimoBackupString => {
          if(dataUltimoBackupString !== null){
            const dataUltimoAggiornamento = new Date(dataUltimoAggiornamentoString);
            const dataUltimoBackup = new Date(dataUltimoBackupString);
            setOpenDialogReminderBackup(dataUltimoAggiornamento > dataUltimoBackup);
          }
        })
      }
    })
  }, [])
  

  const ripristinaDati = (dati) => {
    BackupUtils.ripristinoBackup(dati).then((r) => {
      if (r === 200) {
        DataBaseUtils.saveUltimoRipristino().then(() => {
          snackBarFunc("BACKUP RIPRISTINATO CORRETTAMENTE", SnackBarUtils.SNACKBAR_SUCCESS);
          setOpenDialogIncollaDati(false);
          update();
          DataBaseUtils.getUltimoRipristino().then(r => setUltimoRipristino(r));
          DataBaseUtils.getUltimoAggiornamento().then(r => setUltimoAggiornamento(r));
        })
      } else if (r === 500) {
        snackBarFunc("DATI NON CORRETTI", SnackBarUtils.SNACKBAR_ERROR);
      }
    });
  };

  // DOWNLOAD APP ANDROID
  const downloadAppAndroid =  async () => {
    const fileName = 'ctv.apk'; // Sostituisci con il nome del tuo file
    const publicFolderPath = process.env.PUBLIC_URL; // Percorso della cartella "public"

    const fileUrl = `${publicFolderPath}/${fileName}`;

    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        // Crea un URL oggetto per il blob e crea un link temporaneo
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "ctv-" + appVersion + ".apk";

        // Aggiungi il link al documento e simula un clic
        document.body.appendChild(a);
        a.click();

        // Pulisci e rimuovi il link
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => snackBarFunc("ERRORE SCARICAMENTO APP ANDROID", SnackBarUtils.SNACKBAR_ERROR));
  };

  // BACK BUTTON PRESSED
  window.addEventListener("popstate", () => {
    setSelectedPage("HomePage");
  });

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto', marginTop: 8 }}>
        <nav aria-label="main mailbox folders">
          <List>
            <Grow in={true}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenDialogCopiaDati(true)}>
                  <ListItemIcon sx={{color:'#dec507'}}>
                    <ContentCopyIcon />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{color: "#dec507"}} primary={"COPIA DATI"} secondary={ultimoBacukp === null ? '' : ultimoBacukp} />
                </ListItemButton>
              </ListItem>
            </Grow>

            <Divider />

            <Grow in={true}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenDialogIncollaDati(true)}>
                  <ListItemIcon sx={{color:'#40a11a'}}>
                    <ContentPasteIcon />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{color: "#40a11a"}} primary={"INCOLLA DATI"} secondary={ultimoRipristino === null ? '' : ultimoRipristino}/>
                </ListItemButton>
              </ListItem>
            </Grow>

            <Divider />

            {ultimoAggiornamento !== null ? (
              <>
                <Grow in={true}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {}}>
                      <ListItemIcon sx={{color:'#fc9803'}}>
                        <UpgradeIcon />
                      </ListItemIcon>
                      <ListItemText primaryTypographyProps={{color: "#fc9803"}} primary={"ULTIMO AGGIORNAMENTO DATI"} secondary={ultimoAggiornamento}/>
                    </ListItemButton>
                  </ListItem>
                </Grow>

                <Divider />
              </>
            ) : <></>}
            

            <Grow in={true}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenDialogCancellaDati(true)}>
                  <ListItemIcon sx={{color:'#ba0606'}}>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{color: "#ba0606"}} primary="CANCELLA DATI" />
                </ListItemButton>
              </ListItem>
            </Grow>

            <Divider />
            
            {data.svago.length === 0 && data.primaNecessita.length === 0 ? <></> : (
              <Grow in={true}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenDialogSommaSpeseFisse(true)}>
                  <ListItemIcon>
                    <AddBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary="SOMMA SPESE" />
                </ListItemButton>
              </ListItem>
            </Grow>
            )}

            {!isApp ? (
              <>
                <Divider />
                <Grow in={true}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpenDialogDownloadAppAndroid(true)}>
                      <ListItemIcon>
                        <AndroidIcon />
                      </ListItemIcon>
                      <ListItemText primary="DOWNLOAD APP ANDROID" secondary={appVersion} />
                    </ListItemButton>
                  </ListItem>
                </Grow>
              </>
            ) : <>
            <Divider />
            <Grow in={true}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setEasterEggCount(easterEggCount + 1)}>
                  <ListItemIcon>
                    <AndroidIcon />
                  </ListItemIcon>
                  <ListItemText primary="VERSIONE APP ANDROID" secondary={appVersion} />
                </ListItemButton>
              </ListItem>
            </Grow>
          </>}
          </List>
        </nav>
      </Box>

      {/* DIALOG CONFERMA CANCELLA DATI */}
      <DialogPersonal
        showAnnulla={true}
        textInput={false}
        open={openDialogCancellaDati}
        setOpen={setOpenDialogCancellaDati}
        text={"SE CLICCHI 'OK' VERRanno cancellati tutti i dati".toUpperCase()}
        title={"CANCELLA DATI"}
        okFunc={() => {
          snackBarFunc("DATI CANCELLATI CORRETTAMENTE", SnackBarUtils.SNACKBAR_SUCCESS);
          setOpenDialogCancellaDati(false);
          localStorage.clear();
          update();
          DataBaseUtils.getUltimoBackup().then(r => setUltimoBackup(r));
          DataBaseUtils.getUltimoRipristino().then(r => setUltimoRipristino(r));
          DataBaseUtils.getUltimoAggiornamento().then(r => setUltimoAggiornamento(r));
        }}
      />

      {/* DIALOG CONFERMA COPIA DATI */}
      <DialogPersonal
        showAnnulla={true}
        textInput={false}
        open={openDialogCopiaDati}
        setOpen={setOpenDialogCopiaDati}
        text={"SE CLICCHI 'OK' VERRà COPIATO NEGLI APPUNTI IL BACKUP, INCOLLALO COSì COM'è DA QUALCHE PARTE".toUpperCase()}
        title={"COPIA DATI"}
        okFunc={() => BackupUtils.copiaBackup().then(() => {
          DataBaseUtils.saveUltimoBackup().then(() => {
            snackBarFunc("BACKUP COPIATO NEGLI APPUNTI", SnackBarUtils.SNACKBAR_INFO);
            setOpenDialogCopiaDati(false);
            DataBaseUtils.getUltimoBackup().then((r) => setUltimoBackup(r));
          })
        })}
      />

      {/* DIALOG CONFERMA INCOLLA DATI */}
      <DialogPersonal
        showAnnulla={true}
        textInput={true}
        open={openDialogIncollaDati}
        setOpen={setOpenDialogIncollaDati}
        text={"INCOLLA IN QUESTO CAMPO DI TESTO I DATI ESPORTATI PRECEDENTEMENTE E CLICCA 'OK' PER CONFERMARE IL RIPRISTINO DEI DATI"}
        title={"INCOLLA DATI"}
        okFunc={ripristinaDati}
      />

      {/* DIALOG DOWNLOAD APP ANDROID */}
      <DialogPersonal
        showAnnulla={true}
        textInput={false}
        open={openDialogDownloadAppAndroid}
        setOpen={setOpenDialogDownloadAppAndroid}
        text={"CLICCA 'OK' PER SCARICARE L'APP PER ANDROID"}
        title={"DOWNLOAD APP"}
        okFunc={() => {
          setOpenDialogDownloadAppAndroid(false);
          downloadAppAndroid().then(() => {
            // setTimeout(() => {
            //   setLoading(false);
            // }, 2000);
            setTimeout(() => {
              snackBarFunc("IL DOWNLOAD PARTIRà A BREVE".toUpperCase(), SnackBarUtils.SNACKBAR_INFO);
            }, 1000);
          });
        }}
      />

      {/* DIALOG EASTER EGG APP ANDROID */}
      <DialogPersonal
        showAnnulla={false}
        textInput={false}
        open={easterEggCount === 15}
        setOpen={() => {}}
        text={"COMPLIMENTI! HAI TROVATO UN EASTER EGG INUTILE! MI DISPIACE MA IL BUDGET è POCO, COMPLIMENTI PERò!".toUpperCase()}
        title={"SEGRETO"}
        okFunc={() => {
          setEasterEggCount(0);
        }}
      />

      {/* DIALOG REMINDER BACKUP */}
      <DialogPersonal
        showAnnulla={true}
        textInput={false}
        open={openDialogReminderBackup}
        setOpen={setOpenDialogReminderBackup}
        text={"è CONSIGLIABILE FARE UN BACKUP DEI DATI POICHè L'ULTIMO BACKUP CHE HAI FATTO RISULTA MENO AGGIORNATO DEI DATI IN LOCALE! VUOI PROCEDERE AD ESEGUIRE IL BACKUP?".toUpperCase()}
        title={"⚠️BACKUP⚠️"}
        okFunc={() => {
          setOpenDialogReminderBackup(false);
          setOpenDialogCopiaDati(true);
        }}
      />

      {/* DIALOG CONFERMA AGGIORNEMENTO ELEMENTI */}
        <DialogPersonalSommaSpese
        svago={data.svago}
        primaNecessita={data.primaNecessita}
        showAnnulla={true}
        open={openDialogSommaSpeseFisse}
        setOpen={setOpenDialogSommaSpeseFisse}
        text={"SCEGLI LE SPESE FISSE DA SOMMARE (CLICCA GLI ELEMENTI)".toUpperCase()}
        title={"SOMMA"}
      />

    {/* LOADING SPINNER */}
    <Backdrop
      open={loading}
      onClick={() => {}}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    </>
  );
}

export default Settings;
