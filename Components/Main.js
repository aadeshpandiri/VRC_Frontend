import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { FormControlLabel, IconButton } from '@material-ui/core';
import { Button } from '@mui/material';
// import { DataGrid } from "@material-ui/data-grid";
import EditIcon from '@material-ui/icons/Edit';
import { blue } from '@material-ui/core/colors';
import { useContext } from 'react';
import sharedContext from '../context/SharedContext';
import AddprojectDrawer from './AddprojectDrawer';
const MatEdit = ({ index }) => {

  const handleEditClick = () => {
    // some action
  }



  return <FormControlLabel
    control={
      <IconButton color="secondary" aria-label="add an alarm" onClick={handleEditClick} >
        <EditIcon style={{ color: blue[500] }} />
      </IconButton>
    }
  />
};
const Main = () => {
  
  const columns = [
    // { field: 'sno', headerName: 'Sno', width: 90 },

    {
      field: 'project_id',
      headerName: 'Project ID',
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
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
            <MatEdit index={params.row.id} />
          </div>
        );
      }
    }
  ];
  const [rows, setRows] = useState([])
  const handleLogout=()=>{
    sessionStorage.clear();
    setToken(null)
  }
  const { token,setToken } = useContext(sharedContext);
  useEffect(() => {
    if (token) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://vrcbackend.onrender.com/project/getProjects", requestOptions)
        .then(response => response.json())
        .then(result => {
    if(result.status==401 || result.message=='Token Invalid/Expired'){
      handleLogout();
    }
    else{
     
          console.log(result)
          setRows(result.data)
          
    }
  })
        .catch(error => console.log('error', error));
    }
  }, [token])

  const [isDrawerOpen, setOpenDrawer] = useState(false);
  const toggleDrawer = (anchor, open, event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

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

  return (
    <div className="p-4">
      {/* Your Data Grid Table */}
      <AddprojectDrawer
        anchor="right"
        toggleDrawer={toggleDrawer}
        isOpen={isDrawerOpen}
      />
      {token && <Button style={{ color: "white", backgroundColor: 'rgba(19, 102, 217, 1)' }} onClick={(event) => toggleDrawer('right', true, event)}>Add Project</Button>}
      <Box sx={{ height: '80vh', width: '100%' }}>
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