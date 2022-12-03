import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import { getDepartmentlist } from "../../../services/consentmaster/ConsentMasterService";
// import ConsentMasterTable from "./ConsentMasterTable";
import ModalConsentMaster from "./ModalConsentMaster";
import AddNewButton from "../../../../Common Components/Buttons/AddNewButton";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import CommonMasterTable from "../../../../Common Components/CommonTable/CommonMasterTable";
import SearchIconButton from "../../../../Common Components/Buttons/SearchIconButton";

let ConsentMasterData = {
  message: "Consent Masters list found ",
  result: [
    {"Sr No":1,
      Department: "Cardiology",
      "Template Name": "EXPLORATORY TYMPANOTO",
      "Status": true,
    },
    {"Sr No":2,
      Department: "Dermatology",
      "Template Name": "MYRINGOTOMY AND / OR GRAMMET",
      "status": false,
    },
    {"Sr No":3,
      Department: "Emergency",
      "Template Name": "A BOLLOON SINAPLASTY PROCEDURE",
      "Status": false,
    },
    {"Sr No":4,
      Department: "Outpatient Department",
      "Template Name": "SLEEP STUDY",
      "Status": true,
    },
    {"Sr No":5,
      Department: "Critical Care",
      "Template Name": "SEPTOPLASTY",
      "Status": true,
    },
    {"Sr No":6,
      Department: "Outpatient Department",
      "Template Name": "A BOLLOON SINAPLASTY PROCEDURE",
      "Status": false,
    },
    {"Sr No":7,
      Department: "Dermatology",
      "Template Name": "SEPTOPLASTY",
      "Status": true,
    },
    {"Sr No":8,
      Department: "Emergency",
      "Template Name": "EXPLORATORY TYMPANOTO",
      "Status": true,
    },
    // {
      // "Sr No":9,
    //   Department: "Critical Care",
    //   "Template Name": "A BOLLOON SINAPLASTY PROCEDURE",
    //   "Status": "True",
    // },
    // {
           // "Sr No":10,
    //   Department: "Outpatient Department",
    //   "Template Name": "SEPTOPLASTY",
    //   "Status": "False",
    // },
    // {
           // "Sr No":11,
    //   Department: "Emergency",
    //   "Template Name": "A BOLLOON SINAPLASTY PROCEDURE",
    //   "Status": "True",
    // },
    // {
           // "Sr No":12,
    //   Department: "Outpatient Department",
    //   "Template Name": "SEPTOPLASTY",
    //   "Status": "False",
    // },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

let templatename = [
  {
   value:"EXPLORATORY TYMPANOTO",
   label:"EXPLORATORY TYMPANOTO",
  },
  {
    value:"SEPTOPLASTY",
    label:"SEPTOPLASTY",
  },
  {
    value:"MYRINGOTOMY AND / OR GRAMMET",
    label:"MYRINGOTOMY AND / OR GRAMMET",
  }
];

export default function ConsentMaster() {
  const defaultValues = {
    department: null,
    templateName: null,
  };

  let searchValue = "";
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const [department, setDepartment] = React.useState([]);

  //Add Edit Update Cancel Button
  const [edit, setEdit] = React.useState(false);
  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = React.useState("");
  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [idValue, setIdValue] = React.useState("");
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
  //useState and handle Methods for Modal Open & Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setData(ConsentMasterData);
    setDataResult(ConsentMasterData.result);
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmitDataHandler = (data) => {
    console.log(data);
  };

  //API For department dropdown list
  useEffect(() => {
    getDepartmentlist(department)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setDepartment(res.result);
      });
  }, []);

  //   useEffect(() => {
  //     showSpinner(true);
  //     showRecordWarning(false);
  //     let defaultParams = {
  //       page: 0,
  //       size: rowsPerPage,
  //       searchString: searchString,
  //     };
  //     fetchAllGender(defaultParams)
  //       .then((response) => {
  //         console.log("The search result is " + JSON.stringify(response.data));
  //         console.log(
  //           "1st record is : " + JSON.stringify(response.data.result[0])
  //         );
  //         return response.data;
  //       })
  //       .then((res) => {
  //         console.log("The input for setData function is " + JSON.stringify(res));
  //         setData(res);
  //         setCount(res.count);
  //         setDataResult(res.result);
  //         showSpinner(false);
  //       })
  //       .catch(() => {
  //         showSpinner(false);
  //         showRecordWarning(true);
  //       });
  //   }, [searchString]);

  //   //populate the ConsentMasterTable using the function populateTable
  //   const populateTable = () => {
  //     let obj = {
  //       page: 0,
  //       size: rowsPerPage,
  //       searchString: searchString,
  //     };
  //     setPage(0);
  //     showSpinner(true);
  //     showRecordWarning(false);
  //     fetchAllGender(obj)
  //       .then((response) => {
  //         console.log("The search result is " + JSON.stringify(response.data));
  //         setCount(response.data.count);
  //         return response.data;
  //       })
  //       .then((res) => {
  //         console.log("The input for setData function is " + JSON.stringify(res));
  //         setData(res);
  //         showSpinner(false);
  //         setDataResult(res.result);
  //       })
  //       .catch(() => {
  //         showSpinner(false); //when Data was not Found or fetchAllGender api is going into the error that time also Loading Spinner stop
  //         showRecordWarning(true);
  //       });
  //   };

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    setSearchString(searchValue);
  };

   //event listener function for edit icon
   function editRow(gender) {
    setEdit(true);
    console.log("gender object is " + JSON.stringify(gender));
    console.log("Required id is genderId" + gender.Id);
    setIdValue(gender.Id);
    handleOpen();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitDataHandler)} className="mx-2">
        <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
          <div className="grid justify-center text-xl">
            <h1 className="text-black font-Poppins ">Consent Master</h1>
          </div>

          {/*searchable dropdown */}
          <div className="grid grid-cols-3 pt-2 gap-2">
            <div className="w-full">
              <DropdownField
                control={control}
                name="department"
                dataArray={department}
                placeholder="Department"
                isSearchable={false}
              />
            </div>
            <div className="w-full">
              <DropdownField
                control={control}
                name="templateName"
                dataArray={templatename}
                placeholder="Template Name"
                isSearchable={false}
              />
            </div>
            <div className="w-full">
            <SearchIconButton
              onClick={()=>{
                console.log("Click SearchIcon Button");
               onClick={filterData}
              }} />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="grid items-end text-lg text-black  font-Poppins">
              Template Details
            </div>
            <AddNewButton
              onClick={() => {
                handleOpen();
              }}
            />
          </div>

          {/* Backdrop component to disable the screen after submitting the form */}
          <CommonBackDrop openBackdrop={openBackdrop} />

          {spinner ? (
            <div className="grid justify-center">
              <LoadingSpinner />
            </div>
          ) : null}

          {data.hasOwnProperty("result") &&
          data.result.length > 0 &&
          data.statusCode === 200 &&
          spinner === false ? (
            <CommonMasterTable
              //  tableApiFunc={fetchAllGender}
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
                // displayView={displayView}
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

          <ModalConsentMaster
            // populateTable={populateTable}
            edit={edit}
            setEdit={setEdit}
            open={open}
            setOpen={setOpen}
            idValue={idValue}
            handleOpen={handleOpen}
            handleClose={handleClose}
            openBackdrop={openBackdrop}
            setOpenBackdrop={setOpenBackdrop}
          />
        </div>
      </form>
    </>
  );
}
