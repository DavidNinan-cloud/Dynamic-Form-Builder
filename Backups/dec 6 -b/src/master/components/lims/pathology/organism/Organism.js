import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CommonMasterTable from "../../common/CommonMasterTable";
import SearchBar from "../../../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import OrganismModal from "./OrganismModal";
import {
  autoSearchOrganism,
  fetchAllOrganisms,
  deleteOrganismById,
} from "../../../../services/lims/pathology/OrganismServices";
import OrganismTable from "./OrganismTable";
import LoadingSpinner from "../../../../../Common Components/loadingspinner/loadingSpinner";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import AddNewButton from "../../../../../Common Components/Buttons/AddNewButton";
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";

const Organism = () => {
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = useState(false);
  let searchValue = "";
  const [searchString, setSearchString] = useState("");
  const [options, setOptions] = React.useState([]);
  const [data, setData] = useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = useState([]);
  const [count, setCount] = useState();
  const [spinner, showSpinner] = useState(false);
  const [recordWarning, showRecordWarning] = useState(false);
  const [idValue, setIdValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteId, setDeleteId] = useState("");

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [edit, setEdit] = useState(false);

  //The state variable to store the data coming from the api

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = React.useState(false);

  //function to open the confirmation modal
  const handelOpenChild = () => setOpenChild(true);

  //function to close the confirmation modal
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  //handelOpen function opens the modal form
  const handelOpen = () => setOpen(true);

  //handelClose function closes the modal form
  const handleClose = () => setOpen(false);

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  useEffect(() => {
    showSpinner(true);
    showRecordWarning(false);
    let defaultParams = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    fetchAllOrganisms(defaultParams)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        console.log("res.result", res.result);
        let organimsList = [];
        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          organimsList.push(jsonObject);
        });
        console.log("organimsList", organimsList);

        setData(res);
        setCount(res.count);
        setDataResult([...organimsList]);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  }, [searchString]);

  const filterData = () => {
    setPage(0);
    console.log("filter");
    console.log("The search value is " + searchValue);
    setSearchString(searchValue);
  };

  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");

    console.log("The value typed by the user is " + autoSearchString);

    if (autoSearchString !== "") {
      console.log(autoSearchString);
      searchValue = autoSearchString;
      autoSearchOrganism(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setOptions(res.result);
        });
    }
  };

  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );

    if (value === null) {
      setSearchString("");
    } else {
      searchValue = value.Organism;
    }
  };

  const populateTable = () => {
    console.log("populateTable has been called");
    let obj = {
      page: 0,
      size: rowsPerPage,
      searchString: searchString,
    };
    setPage(0);
    showSpinner(true);
    showRecordWarning(false);
    fetchAllOrganisms(obj)
      .then((response) => {
        console.log("The search result is " + JSON.stringify(response.data));
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        let organimsList = [];
        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          organimsList.push(jsonObject);
        });
        console.log("organimsList", organimsList);

        setData(res);
        setCount(res.count);
        setDataResult([...organimsList]);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");
    handleCloseChild();
    setOpenBackdrop(true);
    deleteOrganismById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert();
          setOpenBackdrop(false);
        }

        //Close the confirmation modal for delete
        handleCloseChild();
      })
      .catch(() => {
        //Code for React Toast
        errdeleteAlert();
        setOpenBackdrop(false);
        //Close the confirmation modal for delete
        handleCloseChild();
      });
  }

  function deleteRow(row) {
    console.log("row", row);
    //open the confirmation modal
    handelOpenChild();
    console.log(row.id);
    setDeleteId(row.id);
  }

  function editRow(organism) {
    setEdit(true);
    console.log("organism", organism);
    console.log(organism.id);
    setIdValue(organism.id);

    //When we click on edit pencil ; show Cancel and Update button

    //open the modal form
    handelOpen();
  }

  return (
    <div className="w-full px-6">
      <div className="container  w-[100%] grid px-2 lg:px-5  pt-10  mt-8 md:rounded-md">
        <div className="">
          <div className="row ">
            {/* <div className="flex lg:grid lg:grid-cols-2 gap-4">
              <h1 className="text-xl text-gray-700 font-Poppins ">
                Organism Master
              </h1>

              <SearchBar
                type="button"
                name="SearchableSelect"
                placeholder="Search by Organism Code/Category"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />

              <div className="flex gap-2 ">
                <Button
                  className=" h-10 w-10 px-2 rounded-md text-gray-500"
                  type="button"
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: "grey.500", color: "gray" }}
                  onClick={filterData}
                >
                  <SearchIcon className="cursor-pointer" />
                </Button>
                <Button
                  className=" h-11 w-10 px-2 rounded-md text-gray-500"
                  type="button"
                >
                  <TuneIcon className="cursor-pointer" />
                </Button>
              </div>
            </div> */}

            {/* Add button to open the Modal Form and table name start */}
            <div className="flex justify-between items-center w-full  mt-4 rounded">
              <div className="flex items-center gap-x-2 w-full xl:w-3/5">
                <h1 className="text-xl text-gray-700 font-Poppins ">
                  Organism Master
                </h1>
                <SearchBar
                  type="button"
                  name="SearchableSelect"
                  placeholder="Search by Organism Code/Name"
                  dataArray={options}
                  handleInputChange={handleChange}
                  onChange={autoSelectedValue}
                />
                <Button
                  className=" h-10 w-10 px-2 rounded-md text-gray-500"
                  type="button"
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: "grey.500", color: "gray" }}
                  onClick={filterData}
                >
                  <SearchIcon className="cursor-pointer" />
                </Button>
                <Button
                  className=" h-11 w-10 px-2 rounded-md text-gray-500"
                  type="button"
                >
                  <TuneIcon className="cursor-pointer" />
                </Button>
              </div>

              <div className="grid justify-end">
                <AddNewButton
                  onClick={() => {
                    handelOpen();
                    setEdit(false);
                  }}
                />

                {/* Body of country Modal form */}
                {open ? (
                  <OrganismModal
                    handleClose={handleClose}
                    edit={edit}
                    setEdit={setEdit}
                    setOpen={setOpen}
                    open={open}
                    handelOpen={handelOpen}
                    idValue={idValue}
                    populateTable={populateTable}
                    openBackdrop={openBackdrop}
                    setOpenBackdrop={setOpenBackdrop}
                  />
                ) : null}
              </div>
              <CommonBackDrop openBackdrop={openBackdrop} />
            </div>
          </div>

          <ConfirmationModal
            confirmationOpen={openChild}
            confirmationHandleClose={handleCloseChild}
            confirmationSubmitFunc={deleteRecord}
            confirmationLabel="Confirmation "
            confirmationMsg="Are You Sure you want to delete the record?"
            confirmationButtonMsg="Delete"
          />

          {/* CommonMasterTable Component */}
          {data.hasOwnProperty("result") &&
          data.result.length > 0 &&
          data.statusCode === 200 &&
          spinner === false ? (
            <OrganismTable
              tableApiFunc={fetchAllOrganisms}
              searchString={searchString}
              dataResult={dataResult}
              setDataResult={setDataResult}
              populateTable={populateTable}
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

          {recordWarning === true && spinner === false ? (
            <div className="flex justify-center">
              <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                No Records Found...
              </h3>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Organism;
