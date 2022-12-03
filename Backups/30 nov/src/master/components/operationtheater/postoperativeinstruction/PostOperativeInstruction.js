import * as React from "react";
import { useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../Common Components/Toasts/Toasts";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
//internal project functions and componants import
import {
  autoSearchSubDepartments,
  fetchAllSubDepartments,
  deleteSubDepartmentById,
} from "../../../services/organization/SubDepartmentServices";
import AddNewButton from "../../../../Common Components/Buttons/AddNewButton";

import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import CommonMasterTable from "../../../../Common Components/CommonTable/CommonMasterTable";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";

import PostOperativeInstructionModal from "../../operationtheater/postoperativeinstruction/PostOperativeInstructionModel"
export default function PostOperativeInstruction() {
  let searchValue = "";
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  // for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const [countClick, setCountClick] = React.useState(0);

  const [options, setOptions] = React.useState([]);
  //add edit update and cancel button
  const [edit, setEdit] = React.useState(false);

  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = React.useState("");

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  const [recordWarning, showRecordWarning] = React.useState(false);

  const [openChild, setOpenChild] = React.useState(false);

  const handelOpenChild = () => setOpenChild(true);

  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idValue, setIdValue] = React.useState("");
  let departmentList = {
    statusCode: "",
    result: [],
    actions: [],
  };

  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllSubDepartments(defaultParams)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setData(res);
        setCount(res.count);
        setDataResult(res.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  }, [searchString]);


  //event listener function for edit icon
  function editRow(department) {
    setEdit(true);
    console.log("department object is " + JSON.stringify(department));
    console.log("Required id is deptId" + department.id);
    setIdValue(department.id);
    //open the modal form
    handleOpen();
  }

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }
 //event listener function for the magnifying glass icon of the search bar
 const filterData = () => {
  setPage(0);
  setSearchString(searchValue);
};
   //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
   const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
    if (value === null) {
      setSearchString("");
    } else {
      searchValue = value.subDepartment;
    }
  };
  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchSubDepartments(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          setOptions(res.result);
        });
    }
  };

    // function to delete the table data
    function deleteRow(row) {
      handleOpenChild();
      console.log(row.Id);
      setDeleteId(row.Id);
      if (countClick === 0) {
        setCountClick(countClick + 1);
      }
    }
  
  
  
  return (
    <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
      <div className="flex justify-center text-xl">
          <h1 className=" text-gray-700 font-Poppins lg:hidden ">
          Post Operative Instructions
          </h1>
        </div>

      {/*searchable dropdown */}
      <div className="flex gap-2 w-full items-center mt-2">
          {/* <div className=" flex items-center w-full gap-14"> */}
          <h1 className="text-xl text-gray-700 font-Poppins hidden lg:block lg:w-[40%] md:w-[0%]">
          Post Operative Instructions
          </h1>

        <div className="flex w-full lg:grid grid-cols-2 gap-2 items-center ">
          <div className="grid w-full grid-cols-1">
            <SearchBar
              name="SearchableSelect"
              placeholder="Search by   Code / Description"
              dataArray={options}
              handleInputChange={handleChange}
              onChange={autoSelectedValue}
            />
          </div>
          <div className="flex  gap-2">
            <Button
              className=" h-9 w-10 px-2 rounded-md text-gray-500"
              type="button"
              variant="outlined"
              size="small"
              sx={{ borderColor: "grey.500", color: "gray" }}
              onClick={filterData}
            >
              <SearchIcon className="cursor-pointer" />
            </Button>
            <Button
              className=" h-9 w-10 px-2 rounded-md text-gray-500"
              type="button"
            >
              <TuneIcon className="cursor-pointer" />
            </Button>
          </div>
        </div>
        {/* </div> */}

        <div className="grid justify-end xl:col-span-3 w-1/3">
          {/* Modal for Add */}
          <AddNewButton
            onClick={() => {
              handleOpen();
            }}
          />
        </div>
      </div>

      {spinner ? (
        <div className="grid justify-center pt-28">
          <LoadingSpinner />
        </div>
      ) : null}

      
{data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <CommonMasterTable
            tableApiFunc={fetchAllSubDepartments}
            searchString={searchString}
            dataResult={dataResult}
            setDataResult={setDataResult}
            data={data}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            count={count}
            editRow={editRow}
            setOpen={setOpen}
            deleteRow={deleteRow}
            displayView={displayView}
          />
        ) : null}



      {/* do not show "No Records found" when data is loading ; AND when the data has arrived successfully*/}
      {recordWarning === true && spinner === false ? (
        <div className="flex justify-center">
          <h3 className="flex justify-center mt-28 font-bold text-gray-600">
            No Records Found...
          </h3>
        </div>
      ) : null}

      {/* edit */}

      <PostOperativeInstructionModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      setEdit={setEdit}
      edit={edit}
      />
      
      {/* delete */}
      <ConfirmationModal
        confirmationOpen={openChild}
        confirmationHandleClose={handleCloseChild}
        
        confirmationLabel="Confirmation "
        confirmationMsg="Are you sure want to delete this record ?"
        confirmationButtonMsg="Delete"
      />
    </div>
  );
}
