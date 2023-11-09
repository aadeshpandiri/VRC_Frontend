import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
// import { FormControlLabel, IconButton } from '@material-ui/core';
import { Button, MenuItem, Select } from '@mui/material';
// import { DataGrid } from "@material-ui/data-grid";
// import EditIcon from '@material-ui/icons/Edit';
// import { blue } from '@material-ui/core/colors';
import { useContext } from 'react';
import sharedContext from '../context/SharedContext';
import AddprojectDrawer from './AddprojectDrawer';
import { Edit } from '@mui/icons-material';
import OnboardingForm from './OnboardingForm';
import ReceiptDrawer from './ReceiptDrawer';
import Payroll from './Payroll';
import Loader from './Loader';
import baseurl from '../data/baseurl'

const MatEdit = ({ index, setCurrent, setOpenDrawer, setEditRow }) => {

  const handleEditClick = () => {
    // some action
    console.log(index)
    setEditRow(index)
    setOpenDrawer(true)
    setCurrent('edit')
  }
  return <div onClick={handleEditClick}>
    <Edit />
  </div>

};


const Main = () => {
  const [current, setCurrent] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');

  const columns = [
    {
      field: 'project_id',
      headerName: 'Project ID',
      width: 160,
    },
    {
      field: 'project_name',
      headerName: 'Project Name',
      width: 150,
      editable: true,
    },
    {
      field: 'project_type',
      headerName: 'Project Type',
      width: 150,
      editable: true,
    },
    {
      field: 'tower_number',
      headerName: 'Tower Number',
      width: 150,
      editable: true,
    },
    {
      field: 'flat_number',
      headerName: 'Flat Number',
      type: 'number',
      width: 110,
      editable: true,
    }, {
      field: 'status',
      headerName: 'Status',
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
            <MatEdit index={params.row} setCurrent={setCurrent} setOpenDrawer={setOpenDrawer} setEditRow={setEditRow} />
          </div>
        );
      }
    }
  ];

  const [rows, setRows] = useState([])
  const [editRow, setEditRow] = useState();

  const handleLogout = () => {
    sessionStorage.clear();
    setToken(null)
  }

  const { token, setToken, loader, setLoader, userRole } = useContext(sharedContext);
  useEffect(() => {
    if (token) {
      setLoader(true)
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
          if (result.status == 401 || result.message == 'Token Invalid/Expired') {
            handleLogout();
          }
          else {
            console.log(result.data)
            setRows(result.data)
          }
          setLoader(false)
        })
        .catch(error => {
          console.log("error:", error.message)
          setLoader(false)
        });
    }
  }, [token])

  const [isAddProjectDrawerOpen, setOpenAddProjectDrawer] = useState(false);
  const [isReceiptDrawerOpen, setOpenReceiptDrawer] = useState(false);
  const toggleAddProjectDrawer = (anchor, open, event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenAddProjectDrawer(open);
  };

  const toggleReceiptDrawer = (anchor, open, event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenReceiptDrawer(open);
    setOpenDrawer(open);

    if (open) {
      setCurrent(event.target.name)
    }
  }

  const AddRow = (item) => {
    setRows([...rows, item])
  }

  const SaveEditedRow = (item) => {
    console.log(item)
  }

  return (
    <div className="p-4 mt-20 bg-slate-50">
      {/* Your Data Grid Table */}
      <Loader />
      <AddprojectDrawer
        anchor="right"
        toggleDrawer={toggleAddProjectDrawer}
        isOpen={isAddProjectDrawerOpen}
        AddRow={AddRow}
        current="add"
      />
      <ReceiptDrawer
        anchor="right"
        toggleDrawer={toggleReceiptDrawer}
        isOpen={isReceiptDrawerOpen}
      />
      <div>
        {token &&
          <>
            <Button color="primary"
              variant="outlined"
              onClick={(event) => toggleAddProjectDrawer('right', true, event)}
            >Add Project
            </Button>
            <Button color='secondary'
              variant="outlined"
              onClick={(event) => toggleReceiptDrawer('right', true, event)}
            >Show Receipt
            </Button>
          </>}
      </div>
      <Box sx={{ width: '100%', height: '80vh' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          getRowId={(row) => row.project_id}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        {/* <OnboardingForm />
        {/* <Payroll /> */}
      </Box>
    </div>
  );
};

export default Main;