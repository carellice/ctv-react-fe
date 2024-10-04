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
import * as ApiUtils from "../utils/ApiUtils";
import * as DateUtils from "../utils/DateUtils";


export default function BasicCard({censored, el, update, snackBarFunc}) {

  const [openDialogCancellaDati, setOpenDialogCancellaDati] = React.useState(false);

  return (
    <>
      <Card
          sx={{
            minWidth: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            borderRadius: 10
          }}
      >
        <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
        >
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            {el.data}
          </Typography>
          <Typography variant="h5" component="div" sx={{ fontSize: 22 }}>
            {censored
                ? ImportoUtils.getImportoFormatted(el.stipendio).replace(/[^,]/g, '*')
                : "+ " + ImportoUtils.getImportoFormatted(el.stipendio)} €
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 14, color: 'orange' }}>
            Necessità ({ImportoUtils.calcolaPercentualeIntera(el.stipendio, el.primaNecessita)}%):{' '}
            {censored
                ? ImportoUtils.getImportoFormatted(el.primaNecessita).replace(/[^,]/g, '*')
                : ImportoUtils.getImportoFormatted(el.primaNecessita)} €
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 14, color: 'red' }}>
            Svago ({ImportoUtils.calcolaPercentualeIntera(el.stipendio, el.svago)}%):{' '}
            {censored
                ? ImportoUtils.getImportoFormatted(el.svago).replace(/[^,]/g, '*')
                : ImportoUtils.getImportoFormatted(el.svago)} €
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 14, color: 'green' }}>
            Risparmi ({ImportoUtils.calcolaPercentualeIntera(el.stipendio, el.risparmi)}%):{' '}
            {censored
                ? ImportoUtils.getImportoFormatted(el.risparmi).replace(/[^,]/g, '*')
                : ImportoUtils.getImportoFormatted(el.risparmi)} €
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 14, color: '#11b194' }}>
            Spese Mensili ({ImportoUtils.calcolaPercentualeIntera(
              el.stipendio,
              ImportoUtils.getSpese(el.stipendio, el.primaNecessita, el.svago, el.risparmi)
          )}%):{' '}
            {censored
                ? ImportoUtils.getImportoFormatted(
                    ImportoUtils.getSpese(el.stipendio, el.primaNecessita, el.svago, el.risparmi)
                ).replace(/[^,]/g, '*')
                : ImportoUtils.getImportoFormatted(
                    ImportoUtils.getSpese(el.stipendio, el.primaNecessita, el.svago, el.risparmi)
                )} €
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant={"contained"} size="small" color="error" onClick={() => setOpenDialogCancellaDati(true)}>
            ELIMINA
          </Button>
        </CardActions>
      </Card>

      <DialogPersonal showAnnulla={true} textInput={false} open={openDialogCancellaDati} setOpen={setOpenDialogCancellaDati} text={"confermi di voler eliminare l'elemento?".toUpperCase()} title={"ELIMINA ELEMENTO"} okFunc={() => {
        DataBaseUtils.delCtvById(el.id).then(() => {
          update();
          snackBarFunc("ELIMINATO CORRETTAMENTE!", SnackBarUtils.SNACKBAR_SUCCESS);
          setOpenDialogCancellaDati(false);
            ApiUtils.uploadJson().then((res) =>{
                if(res === 'ok'){
                    snackBarFunc("BACKUP AVVENUTO CON SUCCESSO", SnackBarUtils.SNACKBAR_SUCCESS);
                }else{
                    snackBarFunc(res, SnackBarUtils.SNACKBAR_ERROR);
                }
            })
        })
      }}/>
    </>
  );
}