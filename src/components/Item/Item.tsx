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
import AppsIcon from '@mui/icons-material/Apps';
import GridOnIcon from '@mui/icons-material/GridOn';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {CredentialsContext} from '../CredentialsContext/CredentialsContext';
import { ContextStructure } from '../CredentialsContext/ContextStructure';
import {useContext} from 'react';
import "./Item.css"
import axios from 'axios';
import { ApiManager } from '../../utils/ApiManager';

const apiManager: ApiManager = new ApiManager()
function Item(props: any) {
  const {token}: ContextStructure = useContext(CredentialsContext)

  
  let nameOfItem: string = props.itemName
  return (
    <div className='item-card'>
      
        <span>{props.itemName}</span>
        <EditIcon color="primary" onClick={() => { props.openPopUp() }}>
            
        </EditIcon>
        <DeleteIcon color="primary" onClick={() => props.deleteItem()}>
            
        </DeleteIcon>
       
    </div>
  );
}

export default Item;
