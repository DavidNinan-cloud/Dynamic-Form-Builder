import React, { useState, useEffect } from "react";
import SearchBar from "../../../../../Common Components/FormFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import AddNewButton from "../../../../../Common Components/Buttons/AddNewButton";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";
import TestCreationModal from "./TestCreationModal";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";

const TestCreation = () => {
  const [open, setOpen] = useState(false);

  const handelOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-full px-6">
      <div className="container  w-[100%] grid px-2 lg:px-5  pt-10  mt-8 md:rounded-md">
        <div className="">
          <div className="row ">
            <div className="flex justify-between items-center w-full  mt-2 rounded">
              <div className="flex items-center space-x-4 w-full">
                <h1 className="text-xl text-gray-700 font-Poppins ">
                  Test Creation
                </h1>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-x-2 w-full xl:w-3/5">
                    <SearchBar
                      type="button"
                      name="SearchableSelect"
                      placeholder="Search by Test Code/Description"
                      //dataArray={options}
                      //handleInputChange={handleChange}
                      //onChange={autoSelectedValue}
                    />

                    <Button
                      className=" h-10 w-10 px-2 rounded-md text-gray-500"
                      type="button"
                      variant="outlined"
                      size="small"
                      sx={{ borderColor: "grey.500", color: "gray" }}
                      //   onClick={filterData}
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
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* <CommonBackDrop openBackdrop={openBackdrop} /> */}
            {open ? (
              <TestCreationModal
                handleClose={handleClose}
                // edit={edit}
                //  setEdit={setEdit}
                setOpen={setOpen}
                open={open}
                handelOpen={handelOpen}
                // idValue={idValue}
                //  populateTable={populateTable}
                //  openBackdrop={openBackdrop}
                //  setOpenBackdrop={setOpenBackdrop}
              />
            ) : null}
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
          data.statusCode === 200 &&
          spinner === false ? (
            <CommonMasterTable
              //data to be displayed
              dataResult={dataResult}
              tableApiFunc={fetchAllTests}
              setDataResult={setDataResult}
              searchString={searchString}
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
              // DownloadTableData={DownloadTableData}
            />
          ) : null} */}

          {/* {recordWarning === true && spinner === false ? (
            <div className="flex justify-center">
              <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                No Records Found...
              </h3>
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default TestCreation;
