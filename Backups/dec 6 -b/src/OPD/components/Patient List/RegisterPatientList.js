import React, { useEffect, useState } from "react";
import CommonSearchBar from "../../../Common Components/FormFieldsOmkar/CommonSearchBar";
import CommonMasterTable from "../../../Common Components/CommonTable/CommonMasterTable";
import {
  getRegisteredPatientList,
  getSearchOptionRegistrationList,
} from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import PatientInfo from "../../Common Components/TableComponent/PatientInfo";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import { useLocation } from "react-router-dom";

let inputSearchid = "";
const RegisterPatientList = (props) => {
  const [data, setData] = useState({ result: [], privileges: [] });
  const [list, setList] = useState();
  // const [selectedSearchKey, setSelectedSearchKey] = useState();
  // const [deletePatientId, setDeletePatientId] = React.useState();
  const [count, setCount] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [searchString, setSearchString] = useState("");
  const [dataResult, setDataResult] = useState([]);
  const [spinner, setSpinner] = React.useState(false);

  // const defaultParams = {
  //   page: page,
  //   size: rowsPerPage,
  //   searchString: searchString,
  // };
  const searchStringParams = {
    page: 0,
    size: rowsPerPage,
    searchString: searchString,
  };

  const location = useLocation();
  const patientData = location.state;
  let searchValue = null;
  if (patientData !== null) {
    searchValue = patientData;
  }

  useEffect(() => {
    if (searchValue !== null) {
      console.log("Search Value", searchValue);
      inputSearchid = searchValue.mobileNumber;
      setSearchString(inputSearchid);
    }
  }, [searchValue]);

  // const [senddefaultParams, setSendDefaultParams] = useState(defaultParams);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (data.privileges.length > 0) {
      data.privileges.map((item, index) => {
        let obj = props.routerLinks.find(
          (o) => o.routerLink === "/opd/patientregistrationform"
        );
        if (item.permission) {
          if (
            item.permission.toLowerCase() === "edit" ||
            item.permission.toLowerCase() === "view"
          ) {
            if (typeof obj !== "object") delete item.permission;
            props.routerLinks.push(item);
          }
        }
      });
    }
  }, [props.routerLinks, data]);
  // useEffect(() => {
  //   let myObj = {
  //     page: page,
  //     size: rowsPerPage,
  //     searchString: "",
  //   };
  //   // setSendDefaultParams(myObj);
  // }, [page, rowsPerPage]);

  //API to get Patient List
  useEffect(() => {
    console.log("searchStringParams", patientData);
    setSpinner(true);
    getRegisteredPatientList(searchStringParams)
      .then((response) => {
        if (response.data.statusCode === 200) {
          setSpinner(false);
          setData(response.data);
          setDataResult(response.data.result);
          setCount(response.data.count);
          console.log("RES", dataResult);
        }
      })
      .catch((response) => {
        setSpinner(false);
        console.log(response);
      });
  }, [searchString]);

  //API to get Searched Data List
  // const getSearchKey = () => {
  //   console.log("searchkey", selectedSearchKey);
  //   // let searchStringData = searchkey.mobileNumber;
  //   if (
  //     typeof selectedSearchKey !== "undefined" ||
  //     selectedSearchKey !== null
  //   ) {
  //     defaultParams.searchString = selectedSearchKey;
  //     getRegisteredPatientList(defaultParams)
  //       .then((response) => {
  //         console.log(response.data);
  //         setData(response.data);
  //         setCount(response.data.count);
  //       })
  //       .catch((response) => {
  //         console.log(response);
  //       });
  //   }
  // };

  //API to Get Search Options in Dropdown Menu
  const handleInputChange = (enteredData) => {
    console.log(enteredData);
    let searchString = enteredData;
    if (enteredData.length > 0) {
      getSearchOptionRegistrationList(searchString)
        .then((response) => {
          console.log("response1", response.data.result);
          setList(response.data.result);
          // defaultParams.searchString(response.data.result.label);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  // const handleDelete = (deleteId) => {
  //   setDeletePatientId(deleteId["Patient Id"]);
  //   setOpen(true);
  // };

  // const handleDeletePatient = (id) =>{
  //     console.log("Patient Id", id)
  // }

  return (
    <div className="py-1 mt-16 mx-4 w-full">
      <p className="text-center text-2xl my-2 text-gray-700 font-Poppins">
        Patient List
      </p>
      <div className="flex w-9/12 lg:w-6/12">
        <SearchBar
          type="button"
          name="searchableSelect"
          placeholder="Search by Patient Name Mobile No."
          isSearchable={true}
          handleInputChange={handleInputChange}
          onChange={(e) => {
            console.log("MobileNo.", e);
            if (e !== null) {
              inputSearchid = e.mobileNumber;
              console.log("inputSearchid", inputSearchid);
              // setSelectedSearchKey(e.mobileNumber);
            } else {
              inputSearchid = "";
              setSearchString(inputSearchid);
              setPage(0);
            }
          }}
          dataArray={list}
        />
        <button
          className="border border-gray-500 rounded-md h-[2.3rem] ml-5 w-16 cursor-pointer p-1"
          onClick={(e) => {
            console.log("inputSearchid", inputSearchid);
            setSearchString(inputSearchid);
            setPage(0);
          }}
        >
          <SearchRoundedIcon />
        </button>
      </div>
      {spinner ? (
        <div className="grid justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-[98%]">
          {data.result && data.result.length > 0 ? (
            <PatientInfo
              tableApiFunc={getRegisteredPatientList}
              searchString={searchString}
              dataResult={dataResult}
              setDataResult={setDataResult}
              data={data}
              setData={setData}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              count={count}
            />
          ) : (
            <div className="">
              <div className="container w-full grid lg:grid-cols-1 pt-20 md:w-full mt-8 md:rounded-md mx-auto lg:px-24 md:px-10">
                <div className="">
                  <div className="row ">
                    <div className="w-[100%] flex justify-between items-center  mt-4 rounded">
                      <div className="text-gray-500 font-bold text-left ">
                        <h1 className="text-base">No Records Found</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* //Confirmation Modal// */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className=" justify-center align-middle">
            <p className="my-3">Are You Sure ?</p>
            <div>
              <Button
                variant="outlined"
                color="error"
                sx={{ marginX: "1rem", border: "2px solid" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              {isLoading ? (
                "Deleting..."
              ) : (
                <Button
                  // type="submit"
                  variant="outlined"
                  color="success"
                  sx={{ marginRight: "1rem", border: "2px solid" }}
                  onClick={() => handleFormSubmit()}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </Box>
      </Modal> */}
      <ConfirmationModal
        confirmationOpen={open}
        confirmationHandleClose={handleClose}
        confirmationSubmitFunc={() => handleDeletePatient(deletePatientId)}
        confirmationLabel="Confirmation "
        confirmationMsg="Are You Sure ?"
        confirmationButtonMsg="Proceed"
      />
    </div>
  );
};

export default RegisterPatientList;
