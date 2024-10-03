import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Percent from '@mui/icons-material/Percent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import {isApp} from "./../Config"
import * as HistoryUtils from "../utils/HistoryUtils";
import AddIcon from '@mui/icons-material/Add';

const pages = ['Sfizio', 'Necessità'];
// const settings = ['Logout'];

function ResponsiveAppBar({selectedPage, setSelectedPage, setTabs, openPopupInsertSvago, setOpenPopupInsertSvago, openPopupInsertNecessita, setOpenPopupInsertNecessita}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
      <AppBar position="fixed" sx={{ maxWidth: 1200, mx: 'auto', left: 0, right: 0, margin: '0 auto' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {(selectedPage !== "HomePage" && isApp) ? (
              <IconButton
                  sx={{ display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
                  aria-label="indietro"
              >
                <ArrowBackIcon
                    sx={{ display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
                    onClick={() => setSelectedPage("HomePage")}
                />
              </IconButton>
          ) : null}
          <Percent
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }}
              onClick={() => {
                HistoryUtils.pushState("ctv");
                setSelectedPage("HomePage")
              }}
          />
          <Typography
              onClick={() => {
                HistoryUtils.pushState("ctv");
                setSelectedPage("HomePage")
              }}
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
          >
            CTV
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {((selectedPage !== "HomePage" && selectedPage !== "Necessità" && selectedPage !== "Sfizio") && isApp) ? (
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => {
                      HistoryUtils.pushState("ctv");
                      setSelectedPage("HomePage");
                      setTabs(0);
                    }}
                    color="inherit"
                >
                  <ArrowBackIcon />
                </IconButton>
            ) : (
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => {}}
                    color="inherit"
                >
                  <Percent />
                </IconButton>
            )}

            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
            >
              {pages.map((page) => (
                  <MenuItem key={page} onClick={() => {
                    setAnchorElNav(null);
                    if (page === "Sfizio") {
                      HistoryUtils.pushState("sfizio");
                    } else if (page === "Necessità") {
                      HistoryUtils.pushState("necessita");
                    }
                    setSelectedPage(page);
                  }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
              variant="h5"
              noWrap
              onClick={() => {}}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
          >
            CTV {true ? "" : "Mobile"}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {selectedPage === "SettingsPage" || selectedPage === "LoginPage" ? (
                <IconButton onClick={() => {}}>
                  <Percent />
                </IconButton>
            ) : (
                <IconButton onClick={() => {
                  setAnchorElNav(null);
                  if (selectedPage === 'HomePage') {
                    HistoryUtils.pushState("nuovo-stipendio");
                    setSelectedPage("InsertNew");
                  } else if (selectedPage === 'Sfizio') {
                    setOpenPopupInsertSvago(true)
                  } else if (selectedPage === 'Necessità') {
                    setOpenPopupInsertNecessita(true)
                  }
                }}>
                  <AddIcon />
                </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

  );
}
export default ResponsiveAppBar;