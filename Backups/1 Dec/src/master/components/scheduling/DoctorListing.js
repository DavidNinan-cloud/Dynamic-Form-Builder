import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Table, FormControl, Select, MenuItem } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { visuallyHidden } from "@mui/utils";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { OutlinedInput, InputAdornment } from "@mui/material";
// import Search from "../assets/Search.png";
import { BiVideo, BiSearch } from "react-icons/bi";
// import { useAppointmentListData } from "../../services/useReactQueryData";
import { FcVideoCall } from "react-icons/fc";
import { IoVideocamOutline } from "react-icons/io5";
import { RiWalkLine } from "react-icons/ri";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { fetchDoctorList } from "../../services/scheduling/SchedulingServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import { useForm } from "react-hook-form";
import {
  getUnitDropdown,
  getDepartmentDropdown,
} from "../../services/scheduling/SchedulingServices";
import DoctorListTable from "./DoctorListTable";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import DoctorListingTable from "./DoctorListingTable";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const DoctorListing = () => {
  const [unitOptions, setUnitOptions] = React.useState([]);
  const [departmentOptions, setDepartmentOptions] = React.useState([]);

  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const [spinner, showSpinner] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  //const [doctorList, setDoctorList] = useState([]);
  const [options, setOptions] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState("");
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [visitType, setVisitType] = useState("First Visit");

  let doctorListData = {
    statusCode: "",
    result: [],
    // actions: [],
  };

  const handleVisitTypeChange = (event) => {
    setVisitType(event.target.value);
  };

  useEffect(() => {
    callTableDataApi();
    getUnitList();
    getDepartmentList();
  }, [searchString]);

  useEffect(() => {
    console.log("data is " + JSON.stringify(data));
    console.log("dataResult is " + JSON.stringify(dataResult));
    console.log("Count is " + count);
  }, [data, dataResult, count]);

  const callTableDataApi = () => {
    const stringSearchObj = {
      page: page,
      size: rowsPerPage,
      doctorName: searchString,
    };
    showSpinner(true);
    showRecordWarning(false);
    fetchDoctorList(stringSearchObj)
      .then((response) => {
        console.log("response.data", response.data);
        setCount(response.data.count);
        console.log("response.data.count", response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          console.log("jsonString", jsonString);
          let jsonObject = JSON.parse(jsonString);
          doctorListData.result.push(jsonObject);
          console.log("doctorListData.result", doctorListData.result);
        });

        // doctorListData.actions = [...res.actions];
        doctorListData.statusCode = res.statusCode;
        console.log("doctorListData.result", doctorListData.result);
        setData(doctorListData);
        console.log("data", data);
        setDataResult(doctorListData.result);
        console.log("data result", dataResult);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  function createData(profilePicPath, doctorName, gender, age, mobileNo) {
    return {
      profilePicPath,
      doctorName,
      gender,
      age,
      mobileNo,
    };
  }

  //   let totalCount = appointmentListData?.data.count;

  // const { mutate: getDoctorList } = useMutation(fetchDoctorList, {
  //   onSuccess: (res) => {
  //     const result = {
  //       status: res.status + "-" + res.statusText,
  //       headers: res.headers,
  //       data: res.data,
  //     };
  //     console.log("data", result.data);
  //     setData(result.data);
  //     setCount(result.data.count);

  //     console.log("doctorlist", doctorList);

  //     console.log("doctor list result", result);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // function getDoctorList(myObj) {
  //   fetchDoctorList(myObj)
  //     .then((response) => {
  //       console.log("Result Count is " + JSON.stringify(response.data));
  //       setCount(response.data.count);
  //       return response.data;
  //     })
  //     .then((res) => {
  //       console.log("Data" + JSON.stringify(res));
  //       setData(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  const getUnitList = () => {
    getUnitDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDepartmentList = () => {
    getDepartmentDropdown()
      .then((response) => {
        console.log(
          "The list of all the departments are as follows" + response
        );
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setDepartmentOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col mt-20 mx-5 my-5 p-2 space-y-4">
      <div className="flex items-center w-full space-x-2">
        <div className="grid grid-cols-1 w-2/6">
          <SearchBar
            selectedObj={selectedObj}
            type="button"
            name="SearchableSelect"
            placeholder="Search by Name/Mobile No"
            dataArray={options}
            isSearchable={true}
            //  handleInputChange={handleChange}
            //selectedValue={autoSelectedValue}
          />
        </div>
        <div className="w-1/5">
          <DropdownField
            control={control}
            name="departmentName"
            label="Department Name"
            dataArray={departmentOptions}
            isSearchable={false}
            placeholder="Department Name"
            isClearable={false}
          />
        </div>
        <div className="w-1/5">
          <DropdownField
            control={control}
            name="unitName"
            label="Unit Name"
            dataArray={unitOptions}
            isSearchable={false}
            placeholder="Unit Name"
            isClearable={false}
          />
        </div>
        <Button
          className="rounded-md text-gray-500 h-9"
          type="button"
          variant="outlined"
          size="small"
          sx={{ borderColor: "grey.500", color: "gray" }}
          // onClick={filterData}
        >
          <SearchIcon className="cursor-pointer" />
        </Button>
        <Button className="rounded-md text-gray-500 h-9" type="button">
          <TuneIcon className="cursor-pointer" />
        </Button>
      </div>
      {spinner ? (
        <div className="grid justify-center">
          <LoadingSpinner />
        </div>
      ) : null}
      {data.hasOwnProperty("result") &&
      data.result.length > 0 &&
      data.statusCode === 200 &&
      spinner === false ? (
        <DoctorListingTable
          tableApiFunc={fetchDoctorList}
          searchString={searchString}
          dataResult={dataResult}
          setDataResult={setDataResult}
          data={data}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={count}
          // editRow={editRow}
          // setOpen={setOpen}
          // deleteRow={deleteRow}
          // displayView={displayView}
        />
      ) : null}
      {recordWarning === true && spinner === false ? (
        <div className="flex justify-center">
          <h3 className="flex justify-center mt-20 font-bold text-gray-600">
            No Records Found...
          </h3>
        </div>
      ) : null}

      {/* {data.result && data.result.length > 0 ? (
        <DoctorListTable
          data={data}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={count}

         
        />
      ) : (
        <div>No Records</div>
      )} */}
    </div>
  );
};

export default DoctorListing;
