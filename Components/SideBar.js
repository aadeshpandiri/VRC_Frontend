import React, { useContext, useEffect, useState } from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import { Close, Home, LogoutOutlined ,ApprovalOutlined,ReceiptLongOutlined,AccountBalanceWalletOutlined} from "@mui/icons-material";

import Link from "next/link";
import { List } from "@mui/material";
import routes from "../data/routes";
import sharedContext from "../context/SharedContext";
import roles from "../data/roles";
const SideBar = () => {

  // const router = useRouter();
  const {userRole,setToken}=useContext(sharedContext)


  const handleLogout=()=>{
    sessionStorage.clear();
    setToken(null);
  }
  const getIcon=(item)=>{
    switch(item){
      case 'Dashboard':return <Home color='primary'/>; break;
      case 'Approvals': return <ApprovalOutlined/>; break;
      case 'Receipts':return <ReceiptLongOutlined/>; break;
      case 'Payroll':return <AccountBalanceWalletOutlined/>; break;

    }
  }
  return (
    <>
     <List className="flex flex-col justify-between fixed">
  <div>
        {roles[userRole]?.map((item, index) => (
          <div key={index} name={item} className="p-4" 
          // onClick={(e)=>{
          //   console.log(routes[item])
          //   router.push(`${routes[item]}`)
          // }
          // }
          >
            {getIcon(item)}
            <Link href={`${routes[item]}`}>{item}</Link></div>
        ))}
        </div>
        <div onClick={handleLogout}  className="p-4">
         <LogoutOutlined/> Logout
        </div>
      </List>
    </>
  );
};

export default SideBar;
