
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
// import Register from "./Register";
const AddprojectDrawer = ({ anchor, toggleDrawer, isOpen, paper,AddRow ,current,editRow,setEditRow,SaveEditedRow}) => {
    const router = useRouter();
    const [projectName, setProjectName] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [towerNumber, setTowerNumber] = useState('');
    const [flatNumber, setFlatNumber] = useState('');
    const [villaNumber, setVillaNumber] = useState('');
    const [plotNumber, setPlotNumber] = useState('');
   
    // const hangleGotoApartment = () => {
    //     setCurrentStep(2)

    // }
    // const hangleGotoAddproject = () => {
    //     setCurrentStep(1)
    // }
    // const [open, setOpen] = useState(false);
    // const [scroll, setScroll] = React.useState('paper');
    // const [popupContent,setPopupContent]=useState();
    // const handleClickOpen = (e) => {
    //     setOpen(true);
    //     // setScroll('paper');

    //     // console.log(e)
    //     // setPopupContent(e.target.name);
    // };

    const handleClose = (event) => {
        // setOpen(false);
        toggleDrawer(anchor, false, event)
    };

    const descriptionElementRef = React.useRef(null);
    // React.useEffect(() => {
    //     if (open) {
    //         const { current: descriptionElement } = descriptionElementRef;
    //         if (descriptionElement !== null) {
    //             descriptionElement.focus();
    //         }
    //     }
    // }, [open]);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('projectName:', projectName);
        console.log('type:', type);
    };
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
    const onChangeInputEdit=(e)=>{
        setEditRow((prevState) => ({
            ...prevState,
               [e.target.name]: e.target.value,
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
                        <Box
                            // sx={{ width: 600 }}
                            role="presentation"
                            className={current == 1 ? "Addproject-drawer" : "signup-drawer"}
                        // onClick={toggleDrawer(anchor, false)}
                        // onKeyDown={toggleDrawer(anchor, false)}
                        >
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
                                    AddRow={AddRow}/>
                            }
                            {
                                current=='edit'&&
                                <Editproject
                                    projectName={editRow?.project_name}
                                    type={editRow?.project_type}
                                    status={editRow?.status}
                                    towerNumber={editRow?.tower_number}
                                    flatNumber={editRow?.flat_number}
                                    villaNumber={editRow?.villa_number}
                                    plotNumber={editRow?.plot_number}
                                    onChangeInputEdit={onChangeInputEdit}
                                    handleClose={handleClose} 
                                    SaveEditedRow={SaveEditedRow}
                                />
                            }

                        </Box>

                    </DialogContentText>
                </div>
            </DialogContent>



        </Dialog>

    );
}
export default AddprojectDrawer;