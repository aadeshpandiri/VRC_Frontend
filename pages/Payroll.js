
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Sidenav from '../Components/SideNav';
import sharedContext from '../context/SharedContext';
import { useContext } from "react";

import roles from '../data/roles'
import SideBar from '../Components/SideBar';

function Payroll() {
    const {userRole,token,isSidenavOpen,setUserRole,setToken,setIsSidenavOpen}=useContext(sharedContext);
    const [receiptsList,setReceiptsList]=useState([]);
    const toggleSidenav = () => {
      setIsSidenavOpen(!isSidenavOpen);
    };
  

  return (
    <div className="md:flex h-screen w-screen">
    
    {/* Sidenav (desktop mode) */}
    <div
      className={`hidden md:block md:w-1/5 bg-[#FFFFFF] mt-20`}
    >
      <Sidenav
        role={userRole}
        navigation={roles[userRole]}
        isSidenavOpen={isSidenavOpen}
        toggleSidenav={toggleSidenav}        />
 
 {/* <List>
      {roles[userRole]?.map((item, index) => (
        <ListItem  key={index}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List> */}
    <SideBar/>
    </div>
 
    {/* Content Container */}
    <div className="md:w-4/5">
      {/* Header */}
      <Header
        toggleSidenav={toggleSidenav}
    
      />
 
      {/* Main Content */}
      {/* <Main /> */}
     payroll
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
  )
}

export default Payroll