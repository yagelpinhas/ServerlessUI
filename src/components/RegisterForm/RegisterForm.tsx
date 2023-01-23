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
import { Formik , Form, useField, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { FieldText } from '../FieldText/FieldText';


const apiManager: ApiManager = new ApiManager()
export default function RegisterForm() {
  const [usernameInput,setUsernameInput] = React.useState<string>("")
  const [passwordInput,setPasswordInput] = React.useState<string>("")
  const [loading,setLoading]=React.useState<boolean>(false)
  const validate = Yup.object({
    Username: Yup.string().min(3,'Must be 3 characters or more').required('Username Required'),
    Password: Yup.string().min(8,'must be 8 characters or more').required('Password Required')
  })

  const checkValidity=(newUserName: string,newPassword: string):boolean=>{
    return newUserName!=""&&newPassword!=""
  }
  const register = async function(newUserName:string, newPassword:string){
    async function registerPostToServerless(){
      let response = await axios.post(apiManager.getRegisterApi(),{"username":newUserName,"password":newPassword})
      if (response.status==200){
        notify(true,`User: ${newUserName} has been created successfully`)
      }
      else{
        notify(false,"Error")
      }
      setLoading(false)
    }
    if (!checkValidity(newUserName,newPassword)){
      notify(false,`one of the fields is missing.`)
    }
    else{
      setLoading(true)
      await registerPostToServerless()
      setUsernameInput("")
      setPasswordInput("")
    }
  }
  return (
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
              <FieldText label="username" name="Username" type="text" testid="register-username-id" />
             </div>
             <div>
             <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
             <FieldText label="password" name="Password" type="text" testid="register-password-id"/>
             <div></div>
        
             <Button variant="contained" color="info" onClick={()=>{register(formik.values.Username,formik.values.Password)}} data-testid="register-button-id" >Register</Button>
             </div>
           <ToastContainer />
         </Box>
         
         </Form>
         
         </div>
      )}
      
       
    
    </Formik>
  );
}