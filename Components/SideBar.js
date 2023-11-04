import React, { useContext, useEffect, useState } from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";

import { useRouter } from "next/router";
import Link from "next/link";
import { List } from "@mui/material";
import routes from "../data/routes";
import sharedContext from "../context/SharedContext";
import roles from "../data/roles";
const SideBar = () => {

  // const router = useRouter();
  const {userRole}=useContext(sharedContext)


  const handleLogout=()=>{
    sessionStorage.clear();
    setToken(null);
  }
  return (
    <>
     <List className="flex flex-col">
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
      </List>
    </>
  );
};

export default SideBar;
