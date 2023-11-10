import React, { useContext, useEffect, useState } from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import { Close, HomeOutlined, LogoutOutlined ,ApprovalOutlined,ReceiptLongOutlined,AccountBalanceWalletOutlined} from "@mui/icons-material";

import Link from "next/link";
import { List } from "@mui/material";
import routes from "../data/routes";
import sharedContext from "../context/SharedContext";
import roles from "../data/roles";
import Image from "next/image";
import Home from '../utils/Home.svg'
import approval from '../utils/approval.svg'
import receipt from '../utils/receipt.svg'
import payroll from '../utils/payroll.svg'
import logout from '../utils/Logout.svg'
const SideBar = () => {

  // const router = useRouter();
  const {userRole,setToken}=useContext(sharedContext)


  const handleLogout=()=>{
    sessionStorage.clear();
    setToken(null);
  }
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
  return (
    <>
     <List className="flex flex-col justify-between justify-between fixed" style={{
      height:'80vh'
     }}>
  <div>
        {roles[userRole]?.map((item, index) => (
          <div key={index} name={item} className="p-4 flex items-center gap-4" 
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
        <div onClick={handleLogout}  className="p-4 flex items-center gap-4">
        <Image
   
   alt="logout"
   src={logout}
   quality={100}
   width= {23}
   height= {23}

   /> <span style={{color:'#667085'}}>Logout</span>
        </div>
      </List>
    </>
  );
};

export default SideBar;
