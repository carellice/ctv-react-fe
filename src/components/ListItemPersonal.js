import * as React from 'react';
import { ListItem, ListItemButton, ListItemText, ListItemIcon, Typography, Grow, Collapse, Zoom } from '@mui/material';
import * as ImportoUtils from "./../utils/ImportoUtils";
import * as DateUtils from "./../utils/DateUtils";
import DialogDeleteOrDuplicate from "./DialogDeleteOrDuplicate";

export default function ListItemPersonal({editElement, el}) {

  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <>
      <Zoom in={true}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            localStorage.removeItem("elToEdit");
            localStorage.setItem("elToEdit", JSON.stringify(el));
            editElement();
          }}>
            <ListItemText
                primary={el.nome.toUpperCase()}
                secondary={
                  <>
                    {el.dataDa === null && el.dataA === null ? (
                        <>
                        </>
                    ) : (
                        <>
                          <span style={{fontWeight: 'bold', color: '#f53636'}}>DA: </span><span>{DateUtils.getDateDayMonthYear(new Date(el.dataDa))}</span>
                          <br />
                          <span style={{fontWeight: 'bold', color: '#f53636'}}>A: </span><span>{DateUtils.getDateDayMonthYear(new Date(el.dataA))}</span>
                          <br />
                        </>
                    )}

                    <span style={{fontWeight: 'bold', color: '#f53636'}}>NOTE: </span><span>{el.note.toUpperCase()}</span>
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
      </Zoom>
      <DialogDeleteOrDuplicate open={openDialog} setOpen={setOpenDialog} title={"titolo"} text={"testo"}/>
    </>
  );
}