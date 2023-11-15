
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Sidenav from '../Components/SideNav';
import sharedContext from '../context/SharedContext';
import { useContext } from "react";
import Link from "next/link";

import roles from '../data/roles'
import SideBar from '../Components/SideBar';
import OnboardingForm from '../Components/OnboardingForm';

function Onboarding() {

  const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen } = useContext(sharedContext);
  const [receiptsList, setReceiptsList] = useState([]);
  const [isDrawerOpen, setOpenDrawer] = useState(false);

  const toggleDrawer = (anchor, open, event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };
  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };
  useEffect(() => {
    if (isSidenavOpen) {
      toggleSidenav()
    }

  }, [])
  return (
    <div className="md:flex h-screen w-full">

      {/* Sidenav (desktop mode) */}
      <div
        className={`hidden md:block md:w-1/5 bg-[#FFFFFF] mt-20`}
      >
        <Sidenav
          role={userRole}
          navigation={roles[userRole]}
          isSidenavOpen={isSidenavOpen}
          toggleSidenav={toggleSidenav}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen} />

        {/* <List>
      {roles[userRole]?.map((item, index) => (
        <ListItem  key={index}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List> */}
        <SideBar />
      </div>

      {/* Content Container */}
      <div className="md:w-4/5">
        {/* Header */}
        <Header
          userRole={userRole}
          toggleSidenav={toggleSidenav}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />

        {/* Main Content */}
        {/* <Main /> */}
        <div className='bg-grey-500 h-full p-4 overflow-scroll mt-20' style={{ height: '90vh' }}>
          <OnboardingForm />
        </div>
      </div>

    </div>
  )
}

export default Onboarding