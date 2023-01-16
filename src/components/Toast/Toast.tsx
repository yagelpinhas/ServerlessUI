

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = function(succeed: boolean, text: string){
  let toastAttributes: any= {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  if(succeed){
    toast.success(text, toastAttributes)
  }else{
    toast.error(text, toastAttributes)
  }
}

export default notify;