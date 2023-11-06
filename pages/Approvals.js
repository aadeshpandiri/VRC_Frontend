
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Sidenav from '../Components/SideNav';
import sharedContext from '../context/SharedContext';
import { useContext } from "react";

import { Drawer, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
// const roles = {
   
//     'SUPERADMIN': ['Dashboard', 'Approvals', 'Receipts', 'Payroll'],
//     'MANAGER': ['Dashboard', 'Receipts'],
//     'SALES': ['Dashboard', 'OnBoard Form'],
//   };
import roles from '../data/roles'
import SideBar from '../Components/SideBar';
function Approvals() {
    const {userRole,token,isSidenavOpen,setUserRole,setToken,setIsSidenavOpen}=useContext(sharedContext);
    const [approvalsList,setApprovalsList]=useState([]);
    // const [isSidenavOpen, setIsSidenavOpen] = useState(false);
    // const userRole = 'superadmin'; // Set the user's role here
    // const [userRole,setUserRole]=useState('superadmin');
    const toggleSidenav = () => {
      setIsSidenavOpen(!isSidenavOpen);
    };
    useEffect(()=>{
        if(token){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://vrcbackend.onrender.com/admin/getUsersList", requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.status==401 || result.message=='Token Invalid/Expired'){
              handleLogout();
            }
            else{
              console.log(result)
              setApprovalsList(result.data)
  
            }
            
        })
          .catch(error => console.log('error', error));
    }},[token])
    const handleLogout=()=>{
      sessionStorage.clear();
      setToken(null);
    }
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
       userRole={userRole}
     />

     {/* Main Content */}
     {/* <Main /> */}
     <div class='bg-slate-300 h-full p-4'>
      <div className='rounded-md	'>
      <table className='w-full text-left overflow-y-scroll '>
        
        <tbody>   {approvalsList?.map((item,index)=>(
     
        <tr key={index} className='bg-white '>
         
                <td className='p-4'>{index+1}</td> 
               <td className='p-4'>{item.name}</td> 
               <td className='p-4'>{item.emailId}</td> 
               <td className='p-4'>{item.role_type}</td> 
               <td className='p-4'>{item.status}</td> 

            <div className='flex justify-end'>
              <Button variant='outlined' color='success'>Approve</Button>
              <Button color='error'>Reject</Button>
              </div>
            
            
                </tr>

       ) )}</tbody>
       </table>
       </div>
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

export default Approvals