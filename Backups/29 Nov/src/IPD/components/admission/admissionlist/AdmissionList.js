import React, { useEffect, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneIcon from "@mui/icons-material/Tune";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import AdmissionListTable from "./AdmissionListTable";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AdmissionListFilter from "./AdmissionListFilter";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import { getAdmissionList } from "../../../services/admissiondetails/admissionDetailsService";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import {
  getBedCategory,
  getBlock,
  getFloor,
  getUnits,
  getWard,
} from "../../../commonservices/bedModalServices";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import AdmissionListCollapseTable from "./AdmissionListCollapseTable";

const AdmissionList = () => {
  const [data, setData] = useState({ result: [], privileges: [] });
  const [list, setList] = useState();
  const [count, setCount] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [searchString, setSearchString] = useState("");
  const [dataResult, setDataResult] = useState([]);
  const [spinner, setSpinner] = React.useState(false);
  const [openFromDate, setOpenFromDate] = useState(false);
  const [openToDate, setOpenToDate] = useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [units, setUnits] = useState();
  const [unitId, setUnitId] = useState(null);
  const [blocks, setBlocks] = useState();
  const [blockId, setBlockId] = useState(null);
  const [floors, setFloors] = useState();
  const [floorId, setFloorId] = useState(null);
  const [wards, setWards] = useState();
  const [wardId, setWardId] = useState(null);
  const [bedCategoryList, setBedCategoryList] = useState();
  const [bedCategoryListId, setBedCategoryListId] = useState(null);

  let navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm({
    mode: "onChange",
  });

  const searchStringParams = {
    bedCategory: null,
    blockId: null,
    floorId: null,
    fromDate: null,
    page: 0,
    searchId: null,
    searchString: searchString,
    size: 10,
    toDate: null,
    unitId: null,
    wardId: null,
  };
  const handleList = () => {
    getAdmissionList(searchStringParams)
      .then((response) => {
        if (response.data.statusCode === 200) {
          console.log("RES", response);
          setSpinner(false);
          setData(response.data);
          setDataResult(response.data.result);
          setCount(response.data.count);
        }
      })
      .catch((response) => {
        setSpinner(false);
        console.log(response);
      });
  };
  //API to get Patient List
  useEffect(() => {
    setSpinner(true);
    handleList();
  }, [searchString]);

  //API to Get Search Options in Dropdown Menu
  //   const handleInputChange = (enteredData) => {
  //     console.log(enteredData);
  //     let searchString = enteredData;
  //     if (enteredData.length > 0) {
  //       getSearchOptionRegistrationList(searchString)
  //         .then((response) => {
  //           console.log("response1", response.data.result);
  //           setList(response.data.result);
  //           // defaultParams.searchString(response.data.result.label);
  //         })
  //         .catch((response) => {
  //           console.log(response);
  //         });
  //     }
  //   };

  // 1. Unit List API
  useEffect(() => {
    getUnits()
      .then((response) => {
        setUnits(response.data.result);
      })
      .catch((response) => {
        console.log("Error Response", response);
      });
  }, []);

  // 2. Block List API
  useEffect(() => {
    if (unitId !== null) {
      getBlock(unitId)
        .then((response) => {
          setBlocks(response.data.result);
        })
        .catch((response) => {
          console.log("Error Response", response);
        });
    }
  }, [unitId]);

  // 3. Floor List API
  useEffect(() => {
    if (unitId !== null && blockId !== null) {
      getFloor(unitId, blockId)
        .then((response) => {
          setFloors(response.data.result);
        })
        .catch((response) => {
          console.log("Error Response", response);
        });
    }
  }, [unitId, blockId]);

  // 4. Ward List API
  useEffect(() => {
    if (unitId !== null && blockId !== null && floorId !== null) {
      getWard(unitId, blockId, floorId)
        .then((response) => {
          setWards(response.data.result);
        })
        .catch((response) => {
          console.log("Error Response", response);
        });
    }
  }, [unitId, blockId, floorId]);

  // 5. Bed Category List API
  useEffect(() => {
    getBedCategory()
      .then((response) => {
        setBedCategoryList(response.data.result);
      })
      .catch((response) => {
        console.log("Error Response", response);
      });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="py-1 mt-16 mx-4 w-full">
      <p className="text-center text-2xl my-2 text-gray-700 font-Poppins">
        Admission List
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-7 lg:grid-cols-6 gap-y-3 gap-x-2 mr-6">
          {/* //SearchBar// */}
          <div className="col-span-3 lg:col-span-2">
            <SearchBar
              type="button"
              name="searchableSelect"
              placeholder="Search by Patient Name Mobile No."
              isSearchable={true}
              //   handleInputChange={handleInputChange}
              //   onChange={(e) => {
              //     console.log("MobileNo.", e);
              //     if (e !== null) {
              //       inputSearchid = e.mobileNumber;
              //       console.log("inputSearchid", inputSearchid);
              //       // setSelectedSearchKey(e.mobileNumber);
              //     } else {
              //       inputSearchid = "";
              //       setSearchString(inputSearchid);
              //       setPage(0);
              //     }
              //   }}
              //   dataArray={list}
            />
          </div>

          {/* //From Date// */}
          <div className="col-span-2 lg:col-span-1">
            <Controller
              control={control}
              defaultValue={null}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    open={openFromDate}
                    onOpen={() => setOpenFromDate(true)}
                    onClose={() => setOpenFromDate(false)}
                    inputProps={{ readOnly: true }}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        type="date"
                        variant="outlined"
                        label="From Date"
                        name="fromDate"
                        // InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        onClick={(e) => setOpenFromDate(true)}
                        sx={{ backgroundColor: "white" }}
                      />
                    )}
                    inputFormat="dd/MM/yyyy"
                    {...field}
                    onAccept={(e) => {
                      getNewRegDate(e);
                    }}
                    error={Boolean(errors.fromDate)}
                    helperText={errors.fromDate?.message}
                  />
                </LocalizationProvider>
              )}
              name="fromDate"
            />
          </div>
          {/* //To Date// */}
          <div className="col-span-2 lg:col-span-1">
            <Controller
              control={control}
              defaultValue={null}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    open={openToDate}
                    onOpen={() => setOpenToDate(true)}
                    onClose={() => setOpenToDate(false)}
                    inputProps={{ readOnly: true }}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        type="date"
                        variant="outlined"
                        label="To Date"
                        name="toDate"
                        // InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        onClick={(e) => setOpenToDate(true)}
                        sx={{ backgroundColor: "white" }}
                      />
                    )}
                    inputFormat="dd/MM/yyyy"
                    {...field}
                    onAccept={(e) => {
                      getNewRegDate(e);
                    }}
                    error={Boolean(errors.toDate)}
                    helperText={errors.toDate?.message}
                  />
                </LocalizationProvider>
              )}
              name="toDate"
            />
          </div>

          {/* //Unit// */}
          <div className=" w-full col-span-3 lg:col-span-2">
            <DropdownField
              control={control}
              name="unit"
              placeholder="Unit"
              dataArray={units}
              inputRef={{
                ...register("unit", {
                  onChange: (e) => {
                    console.log(e.target.value.id);
                    setUnitId(e.target.value.id);
                  },
                }),
              }}
            />
          </div>
          {/* //Block// */}
          <div className=" w-full col-span-2 lg:col-span-1">
            <DropdownField
              control={control}
              name="block"
              placeholder="Block"
              dataArray={blocks}
              inputRef={{
                ...register("block", {
                  onChange: (e) => {
                    console.log(e.target.value.id);
                    setBlockId(e.target.value.id);
                  },
                }),
              }}
            />
          </div>
          {/* //Floor// */}
          <div className=" w-full col-span-2 lg:col-span-1">
            <DropdownField
              control={control}
              name="floor"
              placeholder="Floor"
              dataArray={floors}
              inputRef={{
                ...register("floor", {
                  onChange: (e) => {
                    console.log(e.target.value.id);
                    setFloorId(e.target.value.id);
                  },
                }),
              }}
            />
          </div>
          {/* //Ward// */}
          <div className=" w-full col-span-3 lg:col-span-1">
            <DropdownField
              control={control}
              name="ward"
              placeholder="Ward"
              dataArray={wards}
              inputRef={{
                ...register("ward", {
                  onChange: (e) => {
                    console.log(e.target.value.id);
                    setWardId(e.target.value.id);
                  },
                }),
              }}
            />
          </div>
          {/* //Bed Category// */}
          <div className="col-span-2 lg:col-span-1">
            <DropdownField
              control={control}
              name="bedCategory"
              placeholder="Bed Category"
              dataArray={bedCategoryList}
              inputRef={{
                ...register("bedCategory", {
                  onChange: (e) => {
                    console.log(e.target.value.id);
                    setBedCategoryListId(e.target.value.id);
                  },
                }),
              }}
            />
          </div>

          {/* //Button// */}
          <div className="flex justify-between col-span-2 space-x-2">
            <button
              className="border border-gray-500 h-[2.3rem] rounded-md w-16 cursor-pointer p-1 bg-white"
              //   onClick={(e) => {
              //     console.log("inputSearchid", inputSearchid);
              //     setSearchString(inputSearchid);
              //     setPage(0);
              //   }}
            >
              <SearchRoundedIcon />
            </button>

            <button className="border border-gray-500 h-[2.3rem] rounded-md  w-16 cursor-pointer p-1 bg-white">
              <RefreshIcon />
            </button>

            <button
              className="border border-gray-500 h-[2.3rem] rounded-md  w-16 cursor-pointer p-1 bg-white"
              onClick={() => {
                setOpenFilter(true);
              }}
            >
              <TuneIcon />
            </button>

            <button
              className="h-auto px-3 text-sm font-medium hidden lg:block  bg-customGreen text-white rounded "
              onClick={() => navigate("/ipd/admission")}
            >
              New Admission
            </button>
          </div>

          <div className="col-span-7 lg:col-span-6">
            <hr className="border my-2 divide-x-8 border-slate-300" />
          </div>

          <div className="flex justify-between w-full col-span-5 lg:col-span-4 ml-2">
            {/* //New Admission// */}
            <p className="text-black text-xs lg:text-sm my-auto pl-0.5 flex">
              New Admissions :
              <span className="text-sm lg:text-lg text-green-500 font-semibold -mt-0.5">
                20
              </span>
            </p>
            {/* //Total Admission// */}
            <p className="text-black text-xs lg:text-sm my-auto pl-0.5 flex">
              Total Admissions :
              <span className="text-sm lg:text-lg text-blue-400 font-semibold -mt-0.5">
                20
              </span>
            </p>
            {/* //Total Discharge// */}
            <p className="text-black text-xs lg:text-sm my-auto px-4 flex">
              Total Discharges :
              <span className="text-sm lg:text-lg text-rose-400 font-semibold -mt-0.5 ">
                20
              </span>
            </p>
          </div>

          <div className="col-span-2 lg:col-span-4 flex justify-end">
            <button
              className="h-auto px-1 py-2 text-xs lg:text-base font-medium visible lg:hidden bg-customGreen text-white rounded "
              onClick={() => navigate("/ipd/admission")}
            >
              New Admission
            </button>
          </div>
        </div>
      </form>
      {spinner ? (
        <div className="grid justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full mt-2 ml-3">
          {data.result && data.result.length > 0 ? (
            <AdmissionListCollapseTable
              tableApiFunc={getAdmissionList}
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
              handleList={handleList}
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

      {/* //Filter Modal// */}
      <Modal
        open={openFilter}
        onClose={() => {
          setOpenFilter(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "48%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
          }}
        >
          <AdmissionListFilter />
        </Box>
      </Modal>
    </div>
  );
};

export default AdmissionList;
