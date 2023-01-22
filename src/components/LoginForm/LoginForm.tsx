import * as React from 'react';
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
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import {CredentialsContext} from '../CredentialsContext/CredentialsContext';
import { ContextStructure } from '../CredentialsContext/ContextStructure';
import {useContext} from 'react';


const apiManager: ApiManager = new ApiManager()

export default function LoginForm() {
  const [usernameInput,setUsernameInput] = React.useState<string>("")
  const [passwordInput,setPasswordInput] = React.useState<string>("")
  const [loading,setLoading]=React.useState<boolean>(false)
  const {login} : any = useContext(CredentialsContext)
  const {isLoggedIn}: ContextStructure = useContext(CredentialsContext)

  const checkValidity=():boolean=>{
    return usernameInput!=""&&passwordInput!=""
  }

  const loginToServer = async function(){
    async function loginPostToServerless(){
      try{
      let response = await axios.post(apiManager.getLoginApi(),{"username":usernameInput,"password":passwordInput})
      if (response.status==200){
        let token: string = response.data.jwt
        login(usernameInput,token)
        notify(true,`User: ${usernameInput} has logged in successfully`)
      }
      }
      catch(exception: any){
        if(exception.response.status==401){
          notify(false,"Invalid username or password")
        }
      }
      setLoading(false)
    }
    if (!checkValidity()){
      notify(false,`one of the fields is missing.`)
    }
    else{
      setLoading(true)
      await loginPostToServerless()
      setUsernameInput("")
      setPasswordInput("")
    }
  }
  return ( isLoggedIn == false?
    <div>
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
          label="Username"
          value={usernameInput}
          onChange={(newValue)=> setUsernameInput(newValue.target.value)}
          inputProps={{"data-testid":"login-username-id"}}
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
          inputProps={{"data-testid":"login-password-id"}}
        />
        <div></div>
        <Button variant="contained" color="info" onClick={loginToServer} data-testid="login-button-id">Login</Button> 
        </div>
      </div>
      <ToastContainer />
    </Box>
    </div> : <div></div> 
    
  );
}