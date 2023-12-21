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
import { Grow } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { isApp } from './Config';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function App() {

  const [value, setValue] = React.useState(0);

  //USE EFFECT
  useEffect(() => {
    DataBaseUtils.getData().then(dt => setDatas(dt));
    const currentUrl = window.location.href;
    if(currentUrl.includes("download-app-android"))
      setSelectedPage("SettingsPage");
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

  // const [user, setUser] = useState(null);
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
      <ResponsiveAppBar setTabs={setValue} selectedPage={selectedPage} setSelectedPage = {setSelectedPage}/>
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
          {isApp && (selectedPage === "HomePage" || selectedPage === "Prima Necessità" || selectedPage === "Svago") ? (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop:7 }}>
              <Tabs centered value={value} onChange={(event, newValue) => {
                setValue(newValue);
                if(newValue === 0)
                  setSelectedPage("HomePage");
                if(newValue === 1)
                  setSelectedPage("Prima Necessità");
                if(newValue === 2)
                  setSelectedPage("Svago");
              }} aria-label="basic tabs example">
                <Tab label="CTV" />
                <Tab label={"Necessità".toUpperCase()} />
                <Tab label="SVAGO" />
              </Tabs>
            </Box>
          ) : <></>}
          {selectedPage === 'LoginPage' ? <LoginPage loginFunc={loginFunc} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'HomePage' ? <HomePage snackBarFunc={snackBarFunc} update={update} ctv={datas.ctv} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'SettingsPage' ? <Settings snackBarFunc={snackBarFunc} update={update} ctv={datas.ctv} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'InsertNew' ? <InsertNew setSelectedPage={setSelectedPage} update={update} snackBarFunc={snackBarFunc}/> : <></>}
          {selectedPage === 'Svago' ? <Svago update={update}  svago={datas.svago} snackBarFunc={snackBarFunc} setSelectedPage={setSelectedPage}/> : <></>}
          {selectedPage === 'Prima Necessità' ? <PrimaNecessita update={update} primaNecessita={datas.primaNecessita} snackBarFunc={snackBarFunc} setSelectedPage={setSelectedPage}/> : <></>}
        </>
      )}

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
