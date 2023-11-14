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
import Sales from '../utils/Sales.svg';
import Revenue from '../utils/Revenue.svg';
import Profit from '../utils/Profit.svg'
import Image from 'next/image';
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
      editable: false,
    },
    {
      field: 'project_name',
      headerName: 'Project Name',
      width: 150,
      editable: false,
    },
    {
      field: 'tower_number',
      headerName: 'Tower Number',
      width: 150,
      editable: false,
    },
    {
      field: 'flat_number',
      headerName: 'Flat Number',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'villa_number',
      headerName: 'Villa Number',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'plot_number',
      headerName: 'Plot Number',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      editable: false,
      renderCell: (params) => {
        const status = params.value;
        let color = 'black'; // Default color
        switch (status) {
          case 'AVAILABLE':
            color = '#10A760';
            break;
          case 'SOLD':
            color = '#F00';
            break;
          case 'TOKEN':
            color = '#E19133';
            break;
          case 'ADVANCE':
            color = '#3D4DD6';
            break;
          default:
            color = 'black';
        }
        return <div style={{ 'color': color, fontWeight: 600, fontSize: '14px' }}>{status}</div>
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      editable: false,
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
  const [income,setIncome]=useState();
  const [expence,setExpence]=useState();

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
    useEffect(() => {
 if(userRole=='SUPERADMIN'){
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`${baseurl?.url}/income/getIncome`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status == 401 || result.message == 'Token Invalid/Expired') {
            handleLogout();
          }
          else {
            setIncome(result.data)
          }
          setLoader(false)
        })
        .catch(error => {
          setLoader(false)
        });
      }
    
  }, [token])
  useEffect(() => {
    if(userRole=='SUPERADMIN'){
         setLoader(true)
         var myHeaders = new Headers();
         myHeaders.append("Authorization", `Bearer ${token}`);
   
         var requestOptions = {
           method: 'GET',
           headers: myHeaders,
           redirect: 'follow'
         };
   
         fetch(`${baseurl?.url}/payroll/getExpenses`, requestOptions)
           .then(response => response.json())
           .then(result => {
             if (result.status == 401 || result.message == 'Token Invalid/Expired') {
               handleLogout();
             }
             else {
               setExpence(result.data)
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
    <div className="p-4 mt-20 bg-grey-500">
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
      {
        userRole=='SUPERADMIN'&&
        <div className='flex gap-5 bg-white m-4 p-4 justify-around'>
          <div className='flex flex-col items-center'>
          <Image
             alt="Sales"
              src={Sales}
              quality={100}
              width= {25}
            height= {23}   />
            <span className='flex flex-col md:flex-row items-center font-medium md:gap-3'><span> ₹{income}</span><span>Income</span></span>
          </div>
          <div className='flex flex-col items-center'
          ><Image
             alt="Revenue"
              src={Revenue}
              quality={100}
              width= {25}
            height= {23}   />
            <span className='flex flex-col md:flex-row items-center font-medium md:gap-3' ><span> ₹{expence}</span><span>Expence</span></span></div>
          <div className='flex flex-col items-center'>
          <Image
             alt="Profit"
              src={Profit}
              quality={100}
              width= {25}
            height= {23}   />
            <span className='flex flex-col md:flex-row items-center font-medium md:gap-3'><span> ₹{income -expence}</span><span>Profit</span></span>
          </div>

        </div>
      }
      <div className='flex justify-end'>
        {token && userRole !== "SALES" &&
          <div className='p-4 flex gap-2 items-center'>
            <span className='sbt__Btn' style={{ backgroundColor: 'none' }}>
              <button onClick={(event) => toggleAddProjectDrawer('right', true, event)} style={{ width: 'max-content' }} name="add">Add Project</button>
            </span>
            <span className='eds__Btn'>
              <Button className='button' onClick={(event) => toggleAddProjectDrawer('right', true, event)} style={{ width: 'max-content'}} name="editStatus">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#5D6679" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Edit Status
              </Button>
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
          // disableRowSelectionOnClick
          disableSelectionOnClick
          sx={{
            fontWeight: 500
          }}
          className='datagrid'
        />
      </Box>
    </div>
  );
};

export default Main;