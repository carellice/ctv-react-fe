import React from 'react';
import { Container, Grid, Grow } from '@mui/material';
import BasicCard from './BasicCard';

export default function HomeGrid({setSelectedPage, ctv, update, snackBarFunc}) {
  return (
    <Container style={{ marginTop: 40 }}>
      <Grid container spacing={2}>
        {ctv.map((el, index) => (
          <Grow in={true}>
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <BasicCard snackBarFunc={snackBarFunc} el={el}  update={update}/>
            </Grid>
          </Grow>
        ))}
      </Grid>

      {/* <Grid container justifyContent="center" alignItems="center" style={{marginTop: 20}}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => {
            window.history.pushState({}, null, null);
            setSelectedPage("InsertNew");
          }}>
            AGGIUNGI
          </Button>
        </Grid>
      </Grid> */}
    </Container>
  );
}
