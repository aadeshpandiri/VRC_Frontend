
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
          toggleSidenav={toggleSidenav} />

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
          toggleSidenav={toggleSidenav}

        />

        {/* Main Content */}
        {/* <Main /> */}
        <div className='bg-slate-300 h-full p-4 overflow-scroll mt-20'>
          <OnboardingForm />
        </div>
      </div>

    </div>
  )
}

export default Onboarding