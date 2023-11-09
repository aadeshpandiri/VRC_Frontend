import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext, useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function Payroll() {

    const { token } = useContext(sharedContext);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Entries:', entries);

        // var myHeaders = new Headers();
        // myHeaders.append("Authorization", `Bearer ${token}`);
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "project_name": projectName,
        //     "status": status,
        //     "project_type": type,
        //     "tower_number": towerNumber,
        //     "flat_number": flatNumber,
        //     "villa_number": villaNumber,
        //     "plot_number": plotNumber
        // });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        // fetch("https://vrcbackend.onrender.com/project/createNewProject", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         console.log(result)
        //         AddRow(result.data)
        //         handleClose()
        //     })
        //     .catch(error => console.log('error', error));
    };
    // const onChangeInput = (e) => {
    //     console.log(e.target.name)
    //     switch (e.target.name) {
    //         case 'name': setName(e.target.value);
    //             break;
    //         case 'amount': setAmount(e.target.value);
    //             break;
    //     }
    // }

    const [entries, setEntries] = useState([{ name: '', amount: '' }]);

    const addEntry = () => {
        setEntries([...entries, { name: '', amount: '' }]);
    };

    const handleChange = (index, event) => {
        const updatedEntries = [...entries];
        updatedEntries[index][event.target.name] = event.target.value;
        setEntries(updatedEntries);
    };

    return (
        <div className='PayrollCard'>
            <h2>Payroll</h2>
            <form onSubmit={handleSubmit} className='prDeatails__Box'>
                {entries.map((entry, index) => (
                    <div className='prFields__Box' key={index}>
                        <div className='prDeatails__Fld'>
                            <TextField
                                className='nText__Fld'
                                type="text"
                                value={entry.name}
                                onChange={(e) => handleChange(index, e)}
                                placeholder='Enter Name'
                                required
                                autoComplete="off"
                                name='name'
                            />
                            <span className='colon'>:</span>
                            <TextField
                                className='aText__Fld'
                                type="text"
                                value={entry.amount}
                                onChange={(e) => handleChange(index, e)}
                                placeholder='Enter Amount'
                                required
                                autoComplete="off"
                                name='amount'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0V2H4C5.704 2 7.94 3.038 8.72 5H0V7H8.97C8.66 9.61 5.974 11 4 11H0V13.47L10.25 22H13.375L2.562 13H4C7.234 13 10.674 10.61 10.97 7H16V5H10.812C10.51 3.816 9.86 2.804 9 2H16V0H0Z" fill="black" />
                                            </svg>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                ))}
                <div className='payrollAdd__Btn'>
                    <button onClick={addEntry}>Add</button>
                </div>
                <div className='payrollSub__Btn'>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div >
    )
}

export default Payroll