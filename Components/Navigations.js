import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// const container = window !== undefined ? () => window().document.body : undefined;
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
function Navigations() {
    const router=useRouter();
    const navList=[
      {
        route:'/',
        displayName:'Dashboard',
        id:1,
        icon:<DashboardOutlinedIcon fontSize='large'></DashboardOutlinedIcon>,
        role_type:['Sales','Manager','Admin']
    }
      ,
      {
          route:'/reciepts',
          displayName:'Reciepts',
          id:2,
          icon:<PersonOutlineOutlinedIcon fontSize='large'></PersonOutlineOutlinedIcon>,
          role_type:['Manager','Admin']
      },
      {
          route:'/approvals',
          displayName:'Approvals',
          id:3,
          icon:<EventAvailableOutlinedIcon fontSize='large'></EventAvailableOutlinedIcon>,
          role_type:['Admin']
      },
      {
          route:'/onboard',
          displayName:'Onboard',
          id:4,
          icon:<WorkOutlineIcon fontSize='large'></WorkOutlineIcon>,
          role_type:['Sales']
      },
      {
          route:'/payroll',
          displayName:'Payroll',
          id:5,
          icon:<PersonAddAltOutlinedIcon fontSize='large'></PersonAddAltOutlinedIcon>,
          role_type:['Admin']
      }

  ]
  const getClass=(each,index)=>{

    //   console.log(router.pathname.split('/')[1],each.route,index)
      if(router.pathname==each.route){
          return 'each-navigation navigation-selected'
      }
      return 'each-navigation'

  }
  const size = useWindowSize();
 
  return (
    <div className='navigation-list hidden md:block'>

      {navList?.map(((each,index)=>{
            return(
             <div className={getClass(each,index)} onClick={()=>router.push(each.route)} key={each.id}> <div className='Nav-icon'>{each.icon}</div><div className='Nav-display-name'>{each.displayName} </div></div>
        )}))}
      
    </div>
  )
}

export default Navigations
import { useState, useEffect } from 'react';

// Usage
// function App() {
//   const size = useWindowSize();

//   return (
//     <div>
//       {size.width}px / {size.height}px
//     </div>
//   );
// }

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}