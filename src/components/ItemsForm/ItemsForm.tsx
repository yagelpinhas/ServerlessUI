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
import Item from '../Item/Item';
import "./ItemsForm.css"
import { createContext,useState, useEffect } from "react";
import { ApiManager } from '../../utils/ApiManager';
import axios from 'axios';
import { type } from 'os';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';

const apiManager: ApiManager = new ApiManager()
function ItemsForm() {
    const {token}: ContextStructure = useContext(CredentialsContext)
    const {nameOfUser}: ContextStructure = useContext(CredentialsContext)
    const [items, setItems] = useState<string[]>([]);
    const [selectedItem,setSelectedItem] = useState<string>('')
    const [selectedContent,setSelectedContent] = useState<string>('')
    const [open, setOpen] = React.useState(false);
    async function fetchItems(){
        let promise = await axios.get(apiManager.getMessageApi(),
        {headers: {Authorization: `Bearer ${token}`}})
        console.log("user now is: ")
        console.log(nameOfUser)
        let data = promise.data
        let items_list = data["Objects"]
        items_list=items_list.replaceAll("'","")
        items_list=items_list.replaceAll("[","")
        items_list=items_list.replaceAll("]","")
        items_list = items_list.replaceAll(" ","")
        items_list = items_list.replaceAll(nameOfUser+"/","")
        items_list = items_list.split(",")
        items_list = items_list.slice(1)
        setItems(items_list)

    }
    useEffect(()=>{
        fetchItems()
    },[])
    console.log({items})

    const deleteItem =(itemName:string)=>{
      async function deleteItemfromServer(){
        let address = apiManager.getMessageApi()+`/${itemName}`;
        await axios.delete(address,{headers: {Authorization: `Bearer ${token}`}})
        fetchItems()
      }
      deleteItemfromServer()
    }
  
    const updateItem =()=>{
      async function updateItemInServer(newContent: string){
        let address = apiManager.getMessageApi()+`/${selectedItem}`;
        console.log("wanting to update item : ")
        console.log(selectedItem)
        console.log("with the new content that is : ")
        console.log(newContent)
        await axios.patch(address,{content: newContent},{headers: {Authorization: `Bearer ${token}`}})
      }
      updateItemInServer(selectedContent)
    }

    const openPopUp = (selectedItem: string) => {
      setOpen(true);
      setSelectedItem(selectedItem)
    };
  
    const closePopUp = (selectedItem: string) => {
      setOpen(false);
      setSelectedItem('')
    };

    const handleTextFieldChange = function(e:any) {
      setSelectedContent(e.target.value)
  }
  
  return (
    <>

    <div className='items-form'>
        {items.map(item=> <Item key={item} itemName={item} fetchItems={fetchItems} openPopUp={()=>{openPopUp(item)}} deleteItem={()=>{deleteItem(item)}} ></Item>)}
    </div>
    <div>

      <Dialog open={open} onClose={closePopUp}>
        <DialogTitle>Change The Content Of Item {selectedItem}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please insert the new value. This will update the content of the item in the storage.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Content"
            type="text"
            fullWidth
            variant="standard"
            value={selectedContent}
            onChange={handleTextFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{closePopUp("")}}>Close</Button>
          <Button onClick={()=>{updateItem()}}>Change Content</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}

export default ItemsForm;
