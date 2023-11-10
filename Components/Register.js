import React, { useEffect, useState } from 'react'

function Register({ hangleGotoLogin }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Sales');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTgzOTA1ODQsImV4cCI6MTY5ODM5MTE4NCwiYXVkIjoiMTpNQU5BR0VSIiwiaXNzIjoidnJjYXBwbGljYXRpb24ifQ.-YY3LHrpCAj3FG4KV1_yiOkTHZS66QSJMeMro10XOxg");

    var raw = JSON.stringify({
      "emailId": email,
      "password": password,
      "confirmpassword": password,
      "type": role,
      "name": name
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://vrcbackend.onrender.com/auth/register", requestOptions)
      .then(response => response.json())
      .then(result => {
        hangleGotoLogin();
      })
      .catch(error => console.log('error', error));
    // console.log('Remember Me:', rememberMe);
  };
  const onChangeInput = (e) => {
    console.log(e.target.name)
    switch (e.target.name) {
      case 'name': setName(e.target.value); break;
      case 'email': setEmail(e.target.value); break;
      case 'password': setPassword(e.target.value); break;
      case 'role': setRole(e.target.value); break;
    }
  }
  // useEffect(()=>{

  // })
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
                <input
                  name='name'
                  type="text"
                  value={name}
                  onChange={onChangeInput}
                  placeholder='Enter your name'
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className='lg__Fld'>
              <label>Email*</label>
              <div className='input__Fld'>
                <input
                  type="email"
                  name='email'
                  value={email}
                  onChange={onChangeInput}
                  placeholder='Enter your email'
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className='lg__Fld'>
              <label>Password*</label>
              <div className='input__Fld'>
                <input
                  type="password"
                  name='password'
                  value={password}
                  onChange={onChangeInput}
                  placeholder='Create a password'
                  autoComplete="off"
                  required
                />
              </div>
              <span className='info'>Must be at least 8 characters.</span>
            </div>
            <div className='lg__Fld'>
              <label>Role*</label>
              <div className='input__Fld'>
                <select

                  name='role'
                  value={role}
                  onChange={onChangeInput}
                  required
                >
                  <option value="SALES">Sales</option>
                  <option value="MANAGER">Manager</option>
                  {/* <option value="Admin">Admin</option> */}
                </select>
              </div>
              <span className='info'>Must be at least 8 characters.</span>
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