import React, { useEffect, useState } from 'react'
import { isValid, isValidEmail, checkname } from '../validations/validators'
import { TextField } from '@mui/material';

function Register({ hangleGotoLogin }) {

  const [formData, setFormData] = useState({
    name: "", email: "", role: "", password: ""
  })

  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})

  const onChangeInput = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((preState) => {
      return {
        ...preState,
        // [name]: type === "checkbox" ? checked : value
        [name]: value
      }
    })

    if (!checkname(value)) {
      setErrors({
        ...errors,
        [name]: 'Name should only contain letters',
      });
    }
    else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }

    // setErrors(((preState) => {
    //   return {
    //     ...preState,
    //     [name]: ""
    //   }
    // }))
  }

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      // Handle login logic here

      const { name, email, role, password } = formData

      const credentials = { name, email, role, password }

      const errs = {}



      // if (!isValid(credentials.email)) {
      //   errs.email = `please fill the email column`
      // } else {
      //   if (!isValidEmail(credentials.email)) {
      //     errs.email = `invalid emailId`
      //   }
      // }

      // if (!isValid(credentials.role)) {
      //   errs.password = `please select the role`
      // }

      // if (!isValid(credentials.password)) {
      //   errs.password = `please fill the password column`
      // }

      // setErrors(errs)

      // if (Object.keys(errs).length === 0) {
      //   var myHeaders = new Headers();
      //   myHeaders.append("Content-Type", "application/json");

      //   var raw = JSON.stringify({
      //     "emailId": email,
      //     "password": password,
      //     "confirmpassword": password,
      //     "type": role,
      //     "name": name
      //   });

      //   var requestOptions = {
      //     method: 'POST',
      //     headers: myHeaders,
      //     body: raw,
      //     redirect: 'follow'
      //   };

      //   fetch("https://vrcbackend.onrender.com/auth/register", requestOptions)
      //     .then(response => response.json())
      //     .then(result => {
      //       console.log(result)
      //       hangleGotoLogin();
      //     })
      //     .catch(error => console.log('error', error));
      // }
    }
    catch (err) {
      console.log(err.message)
      const errs = {}
      errs.message = err.response.data.msg
      setServerErrors(errs)
    }
  };



  return (
    <div className='logIn__wrap'>
      <div className='lg__Mn-cnt'>
        <div className='lg__Ttl'>
          <h2>Create an account</h2>
          <p>Start your 30-day free trial.</p>
        </div>
        <div className='lg__Box'>
          <form onSubmit={handleSubmit}>
            <div className='lg__Fld'>
              <label>Name*</label>
              <div className='input__Fld'>
                <TextField
                  name='name'
                  type="text"
                  value={formData.name}
                  onChange={onChangeInput}
                  placeholder='Enter your Name'
                  autoComplete="off"
                  required
                  error={Boolean(errors.name)}
                  helperText={errors.name}
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
  )
}

export default Register