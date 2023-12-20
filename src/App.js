import { useState, useEffect } from 'react';
import * as React from 'react';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import InsertNew from './pages/InsertNew';
import Svago from './pages/Svago';
import PrimaNecessita from './pages/PrimaNecessita';
import Snackbar, { snackbarClasses } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as DataBaseUtils from "./utils/DataBaseUtils";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ExcelGenerator from './components/ExcelGenerator';
import PdfGenerator from './components/PdfGenerator';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function App() {

  const data = {
    "user": "test",
    "ctv": [
      {
        "id": new Date().toString(),
        "data": "DICEMBRE 2023",
        "stipendio": "1760",
        "svago": "200",
        "primaNecessita": "200",
        "risparmi": "200",
        "percentualePrimaNecessita": 50,
        "percentualeSvago": 30,
        "percentualeRisparmi": 20
      }
    ],
    "svago": [
      {
        "id": new Date().toString(),
        "nome": "ELEMENTO",
        "note": "/////",
        "dataDa": "2023/12/01",
        "dataA": "2024/01/01",
        "costo": "100,00"
      }
    ],
    "primaNecessita": [
      {
        "id": new Date().toString(),
        "nome": "ELEMENTO",
        "note": "/////",
        "dataDa": "2023/12/01",
        "dataA": "2024/01/01",
        "costo": "100,00"
      }
    ]
  };

  //USE EFFECT
  useEffect(() => {
    DataBaseUtils.getData().then(dt => setDatas(dt));
  }, []);

  //DARK MODE
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  //UPDATE DATAS
  const update = () => {
    DataBaseUtils.getData().then(dt => setDatas(dt));
  }

  const [user, setUser] = useState(null);
  const [messageSnackBar, setMessageScnakBar] = useState("");
  const [typeSnackBar, setTypeScnakBar] = useState("error");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [selectedPage, setSelectedPage] = useState("HomePage");

  //DATI
  const [datas, setDatas] = useState(null);

  //LOGIN
  const loginFunc = (username, pass) => {
    if(username === "" && pass === ""){
      localStorage.setItem("user", username);
      setSelectedPage("HomePage");
    }
  } 

  //SNACKBAR
  const snackBarFunc = (message, type) => {
    setMessageScnakBar(message);
    setTypeScnakBar(type);
    setOpenSnackBar(true);
  } 

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ResponsiveAppBar selectedPage={selectedPage} setSelectedPage = {setSelectedPage}/>
      {datas === null ? (
        <>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        </>
      ) : (
        <>
          {selectedPage === 'LoginPage' ? <LoginPage loginFunc={loginFunc} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'HomePage' ? <HomePage snackBarFunc={snackBarFunc} update={update} ctv={datas.ctv} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'InsertNew' ? <InsertNew setSelectedPage={setSelectedPage} update={update} snackBarFunc={snackBarFunc}/> : <></>}
          {selectedPage === 'Svago' ? <Svago update={update}  svago={datas.svago} snackBarFunc={snackBarFunc} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'Prima Necessità' ? <PrimaNecessita update={update} primaNecessita={datas.primaNecessita} snackBarFunc={snackBarFunc} setSelectedPage={setSelectedPage}/> : <></>}
        </>
      )}
      
    <ExcelGenerator data={data} fileName={"pieno de sordi"}/>
    <PdfGenerator data={data} fileName={"pieno de sordi"}/>
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={() => setOpenSnackBar(false)}>
        <Alert onClose={() => setOpenSnackBar(false)} severity={typeSnackBar} sx={{ width: '100%' }}>
          {messageSnackBar}
        </Alert>
      </Snackbar>
    </ThemeProvider>
      
    </>
  );
}

export default App;
