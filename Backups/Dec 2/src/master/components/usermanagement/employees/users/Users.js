//imports from react library
import * as React from "react";
import { useEffect } from "react";
//mui componants and icons
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
//internal project functions and componants import
import {
  fetchAllUsers,
  deleteUserById,
  autoSearchUsers,
} from "../../services/users/UserServices";
import AddNewButton from "../../../../../Common Components/Buttons/AddNewButton";
import UserTable from "../users/UserTable";
//fromfield control liberary componant import
import DropdownField from "../../../common/formfields/DropdownField";
import SearchBar from "../../../../../Common Components/FormFields/SearchBar";
//LodingSpinner
import LoadingSpinner from "../../../../components/common/loadingspinner/loadingSpinner";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import UsersModal from "../users/UsersModal";
//function start
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";
export default function Users() {
  //searchObj is sent with the POST request(set page size and page)
  const searchObj = {
    page: page,
    size: rowsPerPage,
    searchString: searchString,
  };
  let searchValue = "";
  //state variable to indicate the page number
  const [page, setPage] = React.useState(0);

  //state variable to inidicate rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //state variable to indicate the total number of records coming from api
  const [count, setCount] = React.useState();
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [selectedObj, setSelectedObj] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  //The state variable to store the data coming from the api
  const [data, setData] = React.useState({ result: [], actions: [] });
  // for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [recordWarning, showRecordWarning] = React.useState(false);
  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);
  //add edit update and cancel button
  const [edit, setEdit] = React.useState(false);

  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = React.useState("");
  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = React.useState(false);

  const [countClick, setCountClick] = React.useState(0);

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idValue, setIdValue] = React.useState("");
  const [userValue, setUserValue] = React.useState();

  let UserList = {
    statusCode: "",
    result: [],
    actions: [],
  };

  //event listener function for edit icon
  function editRow(user) {
    console.log("user", user);
    setUserValue(user);
    setEdit(true);
    setIdValue(user.id);
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

  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchUsers(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          setOptions(res.result);
        });
    }
  };
  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
    if (value !== null) {
      searchValue = value.label;
    } else {
      searchValue = "";
      setPage(0);
      setSearchString(searchValue);
    }
  };

  //populate the CommonMasterTable using the function populateTable
  function populateTable() {
    let obj = {
      page: page,
      size: rowsPerPage,
      searchString: searchString,
    };
    showSpinner(true);
    showRecordWarning(false);
    fetchAllUsers(obj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          UserList.result.push(jsonObject);
        });

        UserList.actions = [...res.actions];
        UserList.statusCode = res.statusCode;
        console.log(UserList);
        setData(UserList);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  }

  const stringSearchObj = {
    page: 0,
    size: rowsPerPage,
    searchString: searchString,
  };

  useEffect(() => {
    callTableDataApi();
  }, [searchString]);

  const callTableDataApi = () => {
    showSpinner(true);
    showRecordWarning(false);
    fetchAllUsers(stringSearchObj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          UserList.result.push(jsonObject);
        });

        UserList.actions = [...res.actions];
        UserList.statusCode = res.statusCode;
        console.log(UserList);
        setData(UserList);
        setDataResult(UserList.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  return (
    <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
      <div className="flex justify-center text-xl">
        <h1 className=" text-gray-700 font-Poppins lg:hidden ">User</h1>
      </div>

      {/*searchable dropdown */}
      <div className="flex gap-2 w-full items-center mt-2">
        {/* <div className=" flex items-center w-full gap-14"> */}
        <h1 className="text-xl text-gray-700 font-Poppins hidden lg:block">
          User
        </h1>
        <div className="flex w-full lg:grid grid-cols-2 gap-2 items-center ">
          <div className="grid w-full grid-cols-1">
            <SearchBar
              selectedObj={selectedObj}
              type="button"
              name="SearchableSelect"
              placeholder="Search by User Code / Name"
              dataArray={options}
              isSearchable={true}
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
        <CommonBackDrop openBackdrop={openBackdrop} />
      </div>

      {spinner ? (
        <div className="grid justify-center">
          <LoadingSpinner />
        </div>
      ) : null}

      {/* CommonMasterTable Component */}
      {data.hasOwnProperty("result") &&
      data.result.length > 0 &&
      data.statusCode === 200 &&
      spinner === false ? (
        <UserTable
          tableApiFunc={fetchAllUsers}
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
          // deleteRow={deleteRow}
          displayView={displayView}
        />
      ) : null}

      {/* do not show "No Records found" when data is loading ; AND when the data has arrived successfully*/}
      {recordWarning === true && spinner === false ? (
        <div className="flex justify-center">
          <h3 className="flex justify-center mt-20 font-bold text-gray-600">
            No Records Found...
          </h3>
        </div>
      ) : null}
      <UsersModal
        userValue={userValue}
        populateTable={populateTable}
        searchObj={searchObj}
        edit={edit}
        setEdit={setEdit}
        open={open}
        setOpen={setOpen}
        idValue={idValue}
        openBackdrop={openBackdrop}
        setOpenBackdrop={setOpenBackdrop}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <ConfirmationModal
        confirmationOpen={openChild}
        confirmationHandleClose={handleCloseChild}
        // confirmationSubmitFunc={deleteRecord}
        confirmationLabel="Confirmation "
        confirmationMsg="Are you sure want to delete this record ?"
        confirmationButtonMsg="Delete"
      />
    </div>
  );
}
