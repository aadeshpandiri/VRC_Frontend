import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import { MenuItem, Select } from '@mui/material';

function Receipt({ projectName, type, status, towerNumber, flatNumber, villaNumber, plotNumber, onChangeInput, handleClose, AddRow }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen } = useContext(sharedContext);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('projectName:', projectName);
    //     console.log('type:', type);
    //     console.log('status:', status);
    //     console.log('towerNumber:', towerNumber);
    //     console.log('faltNumber:', flatNumber);
    //     console.log('villaNumber:', villaNumber);
    //     console.log('plotNumber:', plotNumber);
    //     console.log('token:', token)

    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", `Bearer ${token}`);
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({
    //         "project_name": projectName,
    //         "status": status,
    //         "project_type": type,
    //         "tower_number": towerNumber,
    //         "flat_number": flatNumber,
    //         "villa_number": villaNumber,
    //         "plot_number": plotNumber
    //     });

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch("https://vrcbackend.onrender.com/project/createNewProject", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log(result)
    //             // let temp={
    //             //     "project_id":result.data,
    //             //     "project_name": projectName,
    //             //     "status": status,
    //             //     "project_type": type,
    //             //     "tower_number": towerNumber,
    //             //     "flat_number": flatNumber,
    //             //     "villa_number": villaNumber,
    //             //     "plot_number": plotNumber
    //             // }
    //             AddRow(result.data)
    //             handleClose()
    //         })
    //         .catch(error => console.log('error', error));
    // };

    return (
            <div className='ReceiptCard'>
                <h2>Receipt</h2>
                <div className='details__Box' >
                    <div className='details__Fld'>
                        <p>Project ID</p>
                        <p>Project ID</p>
                    </div>
                    <div className='details__Fld'>
                        <p>Project Name</p>
                        <p>Project Name</p>
                    </div>
                    <div className='details__Fld'>
                        <p>Client Name</p>
                        <p>Client Name</p>
                    </div>
                    <div className='details__Fld'>
                        <p>Sales Person Name</p>
                        <p>sales person 1</p>
                    </div>
                    <div className='details__Fld'>
                        <p>Type</p>
                        <p>Token</p>
                    </div>
                    <div className='details__Fld'>
                        <p>Amount</p>
                        <p>20000</p>
                    </div>
                </div>
                <div className='Btns__container'>
                    <div className='dcrd__Btn'>
                        <button onClick={handleClose}>Cancle</button>
                    </div>
                    <div className='add__Btn'>
                        <button type='submit'>Validate</button>
                    </div>
                </div>
            </div>
    )
}

export default Receipt