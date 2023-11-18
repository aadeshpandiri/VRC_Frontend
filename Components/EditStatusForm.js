import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext, useState, useEffect } from 'react';
import { MenuItem, Select, Radio, FormControlLabel, FormControl, FormLabel, Autocomplete, TextField } from '@mui/material';
import baseurl from '../data/baseurl'
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast'


function EditStatusForm({ handleClose }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen, setLoader } = useContext(sharedContext);

    const [formData, setFormData] = useState({
        project_name: '',
        project_type: '',
        tower_number: '',
        flat_number: '',
        villa_number: '',
        plot_number: '',
        status: '',
        amount_received: '',
    });

    const [availablePrns, setAvailablePrns] = useState([])
    const [availablePts, setAvailablePts] = useState([])
    const [availableTns, setAvailableTns] = useState([])
    const [availableFns, setAvailableFns] = useState([])
    const [availableVns, setAvailableVns] = useState([])
    const [availablePns, setAvailablePns] = useState([])
    const [errors, setErrors] = useState({});

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validate name field
        if (name === 'amount_received') {
            if (!/^\d+$/.test(value)) {
                setErrors({
                    ...errors,
                    [name]: 'only numbers',
                });
            } else {
                setErrors({
                    ...errors,
                    [name]: '',
                });
            }
            if (value === '') {
                setErrors({})
            }
        }
    };

    const handleAutocompleteChange = (fieldName, newValue) => {
        console.log(fieldName, newValue)
        setFormData({
            ...formData,
            [fieldName]: newValue,
        });

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        if (fieldName === 'project_name') {
            fetch(`${baseurl?.url}/project/getFilteredProjectTypes/${newValue}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    const project_types = result.data
                        .map(x => x.project_type);
                    setAvailablePts(project_types);
                })
                .catch(error => console.log('error:', error.message));
        }

        if (fieldName === 'project_type') {
            if (newValue === "Apartment") {
                fetch(`${baseurl?.url}/project/getFilteredProjectTowerNumbers/${formData.project_name}/${newValue}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        const tower_numbers = result.data
                            .map(x => x.tower_number);
                        setAvailableTns(tower_numbers);
                    })
                    .catch(error => console.log('error:', error.message));
            }
            else if (newValue === "Villa") {
                fetch(`${baseurl?.url}/project/getFilteredProjectVillaNumbers/${formData.project_name}/${newValue}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        const villa_numbers = result.data
                            .map(x => x.villa_number);
                        setAvailableVns(villa_numbers);
                    })
                    .catch(error => console.log('error:', error.message));
            }
            else if (newValue === "Plot") {
                fetch(`${baseurl?.url}/project/getFilteredProjectPlotNumbers/${formData.project_name}/${newValue}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        const plot_numbers = result.data
                            .map(x => x.plot_number);
                        setAvailablePns(plot_numbers);
                    })
                    .catch(error => console.log('error:', error.message));
            }
        }

        if (fieldName === 'tower_number') {
            fetch(`${baseurl?.url}/project/getFilteredProjectFlatNumbers/${formData.project_name}/${formData.project_type}/${newValue}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    const flat_numbers = result.data
                        .map(x => x.flat_number);
                    setAvailableFns(flat_numbers);
                })
                .catch(error => console.log('error:', error.message));
        }
    };

    const clearFields = () => {
        setFormData({
            project_name: '',
            project_type: '',
            tower_number: '',
            flat_number: '',
            villa_number: '',
            plot_number: '',
            status: '',
            amount_received: 0,
        })
        setAvailablePrns([])
        setAvailablePts([])
        setAvailableTns([])
        setAvailableFns([])
        setAvailableVns([])
        setAvailablePns([])
    }


    useEffect(() => {
        if (token) {
            console.log("API useEffect called")
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${baseurl?.url}/project/getProjectNames`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    const project_names = result.data
                        .map(x => x.project_name);
                    setAvailablePrns(project_names);
                })
                .catch(error => console.log('error:', error.message));
        }
    }, [formData.project_type, token])

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

        fetch(`${baseurl?.url}/project/changeProjectStatus`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                toast.success('Edited Project Status Successfully')
                clearFields()
                handleClose()
                setLoader(false)
            })
            .catch(error => {
                console.log('error', error)
                setLoader(false)
            }
            );
    };

    const optionColors = {
        AVAILABLE: '#27ae60',
        SOLD: '#e74c3c',
        TOKEN: '#f39c12',
        ADVANCE: '#3498db',
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
        <div className='EditStatusFormCard'>
            <Loader />
            <h2>Edit Project Status</h2>
            <form onSubmit={handleSubmit} className='deatails__Box' >
                <div className='fields__Box'>
                    <div div className='deatails__Fld'>
                        <p>Project Name</p>
                        <Autocomplete className='auto__Fld'
                            options={availablePrns}
                            value={formData.project_name}
                            onChange={(event, newValue) => handleAutocompleteChange('project_name', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Project Name"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <div className='deatails__Fld'>
                        <p>Project Type</p>
                        <Autocomplete className='auto__Fld'
                            options={availablePts}
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
                    {formData.project_type === "Apartment" && <>
                        <div className='deatails__Fld'>
                            <p>Tower Number</p>
                            <Autocomplete className='auto__Fld'
                                options={availableTns}
                                value={formData.tower_number}
                                onChange={(event, newValue) => handleAutocompleteChange('tower_number', newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Tower Number"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div className='deatails__Fld'>
                            <p>Flat Number</p>
                            <Autocomplete className='auto__Fld'
                                options={availableFns}
                                value={formData.flat_number}
                                onChange={(event, newValue) => handleAutocompleteChange('flat_number', newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Flat Number"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                    </>}
                    {formData.project_type === "Villa" &&
                        <div className='deatails__Fld'>
                            <p>Villa Number</p>
                            <Autocomplete className='auto__Fld'
                                options={availableVns}
                                value={formData.villa_number}
                                onChange={(event, newValue) => handleAutocompleteChange('villa_number', newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Villa Number"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </div>}
                    {formData.project_type === "Plot" &&
                        <div className='deatails__Fld'>
                            <p>Plot Number</p>
                            <Autocomplete className='auto__Fld'
                                options={availablePns}
                                value={formData.plot_number}
                                onChange={(event, newValue) => handleAutocompleteChange('plot_number', newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Villa Number"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </div>}
                    {formData.project_type && <>
                        <div className='deatails__Fld'>
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
                        </div>
                        <div className='deatails__Fld'>
                            <p>Amount</p>
                            <TextField className='text__Fld'
                                type="text"
                                value={formData.amount_received}
                                onChange={onChangeInput}
                                placeholder='Enter Amount'
                                required
                                error={Boolean(errors.amount_received)}
                                helperText={errors.amount_received}
                                autoComplete="off"
                                name='amount_received'
                            />
                        </div>
                    </>}
                </div>

                <div className='Btns__container'>
                    {/* <div className='dcrd__Btn' >
                            <button onClick={handleClose}>Discard</button>
                        </div> */}
                    <div className='add__Btn'>
                        <button type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div >

    )
}

export default EditStatusForm