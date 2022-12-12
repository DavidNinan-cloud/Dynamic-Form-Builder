import * as React from "react";
import { useEffect, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import ServiceListTable from "./ServiceListTable";
import { Link, useNavigate } from "react-router-dom";
import {editService, fetchAllServices, fetchServiceSearch} from '../../services-services/ServiceList-services/ServiceListServices'
import { Grid, Button, Dialog  } from '@mui/material'
import SearchBar from "../../../../../../Common Components/FormFields/SearchBar";
import LoadingSpinner from "../../../../../../Common Components/loadingspinner/loadingSpinner";
// import { AddNewButton } from "../../../../../../Common Components/Buttons/CommonButtons";
import AddNewButton from "../../../../../../Common Components/Buttons/AddNewButton";
import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
import { errorAlertCustom } from "../../../../../../Common Components/Toasts/CustomToasts";
import CheckBoxField from "../../../../../../Common Components/FormFields/CheckBoxField";


let inputSearchid=''
let serviceId = ''
export default function ServiceListing() {
  
  const [count, setCount] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [spinner, showSpinner] = React.useState(false);
  const [dataResult,setDataResult] = useState([])
  const [searchString, setSearchString] = useState("");
  const {
    watch,
    setValue,
    control, register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues:{
      isPackageFlag:false
    },
  });

      const [data, setData] = useState({ result: [], actions: [] });
      const [inputSearchArr, setInputSearchArr] = useState([]);


      useEffect(()=>{
        console.log('isPackageFlag',isPackageFlag)
      },[isPackageFlag])
    
      const isPackageFlag = watch('isPackageFlag')
      const defaultParamsRecall = {
        isPackageFlag:isPackageFlag,
        page: page,
        size: rowsPerPage,
        searchString: searchString,
      };
      const searchStringParams = {
        isPackageFlag:isPackageFlag,
        page: 0,
        size: rowsPerPage,
        searchString: searchString,
      }
      useEffect(() => {
        callTableDataApi(searchStringParams)
      }, [searchString]);

      // def
      const callTableDataApi = (defaultParams) =>{
        console.log("defaultParams", defaultParams);
    
        showSpinner(true);
        fetchAllServices(defaultParams)
          .then((response) => response.data)
          .then((res) => {
            console.log("emp data", res);
            showSpinner(false);
            setData(res);
            setDataResult(res.result)
            setCount(res.count);
          })
          .catch(() => {
            showSpinner(false);
          });
      }

      const navigate = useNavigate();
      const [openEditService, setOpenEditService] = React.useState(false);
      const handelOpenEditService = () => setOpenEditService(true);
      const handleCloseEditService = () => {
          if(openEditService){
              setOpenEditService(false)
          }
      };
      const openEditfunc = (index, row) => {
        console.log('row',row)
          serviceId = row["serviceId"]
          console.log('serviceId',serviceId)
          handelOpenEditService()
      }
  return (
    <div className="px-8 w-full min-h-screen mt-20 ">
      <div className="bg-white px-8 py-8">
          
          <Grid container spacing={1} className="py-4">
              <Grid item lg={1} sm={1.5} sx={{marginY:"0.5rem"}} className="text-gray-500 font-bold text-left text-base ">
                Services 
              </Grid>
              <Grid item lg={4} sm={5.5}  >
                <SearchBar
                  control={control}
                  error={errors.inputSearch}
                  type="button"
                  name="inputSearch"
                  placeholder="Search by Service Name"
                  dataArray={inputSearchArr}
                  className="w-96"
                  isSearchable={true}
                  //change option as per user input
                  handleInputChange={(e)=>{
                    console.log(e);
                    if (e == null) {
                    } else {
                      if (e.length > 0) {
                        fetchServiceSearch(e).then((response) => response.data).then((res) => {

                          console.log("res",res);
                          let resultList = [];
                          res.result.forEach((jsonString) => {
                            let jsonObject = JSON.parse(jsonString);
                            resultList.push(jsonObject);
                          });
                  
                          
                          console.log("resultList",resultList);
                          setInputSearchArr(resultList);
                        });
                      }
                    }
                  }}
                  //after search user get specific value
                  onChange={(e)=>{
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
              </Grid>
              <Grid item lg={2} sm={5.5}  >
                    <CheckBoxField                
                              control={control} 
                              name={`isPackageFlag`} 
                              label="Is Package"
                  />
              </Grid>
              <Grid item lg={3} sm={2.3} className="flex gap-1">
                <div>
                  {/* outlined search icon */}
                  <Button
                    className=" h-10 w-10   rounded-md text-gray-500"
                    type="button"
                    variant="outlined"
                    size="small"
                    sx={{ borderColor: "grey.500", color: "gray" }}
                    onClick={(e)=>{
                      console.log("inputSearchid", inputSearchid);
                    
                      setSearchString(inputSearchid);
                      callTableDataApi(searchStringParams)
                      setPage(0);
                    }}
                  >
                    <SearchIcon className="cursor-pointer" />
                  </Button>
                </div>
                {/* Filter button  and icon*/}
                <div className="">
                  <Button
                    className=" h-10 w-10 -m-200 rounded-md text-gray-500"
                    size="small"
                  >
                    <TuneIcon className="cursor-pointer" />
                  </Button>
                </div>
                
              </Grid>

            <Grid item lg={2} sm={2} className='flex justify-end'>
            <Link to='/masters/billing/servicecreation'>
                <AddNewButton label= 'Service' />
            </Link>
            </Grid>
          </Grid>
        {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : <>
        {data ? data.result ? data.result.length > 0 ? (
          <ServiceListTable
              tableApiFunc = {fetchAllServices}
              searchString={searchString}
              dataResult={dataResult}
              setDataResult={setDataResult}
              isPackageFlag={isPackageFlag}
              data={data}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              count={count}

              openEditfunc={openEditfunc}
          />
      ):
      (
        
                  <div className="text-gray-500 font-bold text-center ">
                    <h1 className="text-center">No Records Found</h1>
                  </div>
      ): "" : "" }
      </>}
      </div>
        
        {/* Edit Service */}
      <ConfirmationModal
          confirmationOpen={openEditService}
          confirmationHandleClose={handleCloseEditService}
          confirmationSubmitFunc={()=>{
            // employeeId
            editService(serviceId).then((response) => {
              console.log(response);
              if (response.status === 200) {
                let jsonObject = response.data.result
                console.log("jsonObject",jsonObject)
                navigate(`/masters/billing/servicecreation`, {
                  state: {
                    serviceDetails:jsonObject,
                  },
                });
                handleCloseEditService()
              }
            })
            .catch((response) => {
              console.log("Service catch",response);
              if(response.response.status == 500){
                errorAlertCustom(response.message)
                handleCloseEditService()
              }
              if(response.response.status == 400){
                errorAlert(response.response.data.message)
                handleCloseEditService()
              }
            });
          }}
          confirmationLabel="Confirmation "
          confirmationMsg="Click on Proceed to Edit the Service ?"
          confirmationButtonMsg="Proceed"
        />
    </div>
  );
}