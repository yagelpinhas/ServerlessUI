import * as React from 'react';
import {useContext} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { AccountCircle, RepeatOneSharp } from '@mui/icons-material';
import PasswordIcon from '@mui/icons-material/Password';
import axios from 'axios';
import { ApiManager } from '../../utils/ApiManager';
import Alert from '@mui/material/Alert';
import notify from '../Toast/Toast';
import { ToastContainer } from "react-toastify";
import {CredentialsContext} from '../CredentialsContext/CredentialsContext';
import CircularProgress from '@mui/material/CircularProgress';
import { setFlagsFromString } from 'v8';


const apiManager: ApiManager = new ApiManager()
export default function RegisterForm() {
  const [usernameInput,setUsernameInput] = React.useState<string>("")
  const [passwordInput,setPasswordInput] = React.useState<string>("")
  const [loading,setLoading]=React.useState<boolean>(false)
  const checkValidity=():boolean=>{
    return usernameInput!=""&&passwordInput!=""
  }
  const register = async function(){
    async function registerPostToServerless(){
      let response = await axios.post(apiManager.getRegisterApi(),{"username":usernameInput,"password":passwordInput})
      if (response.status==200){
        notify(true,`User: ${usernameInput} has been created successfully`)
      }
      else{
        notify(false,"Error")
      }
      setLoading(false)
    }
    if (!checkValidity()){
      notify(false,`One of the fields is missing.`)
    }
    else{
      setLoading(true)
      await registerPostToServerless()
      setUsernameInput("")
      setPasswordInput("")
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
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id="outlined-disabled"
          label="Usernamse"
          value={usernameInput}
          onChange={(newValue)=> setUsernameInput(newValue.target.value)}
        />
        </div>
        <div>
        <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={passwordInput}
          onChange={(newValue)=> setPasswordInput(newValue.target.value)}
        />
        <div></div>
        <Button variant="contained" color="info" onClick={register}>Register</Button>
        </div>
      </div>
      <ToastContainer />
    </Box>
    
  );
}