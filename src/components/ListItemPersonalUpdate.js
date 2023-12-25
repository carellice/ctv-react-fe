import * as React from 'react';
import { ListItem, ListItemButton, ListItemText, ListItemIcon, Typography, Grow, Collapse, Zoom } from '@mui/material';
import * as ImportoUtils from "../utils/ImportoUtils";
import * as DateUtils from "../utils/DateUtils";

export default function ListItemPersonalUpdate({el, onClickFunc}) {
  return (
    <ListItem disablePadding>
        <ListItemButton onClick={(onClickFunc)}>
          <ListItemText
            primary={el.nome.toUpperCase()}
            secondary={
                  <>
                    <span style={{fontWeight: 'bold', color: '#f53636'}}>DA: </span><span>{DateUtils.getDateDayMonthYear(new Date(el.dataDa))}</span>
                    <br />
                    <span style={{fontWeight: 'bold', color: '#f53636'}}>A: </span><span>{DateUtils.getDateDayMonthYear(new Date(el.dataA))}</span>
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