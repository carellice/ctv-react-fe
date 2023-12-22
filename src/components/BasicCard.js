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


export default function BasicCard({censored, el, update, snackBarFunc}) {

  const [openDialogCancellaDati, setOpenDialogCancellaDati] = React.useState(false);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {el.data}
          </Typography>
          <Typography variant="h5" component="div">
            {censored ? ImportoUtils.getImportoFormatted(el.stipendio).replace(/[^,]/g, '*') : ImportoUtils.getImportoFormatted(el.stipendio)} €
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography> */}
          <Typography variant="body2">
            Prima Necessità ({el.percentualePrimaNecessita}%): {censored ? ImportoUtils.getImportoFormatted(el.primaNecessita).replace(/[^,]/g, '*') : ImportoUtils.getImportoFormatted(el.primaNecessita)} €
          </Typography>
          <Typography variant="body2">
            Svago ({el.percentualeSvago}%): {censored ? ImportoUtils.getImportoFormatted(el.svago).replace(/[^,]/g, '*') : ImportoUtils.getImportoFormatted(el.svago)} €
          </Typography>
          <Typography variant="body2">
            Risparmi ({el.percentualeRisparmi}%): {censored ? ImportoUtils.getImportoFormatted(el.risparmi).replace(/[^,]/g, '*') : ImportoUtils.getImportoFormatted(el.risparmi)} €
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="error" onClick={() => setOpenDialogCancellaDati(true)}>ELIMINA</Button>
        </CardActions>
      </Card>
      <DialogPersonal showAnnulla={true} textInput={false} open={openDialogCancellaDati} setOpen={setOpenDialogCancellaDati} text={"confermi di voler eliminare l'elemento?".toUpperCase()} title={"ELIMINA ELEMENTO"} okFunc={() => {
        DataBaseUtils.delCtvById(el.id).then(() => {
          update();
          snackBarFunc("ELIMINATO CORRETTAMENTE!", SnackBarUtils.SNACKBAR_SUCCESS);
        })
      }}/>
    </>
  );
}