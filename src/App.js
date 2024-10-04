import { useState, useEffect } from 'react';
import * as React from 'react';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import InsertNew from './pages/InsertNew';
import Svago from './pages/Svago';
import PrimaNecessita from './pages/PrimaNecessita';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as DataBaseUtils from "./utils/DataBaseUtils";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Settings from './pages/Settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { isApp } from './Config';
import * as HistoryUtils from "./utils/HistoryUtils";
import MyBottomNavigation from "./components/MyBottomNavigation";
import * as ApiUtils from "./utils/ApiUtils";
import {SNACKBAR_ERROR, SNACKBAR_SUCCESS} from "./utils/SnackBarUtils";
import {pushState} from "./utils/HistoryUtils";
import * as SnackBarUtils from "./utils/SnackBarUtils";
import * as DateUtils from "./utils/DateUtils";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function App() {

  const [value, setValue] = React.useState(0);
  const [openPopUpInsertSvago, setOpenPopUpInsertSvago] = useState(false);
  const [openPopUpInsertNecessita, setOpenPopUpInsertNecessita] = useState(false);

  //USE EFFECT
  useEffect(() => {
    //CONTROLLO SE SIA STATA SALVATA LA CENSURA OPPURE NO
    DataBaseUtils.getCensored().then(r => setCensored(r));

    //RECUPERO I DATI
    // DataBaseUtils.getData().then(dt => setDatas(dt));

    //CONTROLLO IL CONTENUTO DELL'URL
    if(!isApp && localStorage.getItem("user") === null){
      DataBaseUtils.getData().then(dt => setDatas(dt));
      HistoryUtils.handleUrl(setSelectedPage);
    }else if(localStorage.getItem("user") !== null){
      ApiUtils.getJson().then((res) =>{
        DataBaseUtils.getData().then(dt => setDatas(dt));
        if(res === 'ok'){
          HistoryUtils.handleUrl(setSelectedPage);
          // pushState("ctv");
          // setSelectedPage("HomePage");
          // window.location.reload();
          // DateUtils.getDateDayMonthYearHourMinute(new Date()).then(r => {
          //   DataBaseUtils.saveUltimoRipristino().then(() => setUltimoRipristino(r));
          // });
        }else{
          snackBarFunc(res, SnackBarUtils.SNACKBAR_ERROR);
        }
      })
    }
  }, []);

  // BACK BUTTON PRESSED
  window.addEventListener("popstate", () => {
    HistoryUtils.handleUrl(setSelectedPage);
  });

  //DARK MODE
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: [
        'Google Sans', // Aggiungi 'Google Sans' come primo font della lista
        'sans-serif', // Aggiungi altri fallback di font qui se necessario
      ].join(','),
    },
  });

  //UPDATE DATAS
  const update = async () => {
    DataBaseUtils.getData().then(dt => setDatas(dt));
  }

  // const [user, setUser] = useState(null);
  const [messageSnackBar, setMessageScnakBar] = useState("");
  const [typeSnackBar, setTypeScnakBar] = useState("error");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [selectedPage, setSelectedPage] = useState("LoginPage");
  
  //CENSURA
  const [censored, setCensored] = useState(null);

  //DATI
  const [datas, setDatas] = useState(null);

  //LOGIN
  const loginFunc = async (username, pass) => {
    return await ApiUtils.login(username, pass);
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
      <ResponsiveAppBar openPopupInsertNecessita={openPopUpInsertNecessita} setOpenPopupInsertNecessita={setOpenPopUpInsertNecessita} openPopupInsertSvago={openPopUpInsertSvago} setOpenPopupInsertSvago={setOpenPopUpInsertSvago} setTabs={setValue} selectedPage={selectedPage} setSelectedPage = {setSelectedPage}/>
      {datas === null || censored === null ? (
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
          {isApp && (selectedPage === "HomePage" || selectedPage === "Necessità" || selectedPage === "Sfizio") ? (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop:7 }}>
              <Tabs centered value={value} onChange={(event, newValue) => {
                setValue(newValue);
                if(newValue === 0)
                  setSelectedPage("HomePage");
                if(newValue === 1)
                  setSelectedPage("Necessità");
                if(newValue === 2)
                  setSelectedPage("Sfizio");
              }} aria-label="basic tabs example">
                <Tab label="CTV" />
                <Tab label={"Necessità".toUpperCase()} />
                <Tab label="SFIZIO" />
              </Tabs>
            </Box>
          ) : <></>}
          {selectedPage === 'LoginPage' ? <LoginPage snackBarFunc={snackBarFunc} loginFunc={loginFunc} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'HomePage' ? <HomePage censored={censored} setCensored={setCensored} snackBarFunc={snackBarFunc} update={update} ctv={datas.ctv.slice().reverse()} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'SettingsPage' ? <Settings snackBarFunc={snackBarFunc} update={update} data={datas} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'InsertNew' ? <InsertNew setSelectedPage={setSelectedPage} update={update} snackBarFunc={snackBarFunc}/> : <></>}
          {selectedPage === 'Sfizio' ? <Svago setOpenPopUpInsert={setOpenPopUpInsertSvago} openPopUpInsert={openPopUpInsertSvago} update={update}  svago={datas.svago} snackBarFunc={snackBarFunc} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'Necessità' ? <PrimaNecessita openPopUpInsert={openPopUpInsertNecessita} setOpenPopUpInsert={setOpenPopUpInsertNecessita} update={update} primaNecessita={datas.primaNecessita} snackBarFunc={snackBarFunc} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage !== 'LoginPage' ? <MyBottomNavigation setSelectedPage={setSelectedPage} selectedPage={selectedPage}/> : <></>}
        </>
      )}

      <Snackbar sx={{marginBottom: 10}} open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
        <Alert onClose={() => setOpenSnackBar(false)} severity={typeSnackBar} sx={{ width: '100%' }}>
          {messageSnackBar}
        </Alert>
      </Snackbar>
    </ThemeProvider>
      
    </>
  );
}

export default App;
