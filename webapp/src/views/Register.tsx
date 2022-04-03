import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type { AlertColor } from '@mui/material/Alert';
import {useNavigate} from 'react-router-dom';
import NavBar from "../components/navBar";
import { addUser } from '../api/api';

type RegisterProps = {
  OnUserListChange: () => void;
}

type NotificationType = {
  severity: AlertColor,
  message: string;
}


function RegisterForm(): JSX.Element {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');


  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result:boolean = await addUser({name : '', email});
    console.log({email});
    console.log({password});
    console.log({confirmPassword})
 

    if (result){
      console.log("User Registered Succesfully");
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'You have been registered in the system!'
      });
      //Notify the change to the parent component
      navigate("/loggin");
    }
    else{
      setNotificationStatus(true);
      setNotification({ 
        severity:'error',
        message:'There\'s been an error in the register proccess.'
      });
    }
  }
  return (
    <>         
    
      <NavBar openCart={()=>(1+1)}></NavBar>
     <h1>Registrarse</h1>

        <div className="registro-container">
        <form onSubmit={handleSubmit} name="registro" >
        <div className="registro-contenido">

       <div className='field-container'>

          <TextField
          required
          label="Email:"
          name="email"
          id="filled-size-small"
          variant="filled"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ my: 2 }}

        />
        </div>

        <div className='field-container'>

        <TextField
          required
          label="Password:"    
          name="password"
          id="filled-size-small"
          variant="filled"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ my: 2 }}

        />
        </div>
        <div className='field-container'>

        <TextField
          required
          label="Confirm Password:"
          name="confirmPassword"
          id="filled-size-small"
          variant="filled"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          sx={{ my: 2 }}

        />

        </div>

        </div>
        <Button variant="contained" type="submit"  sx={{ my: 2 } }>Registrarse</Button>
        </form>
        </div>

    </>
  );
}

 export default RegisterForm;