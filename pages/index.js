// import React, { useEffect, useState,useContext } from "react"
// import { useRouter } from "next/router";
// import Link from 'next/link';
// // import { Button } from "@mui/material";
// // import {Backdrop,CircularProgress} from "@mui/material";
// // import Profile from "@/components/Profile";
// import Header from '../Components/Header'
// import Navigations from '../Components/Navigations' 
// // import ProfileContext from '@/context/profile/profileContext';
// // import Login from '@/components/Login';
import Head from "next/head";
// export default function Home() {
//   return (
//     <div >
//       <Head>
//         <title>VRC Application</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//     <main>
//     <div className='flex'>
      
//       <div className='hidden md:block'><Navigations ></Navigations></div>  
//       <div className='ml-[20%]'>
//           <Header ></Header>
          
//           <div>hello</div>
            
//         </div>
//           {/* <Button onClick={handleLogout}>Logout</Button> */}
//         </div>
//     </main>
     
//     </div>
//   )
// }
// pages/index.js or your custom layout component

import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Sidenav from '../Components/SideNav';
import Main from '../Components/Main';
import Menu from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import SharedContext from '../context/SharedContext';
import { useContext } from "react";
import routes from '../data/routes'

// const roles = {
//   // 'user':['Dashboard'],
//   'SUPERADMIN': ['Dashboard', 'Approvals', 'Receipts', 'Payroll'],
//   'MANAGER': ['Dashboard',            
//                'Receipts'],
//   'SALES': ['Dashboard','OnBoard Form'],
// };
import roles from '../data/roles'
import { useRouter } from "next/router";
import Link from "next/link";
import SideBar from "../Components/SideBar";
export default function Home() {
 
  // const userRole = 'superadmin'; // Set the user's role here
  const {userRole,token,isSidenavOpen,setToken,setIsSidenavOpen}=useContext(SharedContext);
  const router=useRouter()
  // const [userRole,setUserRole]=useState('superadmin');
  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };
  const handleLogout=()=>{
    sessionStorage.clear();
    setToken(null);
  }
  return (
    <div className="md:flex h-screen w-screen">
       <Head>
      <title>VRC Application</title>
         <meta name="description" content="Generated by create next app" />
         <link rel="icon" href="/favicon.ico" />
       </Head>
      {/* Sidenav (desktop mode) */}
      <div
        className={`hidden md:block md:w-1/5 bg-[#FFFFFF] mt-20`}
      >
        <Sidenav
          role={userRole}
          // navigation={roles[userRole]}
          isSidenavOpen={isSidenavOpen}
          toggleSidenav={toggleSidenav}        />

{/* <List className="flex flex-col">
  <div>
        {roles[userRole]?.map((item, index) => (
          <div key={index} name={item} className="p-2" 
          // onClick={(e)=>{
          //   console.log(routes[item])
          //   router.push(`${routes[item]}`)
          // }
          // }
          >
            <Link href={`${routes[item]}`}>{item}</Link></div>
        ))}
        </div>
        <div onClick={handleLogout}>
          Logout
        </div>
      </List> */}
      <SideBar/>
      </div>

      {/* Content Container */}
      <div className="md:w-4/5">
        {/* Header */}
        <Header
          toggleSidenav={toggleSidenav}
          userRole={userRole}
        />

        {/* Main Content */}
        <Main />
      </div>

      {/* Mobile Sidenav Toggle Button */}
      {/* <IconButton
        edge="end"
        aria-label="menu"
        onClick={toggleSidenav}
        sx={{
          textAlign: "end",
        }}
        className="inline md:hidden"
      >
        <Menu fontSize="large" />
      </IconButton> */}

    </div>
  );
}
