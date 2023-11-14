import React,{useState} from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import { MenuItem, Select } from '@mui/material';
import baseurl from '../data/baseurl'
import Loader from './Loader';
function Editproject({ editRow, onChangeInputEdit, handleClose,SaveEditedRow }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen,loader,setLoader } = useContext(sharedContext);
    const [message,setMessage]=useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "project_id":editRow?.project_id,
            "pid":editRow?.pid,
            "project_name":editRow?.project_name,
            "status":editRow?.status,  //AVAILABLE , TOKEN , ADVANCE , SOLD
            "project_type":editRow?.project_type, // Apartment , Villa , Plot
            "tower_number":editRow?.tower_number,
            "flat_number":editRow?.flat_number,
            "villa_number":editRow?.villa_number,
            "plot_number":editRow?.plot_number
            
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
                if(result.status==409){
                    setMessage(result.message)
                }
              
                if(result.message=='Success'){
                    SaveEditedRow(result.data)
                    handleClose()
                }
                setLoader(false)
            })
            .catch(error => {console.log('error', error)
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

    return (
        // <div className='flex flex-col p-10'>
        //     <TextField placeholder='Email' onChange={onChangeInput} name='email' />
        //     <TextField type='password' name='password'/>
        //     </div>
        <div className='AddProject__wrap'>
            <Loader/>
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
                                        value={editRow?.project_name}
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
                                        value={editRow?.project_type}
                                        onChange={onChangeInputEdit}
                                        required
                                        autoComplete="off"
                                        name='project_type'
                                    >
                                        <MenuItem value="" disabled>Type</MenuItem>
                                        <MenuItem value="Apartment">Apartment</MenuItem>
                                        <MenuItem value="Villa">Villa</MenuItem>
                                        <MenuItem value="Plot">Plot</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            {editRow?.type !== "" && <div className='deatails__Fld'>
                                <p>Status</p>
                                <div className='input__Fld'>
                                    <Select style={inputThemObj}
                                        value={editRow?.status}
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
                            {editRow?.project_type === "Apartment" && <>
                                <div className='deatails__Fld'>
                                    <p>Tower Number</p>
                                    <div className='input__Fld'>
                                        <input
                                            
                                            value={editRow?.tower_number}
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
                                         
                                            value={editRow?.flat_number}
                                            onChange={onChangeInputEdit}
                                            placeholder='Enter Flat Number'
                                            required
                                            autoComplete="off"
                                            name='flat_number'
                                        />
                                    </div>
                                </div>
                            </>}
                            {editRow?.project_type === "Villa" && <div className='deatails__Fld'>
                                <p>Villa Number</p>
                                <div className='input__Fld'>
                                    <input
                                        value={editRow?.villa_number}
                                        onChange={onChangeInputEdit}
                                        placeholder='Enter Villa Number'
                                        required
                                        autoComplete="off"
                                        name='villa_number'
                                    />
                                </div>
                            </div>}
                            {editRow?.project_type === "Plot" && <div className='deatails__Fld'>
                                <p>Plot Number</p>
                                <div className='input__Fld'>
                                    <input
                                        
                                        value={editRow?.plot_number}
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
                            {/* <div className='dcrd__Btn'>
                                <button onClick={handleClose}>Discard</button>
                            </div> */}
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