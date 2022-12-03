import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CommonMasterTable from "../../common/CommonMasterTable";
import SearchBar from "../../../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import PathologyProfileModal from "./PathologyProfileModal";

const PathologyProfile = () => {
  let myResult = [
    {
      Id: 1,
      CategoryCode: "018",
      CategoryShortName: "Bio",
      CategoryName: "BIOCHEMISTRY",
    },
    {
      Id: 2,
      CategoryCode: "019",
      CategoryShortName: "Ser",
      CategoryName: "SEROLOGY",
    },
  ];

  const [open, setOpen] = useState(false);

  const [idValue, setIdValue] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const [edit, setEdit] = useState(false);

  //The state variable to store the data coming from the api
  const [data, setData] = useState({ result: [], actions: [] });

  useEffect(() => {
    //console.log("result",result)
    setData({
      result: myResult,
      actions: ["Edit", "Delete"],
    });
    console.log("Data", data);
  }, []);

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

  return (
    <div className="w-full px-6">
      <div className="container  w-[100%] grid px-2 lg:px-5  pt-20  mt-8 md:rounded-md">
        <div className="">
          <div className="row ">
            {/* search TextField */}
            <div className="flex lg:grid lg:grid-cols-2 gap-4">
              {/* searchable */}
              <SearchBar
                type="button"
                name="SearchableSelect"
                placeholder="Search by Profile Code/Name"
              />

              <div className="flex gap-2 ">
                <Button
                  className=" h-10 w-10 px-2 rounded-md text-gray-500"
                  type="button"
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: "grey.500", color: "gray" }}
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
            </div>

            {/* Add button to open the Modal Form and table name start */}
            <div className="flex justify-between items-center w-full  mt-4 rounded">
              <div className="text-gray-500 font-bold text-left text-base">
                Lab Pathology Profile
              </div>

              <div className="grid justify-end">
                {/* When the Add button is clicked ; the modal form opens */}
                <Button
                  type="button"
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
                  Add
                </Button>

                {/* Body of country Modal form */}
                {open ? (
                  <PathologyProfileModal
                    handleClose={handleClose}
                    edit={edit}
                    setEdit={setEdit}
                    setOpen={setOpen}
                    open={open}
                    handelOpen={handelOpen}
                    idValue={idValue}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* <ConfirmationModal
              confirmationOpen={openChild}
              confirmationHandleClose={handleCloseChild}
              confirmationSubmitFunc={deleteRecord}
              confirmationLabel="Confirmation "
              confirmationMsg="Are You Sure you want to delete the record?"
              confirmationButtonMsg="Delete"
            /> */}

          {/* CommonMasterTable Component */}
          {/* {data.hasOwnProperty("result") &&
            data.result.length > 0 &&
            data.statusCode === 200 ? (
              <CommonMasterTable
                //data to be displayed
                data={data}
                editRow={editRow}
                setOpen={setOpen}
                deleteRow={deleteRow}
                displayView={displayView}
              />
            ) : (
              <div>
                <h3 className="flex justify-center mt-20">
                  No Records Found...
                </h3>
              </div>
            )} */}
          {data && data.result.length > 0 && (
            <CommonMasterTable
              //data to be displayed
              data={data}
              //editRow={editRow}
              setOpen={setOpen}
              //deleteRow={deleteRow}
              displayView={displayView}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PathologyProfile;
