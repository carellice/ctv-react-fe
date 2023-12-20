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
import Divider from '@mui/material/Divider';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';

function Settings({ setSelectedPage, ctv, update, snackBarFunc }) {
  const [openDialogCopiaDati, setOpenDialogCopiaDati] = React.useState(false);
  const [openDialogIncollaDati, setOpenDialogIncollaDati] = React.useState(false);
  const [openDialogCancellaDati, setOpenDialogCancellaDati] = React.useState(false);

  const ripristinaDati = (dati) => {
    BackupUtils.ripristinoBackup(dati).then((r) => {
      if (r === 200) {
        snackBarFunc("BACKUP RIPRISTINATO CORRETTAMENTE", SnackBarUtils.SNACKBAR_SUCCESS);
        setOpenDialogIncollaDati(false);
        update();
      } else if (r === 500) {
        snackBarFunc("DATI NON CORRETTI", SnackBarUtils.SNACKBAR_ERROR);
      }
    });
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
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenDialogCopiaDati(true)}> 
                <ListItemIcon sx={{color:'#dec507'}}>
                  <ContentCopyIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{color: "#dec507"}} primary="COPIA DATI" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenDialogIncollaDati(true)}>
                <ListItemIcon sx={{color:'#40a11a'}}>
                  <ContentPasteIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{color: "#40a11a"}} primary="INCOLLA DATI" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenDialogCancellaDati(true)}>
                <ListItemIcon sx={{color:'#ba0606'}}>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{color: "#ba0606"}} primary="CANCELLA DATI" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>

      {/* DIALOG CONFERMA CANCELLA DATI */}
      <DialogPersonal
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
        }}
      />

      {/* DIALOG CONFERMA COPIA DATI */}
      <DialogPersonal
        textInput={false}
        open={openDialogCopiaDati}
        setOpen={setOpenDialogCopiaDati}
        text={"SE CLICCHI 'OK' VERRà COPIATO NEGLI APPUNTI IL BACKUP, INCOLLALO COSì COM'è DA QUALCHE PARTE".toUpperCase()}
        title={"COPIA DATI"}
        okFunc={() => BackupUtils.copiaBackup().then(() => {
          snackBarFunc("BACKUP COPIATO NEGLI APPUNTI", SnackBarUtils.SNACKBAR_INFO);
          setOpenDialogCopiaDati(false);
        })}
      />

      {/* DIALOG CONFERMA INCOLLA DATI */}
      <DialogPersonal
        textInput={true}
        open={openDialogIncollaDati}
        setOpen={setOpenDialogIncollaDati}
        text={"INCOLLA IN QUESTO CAMPO DI TESTO I DATI ESPORTATI PRECEDENTEMENTE E CLICCA 'OK' PER CONFERMARE IL RIPRISTINO DEI DATI"}
        title={"INCOLLA DATI"}
        okFunc={ripristinaDati}
      />
    </>
  );
}

export default Settings;