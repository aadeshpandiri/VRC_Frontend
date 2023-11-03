import React,{useState,useEffect} from 'react'
import SharedContext from './SharedContext'

const SharedState=(props)=> {

    const [userRole,setUserRole]=useState('SUPERADMIN');
    const [token,setToken]=useState();
    const [isSidenavOpen, setIsSidenavOpen] = useState(false);
   useEffect(()=>{
    if(window){
        // setToken()
        setToken(sessionStorage.getItem('token'))
        setUserRole(sessionStorage.getItem('userRole'))
    }
   },[])
  return (
    <SharedContext.Provider value={{'userRole':userRole,'setUserRole':setUserRole,'token':token,'setToken':setToken,'isSidenavOpen':isSidenavOpen,'setIsSidenavOpen':setIsSidenavOpen}}>{
        props.children
        }</SharedContext.Provider>
  )
}

export default SharedState