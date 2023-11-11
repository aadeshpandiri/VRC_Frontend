
import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { SwipeableDrawer } from "@mui/material";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
// import Login from "./Login";
// import Signup from "./Signup";
import ClearIcon from "@mui/icons-material/Clear";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import Addproject from "./Addproject";
import Editproject from "./Editproject";
import ShowReceipt from "./ShowReceipt";
// import Register from "./Register";
const AddprojectDrawer = ({ anchor, toggleDrawer, isOpen, paper, AddRow, current, editRow, setEditRow, SaveEditedRow, data, receiptsList, setReceiptsList }) => {
    const router = useRouter();
    const [projectName, setProjectName] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [towerNumber, setTowerNumber] = useState('');
    const [flatNumber, setFlatNumber] = useState('');
    const [villaNumber, setVillaNumber] = useState('');
    const [plotNumber, setPlotNumber] = useState('');



    const handleClose = (event) => {
        // setOpen(false);
        toggleDrawer(anchor, false, event)
    };

    const clearFields = () => {
        setProjectName("");
        setType("");
        setStatus("");
        setTowerNumber("");
        setFlatNumber("");
        setVillaNumber("");
        setPlotNumber("");
    }

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpen]);

    const onChangeInput = (e) => {
        console.log(e.target.checked)
        switch (e.target.name) {
            case 'project_name': setProjectName(e.target.value);
                break;
            case 'type': setType(e.target.value);
                break;
            case 'status': setStatus(e.target.value);
                break;
            case 'tower_number': setTowerNumber(e.target.value);
                break;
            case 'flat_number': setFlatNumber(e.target.value);
                break;
            case 'villa_number': setVillaNumber(e.target.value);
                break;
            case 'plot_number': setPlotNumber(e.target.value);
                break;
        }
    }

    const onChangeInputEdit = (e) => {
        console.log(editRow,e.target.name,e.target.value)
        setEditRow((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <Dialog
            open={isOpen}
            onClose={(event) => toggleDrawer(anchor, false, event)}
            // scroll={paper}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            PaperProps={{ style: { borderRadius: '20px' } }}
        >

            <DialogContent dividers={true} sx={{ padding: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        sx={{ padding: '28px' }}
                    >
                        <Box role="presentation">
                            {
                                current == 'add' &&
                                <Addproject
                                    projectName={projectName}
                                    type={type}
                                    status={status}
                                    towerNumber={towerNumber}
                                    flatNumber={flatNumber}
                                    villaNumber={villaNumber}
                                    plotNumber={plotNumber}
                                    onChangeInput={onChangeInput}
                                    handleClose={handleClose}
                                    AddRow={AddRow}
                                    clearFields={clearFields}
                                />
                            }
                            {
                                current == 'edit' &&
                                <Editproject
                                    editRow={editRow}
                                    onChangeInputEdit={onChangeInputEdit}
                                    handleClose={handleClose}
                                    SaveEditedRow={SaveEditedRow}
                                />
                            }
                            {
                                current == 'sReceipt' &&
                                <ShowReceipt data={data} receiptsList={receiptsList}
                                    setReceiptsList={setReceiptsList} handleClose={handleClose} />
                            }

                        </Box>

                    </DialogContentText>
                </div>
            </DialogContent>



        </Dialog>

    );
}
export default AddprojectDrawer;