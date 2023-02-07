import React, { Component } from "react";
import logo from "./logo.svg";
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Icon,
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AppsIcon from "@mui/icons-material/Apps";
import GridOnIcon from "@mui/icons-material/GridOn";
import LogoutIcon from "@mui/icons-material/Logout";
import PostAddIcon from "@mui/icons-material/PostAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { CredentialsContext } from "../CredentialsContext/CredentialsContext";
import { ContextStructure } from "../CredentialsContext/ContextStructure";
import { useContext } from "react";
import Item from "../Item/Item";
import "./ItemsForm.css";
import { createContext, useState, useEffect } from "react";
import { ApiManager } from "../../utils/ApiManager";
import axios from "axios";
import { type } from "os";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import notify from '../Toast/Toast';
import CircularProgress from '@mui/material/CircularProgress';

const apiManager: ApiManager = new ApiManager();
function ItemsForm() {
  const { token }: ContextStructure = useContext(CredentialsContext);
  const { nameOfUser }: ContextStructure = useContext(CredentialsContext);
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedContent, setSelectedContent] = useState<string>("");
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string>("");
  const [moreItems, setMoreItems] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [isLoading,setIsLoading]=useState<boolean>(false);
  const [completedUpdate,setCompletedUpdate]=useState<boolean>(false);

  
  const loadItems = async () => {
    try {
      const url = apiManager.getMessageApi();
      let address: string = apiManager.getMessageApi() + `/${lastEvaluatedKey}`;
      let promise = await axios.get(address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let data = promise.data;
      console.log("the data in front is: ")
      console.log(data)
      let items_list = data["Items"];
      let lastEvaluatedKeyFromServer = data["LastEvaluatedKey"]
      if (data["LastEvaluatedKey"]["itemid"]=="nothing"){
        setMoreItems(false)
      }
      else{
        if (moreItems==false){
          setMoreItems(true)
        }
      }
      setLastEvaluatedKey(data["LastEvaluatedKey"]["itemid"])
      console.log("last evaluated key From Server is : ")
      console.log(lastEvaluatedKeyFromServer)
      return items_list;
    } catch (e) {
      console.log("error is", { e });
    }
  };

  function fetchItems() {
    loadItems().then((newItems) => setItems(newItems)).catch(e=>{
      console.log({e})
    })

  }
  function loadMore(){
    loadItems().then((newItems) => setItems(items.concat(newItems))).catch(e=>{
      console.log({e})
    })
  }
  useEffect(() => {
    fetchItems();
  }, []);
  const deleteItem = (itemid: string) => {
    async function deleteItemfromServer() {
      let address = apiManager.getMessageApi() + `/${itemid}`;
      await axios.delete(address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
    }
    deleteItemfromServer();
  };

  const updateItem = async () => {
    async function updateItemInServer(newContent: string) {
      let address = apiManager.getMessageApi() + `/${selectedItemId}`;
      console.log("wanting to update item : ");
      console.log(selectedItemId);
      console.log("with the new content that is : ");
      console.log(newContent);
      let response = await axios.patch(
        address,
        { content: newContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
     
        notify(true,`Updated the content of  ${selectedItem} to ${selectedContent}`)
      
    }
    setIsLoading(true)
    await updateItemInServer(selectedContent);
    setIsLoading(false)
    setCompletedUpdate(true)
  };

  const openPopUp = (selectedItemId: string, selectedItem: string) => {
    setOpen(true);
    setSelectedItemId(selectedItemId);
    setSelectedItem(selectedItem)
  };

  const closePopUp = (selectedItemId: string, selectedItem:string) => {
    setOpen(false);
    setSelectedItemId("");
    setSelectedItem("")
    setCompletedUpdate(false)
  };

  const handleTextFieldChange = function (e: any) {
    setSelectedContent(e.target.value);
  };

  const getItems = function () {
    return items;
  };

  //


  return (
    <>
      <div className="items-form">
        {items && items.map((item:any) => (
          <Item
            key={item.itemid}
            itemid={item.itemid}
            itemName={item.item}
            fetchItems={fetchItems}
            openPopUp={() => {
              openPopUp(item.itemid, item.item);
            }}
            deleteItem={() => {
              deleteItem(item.itemid);
            }}
          ></Item>
        ))}
      </div>
      <div>
        
      
        <Dialog open={open} onClose={closePopUp}>
        
          <DialogTitle>Change The Content Of The Item {selectedItem}</DialogTitle>
          <DialogContent>
            {isLoading==true? <CircularProgress></CircularProgress>: completedUpdate==true? <div className="successtext"> Updated The Content Successfully</div> : null}
            <DialogContentText>
              Please insert the new value. This will update the content of the
              item in the storage.
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
            <Button
              onClick={() => {
                closePopUp("","");
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                updateItem();
              }}
            >
              Change Content
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {moreItems? <Button variant="contained" color="info" onClick={()=>{loadMore()}}>Load More...</Button>: <div></div>}
    </>
  );
}

export default ItemsForm;
