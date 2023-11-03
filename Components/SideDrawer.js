import React, { useEffect, useState } from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";

import { useRouter } from "next/router";

const SideDrawer = ({ navLinks }) => {

  const router = useRouter();
  const [state, setState] = useState({
    right: false,
  });
  const [isDrawerOpen, setOpenDrawer] = useState(false);


  const toggleDrawer = (anchor, open, event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
//   useEffect(()=>{
//     if(sessionStorage.getItem('token')){
//       const requestOptions = {
//         method: 'Get',
//         headers: {
//         'Content-Type': 'application/json',
//         'x-api-key':sessionStorage.getItem('token'),
//          "access-control-allow-origin": "*"

//            }
//            };
//       fetch('https://api.landdocs.in/api/v1/myProfile',requestOptions)
//       .then((res)=>{
//         return res.json();
//       })
//       .then((res)=>{
//         console.log(res);
//         setProfileData(res.data.userDetails[0])
//       })
//       .catch((err)=>{
//         console.log(err)
//       })
//     }

//   },[])
  const toggleSignDrawer = (anchor, open, event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open)
  };
  const handellogout=()=>{
    router.push('/')
    // location.reload();
    // localStorage.clear("token"); 
    sessionStorage.clear("token")
    location.reload();
  }



  // const list = (anchor) => (
  //   <Box
  //     sx={{ width:200 }}
  //     role="presentation"
  //     // onClick={toggleDrawer(anchor, false)}
  //     // onKeyDown={toggleDrawer(anchor, false)}
  //     className="hamburger-menu"
  //   >
  //     {/* {!profileData?.name ? (
  //       <div style={{ textAlign: "center", paddingRight: "30px" }}>
  //         <MaterialButton
  //           variant="contained"
  //           onClickHandler={(event) => toggleSignDrawer("right", true, event)}
  //           displayName={registerWithUs}
  //           classes="kc-login-button"
  //           titleClass="login-button-text"
  //         />
  //       </div>
  //     ) : (
  //       <span className="profileDetails">
  //         {profileData?.name || <div style={{ textAlign: "center", paddingRight: "30px" }}>
  //           <MaterialButton
  //             variant="contained"
  //             onClickHandler={(event) => toggleSignDrawer("right", true, event)}
  //             displayName={registerWithUs}
  //             classes="kc-login-button"
  //             titleClass="login-button-text"
  //           />
  //         </div>}

  //         {profileData.name ? <div class="dropdown">
  //           <KeyboardArrowDownIcon style={{ cursor: "pointer" }} />
  //           <div className="dropdown-content">
  //             {/* <a href="#">My profile</a>
  //             <a href="#">Orders</a>
  //             <a href="#">Edit Profile</a> 
  //             <a href="#"><div   onClick={() => router.push("/Profiles")}>My profile</div></a>
  //             {/* <a href="#" onClick={() => router.push("/Editprofile")}>Edit Profile</a> 
  //             <a href="#"onClick={() => router.push("/myorders")}>Orders</a>
  //             <a href="#"onClick={() => router.push("/Addcart")}>{`Cart${" "+"("+cart+")"}`}</a>
  //             <a ><div className="logout" onClick={() => { handellogout() }}>Logout</div></a>
  //           </div>
  //         </div> : ""}
  //       </span>
  //     )} */}
  //     {/* <div className="lanlegal_serves">
  //     {navLinks.map((menu, index) => {
  //       const depthLevel = 0;

  //       return (
  //         /* <Typography
  //           variannt="button"
  //           key={`${menu.title}${index}`}
  //           sx={{
  //             ml: 5,
  //             my: 2,
  //             textTransform: `capitalize`,
  //           }}
  //         >
  //           <MuiNextLink sx={{ color: "primary.dark", textDecoration: "none" }} href={path}>
  //           {title}
  //         </MuiNextLink> 
  //         <div
  //           key={menu.cName}
  //           className="nav-items"
  //           onClick={(event) => !menu.submenu ? toggleDrawer(anchor, false, event) : null}
  //           onKeyDown={(event) => toggleDrawer(anchor, false, event)}
  //         >
  //           <MenuItems items={menu} key={index} depthLevel={depthLevel} />
  //         </div>
  //         /*</Typography>
  //       );
  //     })}
  //     </div> */}
  //   </Box>
  // );

  return (
    <>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={(event) => toggleDrawer("right", true, event)}
        sx={{
          color: `grey`,
          // display: { xs: `inline`, md: `none`, lg: `none` },
          width: "5%",
          textAlign: "end",
        }}
        className="inline md:hidden"
      >
        <Menu fontSize="large" />
      </IconButton>
      <Drawer
        anchor="left"
        open={state.right}
        onClose={(event) => toggleDrawer("right", false, event)}
        sx={{
          ".MuiDrawer-paper": {
            bgcolor: "white",
            width:'100%'
          },
        }}
        color="primary.dark"
      >
        <div style={{display:'flex',flexDirection:'column',justifyContent:'end'}}>
        {/* {list("right")} */}
        <IconButton
        edge="end"
        aria-label="close"
        onClick={(event) => toggleDrawer("right", false, event)}
        sx={{
          color: `grey`,
          display: { xs: `inline`, md: `inline`, lg: `none` },
          // width: "5%",
          textAlign: "end",
        }}
      >
        <Close fontSize="large" />
      </IconButton>
      
      </div>
      </Drawer>
      {/* <SignInDrawer
        anchor={windowWidth < 950 ? "bottom" : "right"}
        toggleDrawer={toggleSignDrawer}
        isOpen={isDrawerOpen}
      /> */}
    </>
  );
};

export default SideDrawer;
