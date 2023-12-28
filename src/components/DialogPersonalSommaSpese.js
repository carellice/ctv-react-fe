import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { List, Divider, Chip, Typography } from "@mui/material";
import ListItemPersonalUpdate from "./ListItemPersonalUpdate";
import { LoadingButton } from "@mui/lab";
import CalculateIcon from "@mui/icons-material/Calculate";
import * as DataBaseUtils from "./../utils/DataBaseUtils";
import * as ImportoUtils from "./../utils/ImportoUtils";
import UndoIcon from '@mui/icons-material/Undo';
import ListItemPersonalSum from "./ListItemPersonalSum";

export default function DialogPersonalSommaSpese({
  open,
  setOpen,
  title,
  text,
  showAnnulla,
  svago,
  primaNecessita,
}) {
  const [loading, setLoading] = useState(false);
  const [toSumEl, setToSumEl] = useState([]);
  const [sum, setSum] = useState(null);

  const getSum = async () => {
    var somma = parseFloat(0);

    for (let toSum of toSumEl) {
      const el = await DataBaseUtils.getElById(toSum.id);
      somma = somma + parseFloat(el.costo);
    }

    return ImportoUtils.getImportoFormatted(somma.toString());
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {sum === null ? (
            <>
              {text} <br />
              {toSumEl.map((el) => (
                <Chip
                  style={{ marginTop: 10, marginLeft: 5 }}
                  label={el.nome.toUpperCase()}
                  onDelete={() => {
                    const newArray = toSumEl.filter((p) => p.id !== el.id);
                    setToSumEl(newArray);
                  }}
                />
              ))}
              {svago.length !== 0 ? (
                <>
                  <Divider style={{ marginTop: 10, marginBottom: 5 }}>
                    <Chip label="SVAGO" />
                  </Divider>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 1000,
                      bgcolor: "background.paper",
                    }}
                  >
                    {svago.map((el) => (
                      <>
                      <ListItemPersonalSum
                        el={el}
                        onClickFunc={() => {
                          if (
                            toSumEl.filter((p) => p.id === el.id).length === 0
                          ) {
                            const newElToUpdate = [
                              ...toSumEl,
                              { nome: el.nome, id: el.id },
                            ];
                            setToSumEl(newElToUpdate);
                          }
                        }}
                      />
                      <Divider/>
                      </>
                      
                    ))}
                  </List>
                </>
              ) : (
                <></>
              )}
              {primaNecessita.length !== 0 ? (
                <>
                  <Divider style={{ marginTop: 10, marginBottom: 5 }}>
                    <Chip label={"PRIMA NECESSITà".toUpperCase()} />
                  </Divider>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 1000,
                      bgcolor: "background.paper",
                    }}
                  >
                    {primaNecessita.map((el) => (
                      <>
                        <ListItemPersonalSum
                        el={el}
                        onClickFunc={() => {
                          if (
                            toSumEl.filter((p) => p.id === el.id).length === 0
                          ) {
                            const newElToUpdate = [
                              ...toSumEl,
                              { nome: el.nome, id: el.id },
                            ];
                            setToSumEl(newElToUpdate);
                          }
                        }}
                        />
                        <Divider/>
                      </>
                    ))}
                  </List>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <Typography variant="h4" textAlign={'center'}>{sum} €</Typography>
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {showAnnulla ? (
          <Button
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                setSum(null);
                setToSumEl([]);
              }, 500);
            }}
          >
            Annulla
          </Button>
        ) : (
          <></>
        )}
        {sum === null ? (
          <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<CalculateIcon />}
          variant="contained"
          disabled={toSumEl.length === 0}
          onClick={() => {
            getSum().then((r) => setSum(r));
          }}
        >
          CALCOLA
        </LoadingButton>
        ) : (
          <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<UndoIcon />}
          variant="contained"
          onClick={() => {
            setSum(null);
            setToSumEl([]);
          }}
        >
          RICALCOLA
        </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
}