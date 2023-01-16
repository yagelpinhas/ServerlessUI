import React, { Component } from 'react';
import logo from './logo.svg';
import { Typography,AppBar,Card,CardActions, CardContent,CardMedia,CssBaseline,Grid,Toolbar,Container, Icon} from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import GridOnIcon from '@mui/icons-material/GridOn';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {CredentialsContext} from '../CredentialsContext/CredentialsContext';
import { ContextStructure } from '../CredentialsContext/ContextStructure';
import {useContext} from 'react';

function NavBar(props: any) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const pagesIfNotLoggedIn = ['Register', 'Login'];
  const pagesIfLoggedin = ['Create Message','Log Out'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const {nameOfUser}: ContextStructure = useContext(CredentialsContext)
  const {isLoggedIn}: ContextStructure = useContext(CredentialsContext)
  const {logout}: any = useContext(CredentialsContext)

  function relevantPages():string[]{
    if (isLoggedIn){
      return pagesIfLoggedin
    }
    else{
      return pagesIfNotLoggedIn
    }
  }
  return (
       <AppBar position="static">
      <Container  maxWidth="xl" sx={{marginLeft:2, marginRight:0}}>
        <Toolbar disableGutters>
        <MenuIcon />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
              
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {relevantPages().map((page: string) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              )) 
            }
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {relevantPages().map((page: string) => (
              <div>
            <Link to={page=="Create Message"? "/create" : page=="Log Out"? "/": "/"+page}>
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={page=="Log Out"? logout : null}
              >
                {page}
                {page=="Login"? <LoginIcon></LoginIcon>: page=="Log Out"? <LogoutIcon></LogoutIcon>: page=="Create Message"? <PostAddIcon sx={{padding:-4}}></PostAddIcon>: page=="Register"? <ContactPageIcon></ContactPageIcon>:<Icon></Icon>}
              </Button>
              </Link>        
              </div>
            ))
            }
          </Box>
          {isLoggedIn? <Typography variant='h6'>Hello {nameOfUser} !</Typography> : <Typography></Typography>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
