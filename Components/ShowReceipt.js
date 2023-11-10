import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import { MenuItem, Select } from '@mui/material';
import baseurl from '../data/baseurl'

function ShowReceipt({ handleClose, data, receiptsList, setReceiptsList }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen } = useContext(sharedContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/receipt/validateReceipt`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.message === "Success") {
                    console.log("hello I am coming")
                    // Create a copy of the current approvalsList without the approved/rejected item.
                    const updatedList = receiptsList?.filter(approvalItem => approvalItem.emailId !== data.emailId);

                    // Update the state with the updated list.
                    setReceiptsList(updatedList);
                }
                handleClose()
            })
            .catch(error => console.log('error', error));
    };

    const handleReject = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "project_id": data.project_id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/receipt/rejectReceipt`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.message === "Success") {
                    console.log("hello I am coming")
                    // Create a copy of the current approvalsList without the approved/rejected item.
                    const updatedList = receiptsList?.filter(approvalItem => approvalItem.emailId !== data.emailId);

                    // Update the state with the updated list.
                    setReceiptsList(updatedList);
                }
                handleClose()
            })
            .catch(error => console.log('error', error));
    };

    return (
        <div className='ReceiptCard'>
            <h2>Receipt</h2>
            <div className='details__Box' >
                <div className='details__Fld'>
                    <p>Project ID</p>
                    <p>{data?.project_id}</p>
                </div>
                <div className='details__Fld'>
                    <p>Project Name</p>
                    <p>{data?.project_name}</p>
                </div>
                <div className='details__Fld'>
                    <p>Client Name</p>
                    <p>{data?.client_name}</p>
                </div>
                <div className='details__Fld'>
                    <p>Sales Person Name</p>
                    <p>{data?.sales_person}</p>
                </div>
                <div className='details__Fld'>
                    <p>Type</p>
                    <p>{data?.status}</p>
                </div>
                <div className='details__Fld'>
                    <p>Amount</p>
                    <p>{data?.amount_received}</p>
                </div>
            </div>
            {
                userRole === "SUPERADMIN" &&
                <div className='Btns__container'>
                    <div className='dcrd__Btn' onClick={(e, data) => handleReject(e, data)} >
                        <button >Cancle</button>
                    </div>
                    <div className='add__Btn' onClick={(e, data) => handleSubmit(e, data)}>
                        <button>Validate</button>
                    </div>
                </div>
            }
            {
                userRole === "MANAGER" &&
                <div className='Btns__container'>
                    <div className='add__Btn' onClick={handleClose} >
                        <button >Close</button>
                    </div>

                </div>
            }
        </div>
    )
}

export default ShowReceipt