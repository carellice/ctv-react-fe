import * as React from 'react';
import { ListItem, ListItemButton, ListItemText, ListItemIcon, Typography } from '@mui/material';


export default function ListItemPersonal({editElement, el}) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => {
        console.log("AAAA " + JSON.stringify(el));
        localStorage.removeItem("elToEdit");
        localStorage.setItem("elToEdit", JSON.stringify(el));
        editElement();
        }}>
        <ListItemText
          primary={el.nome}
          secondary={
            <>
              {el.dataDa === null && el.dataA === null ? (
                <>
                </>
              ) : (
                <>
                  <span>Da: {el.dataDa}</span>
                  <br />
                  <span>A: {el.dataA}</span>
                  <br />
                </>
              )}
              
              <span>Note: {el.note}</span>
            </>
          }
        />
        <ListItemIcon>
          <Typography variant='h6' style={{color: 'white'}}>
            {el.costo} €
          </Typography>
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}