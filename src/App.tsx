import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { Typography,AppBar,Card,CardActions, CardContent,CardMedia,CssBaseline,Grid,Toolbar,Container} from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NestCamWiredStand } from '@mui/icons-material';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import NavBar from './components/NavBar/NavBar';
import ItemsForm from './components/ItemsForm/ItemsForm';
import CreateMessageForm from './components/CreateMessageForm/CreateMessageForm';
import {CredentialsProvider} from  './components/CredentialsContext/CredentialsContext'
import {CredentialsContext} from './components/CredentialsContext/CredentialsContext';
import axios from 'axios';



function App() {
  return (
    <Router>
      <CredentialsProvider> 
      <NavBar /> 
        <Routes>
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/login" element={ <LoginForm/>} />
          <Route path="/create" element={<CreateMessageForm />} />
          <Route path="/items" element ={<ItemsForm/>} />
        </Routes>
      </CredentialsProvider>
    </Router>
  );
}
export default App;
