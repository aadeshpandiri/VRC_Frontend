import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useContext } from 'react';
import sharedContext from '../context/SharedContext';
import Image from "next/image";
import Home from '../utils/Home.svg'
import approval from '../utils/approval.svg'
import receipt from '../utils/receipt.svg'
import payroll from '../utils/payroll.svg'
import logout from '../utils/Logout.svg'
// import SignInDrawer from './SignInDrawer';
import Link from 'next/link';
import routes from '../data/routes';
import roles from '../data/roles';
import { useRouter } from 'next/router';

const Sidenav = ({ role, isSidenavOpen, toggleSidenav ,toggleDrawer,isDrawerOpen}) => {
  const {userRole,token,setToken,setUserRole}=useContext(sharedContext)
  const getIcon=(item)=>{
    switch(item){
      case 'Dashboard':return <Image
   
      alt="Home"
      src={Home}
      quality={100}
      width= {23}
      height= {23}
   
      />; break;
      case 'Approvals': return <Image
   
      alt="approval"
      src={approval}
      quality={100}
      width= {23}
      height= {23}
   
      />; break;
      case 'Receipts':return <Image
   
      alt="receipt"
      src={receipt}
      quality={100}
      width= {23}
      height= {23}
   
      />; break;
      case 'Payroll':return <Image
   
      alt="payroll"
      src={payroll}
      quality={100}
      width= {23}
      height= {23}
   
      />; break;

    }
  }
  const router=useRouter()
  const handleLogout=()=>{
    sessionStorage.clear();
    setToken(null);
    router.push('/Login')
    setUserRole('USER')
  }
  return (<>
  {/* <SignInDrawer
          anchor="right"
          toggleDrawer={toggleDrawer}
          isOpen={isDrawerOpen}

        /> */}
         <Drawer
      anchor="left"
      open={isSidenavOpen}
      onClose={toggleSidenav}
      variant="temporary"
      sx={{
        ".MuiDrawer-paper": {
          bgcolor: "white",
          width:'100%'
        },
      }}
    //   classNuserRoleame='w-full flex flex-col justify-right'
      ModalProps={{ keepMounted: true }} // For better mobile performance
    >
      <div style={{display:'flex',flexDirection:'column',justifyContent:'end'}}>
      <IconButton
        edge="end"
        aria-label="close"
        onClick={toggleSidenav}
        sx={{
          textAlign: "right",
        }}
        className="inline md:hidden"
      >
        <Close fontSize="large" />
      </IconButton>

      </div>
      <List>
        <div>
          {!token&& <Button onClick={(event) => toggleDrawer('right', true, event)}>Login</Button>}
        </div>
        {roles[userRole]?.map((item, index) => (
          <div key={index} name={item} className="p-4 flex items-center gap-4" 
          // onClick={(e)=>{
          //   console.log(routes[item])
          //   router.push(`${routes[item]}`)
          // }
          // }
          >
              {getIcon(item)}
            <Link href={`${routes[item]}`} onClick={toggleSidenav}>{item}</Link></div>
        ))}
         {token&& <div onClick={handleLogout}  className="p-4 flex items-center gap-4">
        <Image
   
   alt="logout"
   src={logout}
   quality={100}
   width= {23}
   height= {23}

   /> <span style={{color:'#667085'}}>Logout</span>
        </div>}
      </List>
    </Drawer>
        </>
   
  );
};

export default Sidenav;