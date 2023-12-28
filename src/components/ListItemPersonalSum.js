import * as React from 'react';
import { ListItem, ListItemButton, ListItemText, ListItemIcon, Typography, Grow, Collapse, Zoom } from '@mui/material';
import * as ImportoUtils from "../utils/ImportoUtils";

export default function ListItemPersonalSum({el, onClickFunc}) {
  return (
    <ListItem disablePadding>
        <ListItemButton onClick={(onClickFunc)}>
          <ListItemText
            primary={el.nome.toUpperCase()}
            secondary={
                  <>
                    <span style={{fontWeight: 'bold', color: '#f53636'}}>NOTE: </span><span style={{display: el.note.length > 40 ? 'block' : 'inline'}}>{el.note.toUpperCase()}</span>
                    <br />
                  </>
            }
          />
          <ListItemIcon>
            <Typography variant='h7' style={{color: 'white'}}>
              {ImportoUtils.getImportoFormatted(el.costo)} €
            </Typography>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
  );
}