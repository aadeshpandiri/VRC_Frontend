import React, { useEffect, useState } from 'react'
import { isValid, isValidEmail, checkname } from '../validations/validators'
import { TextField } from '@mui/material';
import { useRouter } from 'next/router';
import BASEURL from '../data/baseurl';
import Loader from '../Components/Loader';
import { useContext } from 'react';
import sharedContext from '../context/SharedContext';
import logo from '../utils/Logo.png';
import lexoddLogo from '../utils/lexodd_logo.png';
import Image from 'next/image';
function Register() {

  const { loader, setLoader } = useContext(sharedContext);
  const [formData, setFormData] = useState({
    name: "", email: "", role: "", password: ""
  })
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [buttonflag, setButtonFlag] = useState(false);
  const hangleGotoLogin = () => {
    router.push('/');
  }
  const onChangeInput = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((preState) => {
      return {
        ...preState,
        // [name]: type === "checkbox" ? checked : value
        [name]: value
      }
    })

    // if (!checkname(value)) {
    //   setErrors({
    //     ...errors,
    //     [name]: 'Name should only contain letters',
    //   });
    // }
    // else {
    //   setErrors({
    //     ...errors,
    //     [name]: '',
    //   });
    // }

    // setErrors(((preState) => {
    //   return {
    //     ...preState,
    //     [name]: ""
    //   }
    // }))
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  useEffect(() => {
    buttonflag && validation();
  }, [formData.email])
  const validation = () => {
    var temp = {}
    let valid = true;

    if (!formData.email) {
      temp = { ...temp, email: "Required" };
      valid = false;
    } else if (!validateEmail(formData.email)) {
      temp = { ...temp, email: "Invalid Email" };
      valid = false;

    }
    if (!formData.password) {
      temp = { ...temp, password: "Required" };
      valid = false;
    } else if (formData.password < 8) {
      temp = { ...temp, email: "Must be at least 8 characters." };
      valid = false;

    }
    setErrors(temp)

    return valid;


  }
  const handleSubmit = (e) => {
    // try {
    e.preventDefault();
    // Handle login logic here

    //   const { name, email, role, password } = formData

    //   const credentials = { name, email, role, password }

    //   const errs = {}



    //   if (!isValid(credentials.email)) {
    //     errs.email = `please fill the email column`
    //   } else {
    //     if (!isValidEmail(credentials.email)) {
    //       errs.email = `invalid emailId`
    //     }
    //   }

    //   if (!isValid(credentials.role)) {
    //     errs.password = `please select the role`
    //   }

    //   if (!isValid(credentials.password)) {
    //     errs.password = `please fill the password column`
    //   }

    //   setErrors(errs)
    setButtonFlag(true)
    console.log(errors, validation())
    if (validation()) {
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "emailId": formData?.email,
        "password": formData?.password,
        "confirmpassword": formData?.password,
        "type": formData?.role,
        "name": formData?.name
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${BASEURL.url}/auth/register`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setLoader(false)
          hangleGotoLogin();
        })
        .catch(error => console.log('error', error));
    }
    // }
    // catch (err) {
    //   console.log(err.message)
    //   const errs = {}
    //   errs.message = err.response.data.msg
    //   setServerErrors(errs)
    // }
  };



  return (
    <>
      <Image src={logo} width={150} height={120} layout="fixed" alt="log image" />
      <div className='logIn__wrap'>
        <Loader />
        <div className='lg__Mn-cnt'>
          <div className='lg__Ttl'>
            <h2>Create an account</h2>
          </div>
          <div className='lg__Box'>
            <form onSubmit={handleSubmit}>
              <div className='lg__Fld'>
                <label>Name*</label>
                <div className='input__Fld'>
                  <input
                    name='name'
                    type="text"
                    value={formData.name}
                    onChange={onChangeInput}
                    placeholder='Enter your Name'
                    autoComplete="off"
                    required
                  //   error={Boolean(errors.name)}
                  //   helperText={errors.name}
                  />
                </div>
                {/* <div className='errBlock'>
                {(errors.name) ? <p> {errors.name}</p> : null}
              </div> */}
              </div>
              <div className='lg__Fld'>
                <label>Email*</label>
                <div className='input__Fld'>
                  <input
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={onChangeInput}
                    placeholder='Enter your email'
                    autoComplete="off"
                    required
                  />
                </div>
                <div className='errBlock'>
                  {(errors.email) ? <p> {errors.email}</p> : null}
                </div>
              </div>
              <div className='lg__Fld'>
                <label>Password*</label>
                <div className='input__Fld'>
                  <input
                    type="password"
                    name='password'
                    value={formData.password}
                    onChange={onChangeInput}
                    placeholder='Create a password'
                    autoComplete="off"
                    required
                  />
                </div>
                <div className='errBlock'>
                  {(errors.password) ? <p> {errors.password}</p> : null}
                </div>
                <span className='info'>Must be at least 8 characters.</span>
              </div>
              <div className='lg__Fld'>
                <label>Role*</label>
                <div className='input__Fld'>
                  <select
                    name='role'
                    value={formData.role}
                    onChange={onChangeInput}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="SALES">SALES</option>
                    <option value="MANAGER">MANAGER</option>
                  </select>
                </div>
                <div className='errBlock'>
                  {(errors.role) ? <p> {errors.role}</p> : null}
                </div>
              </div>
              <div className='sbt__Btn'>
                <button type="submit">Get started</button>
              </div>
              <div className='ck__Act'>
                <p>Already have an account? <span onClick={hangleGotoLogin}>Log in</span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='lexoddLogo_con'>
        <div className='lexodd'>
          <Image src={lexoddLogo} width={100} height={16} layout="fixed" alt="log image" />
          <p>Powered by Lexodd Hypernova Pvt. Ltd.</p>
        </div>
      </div>
    </>

  )
}

export default Register
