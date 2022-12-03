///imports from react library
import * as React from "react";
import { useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VitalModal from "../vital/VitalModal";
//internal project functions and componants import
import {
  autoSearchVital,
  fetchAllVital,
  deleteVitalById,
} from "../../../services/opd/VitalService";
import CommonMasterTable from "../../common/CommonMasterTable";
//fromfield control liberary componant import
import SearchBar from "../../common/formfields/SearchBar";
import ConfirmationModal from "../../common/formfields/ConfirmationModal";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../Common Components/Toasts/Toasts";
//searchObj is sent with the POST request(set page size and page)
const searchObj = {
  page: 0,
  size: 10,
  searchString: "",
};
//function start
export default function Vital() {
  //state vaiable
  //useState and handle Methods for Modal Open & Close
  const [open, setOpen] = React.useState(false);
  const handelOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = React.useState("");
  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = React.useState(false);

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(true);
    }
  };
  //Set the searchObj into the component variable
  const searchVital = {
    page: 0,
    size: 10,
    searchString: "",
  };
  const [edit, setEdit] = React.useState();
  const [idValue, setIdValue] = React.useState("");

  //The state variable to store the data coming from the api
  const [data, setData] = React.useState({ result: [], actions: [] });

  //state variable for search bar
  const [options, setOptions] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  // A function that converts the json object into string format
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  //Before the component gets mounted , call the asynchronous function fetchAllApptBookingSource(). And resolve the promise returned by that function.
  useEffect(() => {
    populateTable(searchObj);
  }, []);

  //populate the CommonMasterTable using the function populateTable
  function populateTable(searchParameter) {
    fetchAllVital(searchParameter)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setData(res);
      });
  }
  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    console.log("Search icon has been clicked");

    console.log(
      "selected obj in filterData function is " + JSON.stringify(selectedObj)
    );

    console.log(typeof selectedObj);

    try {
      if (
        typeof selectedObj !== "string" &&
        selectedObj.hasOwnProperty("vital") &&
        selectedObj.vital !== ""
      ) {
        searchVital.searchString = selectedObj.vital;
        console.log("if block's populateTable");
        populateTable(searchSymptoms);
      }
    } catch (err) {
      console.log("Selected object has empty or no search string");
    }
  };

  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
      autoSearchVital(autoSearchString)
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

    if (value === null) {
      searchVital.searchString = "";
      populateTable(searchVital);
    }
    setSelectedObj(value);
  };

  //event listener function for edit icon
  function editRow(vital) {
    setEdit(true);
    console.log(vital);
    console.log(vital.Id);
    setIdValue(vital.Id);

    //When we click on edit pencil ; show Cancel and Update button
    handelOpen();
  }

  //event listener function for view functionality
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  // function to delete the table data
  function deleteRow(row) {
    handelOpenChild();
    console.log(row.Id);
    setDeleteId(row.Id);
  }

  //event listener function for the Delete button on the Confirmation modal
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");

    deleteVitalById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert();
        }

        //Close the confirmation modal for delete
        handleCloseChild();
      })
      .catch(() => {
        //Code for React Toast
        errdeleteAlert();
        //Close the confirmation modal for delete
        handleCloseChild();
      });
  }

  //start JSX Elements
  return (
    <>
      <div className="w-full px-6">
        <div className="w-full grid pt-20  mt-8 md:rounded-md">
          <div className="">
            <div className="row ">
              {/* search TextField */}
              <div className="flex lg:grid lg:grid-cols-2 gap-4">
                <div>
                  <SearchBar
                    selectedObj={selectedObj}
                    type="button"
                    name="SearchableSelect"
                    placeholder="Search by Vital Name"
                    dataArray={options}
                    isSearchable={true}
                    //change option as per user input
                    handleInputChange={handleChange}
                    //after search user get specific value
                    selectedValue={autoSelectedValue}
                  />
                </div>

                <div className="flex gap-2">
                  <div>
                    {/* outlined search icon */}
                    <Button
                      className=" h-10 w-10   rounded-md text-gray-500"
                      type="button"
                      variant="outlined"
                      size="small"
                      sx={{ borderColor: "grey.500", color: "gray" }}
                      onClick={filterData}
                    >
                      <SearchIcon className="cursor-pointer" />
                    </Button>
                  </div>
                  {/* Filter button  and icon*/}
                  <div className="">
                    <Button
                      className=" h-10 w-10 -m-200 rounded-md text-gray-500"
                      size="small"
                      // onClick={() => setOpen((oldState) => !oldState)}
                    >
                      <TuneIcon className="cursor-pointer" />
                    </Button>
                  </div>
                </div>

                {/* search textfield end */}
              </div>
              {/* Model and table name start */}
              <div className="w-[100%] flex justify-between items-center lg:px-0 mt-4 rounded  ">
                <div className="text-gray-500 font-bold text-left text-base">
                  Vitals
                </div>
                <div className="grid justify-end">
                  <Button
                    type="submit"
                    variant="outlined"
                    size="small"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "35px",
                      minWidth: "120px",
                      minHeight: "35px",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                    onClick={() => {
                      handelOpen();
                      setEdit(false);
                    }}
                  >
                    + Add New
                  </Button>
                  {open ? (
                    <VitalModal
                      handleClose={handleClose}
                      edit={edit}
                      setEdit={setEdit}
                      setOpen={setOpen}
                      open={open}
                      handelOpen={handelOpen}
                      idValue={idValue}
                      populateTable={populateTable}
                      searchObj={searchObj}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <ConfirmationModal
              confirmationOpen={openChild}
              confirmationHandleClose={handleCloseChild}
              confirmationSubmitFunc={deleteRecord}
              confirmationLabel="Confirmation "
              confirmationMsg="Are you sure you want to delete this record ?"
              confirmationButtonMsg="Delete"
            />
          </div>
        </div>
        {/* if record avaible in data.result more than 0 show record or show no record found */}
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 ? (
          <CommonMasterTable
            data={data}
            editRow={editRow}
            setOpen={setOpen}
            deleteRow={deleteRow}
            displayView={displayView}
          />
        ) : (
          <div>
            {/* loading spinner add here */}
            <h3 className="flex justify-center mt-20">No Records Found...</h3>
          </div>
        )}
      </div>
    </>
  );
  // end JSX
}
// end Organization function
