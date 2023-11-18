import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import { MenuItem, Select } from '@mui/material';
import baseurl from '../data/baseurl'
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast'

function ShowReceipt({ handleClose, data, receiptsList, setReceiptsList }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen,setLoader } = useContext(sharedContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
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
                    console.log("hello I am coming",data,receiptsList)
                    toast.success('Approved Successfully')
                    // Create a copy of the current approvalsList without the approved/rejected item.
                    const updatedList = receiptsList?.filter(approvalItem => approvalItem.emailId !== data.emailId);

                    // Update the state with the updated list.
                    setReceiptsList(updatedList);
                    setLoader(false)
                }
                handleClose()
            })
            .catch(error => console.log('error', error));
    };

    const handleReject = (e) => {
        e.preventDefault();
        setLoader(true)
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
                    toast.success('Rejected Successfully')
                    // Create a copy of the current approvalsList without the approved/rejected item.
                    const updatedList = receiptsList?.filter(approvalItem => approvalItem.emailId !== data.emailId);

                    // Update the state with the updated list.
                    setReceiptsList(updatedList);
                }
                setLoader(false)
                handleClose()
            })
            .catch(error =>{ console.log('error', error)
            setLoader(false)
        });
    };

    return (
        <div className='ReceiptCard'>
            <Loader/>
            <h2>Receipt</h2>
            <div className='details__Box' >
                <div className='details__Fld'>
                    <span>Project ID</span>
                    <span>{data?.project_id}</span>
                </div>
                <div className='details__Fld'>
                    <span>Project Name</span>
                    <span>{data?.project_name}</span>
                </div>
                <div className='details__Fld'>
                    <span>Client Name</span>
                    <span>{data?.client_name}</span>
                </div>
                <div className='details__Fld'>
                    <span>Sales Person</span>
                    <span>{data?.sales_person}</span>
                </div>
                <div className='details__Fld'>
                    <span>Type</span>
                    <span>{data?.status}</span>
                </div>
                <div className='details__Fld'>
                    <span>Amount</span>
                    <span>{data?.amount_received}</span>
                </div>
            </div>
            {
                userRole === "SUPERADMIN" &&
                <div className='recBtns__container'>
                    <div className='dcrd__Btn' onClick={(e, data) => handleReject(e, data)} >
                        <button >Reject</button>
                    </div>
                    <div className='add__Btn' onClick={(e, data) => handleSubmit(e, data)}>
                        <button>Validate</button>
                    </div>
                </div>
            }
            {
                userRole === "MANAGER" &&
                <div className='recBtns__container'>
                    <div className='add__Btn' onClick={handleClose} >
                        <button >Close</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ShowReceipt