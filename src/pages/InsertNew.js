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
} from "@mui/material";
import Divider from "@mui/material/Divider";
import * as SnackBarUtils from "./../utils/SnackBarUtils";
import * as DataBaseUtils from "./../utils/DataBaseUtils";
import * as DateUtils from "./../utils/DateUtils";
import * as ImportoUtils from "./../utils/ImportoUtils";

const InsertNew = ({ snackBarFunc, update, setSelectedPage }) => {
  //SAVE
  const save = () => {
    if (
      stipendio === "" ||
      percentualePrimaNecessita === "" ||
      percentualeSvago === "" ||
      percentualeRisparmi === "" ||
      daSottrarrePrimaNecessita === "" ||
      daSottrarreSvago === "" ||
      daSottrarreRisparmi === ""
    ) {
      snackBarFunc("POPOLARE TUTTI I CAMPI!", SnackBarUtils.SNACKBAR_ERROR);
    } else {
      DataBaseUtils.saveCtv(
        DateUtils.getDateMonthYear(),
        stipendio,
        risultatoSvago,
        risultatoPrimaNecessita,
        risultatoRisparmi,
        percentualePrimaNecessita,
        percentualeRisparmi,
        percentualeSvago
      ).then((r) => {
        if (r === 200) {
          update();
          setSelectedPage("HomePage");
          snackBarFunc(
            "INSERITO CORRETTAMENTE!",
            SnackBarUtils.SNACKBAR_SUCCESS
          );
        } else {
          snackBarFunc("ERRORE INSERIMENTO!", SnackBarUtils.SNACKBAR_ERROR);
        }
      });
    }
  };

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
            <Button variant="contained" color="primary" onClick={() => save()}>
              SALVA
            </Button>
          </Grid>
        </Grow>
      </Grid>
    </Container>
  );
};

export default InsertNew;