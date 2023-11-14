import React, { useContext, useEffect, useState } from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import { Close, HomeOutlined, LogoutOutlined, ApprovalOutlined, ReceiptLongOutlined, AccountBalanceWalletOutlined } from "@mui/icons-material";

import Link from "next/link";
import { List } from "@mui/material";
import routes from "../data/routes";
import sharedContext from "../context/SharedContext";
import roles from "../data/roles";
import Image from "next/image";
import Home from '../utils/Home.svg'
import HomeAcv from '../utils/HomeAcv.svg'
import approval from '../utils/approval.svg'
import approvalAcv from '../utils/approvalAcv.svg'
import receipt from '../utils/receipt.svg'
import receiptAcv from '../utils/receiptAcv.svg'
import payroll from '../utils/payroll.svg'
import payrollAcv from '../utils/payrollAcv.svg'
import logout from '../utils/Logout.svg'
import onboard from '../utils/onboard.svg'
import onboardAcv from '../utils/onboardAcv.svg'
import { useRouter } from 'next/router';

const SideBar = () => {

  const router = useRouter();
  const { userRole, setUserRole, setToken } = useContext(sharedContext)


  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/Login')
    setToken(null);
    setUserRole('USER')
  }
  const getIcon = (item, isActive) => {
    switch (item) {
      case 'Dashboard': return <Image

        alt="Home"
        src={isActive ? HomeAcv : Home}
        quality={100}
        width={23}
        height={23}

      />; break;
      case 'Approvals': return <Image

        alt="approval"
        src={isActive ? approvalAcv : approval}
        quality={100}
        width={23}
        height={23}

      />; break;
      case 'Receipts': return <Image

        alt="receipt"
        src={isActive ? receiptAcv : receipt}
        quality={100}
        width={23}
        height={23}

      />; break;
      case 'Payroll': return <Image

        alt="payroll"
        src={isActive ? payrollAcv : payroll}
        quality={100}
        width={23}
        height={23}

      />; break;

      case 'Onboard': return <Image

        alt="onboard"
        src={isActive ? onboardAcv : onboard}
        quality={100}
        width={23}
        height={23}
        style={{ fill: isActive ? '#3B82F6' : '#667085' }}

      />; break;

    }
  }
  return (
    <>
      <List className="flex flex-col justify-between fixed" style={{
        height: '80vh'
      }}>
        <div>
          {roles[userRole]?.map((item, index) => (
            <div key={index} name={item} className={`p-4 flex items-center gap-4 ${router.pathname === routes[item] ? 'text-blue-500' : ''}`}>
              {getIcon(item, router.pathname === routes[item])}
              <Link href={`${routes[item]}`}>{item}</Link></div>
          ))}
        </div>
        <div onClick={handleLogout} className="p-4 flex items-center gap-4">
          <Image

            alt="logout"
            src={logout}
            quality={100}
            width={23}
            height={23}

          /> <span style={{ color: '#667085' }}>Logout</span>
        </div>
      </List>
    </>
  );
};

export default SideBar;