import React,{useState,useEffect} from 'react'
import SharedContext from './SharedContext'

const SharedState=(props)=> {

    const [userRole,setUserRole]=useState('USER');
    const [token,setToken]=useState();
    const [isSidenavOpen, setIsSidenavOpen] = useState(false);
    const [loader, setLoader] = useState(false);
   useEffect(()=>{
    if(window){
        // setToken()
        setToken(sessionStorage.getItem('token'))
        setUserRole(sessionStorage.getItem('userRole')||'USER')
    }
   },[])
  return (
    <SharedContext.Provider value={{'userRole':userRole,'setUserRole':setUserRole,'token':token,'setToken':setToken,'isSidenavOpen':isSidenavOpen,'setIsSidenavOpen':setIsSidenavOpen,'loader':loader, 'setLoader':setLoader}}>{
        props.children
        }</SharedContext.Provider>
  )
}

export default SharedState