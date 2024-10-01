import * as React from 'react';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import ListItemPersonal from './ListItemPersonal'
import { Divider } from '@mui/material';

export default function ListPersonal({openPopUpInsert, setOpenPopUpInsert, editElement, array}) {
  return (
    <Container sx={{marginBottom: 8}}>
      {array.map(el => (
        <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper'}}>
          <ListItemPersonal editElement={editElement} el={el}/>
          <Divider/>
        </List>
      ))}

      {/* AGGIUNGI - BUTTON*/}
      {/* <Grid container justifyContent="center" alignItems="center" style={{marginTop: 20, marginBottom: 20}}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => {setOpenPopUpInsert(true)}}>
            AGGIUNGI
          </Button>
        </Grid>
      </Grid> */}
      
    </Container>
    );
  }