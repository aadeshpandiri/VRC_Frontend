import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Button, MenuItem, Select } from '@mui/material';
import { useContext } from 'react';
import sharedContext from '../context/SharedContext';
import AddprojectDrawer from './AddprojectDrawer';
import { Edit } from '@mui/icons-material';
import OnboardingForm from './OnboardingForm';
import Payroll from './Payroll';
import Loader from './Loader';
import baseurl from '../data/baseurl'
const MatEdit = ({ index, setCurrent, setOpenAddProjectDrawer, setEditRow }) => {

  const handleEditClick = () => {
    // some action
    console.log(index)
    setEditRow(index)
    setOpenAddProjectDrawer(true)
    setCurrent('edit')
  }

  return <div onClick={handleEditClick} name='edit'>
    <Edit />
  </div>

};
const Main = () => {
  const [current, setCurrent] = useState('');
  // const [openDrawer, setOpenDrawer] = useState(false)

  const { token, setToken, loader, setLoader, userRole } = useContext(sharedContext);

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
    },
    {
      field: 'villa_number',
      headerName: 'Villa Number',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'plot_number',
      headerName: 'Plot Number',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => {
        const status = params.value;
        let color = 'black'; // Default color
        switch (status) {
          case 'AVAILABLE':
            color = 'green';
            break;
          case 'SOLD':
            color = 'red';
            break;
          case 'TOKEN':
            color = 'yellow';
            break;
          case 'ADVANCE':
            color = 'blue';
            break;
          default:
            color = 'black';
        }
        return <div style={{ 'color': color }}>{status}</div>
      },
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
            <MatEdit index={params.row} setCurrent={setCurrent} setOpenAddProjectDrawer={setOpenAddProjectDrawer} setEditRow={setEditRow} />
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
            if (userRole === "SALES") {
              const updatedList = result.data.filter(Item => Item.status === "AVAILABLE");
              // Update the state with the updated list.
              setRows(updatedList);
            }
            else {
              setRows(result.data)
            }
          }
          setLoader(false)
        })
        .catch(error => {
          setLoader(false)
        });
    }
  }, [token])

  const [isAddProjectDrawerOpen, setOpenAddProjectDrawer] = useState(false);
  const toggleAddProjectDrawer = (anchor, open, event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (!open) {
      setOpenAddProjectDrawer(open)
    }
    if (event.target.name === "add") {
      setCurrent('add')
      setOpenAddProjectDrawer(open);
    }
    else if (event.target.name === "sReceipt") {
      setCurrent('sReceipt')
      setOpenAddProjectDrawer(open);
      // setOpenDrawer(open);
    }
    else if (event.target.name === 'edit') {
      setCurrent('edit');
      setOpenAddProjectDrawer(open);
    }
    else if (event.target.name === 'editStatus') {
      setCurrent('editStatus');
      setOpenAddProjectDrawer(open);
    }
  };

  const AddRow = (item) => {
    setRows([...rows, item])
  }
  const SaveEditedRow = (item) => {
    console.log(item)
    const newRows = rows.map((each, i) => {
      if (item.project_id === each.project_id) {
        // Increment the clicked counter
        return item;
      } else {
        // The rest haven't changed
        return each;
      }
    });
    setRows(newRows);
  }

  const filteredColumns = userRole !== "SALES" ? columns : columns.filter(column => column.field !== "actions");

  return (
    <div className="p-4 mt-20 bg-slate-50">
      {/* Your Data Grid Table */}
      <Loader />
      <AddprojectDrawer
        anchor="right"
        toggleDrawer={toggleAddProjectDrawer}
        isOpen={isAddProjectDrawerOpen}
        current={current}
        AddRow={AddRow}
        editRow={editRow}
        setEditRow={setEditRow}
        SaveEditedRow={SaveEditedRow}
      />
      <div>
        {token && userRole !== "SALES" &&
          <div className='p-4 flex gap-2 items-center'>
            <span className='sbt__Btn' style={{ backgroundColor: 'none' }}>
              <button onClick={(event) => toggleAddProjectDrawer('right', true, event)} style={{ width: 'max-content' }} name="add">Add Project</button>
              {/* <button onClick={(event) => toggleAddProjectDrawer('right', true, event)} style={{ width: 'max-content' }} name="add">Edit Status</button>  */}
              {/* <Button variant='contained'  onClick={(event) => toggleAddProjectDrawer('right', true, event)} style={{ width: 'max-content' }} name="add">Add Project</Button> */}
            </span>
            <span >
              <Button onClick={(event) => toggleAddProjectDrawer('right', true, event)} style={{ width: 'max-content' }} name="editStatus">Edit Status</Button>
            </span>
          </div>
        }

      </div>
      <Box sx={{ width: '100%', height: '80vh', backgroundColor: 'white' }}>
        <DataGrid
          rows={rows}
          columns={filteredColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          getRowId={(row) => row.project_id}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Main;