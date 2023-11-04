// import { TextField } from '@mui/material'
import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';

function Login({ email, password, rememberMe, onChangeInput, hangleGotoSignup, handleClose }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen } = useContext(sharedContext);

    const handleSubmit = (e) => {
        e.preventDefault();
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

        fetch("https://vrcbackend.onrender.com/auth/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setToken(result.data.accessToken)
                setUserRole(result.data.role_type)
                handleClose()
                sessionStorage.setItem('token', result.data.accessToken)
                sessionStorage.setItem('userRole', result.data.role_type)
                // location.reload()

            })
            .catch(error => console.log('error', error));
    };
    return (
        // <div className='flex flex-col p-10'>
        //     <TextField placeholder='Email' onChange={onChangeInput} name='email' />
        //     <TextField type='password' name='password'/>
        //     </div>
        <div className='logIn__wrap'>
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