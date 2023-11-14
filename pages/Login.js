// import { TextField } from '@mui/material'
import React, { useState } from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import Loader from '../Components/Loader';
import baseurl from '../data/baseurl';
import { useRouter } from 'next/router';
function Login() {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen ,loader,setLoader} = useContext(sharedContext);
    const [error,setError]=useState('')
    const router=useRouter()
    const hangleGotoSignup=()=>{
        router.push('/Register');
    }
    // const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState();
    const onChangeInput = (e) => {
        console.log(e.target.checked)
        switch (e.target.name) {
        //   case 'name': setName(e.target.value); break;
          case 'email': setEmail(e.target.value); break;
          case 'password': setPassword(e.target.value); break;
          case 'rememberMe': setRememberMe(e.target.checked); break;
        }
      }
    const handleSubmit = (e) => {
        console.log(`${baseurl.url}/auth/login`,email,password)
        e.preventDefault();
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "emailId": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/auth/login`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status==404){
                    setError(result.message)
                }
                else{
                    setToken(result.data.accessToken)
                    setUserRole(result.data.role_type)
                    // handleClose()
                    router.push('/')
                    sessionStorage.setItem('token', result.data.accessToken)
                    sessionStorage.setItem('userRole', result.data.role_type)
                }
               
                // location.reload()
                setLoader(false)

            })
            .catch(error =>{
                console.log('error', error)
                setLoader(false)
            } );
    };
    return (
        <div className='logIn__wrap'>
            <Loader/>
            <div className='lg__Mn-cnt'>
                <div className='lg__Ttl'>
                    <h2>Log in to your account</h2>
                    <p>Welcome back! Please enter your details.</p>
                </div>
                <div className='lg__Box'>
                    <form onSubmit={handleSubmit}>
                        <div className='lg__Fld'>
                            <label>Email</label>
                            <div className='input__Fld'>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={onChangeInput}
                                    placeholder='Enter your email'
                                    required
                                    autoComplete="off"
                                    name='email'
                                />
                            </div>
                        </div>
                        <div className='lg__Fld'>
                            <label>Password</label>
                            <div className='input__Fld'>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={onChangeInput}
                                    required
                                    autoComplete="off"
                                    name='password'
                                />
                            </div>
                        </div>
                        <div className='rem__Div'>
                            <div className='rm_Pass'>
                                <label>
                                    <input
                                        name='rememberMe'
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={onChangeInput}
                                    />{' '}
                                    Remember me
                                </label>
                            </div>
                            <div className='frg__Pas'>
                                <span>Forgot password</span>
                            </div>
                            
                        </div>
                        <div >
                            <span style={{color:'red'}}>{error}</span>
                            </div>
                        <div className='sbt__Btn'>
                            <button type="submit">Sign in</button>
                        </div>
                        <div className='ck__Act'>
                            <p>Don’t have an account? <span onClick={hangleGotoSignup}>Sign up</span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login