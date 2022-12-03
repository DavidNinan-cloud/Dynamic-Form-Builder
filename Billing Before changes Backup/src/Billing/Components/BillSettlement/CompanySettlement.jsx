import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import PatientInfo from "../../Common-Components/PatientInfo";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import RadioField from "../../../Common Components/FormFields/RadioField";
import useDidMountEffect from "../../../Common Components/Custom Hooks/useDidMountEffect";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormControl, FormHelperText, TextField , Checkbox, FormControlLabel} from '@mui/material'


export default function CompanySettlement({drawerOpen,applicableType}) {

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

    useDidMountEffect(() => {
      if (searchString !== null) {
        fetchPatientDetails();
      }
    }, [searchString]);

  return (
    <>
      <Grid container spacing={1}>
            <Grid item lg={5} sm={4} className="z-50">
              <SearchBar
                name="inputSearch"
                placeholder="Search by Compamy Name"
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
            {/* <Grid item lg={1} sm={1}></Grid>                                                                                                                                                                                                             */}
            <Grid item lg={1} sm={1} className="flex space-x-2 shrink">
              <Button
                className=" h-10 w-10 rounded-md text-gray-500"
                type="button"
                variant="outlined"
                size="small"
                sx={{ borderColor: "grey.500", color: "gray" }}
                onClick={() => {
                  let searchInputValue = inputSearchid;
                  if (searchInputValue == undefined) {
                    searchInputValue = "";
                  } else {
                    console.log("searchInputValue", searchInputValue);
                    setSearchString(searchInputValue);
                  }
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
    </>
  )
}
