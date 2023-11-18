import React, { useState } from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import { MenuItem, Select, Autocomplete, TextField } from '@mui/material';
import baseurl from '../data/baseurl'
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast'


function Addproject({ handleClose, AddRow }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen, loader, setLoader } = useContext(sharedContext);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        project_name: '',
        project_type: '',
        tower_number: '',
        flat_number: '',
        villa_number: '',
        plot_number: '',
        status: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(formData);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/project/createNewProject`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == 409) {
                    setMessage(result.message)
                }
                if (result.message == 'Success') {
                    toast.success('Added Project Successfully')
                    AddRow(result.data)
                    clearFields()
                    handleClose()
                }
                setLoader(false)
            })
            .catch(error => {
                console.log('error', error)
                setLoader(false)
            });
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const optionColors = {
        AVAILABLE: '#27ae60',
        SOLD: '#e74c3c',
        TOKEN: '#f39c12',
        ADVANCE: '#3498db',
    };

    const handleAutocompleteChange = (fieldName, newValue) => {
        setFormData({
            ...formData,
            [fieldName]: newValue,
        })
    }

    const clearFields = () => {
        setFormData(
            {
                project_name: '',
                project_type: '',
                tower_number: '',
                flat_number: '',
                villa_number: '',
                plot_number: '',
                status: '',
            }
        );
    }

    const handleDiscardClick = (e) => {
        e.preventDefault(); // Prevents the default form submission
        handleClose(); // Add any other necessary logic for discarding
    };



    const getOptionLabel = (option) => {
        // Return the label for the option
        return option;
    };

    const getOptionStyle = (option) => {
        // Return the style for the option based on the predefined colors
        const color = optionColors[option];
        return {
            color: color || 'black',
        };
    };

    return (
        <div className='AddProject__wrap'>
            <Loader />
            <div className='AddprojectCard'>
                <h2 className='font-bold'>New Project</h2>
                <div>
                    <form onSubmit={handleSubmit} className='deatails__Box' >
                        <div className='fields__Box'>
                            <div className='deatails__Fld'>
                                <p>Project Name</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.project_name}
                                    onChange={onChangeInput}
                                    placeholder='Enter Project Name'
                                    required
                                    autoComplete="off"
                                    name='project_name'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>Project Type</p>
                                <Autocomplete className='auto__Fld'
                                    options={['Apartment', 'Villa', "Plot"]}
                                    value={formData.project_type}
                                    onChange={(event, newValue) => handleAutocompleteChange('project_type', newValue)}
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
                            {formData.project_type !== "" && <div className='deatails__Fld'>
                                <p>Status</p>
                                <Autocomplete
                                    className='auto__Fld'
                                    options={['AVAILABLE', 'SOLD', 'TOKEN', 'ADVANCE']}
                                    value={formData.status}
                                    onChange={(event, newValue) => handleAutocompleteChange('status', newValue)}
                                    getOptionLabel={getOptionLabel}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Project Status"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                    renderOption={(props, option, state) => (
                                        <li {...props} style={{ ...props.style, ...getOptionStyle(option) }}>
                                            {option}
                                        </li>
                                    )}
                                />
                            </div>}
                            {formData.project_type === "Apartment" && <>
                                <div className='deatails__Fld'>
                                    <p>Tower Number</p>
                                    <TextField className='text__Fld'
                                        status="text"
                                        value={formData.tower_number}
                                        onChange={onChangeInput}
                                        placeholder='Enter Tower Number'
                                        required
                                        autoComplete="off"
                                        name='tower_number'
                                    />
                                </div>
                                <div className='deatails__Fld'>
                                    <p>Flat Number</p>
                                    <TextField className='text__Fld'
                                        status="text"
                                        value={formData.flat_number}
                                        onChange={onChangeInput}
                                        placeholder='Enter Flat Number'
                                        required
                                        autoComplete="off"
                                        name='flat_number'
                                    />
                                </div>
                            </>}
                            {formData.project_type === "Villa" && <div className='deatails__Fld'>
                                <p>Villa Number</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.villa_number}
                                    onChange={onChangeInput}
                                    placeholder='Enter Villa Number'
                                    required
                                    autoComplete="off"
                                    name='villa_number'
                                />
                            </div>}
                            {formData.project_type === "Plot" && <div className='deatails__Fld'>
                                <p>Plot Number</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.plot_number}
                                    onChange={onChangeInput}
                                    placeholder='Enter Plot Number'
                                    required
                                    autoComplete="off"
                                    name='plot_number'
                                />
                            </div>}
                        </div>
                        <div style={{ color: 'red' }}>{message}</div>
                        <div className='Btns__container'>
                            <div className='dcrd__Btn' onClick={handleDiscardClick}>
                                <button >Discard</button>
                            </div>
                            <div className='sbt__Btn' type='submit'>
                                <button>Add Project</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Addproject