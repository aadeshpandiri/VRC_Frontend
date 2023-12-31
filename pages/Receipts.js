import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Sidenav from '../Components/SideNav';
import sharedContext from '../context/SharedContext';
import { useContext } from "react";
import AddprojectDrawer from '../Components/AddprojectDrawer';


import { Drawer, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
// const roles = {

//     'SUPERADMIN': ['Dashboard', 'Approvals', 'Receipts', 'Payroll'],
//     'MANAGER': ['Dashboard', 'Receipts'],
//     'SALES': ['Dashboard', 'OnBoard Form'],
//   };
import roles from '../data/roles'
import SideBar from '../Components/SideBar';
import { data } from 'autoprefixer';

function Receipts() {
  const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen } = useContext(sharedContext);
  const [receiptsList, setReceiptsList] = useState([]);
  // const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  // const userRole = 'superadmin'; // Set the user's role here
  // const [userRole,setUserRole]=useState('superadmin');

  const toggleSidenav = () => {
    console.log("called togglesidenav rec")
    setIsSidenavOpen(!isSidenavOpen);
  };

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
  useEffect(() => {
    if (token) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://3.111.35.41:4200/receipt/getReceipts", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status == 401 || result.message == 'Token Invalid/Expired') {
            handleLogout();
          }
          else {
            console.log(result.data)
            setReceiptsList(result.data)
            // setReceiptsList([{project_id:1}])
          }

        })
        .catch(error => console.log('error', error));
    }
  }, [token])

  const [current, setCurrent] = useState('');
  const [isReceiptDrawerOpen, setOpenReceiptDrawer] = useState(false);
  const [data, setData] = useState({})
  const toggleReceiptDrawer = (anchor, open, event, item) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCurrent('sReceipt')
    setOpenReceiptDrawer(open);
    setData(item)
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setToken(null);
  }
  // useEffect(()=>{
  //   if(isSidenavOpen){
  //     toggleSidenav()
  //   }
  
  // },[])

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
          isDrawerOpen={isDrawerOpen}/>
        <SideBar />
      </div>

      {/* Content Container */}
      <div className="md:w-4/5">
        {/* Header */}
        <Header
          toggleSidenav={toggleSidenav}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />

        {/* Main Content */}
        {/* <Main /> */}
        <div className='bg-grey-500 h-full p-4 overflow-scroll mt-20 flex flex-col gap-5 pt-8' style={{ height: '90vh' }}>
          <AddprojectDrawer
            anchor="right"
            toggleDrawer={toggleReceiptDrawer}
            isOpen={isReceiptDrawerOpen}
            current={current}
            data={data}
            receiptsList={receiptsList}
            setReceiptsList={setReceiptsList}
          />
          {
            receiptsList?.map((item, index) => {
              console.log(item)
              return <div key={index} className='bg-white p-2 rounded-md cursor-pointer' onClick={(event) => toggleReceiptDrawer('right', true, event, item)}>Project ID:{item.project_id}</div>
            })
          }
        </div>

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

export default Receipts
