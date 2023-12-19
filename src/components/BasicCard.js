import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as DataBaseUtils from "./../utils/DataBaseUtils"
import * as SnackBarUtils from "./../utils/SnackBarUtils"
import * as ImportoUtils from "./../utils/ImportoUtils"
import DialogPersonal from '../components/DialogPersonal';


export default function BasicCard({el, update, snackBarFunc}) {

  const [openDialogCancellaDati, setOpenDialogCancellaDati] = React.useState(false);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {el.data + " (" + el.percentualePrimaNecessita + " - " + el.percentualeSvago + " - " + el.percentualeRisparmi + ")"}
          </Typography>
          <Typography variant="h5" component="div">
            {ImportoUtils.getImportoFormatted(el.stipendio)} €
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography> */}
          <Typography variant="body2">
            {'Svago: ' + ImportoUtils.getImportoFormatted(el.svago) + ' €'}
          </Typography>
          <Typography variant="body2">
            {'Prima Necessità: ' + ImportoUtils.getImportoFormatted(el.primaNecessita) + ' €'}
          </Typography>
          <Typography variant="body2">
            {'Risparmi: ' + ImportoUtils.getImportoFormatted(el.risparmi) + ' €'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="error" onClick={() => setOpenDialogCancellaDati(true)}>ELIMINA</Button>
        </CardActions>
      </Card>
      <DialogPersonal textInput={false} open={openDialogCancellaDati} setOpen={setOpenDialogCancellaDati} text={"confermi di voler eliminare l'elemento?".toUpperCase()} title={"ELIMINA ELEMENTO"} okFunc={() => {
        DataBaseUtils.delCtvById(el.id).then(() => {
          update();
          snackBarFunc("ELIMINATO CORRETTAMENTE!", SnackBarUtils.SNACKBAR_SUCCESS);
        })
      }}/>
    </>
  );
}