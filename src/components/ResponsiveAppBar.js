import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Percent from '@mui/icons-material/Percent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const pages = ['Svago', 'Prima Necessità'];
// const settings = ['Logout'];

function ResponsiveAppBar({selectedPage, setSelectedPage}) {
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
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {selectedPage !== "HomePage" ? (
            <IconButton sx={{ display: { xs: 'none', md: 'flex' }, cursor:'pointer' }} aria-label="indietro">
              <ArrowBackIcon sx={{ display: { xs: 'none', md: 'flex' }, cursor:'pointer' }}  onClick={() => setSelectedPage("HomePage")} />
            </IconButton>
          ) : <></>}
          <Percent sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor:'pointer' }}  onClick={() => setSelectedPage("HomePage")} />
          <Typography
            onClick={() => setSelectedPage("HomePage")} 
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
              cursor:'pointer'
            }}
          >
            CTV
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {selectedPage !== "HomePage" ? (
              <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setSelectedPage("HomePage")}
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
              onClick={handleOpenNavMenu}
              color="inherit"
              >
                <MoreVertIcon />
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
                  window.history.pushState({}, null, null);
                  setSelectedPage(page);
                }}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Percent onClick={() => setSelectedPage("HomePage")} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1}} />
          <Typography
            variant="h5"
            noWrap
            onClick={() => setSelectedPage("HomePage")}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              // cursor:'pointer'
            }}
          >
            CTV {true ? "" : "Mobile"}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                variant={page === selectedPage ? "outlined" : "text"}
                key={page}
                onClick={() => {
                  window.history.pushState({}, null, null);
                  setSelectedPage(page);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
            <IconButton onClick={() => {}} sx={{ p: 0 }}>
              <Avatar alt={localStorage.getItem("user")} src="/static/images/avatar/2.jpg" />
            </IconButton>
            {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(() => {
                  if(setting === 'Logout'){
                    localStorage.removeItem("user");
                  }
                  setSelectedPage("LoginPage");
                  handleCloseUserMenu();
                })}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;