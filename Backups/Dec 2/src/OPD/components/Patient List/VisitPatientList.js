import React, { useEffect, useState } from "react";
import VisitCollapsibleTable from "../../Common Components/TableComponent/VisitCollapsibleTable";
import CommonSearchBar from "../../../Common Components/FormFieldsOmkar/CommonSearchBar";
import {
  callPatient,
  getSearchOptionVisitList,
  getVisitPatientList,
} from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../../../Common Components/loadingspinner/loadingSpinner";
import { warningAlert } from "../../../Common Components/Toasts/CustomToasts";

let inputSearchid = "";
const VisitPatientList = () => {
  const [data, setData] = useState({ result: [], actions: [] });
  const [list, setList] = useState();
  const [count, setCount] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [timer, setTimer] = useState(true);
  // const [selectedSearchKey, setSelectedSearchKey] = useState();
  const [searchString, setSearchString] = useState("");
  const [dataResult, setDataResult] = useState([]);
  const [spinner, setSpinner] = React.useState(false);
  const [checkOngoing, setCheckOngoing] = useState();
  const [visitId, setVisitId] = useState();
  // const defaultParams = {
  //   page: page,
  //   size: rowsPerPage,
  //   searchString: "",
  // };
  // const [senddefaultParams, setSendDefaultParams] = useState(defaultParams);

  const searchStringParams = {
    page: 0,
    size: rowsPerPage,
    searchString: searchString,
  };
  // useEffect(() => {
  //   let myObj = {
  //     page: page,
  //     size: rowsPerPage,
  //     searchString: "",
  //   };
  //   setSendDefaultParams(myObj);
  // }, [page, rowsPerPage]);

  // let timeout;
  //API to get Visited Patient List
  // let getVisitData = async () => {
  //   console.log("timer1", timer);
  //   let tokenStatus = localStorage.getItem("loggedUser");
  //   if (tokenStatus !== null) {
  // if (timer === true) {
  // const response = await getVisitPatientList(defaultParams);
  // console.log("ResponsVisit", response.status);
  // if (response.status === 200) {
  //   setData(response.data);
  //   timeout = setTimeout(() => {
  //     getVisitData();
  //   }, 5000);
  // }
  //   }
  // };

  const handleList = () => {
    setSpinner(true);
    getVisitPatientList(searchStringParams)
      .then((response) => {
        console.log("RES", response);
        if (response.status === 200) {
          setSpinner(false);
          setData(response.data);
          setDataResult(response.data.result);
          setCount(response.data.count);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    console.log("API");
    // getVisitData();
    // let tokenStatus = localStorage.getItem("loggedUser");
    // if (tokenStatus !== null) {
    handleList();
    // getVisitPatientList(searchStringParams)
    //   .then((response) => response.data)
    //   .then((res) => {
    //     console.log("RES", res);
    //     setData(res);
    //     setDataResult(res.result);
    //     setCount(res.count);
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //   });
    // }
    //   return () => {
    //     // timer = false;
    //     clearTimeout(timeout);
    //     setTimer(false);
    //   };
  }, [searchString]);

  //API to Get Search Options in Dropdown Menu
  const handleInputChange = (enteredData) => {
    console.log(enteredData);
    console.log(enteredData.length);
    if (enteredData.length > 0) {
      getSearchOptionVisitList(enteredData)
        .then((response) => {
          console.log("response1", response);
          setList(response.data.result);
          // defaultParams.searchString(response.data.result.label);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  //API to get Searched Data List
  // const getSearchKey = () => {
  //   console.log("searchkey", selectedSearchKey);
  //   if (
  //     typeof selectedSearchKey !== "undefined" ||
  //     selectedSearchKey !== null
  //   ) {
  //     defaultParams.searchString = selectedSearchKey;
  //     getVisitPatientList(defaultParams)
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

  // useEffect(() => {
  //   if (dataResult) {
  //     dataResult.map((row) => {
  //       console.log("Row Details", row.Status);
  //       if (row.Status.toLowerCase() === "ongoing") {
  //         setCheckOngoing(true);
  //       } else {
  //         setCheckOngoing(false);
  //       }
  //     });
  //   }
  // }, [dataResult, checkOngoing]);

  const handleCall = (visitId) => {
    console.log("Visit Id", visitId);
    getVisitPatientList(searchStringParams)
      .then((response) => {
        console.log("RES", response);
        if (response.status === 200) {
          const found = response.data.result.find((obj) => {
            return obj.Status.toLowerCase() === "ongoing";
          });
          if (typeof found === "undefined") {
            if (visitId) {
              callPatient(visitId)
                .then((response) => {
                  console.log("Call Response", response);
                  handleList();
                })
                .catch((response) => {
                  console.log("Error", response);
                });
            }
          } else {
            warningAlert("Already Ongoing Visit Is Present");
            handleList();
          }
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleCloseVisit = (visitId) => {
    console.log("Visit Id", visitId);
    if (visitId) {
      callPatient(visitId)
        .then((response) => {
          console.log("Call Response", response);
          handleList();
        })
        .catch((response) => {
          console.log("Error", response);
        });
    }
  };

  return (
    <div className="mt-16 mx-auto w-full">
      <p className="text-center text-2xl my-4 text-gray-700  font-Poppins">
        Patient Queue
      </p>
      <div className="flex w-9/12 lg:w-6/12 ml-9 lg:ml-6">
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
              // setSelectedSearchKey("");
            }
          }}
          dataArray={list}
        />
        <button
          className="border border-gray-500 rounded-md h-[2.3rem] ml-5 w-16 cursor-pointer p-1"
          onClick={(e) => {
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
        <div className="w-full mt-2">
          {data.result && data.result.length > 0 ? (
            <VisitCollapsibleTable
              tableApiFunc={getVisitPatientList}
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
              handleCall={handleCall}
              handleCloseVisit={handleCloseVisit}
              setSpinner={setSpinner}
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
    </div>
  );
};

export default VisitPatientList;
