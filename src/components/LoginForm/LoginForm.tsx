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
import { Formik , Form, useField, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { FieldText } from '../FieldText/FieldText';

const apiManager: ApiManager = new ApiManager()

export default function LoginForm() {
  const [usernameInput,setUsernameInput] = React.useState<string>("")
  const [passwordInput,setPasswordInput] = React.useState<string>("")
  const [loading,setLoading]=React.useState<boolean>(false)
  const {login} : any = useContext(CredentialsContext)
  const {isLoggedIn}: ContextStructure = useContext(CredentialsContext)
  const validate = Yup.object({
    Username: Yup.string().min(3,'Must be 3 characters or more').required('Username Required'),
    Password: Yup.string().min(8,'must be 8 characters or more').required('Password Required')
  })

  const checkValidity=(newUserName: string,newPassword: string):boolean=>{
    return newUserName!=""&&newPassword!=""
  }

  const loginToServer = async function(newUserName:string,newPassword:string){
    async function loginPostToServerless(){
      try{
      let response = await axios.post(apiManager.getLoginApi(),{"username":newUserName,"password":newPassword})
      if (response.status==200){
        let token: string = response.data.jwt
        login(newUserName,token)
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
    if (!checkValidity(newUserName,newPassword)){
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
    <Formik
    initialValues={
      {
        "Username":"",
        "Password":""
      }
    }
    onSubmit={values=>{
      console.log("got in")
    }}
    validationSchema={validate}
    >
      {formik =>(
        <div>
          
         <Form>
         
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
             <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <FieldText label="username" name="Username" type="text" testid="login-username-id" />
             </div>
             <div>
             <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
             <FieldText label="password" name="Password" type="text" testid="login-password-id"/>
             <div></div>
        
             <Button variant="contained" color="info" onClick={()=>{loginToServer(formik.values.Username,formik.values.Password)}} data-testid="login-button-id" >Login</Button>
             </div>
           <ToastContainer />
         </Box>
         
         </Form>
         
         </div>
      )}
      
       
    
    </Formik> : <div></div>
    
  );
}