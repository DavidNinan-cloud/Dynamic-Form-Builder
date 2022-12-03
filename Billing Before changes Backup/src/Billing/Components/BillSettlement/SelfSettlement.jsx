import { Box, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import PatientInfo from "../../Common-Components/PatientInfo";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import RadioField from "../../../Common Components/FormFields/RadioField";
import {dateIsValid, validateDate, setdateFormat} from "../../../Common Components/Custom Hooks/DataValidator"
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormControl, FormHelperText, TextField , Checkbox, FormControlLabel} from '@mui/material'
import { callSelfList } from "../../services/BillSettlement/BillSettlementServices";
import BillList from "./BillList";
import SelectedBillTable from "./SelectedBillTable";
import SelfSettlementModal from "./SelfSettlementModal";



export default function SelfSettlement({drawerOpen,applicableType,isSelfSettlement}) {

    const [inputSearchArr, setInputSearchArr] = useState([]);
    const [searchString, setSearchString] = useState(null);
    const [inputSearchid, setInputSearchid] = useState(null);
    const [comingDataObj, setComingDataObj] = useState({});
    const [dataArr, setDataArr] = useState({ result: [] });
    const [dataResult, setDataResult] = useState([]);
    const [comingData, setComingData] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState();
  
    const [dateValue1, setDateValue1] = React.useState(new Date());
    const [dateValue2, setDateValue2] = React.useState(new Date());

    const [selectedBill, setSelectedBill] = React.useState([]);

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
      setOpen(true)
    }
    const handleClose = () => {
      setOpen(false)
    }
    const methods = useForm({
      mode: "onChange",
      defaultValues: {
        applicableTo: 0,
      },
    });
    const {
      register,
      handleSubmit,
      reset,
      trigger,
      formState: { errors },
      control,
      setValue,
      watch,
      getValues,
    } = methods;



    useEffect(()=>{
      if(isSelfSettlement){
        let obj = {
          "fromDate": "2022-11-24",
          "isIpd": false,
          "patientCategory": "Self",
          "toDate": "2022-11-24"
          }
        fetchBillDetails(obj)
      }
    },[isSelfSettlement])
    const fetchBillDetails = (obj) => {
      callSelfList(obj).then((response) => {
        console.log("Bill details result",response.data.result);
        let receivedData = response.data
        setDataArr(receivedData)
        setDataResult(receivedData.result)
        setCount(receivedData.result.length)
      })
    }

    const funcsetBillInfo = (row,index) =>{
      console.log('function trigger')
      let obj = {
        "Patient Name":row["Patient Name"],
        "UHID":row["UHID"],
        "Visit Date":row["Visit Date"],
        'Bill Number':row["Bill Number"],
        'Discount Amount':row["Discount Amount"],
        'Paid Amount':row["Paid Amount"],
        'OutStanding':row["OutStanding"],
        'totalAmount':row["totalAmount"],
      }
      let arr = []
      arr.push(obj)
      console.log('arr',arr)
      setSelectedBill(arr)
    }

    const resetBillInfo = (row,index) => {
      setSelectedBill([])
    }
  return (
    <>
    <Grid container spacing={1}>
          <Grid item lg={5} sm={4} className="z-50">
            <SearchBar
              name="inputSearch"
              placeholder="Search by Patient Name/ UHID/ Mobile No."
              dataArray={inputSearchArr}
              isSearchable={true}
              handleInputChange={(e) => {
                console.log("searchinput", e);
                if (e == null) {
                  console.log("clear 1");
                } else {
                  if (e.length > 0) {
                    autoSearchPatientBillCancellations(e).then((response) => {
                      console.log("response result", response.data.result);
                      setInputSearchArr(response.data.result);
                    });
                  }
                }
              }}
              //after search user get specific value
              onChange={(e) => {
                console.log("searchinput selected", e);
                if (e == null) {
                  console.log("clear 2");
                  // resetForm()
                  clearPage();
                  setSearchString(null);
                } else {
                  // resetForm()
                  clearPage();
                  setSearchString(null);
                  setComingDataObj(e);
                  setInputSearchid(e.patientId);
                }
              }}
            />
          </Grid>
          <Grid item lg={6}  sm={8} className="flex space-x-2 mt-1">
          <FormControl
            sx={{
              backgroundColor:'white'
            }}
            fullWidth
            size="small"
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disablePast
                maxDate={dateValue2}
                // maxDate={dateValue2 == new Date() ? dateValue2:undefined}
                label="From Date"
                value={dateValue1}
                inputProps={{ readOnly: true }}
                onChange={(value) => {
                  let isValidDate = validateDate(value)
                  if(isValidDate){
                    setDateValue1(value)
                  if(dateValue2<value){
                    setDateValue2(value)
                  }}
                }}
                renderInput={(props) => (
                  <TextField {...props} size="small"  sx={{
                    svg: { color: "#0B83A5" },
                  }}/>
                )}
                name="fromData"
                defaultValue=""
                inputFormat="dd/MM/yyyy"
              />
            </LocalizationProvider>

            <FormHelperText style={{ color: "#d32f2f" }}>
              {errors.dob?.message}
            </FormHelperText>
          </FormControl>

          <FormControl
            sx={{
              backgroundColor:'white'
            }}
            fullWidth
            size="small"
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                minDate={dateValue1}
                label="To Date"
                value={dateValue2}
                inputProps={{ readOnly: true }}
                onChange={(value) => {
                  let isValidDate = validateDate(value)
                  if(isValidDate){
                  console.log("toDate",value)
                  setDateValue2(value);
                  }
                }}
                renderInput={(props) => (
                  <TextField {...props} size="small" sx={{
                    svg: { color: "#0B83A5" },
                  }}  />
                )}
                name="toDate"
                defaultValue=""
                inputFormat="dd/MM/yyyy"
              />
            </LocalizationProvider>

            <FormHelperText style={{ color: "#d32f2f" }}>
              {errors.dob?.message}
            </FormHelperText>
          </FormControl>
          </Grid>
          {/* <Grid item lg={1} sm={1}></Grid> */}
          <Grid item lg={1} sm={1} className="flex space-x-2 shrink">
            <Button
              className=" h-10 w-10 rounded-md text-gray-500"
              type="button"
              variant="outlined"
              size="small"
              sx={{ borderColor: "grey.500", color: "gray" }}
              onClick={() => {
                fetchBillDetails()
              }}
            >
              <SearchIcon className="cursor-pointer" />
            </Button>
          </Grid>
            <Grid item lg={drawerOpen ? 1 : 1} md={2.1} sm={3}>
              <p className="text-sm font-semibold tracking-wide mt-1">
                Against :
              </p>
            </Grid>
            <Grid item md={drawerOpen ? 4 : 3} sm={4} >
              <RadioField
                // label="Refund Against "
                name="applicableTo"
                control={control}
                dataArray={applicableType}
              />
            </Grid>
    </Grid>
        {
        dataResult.length > 0 ? (
            <BillList 
                setBillInfo={funcsetBillInfo}
                resetBillInfo={resetBillInfo}
                tableApiFunc={callSelfList}

                dataResult={dataResult}
                setDataResult={setDataResult}
                data={dataArr}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                count={count}
            />
        ) : ''
        }
        {
          selectedBill.length > 0 ? (
            <div>
              <p  className="text-gray-600 font-bold whitespace-nowrap text-base mt-2">
                      Selected Bill :
              </p>
            <SelectedBillTable ledgerData={selectedBill}/>

            <div className="w-full flex justify-end mt-2">
              <Button
                variant="contained"
                color='success'
                onClick={handleOpen}>
                  Settle Bill
              </Button>
            </div>
            </div> 
          ):''
        }
        <SelfSettlementModal 
          open={open}
          handleClose={handleClose}
          selectedBill={selectedBill}/>
    </>
  )
}
