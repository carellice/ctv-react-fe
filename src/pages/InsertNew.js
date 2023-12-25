import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Container,
  Button,
  Chip,
  Grow,
  Zoom,
  CircularProgress,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import * as SnackBarUtils from "./../utils/SnackBarUtils";
import * as DataBaseUtils from "./../utils/DataBaseUtils";
import * as DateUtils from "./../utils/DateUtils";
import * as ImportoUtils from "./../utils/ImportoUtils";
import DialogPersonal from '../components/DialogPersonal';
import DialogPersonalUpdate from "../components/DialogPersonalUpdate";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';

const InsertNew = ({ snackBarFunc, update, setSelectedPage, snackBarFunc2 }) => {
  //SAVE
  const save = async () => {
    setLoading(true);
    const checkRes = await DataBaseUtils.checkCtv(stipendio, percentualePrimaNecessita, percentualeSvago, percentualeRisparmi, daSottrarrePrimaNecessita, daSottrarreSvago, daSottrarreRisparmi);
    if(checkRes === 400){
      snackBarFunc("POPOLARE TUTTI I CAMPI!", SnackBarUtils.SNACKBAR_ERROR);
    }else{
      const checkEdit = await checkIfSvagoOrPrimaNecessitaAggiornabiliAndReturnThem();
      console.log("checkEdit ", checkEdit);
      if(checkEdit === null){
        const insert = await DataBaseUtils.insertCtv(stipendio, percentualePrimaNecessita, percentualeSvago, percentualeRisparmi, risultatoSvago, risultatoPrimaNecessita, risultatoRisparmi);
        if(insert === 500){
          snackBarFunc("ERRORE INSERIMENTO!", SnackBarUtils.SNACKBAR_ERROR);
        }else{
          snackBarFunc("INSERIMENTO AVVENUTO CON SUCCESSO!", SnackBarUtils.SNACKBAR_SUCCESS);
          setTimeout(() => {
            update();
            setSelectedPage("HomePage");
            setLoading(false);
          }, 1000);
        }
      } else{
          setOpenDialogUpdate(true);
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [svagoUpdt, setSvagoUpdt] = useState(null);
  const [primaNecessitaUpdt, setPrimaNecessitaUpdt] = useState(null);
  //CONTROLLO SE CI SONO PRIME NECESSITà O SVAGO AGGIORNABILI DI UN MESE
  const checkIfSvagoOrPrimaNecessitaAggiornabiliAndReturnThem = async () => {
    const data = await DataBaseUtils.getData()
    const primaNecessita = data.primaNecessita;
    const svago = data.svago;

    const primaNecessitaAggiornabili = primaNecessita.filter(p => p.dataDa !== null);
    const svagoAggiornabili = svago.filter(p => p.dataDa !== null);

    if(primaNecessitaAggiornabili.length === 0 && svagoAggiornabili.length === 0)
      return null;
    else{
      setSvagoUpdt(svagoAggiornabili);
      setPrimaNecessitaUpdt(primaNecessitaAggiornabili);
      return 200;
    }
  }

  //BACK BUTTON PRESSED
  window.addEventListener("popstate", () => {
    setSelectedPage("HomePage");
  });

  //CALCOLO IN TEMPO REALE
  const calculate = async (
    stipendioPar,
    primaNecessitaPerc,
    svagoPerc,
    risparmiPerc,
    primaNecessitaDaSottr,
    svagoDaSottr,
    risparmiDaSottr
  ) => {
    const stipendioFloat =
      stipendioPar === null
        ? parseFloat(stipendio.replace(",", "."))
        : parseFloat(stipendioPar.replace(",", "."));

    const primanecessitaDaSottrarreFloat =
      primaNecessitaDaSottr === null
        ? parseFloat(daSottrarrePrimaNecessita.replace(",", "."))
        : parseFloat(primaNecessitaDaSottr.replace(",", "."));
    const svagoDaSottrarreFloat =
      svagoDaSottr === null
        ? parseFloat(daSottrarreSvago.replace(",", "."))
        : parseFloat(svagoDaSottr.replace(",", "."));
    const risparmiDaSottrarreFloat =
      risparmiDaSottr === null
        ? parseFloat(daSottrarreRisparmi.replace(",", "."))
        : parseFloat(risparmiDaSottr.replace(",", "."));

    const percentualePrimaNecessitaInt =
      primaNecessitaPerc === null
        ? parseInt(percentualePrimaNecessita)
        : parseInt(primaNecessitaPerc);
    const percentualeSvagoInt =
      svagoPerc === null ? parseInt(percentualeSvago) : parseInt(svagoPerc);
    const percentualeRisparmiInt =
      risparmiPerc === null
        ? parseInt(percentualeRisparmi)
        : parseInt(risparmiPerc);

    const costoTotPrimaNecessita =
      await DataBaseUtils.getTotCostiPrimaNecessita();
    const costoTotSvago = await DataBaseUtils.getTotCostiSvago();

    const risultatoPrimaNecessita =
      (percentualePrimaNecessitaInt / 100) * stipendioFloat -
      primanecessitaDaSottrarreFloat -
      costoTotPrimaNecessita;
    const risultatoSvago =
      (percentualeSvagoInt / 100) * stipendioFloat -
      svagoDaSottrarreFloat -
      costoTotSvago;
    const risultatoRisparmi =
      (percentualeRisparmiInt / 100) * stipendioFloat -
      risparmiDaSottrarreFloat;

    setRisultatoPrimaNecessita(
      isNaN(risultatoPrimaNecessita) ? "0" : risultatoPrimaNecessita
    );
    setRisultatoRisparmi(isNaN(risultatoRisparmi) ? "0" : risultatoRisparmi);
    setRisultatoSvago(isNaN(risultatoSvago) ? "0" : risultatoSvago);
  };

  //STIPENDIO
  const [stipendio, setStipendio] = useState("0");
  const handleStipendioChange = async (event) => {
    setStipendio(event.target.value);
    calculate(event.target.value, null, null, null, null, null, null);
  };

  //PERCENTUALI
  const [somma, setSomma] = useState(100);
  const [sommaIs100, setSommaIs100] = useState(true);
  const [percentualePrimaNecessita, setPercentualePrimaNecessita] =
    useState("50");
  const [percentualeSvago, setPercentualeSvago] = useState("30");
  const [percentualeRisparmi, setPercentualeRisparmi] = useState("20");
  const handlePercentualiChange = (campo, value) => {
    const valueWithoutVirgola = value.replace(".", "");
    if (campo === "percentualePrimaNecessita") {
      setPercentualePrimaNecessita(valueWithoutVirgola);
      const primaNecessitaInt = parseInt(valueWithoutVirgola);
      const svagoInt = parseInt(percentualeSvago);
      const risparmiInt = parseInt(percentualeRisparmi);
      const somma = primaNecessitaInt + svagoInt + risparmiInt;
      setSommaIs100(somma === 100);
      setSomma(somma);
      calculate(null, valueWithoutVirgola, null, null, null, null, null);
    } else if (campo === "percentualeSvago") {
      setPercentualeSvago(valueWithoutVirgola);
      const primaNecessitaInt = parseInt(percentualePrimaNecessita);
      const svagoInt = parseInt(valueWithoutVirgola);
      const risparmiInt = parseInt(percentualeRisparmi);
      const somma = primaNecessitaInt + svagoInt + risparmiInt;
      setSommaIs100(somma === 100);
      setSomma(somma);
      calculate(null, null, valueWithoutVirgola, null, null, null, null);
    } else if (campo === "percentualeRisparmi") {
      setPercentualeRisparmi(valueWithoutVirgola);
      const primaNecessitaInt = parseInt(percentualePrimaNecessita);
      const svagoInt = parseInt(percentualeSvago);
      const risparmiInt = parseInt(valueWithoutVirgola);
      const somma = primaNecessitaInt + svagoInt + risparmiInt;
      setSommaIs100(somma === 100);
      setSomma(somma);
      calculate(null, null, null, valueWithoutVirgola, null, null, null);
    }
  };

  //DA SOTTRARRE
  const [daSottrarrePrimaNecessita, setDaSottrarrePrimaNecessita] =
    useState("0");
  const [daSottrarreSvago, setDaSottrarreSvago] = useState("0");
  const [daSottrarreRisparmi, setDaSottrarreRisparmi] = useState("0");
  const handleDaSottrarreChange = (campo, value) => {
    switch (campo) {
      case "daSottrarrePrimaNecessita":
        calculate(null, null, null, null, value, null, null);
        setDaSottrarrePrimaNecessita(value);
        break;
      case "daSottrarreSvago":
        calculate(null, null, null, null, null, value, null);
        setDaSottrarreSvago(value);
        break;
      case "daSottrarreRisparmi":
        calculate(null, null, null, null, null, null, value);
        setDaSottrarreRisparmi(value);
        break;
      default:
        break;
    }
  };

  //RISULTATI
  const [risultatoPrimaNecessita, setRisultatoPrimaNecessita] = useState("0");
  const [risultatoSvago, setRisultatoSvago] = useState("0");
  const [risultatoRisparmi, setRisultatoRisparmi] = useState("0");

  return (
    <Container style={{ marginTop: 80 }}>
      <Zoom in={true}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          INSERISCI {percentualePrimaNecessita} - {percentualeSvago} -{" "}
          {percentualeRisparmi} ({DateUtils.getDateMonthYear(new Date())})
        </Typography>
      </Zoom>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {/* STIPENDIO */}
        <Grow in={true}>
          <Grid item xs={12}>
            <TextField
              label="Stipendio"
              variant="outlined"
              type="number"
              fullWidth
              required
              error={stipendio === ""}
              value={stipendio}
              onChange={handleStipendioChange}
            />
          </Grid>
        </Grow>

        {/* PERCENTUALI - CHIP */}
        <Zoom in={true}>
          <Grid item xs={12} style={{ marginTop: 30 }}>
            <Divider>
              <Chip
                color={sommaIs100 ? "success" : "error"}
                label={
                  isNaN(somma)
                    ? "PERCENTUALI: SOMMA = ..."
                    : "PERCENTUALI: SOMMA = " + somma
                }
              />
            </Divider>
          </Grid>
        </Zoom>

        {/* PERCENTUALI - PRIMA NECESSITA' - INPUT */}
        <Grow in={true}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Prima Necessità"
              variant="outlined"
              type="number"
              fullWidth
              required
              error={!sommaIs100 || percentualePrimaNecessita === ""}
              value={percentualePrimaNecessita}
              inputProps={{
                step: "1", // Imposta il passo a 1 per accettare solo numeri interi
              }}
              onChange={(e) =>
                handlePercentualiChange(
                  "percentualePrimaNecessita",
                  e.target.value
                )
              }
            />
          </Grid>
        </Grow>

        {/* PERCENTUALI - SVAGO - INPUT */}
        <Grow in={true}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Svago"
              variant="outlined"
              type="number"
              fullWidth
              required
              error={!sommaIs100 || percentualeSvago === ""}
              value={percentualeSvago}
              inputProps={{
                step: "1", // Imposta il passo a 1 per accettare solo numeri interi
              }}
              onChange={(e) =>
                handlePercentualiChange("percentualeSvago", e.target.value)
              }
            />
          </Grid>
        </Grow>

        {/* PERCENTUALI - RISPARMI - INPUT */}
        <Grow in={true}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Risparmi"
              variant="outlined"
              type="number"
              fullWidth
              required
              error={!sommaIs100 || percentualeRisparmi === ""}
              value={percentualeRisparmi}
              inputProps={{
                step: "1", // Imposta il passo a 1 per accettare solo numeri interi
              }}
              onChange={(e) =>
                handlePercentualiChange("percentualeRisparmi", e.target.value)
              }
            />
          </Grid>
        </Grow>

        {/* DA SOTTRARRE - CHIP */}
        <Zoom in={true}>
          <Grid item xs={12} style={{ marginTop: 30 }}>
            <Divider>
              <Chip label="DA SOTTRARRE" />
            </Divider>
          </Grid>
        </Zoom>

        {/* DA SOTTRARRE - PRIMA NECESSITA' - INPUT */}
        <Grow in={true}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Prima Necessità"
              variant="outlined"
              type="number"
              fullWidth
              required
              error={daSottrarrePrimaNecessita === ""}
              value={daSottrarrePrimaNecessita}
              onChange={(e) =>
                handleDaSottrarreChange(
                  "daSottrarrePrimaNecessita",
                  e.target.value
                )
              }
            />
          </Grid>
        </Grow>

        {/* DA SOTTRARRE - SVAGO - INPUT */}
        <Grow in={true}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Svago"
              variant="outlined"
              type="number"
              fullWidth
              required
              error={daSottrarreSvago === ""}
              value={daSottrarreSvago}
              onChange={(e) =>
                handleDaSottrarreChange("daSottrarreSvago", e.target.value)
              }
            />
          </Grid>
        </Grow>

        {/* DA SOTTRARRE - RISPARMI - INPUT */}
        <Grow in={true}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Risparmi"
              variant="outlined"
              type="number"
              fullWidth
              required
              error={daSottrarreRisparmi === ""}
              value={daSottrarreRisparmi}
              onChange={(e) =>
                handleDaSottrarreChange("daSottrarreRisparmi", e.target.value)
              }
            />
          </Grid>
        </Grow>

        {/* RISULTATI - CHIP  */}
        <Zoom in={true}>
          <Grid item xs={12} style={{ marginTop: 30 }}>
            <Divider>
              <Chip label="RISULTATI" />
            </Divider>
          </Grid>
        </Zoom>

        {/* PRIMA NECESSITA' - OUTPUT */}
        <Grow in={true}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1">Prima Necessità</Typography>
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              value={ImportoUtils.getImportoFormatted(risultatoPrimaNecessita)}
              disabled
            />
          </Grid>
        </Grow>

        {/* SVAGO - OUTPUT */}
        <Grow in={true}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1">Svago</Typography>
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              value={ImportoUtils.getImportoFormatted(risultatoSvago)}
              disabled
            />
          </Grid>
        </Grow>

        {/* RISPARMI - OUTPUT */}
        <Grow in={true}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1">Risparmi</Typography>
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              value={ImportoUtils.getImportoFormatted(risultatoRisparmi)}
              disabled
            />
          </Grid>
        </Grow>
      </Grid>

      {/* SALVA - BUTTON*/}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <Grow in={true}>
          <Grid item>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                save().then(() => {});
              }}
            >
              SALVA
            </LoadingButton>
            {/* <Button variant="contained" color="primary" endIcon={loading ? <CircularProgress  /> : <></>} onClick={() => {
              save().then(() => {});
            }}>
              SALVA
            </Button> */}
          </Grid>
        </Grow>
      </Grid>

      {/* DIALOG CONFERMA AGGIORNEMENTO ELEMENTI */}
      {svagoUpdt !== null && primaNecessitaUpdt !== null ? (
        <DialogPersonalUpdate
        stipendio={stipendio}
        percentualePrimaNecessita={percentualePrimaNecessita}
        percentualeSvago={percentualeSvago}
        percentualeRisparmi={percentualeRisparmi}
        risultatoSvago={risultatoSvago}
        risultatoPrimaNecessita={risultatoPrimaNecessita}
        risultatoRisparmi={risultatoRisparmi}
        svago={svagoUpdt}
        primaNecessita={primaNecessitaUpdt}
        showAnnulla={true}
        textInput={false}
        open={openDialogUpdate}
        setOpen={setOpenDialogUpdate}
        snackBarFunc={snackBarFunc}
        setSelectedPage={setSelectedPage}
        update={update}
        setLoadingFather={setLoading}
        text={"SCEGLI I DATI DA AGGIORNARE DI UN MESE (CLICCA GLI ELEMENTI)".toUpperCase()}
        title={"AGGIORNA"}
      />
      ) : <></>}
    </Container>
  );
};

export default InsertNew;