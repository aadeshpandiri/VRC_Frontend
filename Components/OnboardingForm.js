import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext, useState, useEffect } from 'react';
import { MenuItem, Select, Radio, FormControlLabel, FormControl, FormLabel, Autocomplete, TextField } from '@mui/material';
import baseurl from '../data/baseurl'
import Loader from './Loader';
function OnboardingForm() {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen,loader,setLoader } = useContext(sharedContext);

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
        myHeaders.append("Content-status", "application/json");

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
                if(result.status==500){

                }
                else{
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
    };

    const [availableData, setAvailableData] = useState([])
    const [availablePrns, setAvailablePrns] = useState([])
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

            fetch(`${baseurl?.url}/project/getProjects`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    const availableproject_names = result.data
                        .filter(x => x.status === "AVAILABLE" && x.project_type === formData.project_type)
                        .map(x => x.project_name);
                        console.log(availableproject_names)
                    setAvailablePrns(availableproject_names);

                    const availableProjects = result.data.filter(x => x.status === "AVAILABLE")
                    setAvailableData(availableProjects);
                setLoader(false);
                })
                .catch(error => {console.log('error:', error.message)
            setLoader(false)
        });
        }
    }, [formData.project_type, token])

    useEffect(() => {
    setLoader(true)
        console.log("tower_number useEffect called")
        const availabletower_numbers = availableData
            .filter(item => item.project_name === formData.project_name)
            .map(item => item.tower_number);
        setAvailableTns(availabletower_numbers);
    setLoader(false)
    }, [formData.project_name, availableData])

    useEffect(() => {
    setLoader(true)
        console.log("flat_number useEffect called")
        const availableflat_numbers = availableData
            .filter(item => item.project_name === formData.project_name && item.tower_number === formData.tower_number)
            .map(item => item.flat_number);
        setAvailableFns(availableflat_numbers);
    setLoader(false)
    }, [formData.tower_number, formData.project_name, availableData])

    useEffect(() => {
    setLoader(true)
        console.log("villa_number useEffect called")
        const availablevilla_numbers = availableData
            .filter(item => item.project_name === formData.project_name)
            .map(item => item.villa_number);
        setAvailableVns(availablevilla_numbers);
    setLoader(false)
    }, [formData.project_name, availableData])

    useEffect(() => {
    setLoader(true)
        console.log("plot_number useEffect called")
        const availableplot_numbers = availableData
            .filter(item => item.project_name === formData.project_name)
            .map(item => item.plot_number);
        setAvailablePns(availableplot_numbers);
    setLoader(false)
    }, [formData.project_name, availableData])

    return (
        // <div className='OnboardingFormWraper'>
            <div className='OnboardingFormCard'>
            <Loader/>
                <h2>Onboarding Form</h2>
                <form onSubmit={handleSubmit} className='deatails__Box' >
                    <div className='fields__Box'>
                        <div className='deatails__Fld'>{/*class="flex items-center gap-10 flex-wrap"*/}
                            <p>Client Name</p>{/*class="w-40 text-gray-700 font-medium text-lg whitespace-nowrap"*/}
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
                        <div className='deatails__Fld'>
                            <p>Project Type</p>
                            <Autocomplete className='auto__Fld'
                                options={["Apartment", "Villa", "Plot"]}
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
                        {formData.project_type !== "" && formData.project_type !== null &&
                            <div div className='deatails__Fld'>
                                {console.log("project_type:",formData.project_type)}
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
        // </div >

    )
}

export default OnboardingForm