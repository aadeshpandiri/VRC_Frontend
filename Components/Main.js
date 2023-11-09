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
import Loader from './Loader';

const MatEdit = ({ index ,setCurrent,setOpenDrawer,setEditRow}) => {

  const handleEditClick = () => {
    // some action
    console.log(index)
    setEditRow(index)
    setOpenDrawer(true)
    setCurrent('edit')
  }



  return <div onClick={handleEditClick}>
    <Edit/>
  </div>
 
};
const Main = () => {
  const [current, setCurrent] = useState('');

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
      // renderCell: (params) => {
      //   return (
      //     <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
      //       <Select
      //        value={params.row.status}
      //         // onChange={onChangeInput}
      //         autoComplete="off"
      //         name='type'>
      //       <MenuItem value="" disabled>Type</MenuItem>
      //                                   <MenuItem value="AppartTOKENment">TOKEN</MenuItem>
      //                                   <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
      //                                   <MenuItem value="SOLD">SOLD</MenuItem>
      //       </Select>
      //     </div>
      //   );
      // }
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
  const [editRow,setEditRow]=useState();

  const handleLogout=()=>{
    sessionStorage.clear();
    setToken(null)
  }
  const { token,setToken ,loader,setLoader,userRole} = useContext(sharedContext);
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
    setLoader(false)
  })
        .catch(error => {
          setLoader(false)
        });
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
    if(open){
      setCurrent(event.target.name)
    }
  
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
const AddRow=(item)=>{
  setRows([...rows,item])
}
const SaveEditedRow=(item)=>{
  console.log(item)
}
  return (
    <div className="p-4 mt-20 bg-slate-50">
      {/* Your Data Grid Table */}
      <Loader/>
      <AddprojectDrawer
        anchor="right"
        toggleDrawer={toggleDrawer}
        isOpen={isDrawerOpen}
        AddRow={AddRow}
        SaveEditedRow={SaveEditedRow}
        current={current}
        editRow={editRow}
        setEditRow={setEditRow}
      />
      <div>
      {token&& userRole=='SUPERADMIN' && <Button
                variant="outlined"
                onClick={(event) => toggleDrawer('right', true, event)}
                name='add'
                >Add Project
            </Button>
}
      </div>
      <Box sx={{ height: '80vh', width: '100%' ,backgroundColor:'white'}}>
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
          disableRowSelectionOnClick={true}
        />
      </Box>
    </div>
  );
};

export default Main;