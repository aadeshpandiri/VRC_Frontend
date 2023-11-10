import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useContext } from 'react';
import sharedContext from '../context/SharedContext';

const roles = {
  'user':['Dashboard'],
  'SUPERADMIN': ['Dashboard', 'Approvals', 'Receipts', 'Payroll'],
  'MANAGER': ['Dashboard',            
               'Receipts'],
  'SALES': ['Dashboard','Onboard'],
};

const Sidenav = ({ role, isSidenavOpen, toggleSidenav }) => {
  const {userRole}=useContext(sharedContext)
  return (
    <Drawer
      anchor="left"
      open={isSidenavOpen}
      onClose={toggleSidenav}
      variant="temporary"
      sx={{
        ".MuiDrawer-paper": {
          bgcolor: "white",
          width:'100%'
        },
      }}
    //   classNuserRoleame='w-full flex flex-col justify-right'
      ModalProps={{ keepMounted: true }} // For better mobile performance
    >
      <div style={{display:'flex',flexDirection:'column',justifyContent:'end'}}>
      <IconButton
        edge="end"
        aria-label="close"
        onClick={toggleSidenav}
        sx={{
          textAlign: "right",
        }}
        className="inline md:hidden"
      >
        <Close fontSize="large" />
      </IconButton>

      </div>
      <List>
        {roles[userRole]?.map((item, index) => (
          <ListItem  key={index}>
            <ListItemText primary={item} />
          {/* console.log(item) */}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidenav;