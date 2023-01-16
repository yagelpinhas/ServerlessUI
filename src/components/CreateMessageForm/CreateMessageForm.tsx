import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { ApiManager } from '../../utils/ApiManager';
import Alert from '@mui/material/Alert';
import notify from '../Toast/Toast';
import { ToastContainer } from "react-toastify";
import {CredentialsContext} from '../CredentialsContext/CredentialsContext';
import {useContext} from 'react';
import { ContextStructure } from '../CredentialsContext/ContextStructure';

const apiManager: ApiManager = new ApiManager()
export default function CreateMessageForm() {
  const [itemInput,setItemInput] = React.useState<string>("")
  const [contentInput,setContentInput] = React.useState<string>("")
  const [loading,setLoading]=React.useState<boolean>(false)
  const {token}: ContextStructure = useContext(CredentialsContext)
  const checkValidity=(): boolean=>{
    return itemInput!=""&&contentInput!=""
  }
  const createMessage = async function(){
    async function createMessagePostToServerless(){
      let response = await axios.post(apiManager.getMessageApi(),
                    {"item":itemInput,"content":contentInput},
                    {headers: {Authorization: `Bearer ${token}`}}
                    )
      if (response.status==200){
        notify(true,`Item: ${itemInput} has been created successfully`)
      }
      else{
        notify(false,"Error creating the item")
      }
      setLoading(false)
    }
    if (!checkValidity()){
      notify(false,`one of the fields is missing.`)
    }
    else{
      setLoading(true)
      await createMessagePostToServerless()
      setItemInput("")
      setContentInput("")
    }
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch'},
      }}
      noValidate
      autoComplete="off"
    >
      {loading == true? <CircularProgress />: null}
      <div>
        <div>
        <TextField
          id="outlined-disabled"
          label="Item"
          value={itemInput}
          onChange={(newValue)=> setItemInput(newValue.target.value)}
        />
        </div>
        <div>
        <TextField
          id="outlined-password-input"
          label="Content"
          value={contentInput}
          onChange={(newValue)=> setContentInput(newValue.target.value)}
        />
        <div></div>
        <Button variant="contained" color="info" onClick={createMessage}>Create Message</Button>
        </div>
      </div>
      <ToastContainer />
    </Box>
    
  );
}