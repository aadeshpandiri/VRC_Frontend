
import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { SwipeableDrawer } from "@mui/material";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
// import Login from "./Login";
// import Signup from "./Signup";
import ClearIcon from "@mui/icons-material/Clear";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import {Button} from "@mui/material";
import Login from "./Login";
import Register from "./Register";
const SignInDrawer = ({ anchor, toggleDrawer, isOpen,paper }) => {
    const router = useRouter(); 
    const [name,setName]=useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState();
    const[current,setCurrentStep]=useState(1);

    const hangleGotoSignup=()=>{
      setCurrentStep(2)

    }
    const hangleGotoLogin=()=>{
      setCurrentStep(1)
    }
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    // const [popupContent,setPopupContent]=useState();
    const handleClickOpen = (e) => {
      setOpen(true);
      setScroll('paper');

      // console.log(e)
      // setPopupContent(e.target.name);
    };
  
    const handleClose = () => {
      // setOpen(false);
      toggleDrawer(anchor, false, event)
    };
  
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle login logic here
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Remember Me:', rememberMe);
  };
  const onChangeInput=(e)=>{
    console.log(e.target.checked)
    switch(e.target.name){
      case 'name':setName(e.target.value);break;
      case 'email':setEmail(e.target.value);break;
      case 'password':setPassword(e.target.value);break;
      case 'rememberMe':setRememberMe(e.target.checked);break;

    }
  }
    return (
        
           
            <Dialog
                open={isOpen}
                onClose={(event) => toggleDrawer(anchor, false, event)}
                // scroll={paper}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                PaperProps={{ style: { borderRadius:'20px'} }}
              >
            
                <DialogContent dividers={true} sx={{ padding: 0}}>
               <div style={{display:'flex',flexDirection:'row'}}>
              
                  <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                    sx={{padding:'10px'}}
                  >
              

<Box
  // sx={{ width: 600 }}
  role="presentation"
  className={current ==1 ? "signin-drawer" : "signup-drawer"}
// onClick={toggleDrawer(anchor, false)}
// onKeyDown={toggleDrawer(anchor, false)}
>
  
{
  current ==1 && <Login email={email} password={password} rememberMe={rememberMe} onChangeInput={onChangeInput} hangleGotoSignup={hangleGotoSignup} handleClose={handleClose}/>
}  
{
  current ==2 && <Register name={name} email={email} password={password} onChangeInput={onChangeInput} hangleGotoLogin={hangleGotoLogin}/>
}
</Box>

                  </DialogContentText>
                  </div>
                </DialogContent>
              
                
                
              </Dialog>
        
        );
  }
  export default SignInDrawer;