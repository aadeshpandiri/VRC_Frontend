import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext, useState, useEffect } from 'react';
import { MenuItem, Select, Radio, FormControlLabel, FormControl, FormLabel, Autocomplete, TextField } from '@mui/material';
import baseurl from '../data/baseurl'
import Loader from './Loader';
function OnboardingForm() {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen, loader, setLoader } = useContext(sharedContext);
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        client_name: '',
        client_phone: '',
        project_name: '',
        project_type: '',
        tower_number: '',
        flat_number: '',
        villa_number: '',
        plot_number: '',
        sales_person: '',
        status: '',
        amount_received: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

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

        fetch(`${baseurl?.url}/receipt/createReceipt`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == 409) {
                    setError(result.message)
                }
                else {
                    clearFields()
                }

            })
            .catch(error => console.log('error', error));
    };


    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }


    const handleAutocompleteChange = (fieldName, newValue) => {
        setFormData({
            ...formData,
            [fieldName]: newValue,
        })
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
        };
    }

    const [availablePrns, setAvailablePrns] = useState([])
    const [availablePts, setAvailablePts] = useState([])
    const [availableTns, setAvailableTns] = useState([])
    const [availableFns, setAvailableFns] = useState([])
    const [availableVns, setAvailableVns] = useState([])
    const [availablePns, setAvailablePns] = useState([])

    const clearFields = () => {
        setFormData(
            {
                client_name: '',
                client_phone: '',
                project_name: '',
                project_type: '',
                tower_number: '',
                flat_number: '',
                villa_number: '',
                plot_number: '',
                sales_person: '',
                status: '',
                amount_received: '',
            }
        );
        setError('')
        setAvailablePrns([])
        setAvailablePts([])
        setAvailableTns([])
        setAvailableFns([])
        setAvailableVns([])
        setAvailablePns([])
    }


    useEffect(() => {
        if (token) {
            setLoader(true)
            console.log("API useEffect called")
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${baseurl?.url}/project/getAvailableProjectNames`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    const availableproject_names = result.data
                        .map(x => x.project_name);
                    console.log(availableproject_names)
                    setAvailablePrns(availableproject_names)
                    setLoader(false);
                })
                .catch(error => {
                    console.log('error:', error.message)
                    setLoader(false)
                });
        }
    }, [formData.project_type, token, setLoader])


    return (
        <div className='OnboardingFormCard'>
            <Loader />
            <h2>Onboarding Form</h2>
            <form onSubmit={handleSubmit} className='deatails__Box' >
                <div className='fields__Box'>
                    <div className='deatails__Fld'>
                        <p>Client Name</p>
                        <TextField className='text__Fld'
                            status="text"
                            value={formData.client_name}
                            onChange={onChangeInput}
                            placeholder='Enter Client Name'
                            required
                            autoComplete="off"
                            name='client_name'
                        />
                    </div>
                    <div className='deatails__Fld'>
                        <p>Client Phone</p>
                        <TextField className='text__Fld'
                            status="text"
                            value={formData.client_phone}
                            onChange={onChangeInput}
                            placeholder='Enter Phone Number'
                            required
                            autoComplete="off"
                            name='client_phone'
                        />
                    </div>
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
                    {formData.project_name !== "" && formData.project_name !== null &&
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
                    }


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
                    {formData.project_type === "Villa" && <div className='deatails__Fld'>
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
                    {formData.project_type === "Plot" && <div className='deatails__Fld'>
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
                            <p>Sales Person Name</p>
                            <TextField className='text__Fld'
                                status="text"
                                value={formData.sales_person}
                                onChange={onChangeInput}
                                placeholder='Enter Sales Person Name'
                                required
                                autoComplete="off"
                                name='sales_person'
                            />
                        </div>
                        <div className='deatails__Fld'>
                            <p>status</p>
                            <div>
                                <FormControlLabel value="end" control={<Radio
                                    checked={formData.status === 'TOKEN'}
                                    onChange={onChangeInput}
                                    value="TOKEN"
                                    name="status"
                                    inputProps={{ 'aria-label': 'TOKEN' }}
                                    labelPlacement="end"
                                />} label="Token" />
                                <FormControlLabel value="end" control={<Radio
                                    checked={formData.status === 'ADVANCE'}
                                    onChange={onChangeInput}
                                    value="ADVANCE"
                                    name="status"
                                    inputProps={{ 'aria-label': 'ADVANCE' }}
                                    labelPlacement="end"
                                />} label="Advance" />
                            </div>
                        </div>
                        <div className='deatails__Fld'>
                            <p>Amount</p>
                            <TextField className='text__Fld'
                                status="text"
                                value={formData.amount_received}
                                onChange={onChangeInput}
                                placeholder='Enter amount_received'
                                required
                                autoComplete="off"
                                name='amount_received'
                            />
                        </div>
                    </>}
                </div>
                <div >
                    <span style={{ color: 'red' }}>{error}</span>
                </div>
                <div className='Btns__container'>
                    <div className='dcrd__Btn' onClick={clearFields}>
                        <button>Discard</button>
                    </div>
                    <div className='sbt__Btn'>
                        <button status='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default OnboardingForm