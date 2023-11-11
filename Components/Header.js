// /* eslint-disable @next/next/no-img-element */

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import {
//   AppBar,
//   Container,
//   Toolbar,
//   IconButton,
//   Stack,
//   CssBaseline,
//   useScrollTrigger,
//   TextField,
//   Button,
// } from "@mui/material";
// // import MuiNextLink from "@components/MuiNextLink";
// // import Navbar from "./Navbar";
// import SideDrawer from "./SideDrawer";
// // import { menuItems, legalServicesItems } from "src/utils/data";
// // import Image from "next/image";
// // import theme from "../styles/theme";
// import PropTypes from "prop-types";
import SignInDrawer from "../Components/SignInDrawer";
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
// import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
// import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';


// function ElevationScroll(props) {




//   const { children } = props;

//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }

// ElevationScroll.propTypes = {
//   children: PropTypes.element.isRequired,
// };


// const Header = (props) => {


//   const router = useRouter();
//   const handellogout=()=>{
//     router.push('/')


//     // localStorage.clear("token");
//     sessionStorage.clear("token")
//     location.reload();
//   }
//   const [token,setToken]=useState();

//   const classes = {
//     menu: "header-menu",
//   };
//   const navList=[
//     {
//       route:'/',
//       displayName:'Dashboard',
//       id:1,
//       icon:<DashboardOutlinedIcon fontSize='large'></DashboardOutlinedIcon>,
//       role_type:['Sales','Manager','Admin']
//   }
//     ,
//     {
//         route:'/reciepts',
//         displayName:'Reciepts',
//         id:2,
//         icon:<PersonOutlineOutlinedIcon fontSize='large'></PersonOutlineOutlinedIcon>,
//         role_type:['Manager','Admin']
//     },
//     {
//         route:'/approvals',
//         displayName:'Approvals',
//         id:3,
//         icon:<EventAvailableOutlinedIcon fontSize='large'></EventAvailableOutlinedIcon>,
//         role_type:['Admin']
//     },
//     {
//         route:'/onboard',
//         displayName:'On Board Form',
//         id:4,
//         icon:<WorkOutlineIcon fontSize='large'></WorkOutlineIcon>,
//         role_type:['Sales']
//     },
//     {
//         route:'/payroll',
//         displayName:'Payroll',
//         id:5,
//         icon:<PersonAddAltOutlinedIcon fontSize='large'></PersonAddAltOutlinedIcon>,
//         role_type:['Admin']
//     }

// ]

//   const [isDrawerOpen, setOpenDrawer] = useState(false);

//   const toggleDrawer = (anchor, open, event) => {
//     if (
//       event &&
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setOpenDrawer(open);
//   };




//   return (
//     <>
//       <Stack spacing={2} sx={{ flexGrow: 1 }}  >
//         <CssBaseline />
//         <ElevationScroll {...props}>
//           <AppBar
//             className="app-bar"

//           >
//             <Toolbar  style={{padding:'0px',backgroundColor:'white'}}>
//               <Container

//                 sx={{
//                   display: `flex`,
//                   flexDirection:"row-reverse",
//                     justifyContent:'space-between',
//                     alignItems:'center',
//                   // backgroundColor:'white'
//                 }}
//                    >

//                 <div className="logo-image">
//                   <IconButton className="logo-header" sx={{ width: '95%' }}>

//                   </IconButton>
//                   <SideDrawer navLinks={navList} />

//                 </div>
//                 <Button className="hidden md:inline" variant="outlined" onClick={(event)=>toggleDrawer('right',true,event)}>Login</Button>
//                 <TextField placeholder='Search'  sx={{width:'80%',marginLeft:'25%'}}/>
//                  {/* <Navbar navLinks={menuItems} classes={classes} /> */}

//                 {/* <SideDrawer navLinks={menuItems} /> */}
//                 <SignInDrawer
//                   anchor="right"
//                   toggleDrawer={toggleDrawer}
//                   isOpen={isDrawerOpen}

//                 />
//                  {/* <LoginDrawer
//                   anchor="right"
//                   toggleDrawer={toggleDrawer}
//                   isOpen={isDrawerOpen}

//                 /> */}
//               </Container>
//             </Toolbar>
//           </AppBar>
//         </ElevationScroll>
//       </Stack>
//     </>
//   );
// };

// export default Header;

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Stack,
  CssBaseline,
  useScrollTrigger,
  Avatar,
  TextField,
  Button
} from "@mui/material";import { Menu } from '@mui/icons-material';
import { useContext } from "react";
import PropTypes from "prop-types";
import sharedContext from '../context/SharedContext';
function ElevationScroll(props) {
  
  


  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Header = ({ toggleSidenav ,props,toggleDrawer,isDrawerOpen}) => {
  // const [token, setToken]=useState();
  // const [userData, setUserData]=useState();
  const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen } = useContext(sharedContext);
 



  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }} className="header-stack">
    <CssBaseline />
    <ElevationScroll {...props}>
    <AppBar position="fixed">
      <Toolbar style={{ padding: '10px', backgroundColor: 'white', width: '100%' }}>

        <SignInDrawer
          anchor="right"
          toggleDrawer={toggleDrawer}
          isOpen={isDrawerOpen}

        />

        {/* Search Field */}
        {/* <TextField variant='outlined' placeholder="Search" className='ml-auto' /> */}

        {/* Username and Avatar */} <div className="hidden md:flex items-center ml-auto">
        {token ? <> <span style={{ color: 'black' }}>{userRole}</span>
          <Avatar /></> : <Button className="hidden md:inline" variant="outlined" onClick={(event) => toggleDrawer('right', true, event)}>Login</Button>
        }
        </div>
        
      <div   className="md:hidden">
      <IconButton
          edge="end"
          aria-label="menu"
          onClick={toggleSidenav}
          sx={{
            textAlign: "right",
          }}
        
        >
          <Menu fontSize="large" />
        </IconButton>
        </div>  

      </Toolbar>
    </AppBar>
    </ElevationScroll>
      </Stack>
  );
};

export default Header;
