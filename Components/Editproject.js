import React,{useState} from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import { MenuItem, Select } from '@mui/material';

function Editproject({ projectName, type, status, towerNumber, flatNumber, villaNumber, plotNumber, onChangeInputEdit, handleClose,SaveEditedRow }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen } = useContext(sharedContext);
    const [message,setMessage]=useState();
    const handleSubmit = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "project_name": projectName,
            "status": status,
            "project_type": type,
            "tower_number": towerNumber,
            "flat_number": flatNumber,
            "villa_number": villaNumber,
            "plot_number": plotNumber
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://vrcbackend.onrender.com/project/editProject", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status==409){
                    setMessage(result.message)
                }
              
                if(result.message=='Success'){
                    SaveEditedRow(result.data)
                    handleClose()
                }
                
            })
            .catch(error => console.log('error', error));
    };

    const inputThemObj = {
        width: "150px",
        height: "44px",
        borderColor: "rgb(208,213,221)",
        borderRadius: '8px',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
    }

    return (
        // <div className='flex flex-col p-10'>
        //     <TextField placeholder='Email' onChange={onChangeInput} name='email' />
        //     <TextField type='password' name='password'/>
        //     </div>
        <div className='AddProject__wrap'>
            <div className='AddprojectCard'>
                <h2>Edit Project</h2>
                <div>
                    <form onSubmit={handleSubmit} className='deatails__Box' >
                        <div className='fields__Box'>
                            <div className='deatails__Fld'>
                                <p>Project Name</p>
                                <div className='input__Fld'>
                                    <input
                                        type="projectName"
                                        value={projectName}
                                        onChange={onChangeInputEdit}
                                        placeholder='Enter Project Name'
                                        required
                                        autoComplete="off"
                                        name='project_name'
                                    />
                                </div>
                            </div>
                            <div className='deatails__Fld'>
                                <p>Project Type</p>
                                <div className='input__Fld'>
                                    <Select 
                                        value={type}
                                        onChange={onChangeInputEdit}
                                        required
                                        autoComplete="off"
                                        name='type'
                                    >
                                        <MenuItem value="" disabled>Type</MenuItem>
                                        <MenuItem value="Apartment">Apartment</MenuItem>
                                        <MenuItem value="Villa">Villa</MenuItem>
                                        <MenuItem value="Plot">Plot</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            {type !== "" && <div className='deatails__Fld'>
                                <p>Status</p>
                                <div className='input__Fld'>
                                    <Select style={inputThemObj}
                                        value={status}
                                        onChange={onChangeInputEdit}
                                        required
                                        autoComplete="off"
                                        name='status'
                                    >
                                        <MenuItem value="" disabled>Select Status</MenuItem>
                                        <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                                        <MenuItem value="SOLD">SOLD</MenuItem>
                                        <MenuItem value="TOKEN">TOKEN</MenuItem>
                                        <MenuItem value="ADVANCE">ADVANCE</MenuItem>
                                    </Select>
                                </div>
                            </div>}
                            {type === "Appartment" && <>
                                <div className='deatails__Fld'>
                                    <p>Tower Number</p>
                                    <div className='input__Fld'>
                                        <input
                                            type="towerNumber"
                                            value={towerNumber}
                                            onChange={onChangeInputEdit}
                                            placeholder='Enter Tower Number'
                                            required
                                            autoComplete="off"
                                            name='tower_number'
                                        />
                                    </div>
                                </div>
                                <div className='deatails__Fld'>
                                    <p>Flat Number</p>
                                    <div className='input__Fld'>
                                        <input
                                            type="flatNumber"
                                            value={flatNumber}
                                            onChange={onChangeInputEdit}
                                            placeholder='Enter Flat Number'
                                            required
                                            autoComplete="off"
                                            name='flat_number'
                                        />
                                    </div>
                                </div>
                            </>}
                            {type === "Villa" && <div className='deatails__Fld'>
                                <p>Villa Number</p>
                                <div className='input__Fld'>
                                    <input
                                        type="villaNumber"
                                        value={villaNumber}
                                        onChange={onChangeInputEdit}
                                        placeholder='Enter Villa Number'
                                        required
                                        autoComplete="off"
                                        name='villa_number'
                                    />
                                </div>
                            </div>}
                            {type === "Plot" && <div className='deatails__Fld'>
                                <p>Plot Number</p>
                                <div className='input__Fld'>
                                    <input
                                        type="plotNumber"
                                        value={plotNumber}
                                        onChange={onChangeInputEdit}
                                        placeholder='Enter Plot Number'
                                        required
                                        autoComplete="off"
                                        name='plot_number'
                                    />
                                </div>
                            </div>}
                            <p style={{color:'red'}}>{message}</p>
                        </div>

                        <div className='Btns__container'>
                            <div className='dcrd__Btn'>
                                <button onClick={handleClose}>Discard</button>
                            </div>
                            <div className='add__Btn'>
                                <button type='submit'>Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editproject