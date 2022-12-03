import * as React from "react";
import { useEffect, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Box, Modal, Button, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import EmployeeListTable from "./EmployeeListTable";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {deleteAlert, errorAlert, successAlert} from "../../../../../Common Components/Toasts/CustomToasts"
import {
  fetchAllAppointments,
  fetchAppointmentsSearch,deleteEmployee,editEmployee
} from "../../services/EmployeeListServices/EmployeeListServices";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";

import SearchBar from "../../../../../Common Components/FormFields/SearchBar";
import LoadingSpinner from "../../../../../Common Components/loadingspinner/loadingSpinner";
// import { AddNewButton } from "../../../../../Common Components/Buttons/CommonButtons";
import AddNewButton from "../../../../../Common Components/Buttons/AddNewButton";

const defalutValues = {
  id: "",
  deptCode: "",
  deptName: "",
  deptIsClinical: "",
  unitName: "",
  status: "Active",
  activeDept: false,
};


let inputSearchid;
let employeeId;
let ApListVisitId;
let ApListAppointmentId;
let ApListPatientIdSetValue;

let ReschedulefuncDoctorId;
let AppointmentIdReschedual;

let departmentName;
let doctorName;

const getDateModal = (dobValue) => {
  let dobGivenYear = dobValue.getFullYear();
  let dobGivenMonth = String(dobValue.getMonth() + 1).padStart(2, "0");
  let dobGivenDay = String(dobValue.getDate()).padStart(2, "0");
  const fullDOB = [dobGivenYear, dobGivenMonth, dobGivenDay].join("-");
  return fullDOB;
};

export default function EmployeeList() {
  const [count, setCount] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
  });


  const navigate = useNavigate();
  const [data, setData] = useState({ result: [], actions: [] });
  
  const [spinner, showSpinner] = React.useState(false);
  const [dataResult,setDataResult] = useState([])

  const [inputSearchArr, setInputSearchArr] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [openDeleteEmp, setOpenDeleteEmp] = React.useState(false);
  const handelOpenDeleteEmp = () => setOpenDeleteEmp(true);
  const handleCloseDeleteEmp = () => {
      if(openDeleteEmp){
          setOpenDeleteEmp(false)
      }
  };
  const [openEditEmp, setOpenEditEmp] = React.useState(false);
  const handelOpenEditEmp = () => setOpenEditEmp(true);
  const handleCloseEditEmp = () => {
      if(openEditEmp){
          setOpenEditEmp(false)
      }
  };
  const defaultParams = {
    page: page,
    size: rowsPerPage,
    searchString: searchString,
  };
  const searchStringParams = {
    page: 0,
    size: rowsPerPage,
    searchString: searchString,
  }
  useEffect(() => {
    
    showSpinner(true);
    console.log("defaultParams", searchStringParams);
    fetchAllAppointments(searchStringParams)
      .then((response) => response.data)
      .then((res) => {
        let departmentList = {
          result: [],
          actions: [],
        };
        let orderItObj = {
          "srNo":null,
          "firstName":null,
          "lastName":null,
          "mobileNo":null,
          "isAdmin":null,
          "isClinical":null,
          "units":null,
          "departments":null,
          "gender":null,
          "birthDate":null,
          "address":null,
          "country":null,
          "state":null,
          "district":null,
          "city":null,
          "area":null,
          "loginApplicable":null,
          "doctorShareApplicable":null,
          "concessionApplicable":null,
          "createdBy":null,
          "lastModifiedBy":null,
          "createdDate":null,
          "lastModifiedDate":null
        }
        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          // let ordered = Object.assign(orderItObj, jsonObject);
          // departmentList.result.push(ordered);
          // console.log("orderItObj",ordered)
          departmentList.result.push(jsonObject);
        });

        departmentList.actions = [...res.actions];
        console.log(departmentList);

        console.log("department list",departmentList)
        showSpinner(false);
        setData(departmentList);
        setDataResult(departmentList.result)
        setCount(res.count);
      })
      .catch(() => {
        showSpinner(false);
      })

  }, [searchString]);

  const callTableDataApi = () => {
    console.log("defaultParams", defaultParams);
    
    showSpinner(true);
    fetchAllAppointments(defaultParams)
      .then((response) => response.data)
      .then((res) => {
        console.log("emp data", res);
        let departmentList = {
          result: [],
          actions: [],
        };
        let orderItObj = {
          "srNo":null,
          "firstName":null,
          "lastName":null,
          "mobileNo":null,
          "isAdmin":null,
          "isClinical":null,
          "units":null,
          "departments":null,
          "gender":null,
          "birthDate":null,
          "address":null,
          "country":null,
          "state":null,
          "district":null,
          "city":null,
          "area":null,
          "loginApplicable":null,
          "doctorShareApplicable":null,
          "concessionApplicable":null,
          "createdBy":null,
          "lastModifiedBy":null,
          "createdDate":null,
          "lastModifiedDate":null
        }
        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          // let ordered = Object.assign(orderItObj, jsonObject);
          // console.log("orderItObj",ordered)
          // departmentList.result.push(ordered);
          departmentList.result.push(jsonObject);
        });

        departmentList.actions = [...res.actions];
        console.log(departmentList);

        console.log("department list",departmentList)
        showSpinner(false);
        setData(departmentList);
        setDataResult(departmentList.result)
        setCount(res.count);
      })
      .catch(() => {
        showSpinner(false);
      });
  };


  const openEditfunc = (index,row) => {
    employeeId = row["id"]
    console.log('row',row)
    handelOpenEditEmp()
  }
  const openDeletefunc = (index,row) => {
    employeeId = row["id"]
    console.log('employeeId',employeeId)
    handelOpenDeleteEmp()
  }

  
  return (
    <div className="px-8 w-full min-h-screen mt-20 ">
      <div className="bg-white px-8 py-8">
        <div className="flex justify-between ">
          <div className="flex flex-nowrap w-3/4 space-x-4  py-4 px-2">
            <div className="text-gray-500 font-bold text-left text-base mt-2">
              Employees
            </div>
            <div className="w-3/6">
              <SearchBar
                control={control}
                error={errors.inputSearch}
                type="button"
                name="inputSearch"
                placeholder="Search by Employee Name/ Employee Code/ Mobile No."
                dataArray={inputSearchArr}
                className="w-96"
                isSearchable={true}
                handleInputChange={(e) => {
                  console.log(e);
                  if (e == null) {
                  } else {
                    if (e.length > 0) {
                      fetchAppointmentsSearch(e).then((response) => {
                        console.log(response);
                        setInputSearchArr(response.data.result);
                      });
                    }
                  }
                }}
                onChange={(e) => {
                  if (e == null) {
                    inputSearchid = "";
                    
                    setSearchString(inputSearchid);
                    setPage(0)
                  } else {
                    inputSearchid = e.employee;
                    console.log("inputSearchid", inputSearchid);
                  }
                }}
              />
            </div>

            <div className="flex gap-1">
              <div>
                <Button
                  className=" h-10 w-10   rounded-md text-gray-500"
                  type="button"
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: "grey.500", color: "gray" }}
                  onClick={(e) => {
                    console.log("inputSearchid", inputSearchid);
                    
                    setSearchString(inputSearchid);
                    setPage(0);
                  }}
                >
                  <SearchIcon className="cursor-pointer" />
                </Button>
              </div>
              <div className="">
                <Button
                  className=" h-10 w-10 -m-200 rounded-md text-gray-500"
                  size="small"
                >
                  <TuneIcon className="cursor-pointer" />
                </Button>
              </div>
            </div>
          </div>
          <div className="py-4 mt-1">
            <Link to="/masters/usermanagement/employeemaster">
                <AddNewButton label= 'Employee' />
            </Link>
            
          </div>
        </div>
        {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : <>
        {data ? data.result ? data.result.length > 0 ? (
          <>
            <EmployeeListTable
              tableApiFunc = {fetchAllAppointments}
              searchString={searchString}
              dataResult={dataResult}
              setDataResult={setDataResult}

              data={data}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              count={count}
              openEditfunc={openEditfunc}
              openDeletefunc={openDeletefunc}
            />
          </>
        ) : (
          <div className="text-gray-500 font-bold text-center ">
            <h1 className="text-center">No Records Found</h1>
          </div>
        ) : "" : "" }
        </>}
      </div>
      

      {/* delete employee */}
      <ConfirmationModal
          confirmationOpen={openDeleteEmp}
          confirmationHandleClose={handleCloseDeleteEmp}
          confirmationSubmitFunc={()=>{
            // employeeId
            deleteEmployee(employeeId).then((response) => {
              console.log(response);
              if (response.status === 200) {
                deleteAlert(response.data.message);
                callTableDataApi()
                handleCloseDeleteEmp()
              }
            })
            .catch((response) => {
              console.log("getTimeSlotsApi catch",response);
              if(response.response.status == 500){
                errorAlert(response.message)
                handleCloseDeleteEmp()
              }
              if(response.response.status == 400){
                errorAlert(response.response.data.message)
                handleCloseDeleteEmp()
              }
            });
          }}
          confirmationLabel="Confirmation "
          confirmationMsg="Click on Proceed to Delete the Employee ?"
          confirmationButtonMsg="Proceed"
        />
      
      {/* Edit employee */}
      <ConfirmationModal
          confirmationOpen={openEditEmp}
          confirmationHandleClose={handleCloseEditEmp}
          confirmationSubmitFunc={()=>{
            // employeeId
            editEmployee(employeeId).then((response) => {
              console.log(response);
              if (response.status === 200) {
                let jsonObject = JSON.parse(response.data.result)
                console.log("jsonObject",jsonObject)
                navigate(`/masters/usermanagement/employeemaster`, {
                  state: {
                    employeeDetails:jsonObject,
                  },
                });
                handleCloseEditEmp()
              }
            })
            .catch((response) => {
              console.log("getTimeSlotsApi catch",response);
              if(response.response.status == 500){
                errorAlert(response.message)
                handleCloseEditEmp()
              }
              if(response.response.status == 400){
                errorAlert(response.response.data.message)
                handleCloseEditEmp()
              }
            });
          }}
          confirmationLabel="Confirmation "
          confirmationMsg="Click on Proceed to Edit the Employee ?"
          confirmationButtonMsg="Proceed"
        />
    </div>
  );
}