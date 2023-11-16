import React, { useState } from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import { MenuItem, Select, TextField, Autocomplete } from '@mui/material';
import baseurl from '../data/baseurl'
import Loader from './Loader';
function Editproject({ editRow, onChangeInputEdit, onChangeInputAutoEdit, handleClose, SaveEditedRow }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen, loader, setLoader } = useContext(sharedContext);
    const [message, setMessage] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "project_id": editRow?.project_id,
            "pid": editRow?.pid,
            "project_name": editRow?.project_name,
            "status": editRow?.status,  //AVAILABLE , TOKEN , ADVANCE , SOLD
            "project_type": editRow?.project_type, // Apartment , Villa , Plot
            "tower_number": editRow?.tower_number,
            "flat_number": editRow?.flat_number,
            "villa_number": editRow?.villa_number,
            "plot_number": editRow?.plot_number

        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/project/editProject`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == 409) {
                    setMessage(result.message)
                }

                if (result.message == 'Success') {
                    SaveEditedRow(result.data)
                    handleClose()
                }
                setLoader(false)
            })
            .catch(error => {
                console.log('error', error)
                setLoader(false)
            });
    };

    const inputThemObj = {
        width: "150px",
        height: "44px",
        borderColor: "rgb(208,213,221)",
        borderRadius: '8px',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
    }

    const handleDiscardClick = (e) => {
        e.preventDefault(); // Prevents the default form submission
        handleClose(); // Add any other necessary logic for discarding
    };

    return (
        <div className='AddProject__wrap'>
            <Loader />
            <div className='AddprojectCard'>
                <h2>Edit Project</h2>
                <div>
                    <form onSubmit={handleSubmit} className='deatails__Box' >
                        <div className='fields__Box'>
                            <div className='deatails__Fld'>
                                <p>Project Name</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={editRow?.project_name}
                                    onChange={onChangeInputEdit}
                                    placeholder='Enter Project Name'
                                    required
                                    autoComplete="off"
                                    name='project_name'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>Project Type</p>
                                <Autocomplete className='auto__Fld'
                                    options={['Apartment', 'Villa', 'Plot']}
                                    value={editRow?.project_type}
                                    onChange={(event, newValue) => onChangeInputAutoEdit('project_type', newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Project Type"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                            </div>
                            {editRow?.type !== "" && <div className='deatails__Fld'>
                                <p>Status</p>
                                <Autocomplete className='auto__Fld'
                                    options={['AVAILABLE', 'SOLD', 'TOKEN', 'ADVANCE']}
                                    value={editRow?.status}
                                    onChange={(event, newValue) => onChangeInputAutoEdit('status', newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Status"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                            </div>}
                            {editRow?.project_type === "Apartment" && <>
                                <div className='deatails__Fld'>
                                    <p>Tower Number</p>
                                    <TextField className='text__Fld'
                                        status="text"
                                        value={editRow?.tower_number}
                                        onChange={onChangeInputEdit}
                                        placeholder='Enter Tower Name'
                                        required
                                        autoComplete="off"
                                        name='tower_number'
                                    />
                                </div>
                                <div className='deatails__Fld'>
                                    <p>Flat Number</p>
                                    <TextField className='text__Fld'
                                        status="text"
                                        value={editRow?.flat_number}
                                        onChange={onChangeInputEdit}
                                        placeholder='Enter Flat Name'
                                        required
                                        autoComplete="off"
                                        name='flat_number'
                                    />
                                </div>
                            </>}
                            {editRow?.project_type === "Villa" && <div className='deatails__Fld'>
                                <p>Villa Number</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={editRow?.villa_number}
                                    onChange={onChangeInputEdit}
                                    placeholder='Enter Villa Name'
                                    required
                                    autoComplete="off"
                                    name='villa_number'
                                />
                            </div>}
                            {editRow?.project_type === "Plot" && <div className='deatails__Fld'>
                                <p>Plot Number</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={editRow?.plot_number}
                                    onChange={onChangeInputEdit}
                                    placeholder='Enter Plot Name'
                                    required
                                    autoComplete="off"
                                    name='plot_number'
                                />
                            </div>}
                            <p style={{ color: 'red' }}>{message}</p>
                        </div>

                        <div className='Btns__container'>
                            <div className='dcrd__Btn' onClick={handleDiscardClick}>
                                <button >Discard</button>
                            </div>
                            <div className='add__Btn' type='submit'>
                                <button>Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editproject