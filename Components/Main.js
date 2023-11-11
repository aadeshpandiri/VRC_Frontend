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
const MatEdit = ({ index, setCurrent, setOpenDrawer, setEditRow }) => {

  const handleEditClick = () => {
    // some action
    console.log(index)
    setEditRow(index)
    setOpenDrawer(true)
    setCurrent('edit')
  }



  return <div onClick={handleEditClick} name='edit'>
    <Edit />
  </div>

};
const Main = () => {
  const [current, setCurrent] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false)
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
            setRows(result.data)
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
    if (event.target.name === "add") {
      setCurrent('add')
      setOpenAddProjectDrawer(open);
    }
    else if (event.target.name === "sReceipt") {
      setCurrent('sReceipt')
      setOpenAddProjectDrawer(open);
      // setOpenDrawer(open);
    }
    else if(event.target.name==='edit'){
      setCurrent('edit');
      setOpenDrawer(open);
    }
  };

  // const toggleReceiptDrawer = (anchor, open, event) => {
  //   if (
  //     event &&
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }
  //   setCurrent('sReceipt')
  //   setOpenReceiptDrawer(open);
  //   setOpenDrawer(open);
  //   if (open) {
  //     setCurrent(event.target.name)
  //   }

  // };

  // const rows = [
  //   { sno: 1, projectName: 'Snow', tokenNumber: 'Jon', flatNumber: 35,ProjectID:'',Status:'Available' },
  //   ];

  // const modifyData=(tdata)=>{
  //   // console.log(tdata,'tdata')
  //   var t=tdata.map(eachRow=>{
  //     return {
  //       'order_id':eachRow.order_id,
  //     //  'type_of_service':getService(eachRow.type_of_service),
  //     //  'fulfilled_or_not':eachRow.fulfilled_or_not==0?'Not Fulfilled':'Fulfilled',
  //     //  'date_time':eachRow.date_time.split('T')[0],
  //     //  'type_of_subservice':getSubService(eachRow.sub_service),
  //     //  'name':eachRow.name
  //     }
  //   })
  //   console.log(t);
  //   return t;
  // }
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
        current={current}
        AddRow={AddRow}
      />
      <div>
        {token &&
          <>
            {/* <Button 
              variant="contained"
              onClick={(event) => toggleAddProjectDrawer('right', true, event)}
              sx={{
                backfaceVisibility:'visible'
              }}
            >Add Project
            </Button> */}
            <div className='sbt__Btn'>
              <button onClick={(event) => toggleAddProjectDrawer('right', true, event)} style={{ width: 'max-content' }} name="add">Add Project</button>
            </div>
            <Button color='secondary'
              variant="outlined"
              onClick={(event) => toggleAddProjectDrawer('right', true, event)}
              name="sReceipt"
            >Show Receipt
            </Button>
          </>}
      </div>
      <Box sx={{ width: '100%', height: '80vh', backgroundColor: 'white' }}>{/* */}
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
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Main;