import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {Paper} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import * as HistoryUtils from "../utils/HistoryUtils";

export default function MyBottomNavigation({setSelectedPage, selectedPage}) {
  // const [value, setValue] = React.useState(0);
  const [value, setValue] = React.useState(selectedPage === 'HomePage' ? 0 : selectedPage === 'Sfizio' ? 1 : selectedPage === 'Necessità' ? 2 : selectedPage === 'SettingsPage' ? 3 : 0);

  return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height:80, zIndex: 1300 }} elevation={3}>
          <BottomNavigation
              sx={{backgroundColor: '#272727'}}
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                if(newValue === 0){
                    HistoryUtils.pushState("ctv");
                }else if(newValue === 1) {
                    HistoryUtils.pushState("sfizio");
                }else if(newValue === 2){
                    HistoryUtils.pushState("necessita");
                }else if(newValue === 3) {
                    HistoryUtils.pushState("impostazioni");
                }
                setSelectedPage(newValue === 0 ? "HomePage" : newValue === 1 ? "Sfizio" : newValue === 2 ? "Necessità" : newValue === 3 ? "SettingsPage" : "");
              }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Sfizio" icon={<SportsSoccerIcon />} />
            <BottomNavigationAction label="Necessità" icon={<RestaurantIcon />} />
            <BottomNavigationAction label="Impostazioni" icon={<SettingsIcon />} />
          </BottomNavigation>
      </Paper>
  );
}
