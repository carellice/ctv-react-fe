import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as DataBaseUtils from "./../utils/DataBaseUtils"
import * as SnackBarUtils from "./../utils/SnackBarUtils"

export default function BasicCard({el, update, snackBarFunc}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {el.data}
        </Typography>
        <Typography variant="h5" component="div">
          {el.stipendio} €
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
        <Typography variant="body2">
          {'Svago: ' + el.svago + ' €'}
        </Typography>
        <Typography variant="body2">
          {'Prima Necessità: ' + el.primaNecessita + ' €'}
        </Typography>
        <Typography variant="body2">
          {'Risparmi: ' + el.risparmi + ' €'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={() => DataBaseUtils.delCtvById(el.id).then(() => {
          update();
          snackBarFunc("ELIMINATO CORRETTAMENTE!", SnackBarUtils.SNACKBAR_SUCCESS);
        })}>ELIMINA</Button>
      </CardActions>
    </Card>
  );
}