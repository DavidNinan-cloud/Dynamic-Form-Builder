import * as React from "react";
import { useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import InstructionTable from "./InstructionTable";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import {
  fetchAllInstruction,  
  autoSearchInstruction,
  deleteInstructionById,
} from "../../../services/opd/instruction/InstructionServices";
import ModalInstruction from "./ModalInstruction";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import AddNewButton from "../../../../Common Components/Buttons/AddNewButton";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";
import SearchIconButton from "../../../../Common Components/Buttons/SearchIconButton";

export default function Instruction() {
  let searchValue = "";
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });

  // for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const [options, setOptions] = React.useState([]);
  const [edit, setEdit] = React.useState(false); //EditBtn and SaveBtn
  const [deleteId, setDeleteId] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [openChild, setOpenChild] = React.useState(false);
  const [idValue, setIdValue] = React.useState("");
  const handelOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let instructionList = {
    statusCode: "",
    result: [],
    actions: [],
  };

  const editRow = (instruction) => {
    setEdit(true);
    console.log("instruction object is " + JSON.stringify(instruction));
    console.log("Required id is cabinId" + instruction.id);
    setIdValue(instruction.id);
    handleOpen();
  };

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }

  //event listener function for the dustbin icon
  function deleteRow(row) {
    handelOpenChild();
    console.log(row.id);
    setDeleteId(row.id);
  }

  //event listener function for the Delete button on the Confirmation modal
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");
  
    handleCloseChild();
    setOpenBackdrop(true);
    deleteInstructionById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert(response.data.message);
          setOpenBackdrop(false);
        }
        handleCloseChild();
      })
      .catch((error) => {
        errdeleteAlert(error.message);
        setOpenBackdrop(false);
      });
  }

  //event listener for search icon
  const filterData = () => {
    console.log("filterData call");
    console.log("searchValue is");
    console.log(searchValue);
    setPage(0);
    setSearchString(searchValue);
  };

  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
        searchValue = autoSearchString;
        autoSearchInstruction(autoSearchString)
          .then((response) => response.data)
          .then((res) => {
            console.log("suggested Options are");
            console.log(res.result);
            setOptions(res.result);
          });
    }
  };

  const autoSelectedValue = (value) => {
    console.log("selected suggestions is ");
    console.log(value);
    if (value !== null) {
      searchValue = value.instruction;
    } else {
      console.log("value", value);
      searchValue = "";
      setPage(0);
      setSearchString(searchValue);
    }
  };

  const populateTable = () =>  {
    let obj= {
      page:0,
      size:rowsPerPage,
      searchString:searchString
    }
    setPage(0)
    showSpinner(true); // fetching data from server that time spinner show / loading
    showRecordWarning(false);
    fetchAllInstruction(obj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          instructionList.result.push(jsonObject);
        });

        instructionList.actions = [...res.actions];
        instructionList.statusCode = res.statusCode;
        console.log(instructionList);
        setData(instructionList);
        setDataResult(instructionList.result);
        showSpinner(false); //when fetch data or data show that time loading Spinner stop
      })
      .catch(() => {
        showSpinner(false); //when Data was not Found or fetchAllGender api is going into the error that time also Loading Spinner stop
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
    fetchAllInstruction(stringSearchObj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          instructionList.result.push(jsonObject);
        });

        instructionList.actions = [...res.actions];
        instructionList.statusCode = res.statusCode;
        console.log(instructionList);
        setData(instructionList);
        setDataResult(instructionList.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  return (
    <>
      <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl">
          <h1 className=" text-black font-Poppins lg:hidden ">
            Instruction
          </h1>
        </div>
        {/*searchable dropdown */}
        <div className="flex gap-2 w-full items-center mt-2">
          <h1 className="text-xl text-black font-Poppins hidden lg:block">
            Instruction
          </h1>

          <div className="grid grid-cols-6 xl:grid-cols-6 w-full gap-2 items-center ">
            <div className="w-full col-span-3 xl:col-span-2">
              <SearchBar
                name="SearchableSelect"
                placeholder="Search by InstructionCode/Description"
                dataArray={options}
                handleInputChange={handleChange}
                onChange={autoSelectedValue}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
              <SearchIconButton onClick={filterData} />
              <Button
                className=" h-9 w-10 px-2 rounded-md text-gray-500"
                type="button"
              >
                <TuneIcon className="cursor-pointer" />
              </Button>
            </div>
          </div>

          <div className="grid justify-end col-span-2 xl:col-span-3 w-full">
            {/* Modal for Add */}
            <AddNewButton onClick={() => {
                handleOpen();
              }}
              />
          </div>
        </div>
        <CommonBackDrop openBackdrop={openBackdrop} />
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
          <InstructionTable
            tableApiFunc={fetchAllInstruction}
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
            <h3 className="flex justify-center mt-20 font-bold text-gray-600">
              No Records Found...
            </h3>
          </div>
        ) : null}

        <ModalInstruction
          populateTable={populateTable}

          edit={edit}
          setEdit={setEdit}
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          idValue={idValue}
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
        />

        <ConfirmationModal
          confirmationOpen={openChild}
          confirmationHandleClose={handleCloseChild}
          confirmationSubmitFunc={deleteRecord}
          confirmationLabel="Confirmation "
          confirmationMsg="Are you sure want to delete this record ?"
          confirmationButtonMsg="Delete"
        />
      </div>
    </>
  );
}
