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
import { Formik , Form, useField, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { FieldText } from '../FieldText/FieldText';

const apiManager: ApiManager = new ApiManager()
export default function CreateMessageForm() {
  const [itemInput,setItemInput] = React.useState<string>("")
  const [contentInput,setContentInput] = React.useState<string>("")
  const [loading,setLoading]=React.useState<boolean>(false)
  const {token}: ContextStructure = useContext(CredentialsContext)
  const validate = Yup.object({
    Item: Yup.string().min(3,'Must be 4 characters or more').required('Item Required'),
    Content: Yup.string().min(8,'must be 4 characters or more').required('Content Required')
  })
  const checkValidity=(newItem:string , newContent: string): boolean=>{
    return newItem!=""&&newContent!=""
  }
  const createMessage = async function(newItem: string, newContent: string){
    async function createMessagePostToServerless(){
      let response = await axios.post(apiManager.getMessageApi(),
                    {"item":newItem,"content":newContent},
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
    if (!checkValidity(newItem,newContent)){
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
    <Formik
    initialValues={
      {
        "Item":"",
        "Content":""
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
             
              <FieldText label="item" name="Item" type="text" testid="create-message-form-item-id" />
             </div>
             <div>
             
             <FieldText label="content" name="Content" type="text" testid="create-message-form-content-id"/>
             <div></div>
        
             <Button variant="contained" color="info" onClick={()=>{createMessage(formik.values.Item,formik.values.Content)}} data-testid="create-message-button-id" >Create Message</Button>
             </div>
           <ToastContainer />
         </Box>
         
         </Form>
         
         </div>
      )}
      
       
    
    </Formik>
  )
}