import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext, useState, useEffect } from 'react';
import { MenuItem, Select, Radio, FormControlLabel, FormControl, FormLabel, Autocomplete, TextField } from '@mui/material';
import baseurl from '../data/baseurl'
function EditStatusForm({ handleClose }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen } = useContext(sharedContext);

    const [formData, setFormData] = useState({
        project_name: '',
        project_type: '',
        tower_number: '',
        flat_number: '',
        villa_number: '',
        plot_number: '',
        status: '',
        amount_received: 0,
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
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validate name field
        if (name === 'amount_received') {
            if (!/^\d+$/.test(value)) {
                setErrors({
                    ...errors,
                    [name]: 'Amount should only contain numbers',
                });
            } else {
                setErrors({
                    ...errors,
                    [name]: '',
                });
            }
        }
    };

    const handleAutocompleteChange = (fieldName, newValue) => {
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

        let pid
        switch (formData.project_type) {
            case "Apartment":
                pid = formData.project_name + "_" + formData.project_type + "_" + formData.tower_number + "_" + formData.flat_number;
                break
            case "Villa":
                pid = formData.project_name + "_" + formData.project_type + "_" + formData.villa_number;
                break
            case "Plot":
                pid = formData.project_name + "_" + formData.project_type + "_" + formData.plot_number;
                break
        }

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
                clearFields()
            })
            .catch(error => console.log('error', error));
    };

    return (
        <div className='EditStatusFormCard'>
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
                            <Autocomplete className='auto__Fld'
                                options={["SOLD", "TOKEN", "ADVANCE", "AVAILABLE"]}
                                value={formData.status}
                                onChange={(event, newValue) => handleAutocompleteChange('status', newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Status"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div className='deatails__Fld'>
                            <p>Amount</p>
                            <TextField className='text__Fld'
                                type="number"
                                value={formData.amount_received}
                                onChange={onChangeInput}
                                placeholder='Enter Amount'
                                required
                                // error={Boolean(errors.amount)}
                                // helperText={errors.amount}
                                autoComplete="off"
                                name='amount_received'
                            />
                        </div>
                    </>}
                </div>

                <div className='Btns__container'>
                    <div className='dcrd__Btn' onClick={handleClose}>
                        <button>Discard</button>
                    </div>
                    <div className='add__Btn'>
                        <button type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div >

    )
}

export default EditStatusForm