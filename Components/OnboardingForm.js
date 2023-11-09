import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext, useState, useEffect } from 'react';
import { MenuItem, Select, Radio, FormControlLabel, FormControl, FormLabel, Autocomplete, TextField } from '@mui/material';
import baseurl from '../data/baseurl'
function OnboardingForm() {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen } = useContext(sharedContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('clientName:', clientName);
        // console.log('clientPhon:', clientPhon);
        // console.log('projectName:', projectName);
        // console.log('projectType:', projectType);
        // console.log('towerNumber:', towerNumber);
        // console.log('faltNumber:', flatNumber);
        // console.log('villaNumber:', villaNumber);
        // console.log('plotNumber:', plotNumber);
        // console.log('salespName:', salespName);
        // console.log('type:', type);
        // console.log('amount:', amount);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "project_name": projectName,
            "status": type,
            "project_type": projectType,
            "tower_number": towerNumber,
            "flat_number": flatNumber,
            "villa_number": villaNumber,
            "plot_number": plotNumber,
            "client_name": clientName,
            "client_phone": clientPhon,
            "sales_person": salespName,
            "amount_received": amount
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl}/receipt/createReceipt`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));
    };

    const [clientName, setClientName] = useState('');
    const [clientPhon, setClientPhon] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectType, setProjectType] = useState('');
    const [towerNumber, setTowerNumber] = useState('');
    const [flatNumber, setFlatNumber] = useState('');
    const [villaNumber, setVillaNumber] = useState('');
    const [plotNumber, setPlotNumber] = useState('');
    const [salespName, setSalespName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');


    const onChangeInput = (e) => {
        console.log(e.target.name)
        switch (e.target.name) {
            case 'clientName': setClientName(e.target.value);
                break;
            case 'clientPhon': setClientPhon(e.target.value);
                break;
            case 'salespName': setSalespName(e.target.value);
                break;
            case 'type': setType(e.target.value);
                break;
            case 'amount': setAmount(e.target.value);
                break;
        }
    }

    const handleAutocompleteChange = (fieldName, newValue) => {
        switch (fieldName) {
            case 'projectType': setProjectType(newValue);
                break;
            case 'projectName': setProjectName(newValue);
                break;
            case 'towerNumber': setTowerNumber(newValue);
                break;
            case 'flatNumber': setFlatNumber(newValue);
                break;
            case 'villaNumber': setVillaNumber(newValue);
                break;
            case 'plotNumber': setPlotNumber(newValue);
                break;
        }
    };

    const [availableData, setAvailableData] = useState([])
    const [availablePrns, setAvailablePrns] = useState([])
    const [availableTns, setAvailableTns] = useState([])
    const [availableFns, setAvailableFns] = useState([])
    const [availableVns, setAvailableVns] = useState([])
    const [availablePns, setAvailablePns] = useState([])

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

            fetch(`${baseurl}/project/getProjects`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    const availableProjectNames = result.data
                        .filter(x => x.status === "AVAILABLE" && x.project_type === projectType)
                        .map(x => x.project_name);
                    setAvailablePrns(availableProjectNames);
                    setAvailableData(result.data);
                })
                .catch(error => console.log('error:', error.message));
        }
    }, [projectType, token])

    useEffect(() => {
        console.log("tower_number useEffect called")
        const availableTowerNumbers = availableData
            .filter(item => item.project_name === projectName)
            .map(item => item.tower_number);
        setAvailableTns(availableTowerNumbers);
    }, [projectName, availableData])

    useEffect(() => {
        console.log("flat_number useEffect called")
        const availableFlatNumbers = availableData
            .filter(item => item.project_name === projectName && item.tower_number === towerNumber)
            .map(item => item.flat_number);
        setAvailableFns(availableFlatNumbers);
    }, [towerNumber, projectName, availableData])

    useEffect(() => {
        console.log("villa_number useEffect called")
        const availableVillaNumbers = availableData
            .filter(item => item.project_name === projectName)
            .map(item => item.villa_number);
        setAvailableVns(availableVillaNumbers);
    }, [projectName, availableData])

    useEffect(() => {
        console.log("plot_number useEffect called")
        const availablePlotNumbers = availableData
            .filter(item => item.project_name === projectName)
            .map(item => item.plot_number);
        setAvailablePns(availablePlotNumbers);
    }, [projectName, availableData])

    return (
        <div className='OnboardingFormWraper'>
            <div className='OnboardingFormCard'>
                <h2>Onboarding Form</h2>
                <form onSubmit={handleSubmit} className='deatails__Box' >
                    <div className='fields__Box'>
                        <div className='deatails__Fld'>{/*class="flex items-center gap-10 flex-wrap"*/}
                            <p>Client Name</p>{/*class="w-40 text-gray-700 font-medium text-lg whitespace-nowrap"*/}
                            <TextField className='text__Fld'
                                type="text"
                                value={clientName}
                                onChange={onChangeInput}
                                placeholder='Enter Client Name'
                                required
                                autoComplete="off"
                                name='clientName'
                            />
                        </div>
                        <div className='deatails__Fld'>
                            <p>Client Phone</p>
                            <TextField className='text__Fld'
                                type="text"
                                value={clientPhon}
                                onChange={onChangeInput}
                                placeholder='Enter Phone Number'
                                required
                                autoComplete="off"
                                name='clientPhon'
                            />
                        </div>
                        <div className='deatails__Fld'>
                            <p>Project Type</p>
                            <Autocomplete className='auto__Fld'
                                options={["Apartment", "Villa", "Plot"]}
                                value={projectType}
                                onChange={(event, newValue) => handleAutocompleteChange('projectType', newValue)}
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
                        {projectType !== "" && projectType !== null &&
                            <div div className='deatails__Fld'>
                                <p>Project Name</p>
                                {/* <Select className='input__Fld'
                                    value={projectName}
                                    onChange={onChangeInput}
                                    required
                                    autoComplete="off"
                                    name='projectName'
                                >
                                    <MenuItem value="" disabled>Select Project Name</MenuItem>
                                    {availablePrns.map((name) => (
                                        <MenuItem key={name} value={name}>{name}</MenuItem>
                                    ))}
                                </Select> */}
                                <Autocomplete className='auto__Fld'
                                    options={availablePrns}
                                    value={projectName}
                                    onChange={(event, newValue) => handleAutocompleteChange('projectName', newValue)}
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
                        {projectType === "Apartment" && <>
                            <div className='deatails__Fld'>
                                <p>Tower Number</p>
                                <Autocomplete className='auto__Fld'
                                    options={availableTns}
                                    value={towerNumber}
                                    onChange={(event, newValue) => handleAutocompleteChange('towerNumber', newValue)}
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
                                    value={flatNumber}
                                    onChange={(event, newValue) => handleAutocompleteChange('flatNumber', newValue)}
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
                        {projectType === "Villa" && <div className='deatails__Fld'>
                            <p>Villa Number</p>
                            <Autocomplete className='auto__Fld'
                                options={availableVns}
                                value={villaNumber}
                                onChange={(event, newValue) => handleAutocompleteChange('villaNumber', newValue)}
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
                        {projectType === "Plot" && <div className='deatails__Fld'>
                            <p>Plot Number</p>
                            <Autocomplete className='auto__Fld'
                                options={availablePns}
                                value={plotNumber}
                                onChange={(event, newValue) => handleAutocompleteChange('plotNumber', newValue)}
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
                        {projectType && <>
                            <div className='deatails__Fld'>
                                <p>Sales Person Name</p>
                                <TextField className='text__Fld'
                                    type="text"
                                    value={salespName}
                                    onChange={onChangeInput}
                                    placeholder='Enter Sales Person Name'
                                    required
                                    autoComplete="off"
                                    name='salespName'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>Type</p>
                                <div>
                                    <FormControlLabel value="end" control={<Radio
                                        checked={type === 'TOKEN'}
                                        onChange={onChangeInput}
                                        value="TOKEN"
                                        name="type"
                                        inputProps={{ 'aria-label': 'TOKEN' }}
                                        labelPlacement="end"
                                    />} label="Token" />
                                    <FormControlLabel value="end" control={<Radio
                                        checked={type === 'ADVANCE'}
                                        onChange={onChangeInput}
                                        value="ADVANCE"
                                        name="type"
                                        inputProps={{ 'aria-label': 'ADVANCE' }}
                                        labelPlacement="end"
                                    />} label="Advance" />
                                </div>


                            </div>
                            <div className='deatails__Fld'>
                                <p>Amount</p>
                                <TextField className='text__Fld'
                                    type="text"
                                    value={amount}
                                    onChange={onChangeInput}
                                    placeholder='Enter Amount'
                                    required
                                    autoComplete="off"
                                    name='amount'
                                />
                            </div>
                        </>}
                    </div>

                    <div className='Btns__container'>
                        <div className='dcrd__Btn'>
                            <button>Discard</button>
                        </div>
                        <div className='add__Btn'>
                            <button type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >

    )
}

export default OnboardingForm