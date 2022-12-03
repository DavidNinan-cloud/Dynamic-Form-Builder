import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import {
  Button,
  Box,
  Grid,
  Card,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  FormControl,
  FormHelperText,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import InputField from "../../../../Common Components/FormFields/InputField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import { getService } from "../../../services/EMRServices/emrServices";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { AppContext } from "../Context";

export default function AddServices(props) {
  console.log("Props Service", props);

  const { services } = useContext(AppContext);
  const serviceValidation = yup
    .object()
    .shape({
      quantity: yup
        .number()
        .min(1, "Invalid")
        .required("Required"),
    })
    .required();
  const schema = serviceValidation;

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    //     defaultValues:{
    // }
  });
  const {
    clearErrors,
    setError,
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
    control,
    setValue,
    watch,
  } = methods;
  const onSubmit = (data) => {
    // comingData.visitId
    console.log("TableData", tableData);
    console.log(data);
  };
  const [tableData, setTableData] = useState([]);
  const [list, setList] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [serviceDetails, setServiceDetails] = useState(1);
  const [checkDuplicate, setCheckDuplicate] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  useEffect(() => {
    if (props.editInfo !== null && props.dataId !== null) {
      let editService = {
        serviceName: props.editInfo.serviceName,
        id: props.editInfo.id,
        quantity: props.editInfo.quantity,
      };
      let editArray = [...tableData];
      editArray.push(editService);
      setTableData(editArray);

      console.log("TableData", editArray);
    }
  }, [props.editInfo]);

  const handleInputChange = (enteredData) => {
    if (enteredData.length > 0) {
      getService(enteredData)
        .then((response) => {
          console.log(response.data.result);
          setList(response.data.result);
          // defaultParams.searchString(response.data.result.label);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };
  let newData = [...tableData];

  const handleAdd = () => {
    console.log("serviceDetails", serviceDetails);
    let isPresent = services.some((element) => {
      if (element.serviceName === serviceDetails.label) {
        return true;
      }
      return false;
    });

    console.log("Present Data", isPresent);
    if (isPresent === false) {
      if (selectedValue !== "") {
        let quantityVal = parseInt(serviceDetails.quantity);

        console.log("quantityVal", typeof quantityVal);
        let addService = {
          serviceName: selectedValue.label,
          id: selectedValue.id,
          quantity: quantityVal,
        };
        let newData = [...tableData];
        let obj = newData.find((o) => o.serviceName === selectedValue.label);
        if (typeof obj === "undefined") {
          newData.push(addService);
          setTableData(newData);
          setCheckDuplicate(false);
        } else {
          setCheckDuplicate(true);
        }
      }
    } else {
      setCheckDuplicate(true);
    }
  };
  useEffect(() => {
    setCheckDuplicate(false);
    handleAdd();
  }, [selectedValue]);

  const finalServiceData = () => {
    if (props.dataId !== null) {
      let updatedService = [];
      tableData.map((item, index) => {
        console.log("Data", item);
        updatedService.push(item);
      });
      console.log("Update", updatedService);
      services[props.dataId] = updatedService[0];
      props.setEditInfo(null);
      props.setDataId(null);
    } else {
      if (checkDuplicate !== true && quantityError !== true) {
        tableData.map((item, index) => {
          console.log("Item", item);
          services.push(item);
        });
      }
    }
    props.setOpen(false);
  };

  let newTemplateData = null;
  const deleteRow = (row, index) => {
    newTemplateData = [...tableData];
    newTemplateData.splice(index, 1);
    setTableData(newTemplateData);
  };

  useEffect(() => {
    if (newTemplateData !== null) {
      if (newTemplateData.length === 0) {
        setError("notRegisteredInput", {
          type: "custom",
          message: "Atleast One Service Is Needed",
        });
      }
    }
  }, [newTemplateData]);

  // const SearchResult = (event) => {
  //   // let str = inWords(200)
  //   // console.log("in Words",str)
  //   var APiResult = event.target.value;
  //   // console.log("TableData",TableData[0].value)
  //   // console.log("APiResult",APiResult.value)
  //   let Matching = checkExistAlready(APiResult.value);
  //   if (Matching) {
  //     alert("Service Already Exists");
  //   } else {
  //     AddRow(APiResult.value);
  //   }
  // };
  // const checkExistAlready = (ValueCheck) => {
  //   let match = false;
  //   for (let i = 0; i <= tableData.length - 1; i++) {
  //     if (ValueCheck === tableData[i].value) {
  //       match = true;
  //       console.log("TableData Value Match", tableData[i].value);
  //       break;
  //     }
  //   }
  //   return match;
  //   // console.log("TableData Length",TableData.length)
  // };
  // const AddRow = (Row) => {
  //   const OPDConsultation = {
  //     id: 0,
  //     Service: "OPD Consultation",
  //     value: "OPD Consultation",
  //     Quantity: "1",
  //     Rate: "250",
  //   };
  //   const IPDConsultation = {
  //     id: 1,
  //     Service: "IPD Consultation",
  //     value: "IPD Consultation",
  //     Quantity: "1",
  //     Rate: "250",
  //   };
  //   const OtherConsultation = {
  //     id: 2,
  //     Service: "Other Consultation",
  //     value: "Other Consultation",
  //     Quantity: 1,
  //     Rate: 250,
  //   };
  //   const ServiceCharge = {
  //     id: 3,
  //     Service: "Service Charge",
  //     value: "Service Charge",
  //     Quantity: 1,
  //     Rate: 250,
  //   };
  //   if (Row === "OPD Consultation") {
  //     setTableData([...tableData, OPDConsultation]);
  //   } else if (Row === "IPD Consultation") {
  //     setTableData([...tableData, IPDConsultation]);
  //   } else if (Row === "Other Consultation") {
  //     setTableData([...tableData, OtherConsultation]);
  //   } else if (Row === "Service Charge") {
  //     setTableData([...tableData, ServiceCharge]);
  //   }
  //   if (!!errors.notReisteredInput) {
  //     clearErrors("notRegisteredInput");
  //   }
  // };
  return (
    <div className="my-auto">
      <div className="mx-auto w-full">
        <div className="flex justify-between">
          <div className="text-base font-semibold  mb-3">
            <h1>Services</h1>
          </div>
          {/* <IconButton
            edge="start"
            color="error"
            size="small"
            onClick={() => {
              props.setOpen(false);
            }}
            aria-label="close"
            sx={{
              backgroundColor: "white",
              border: "1px solid gray",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton> */}
          <CancelPresentationIcon
            className="text-red-600  rounded cursor-pointer"
            onClick={() => {
              props.setOpen(false);
            }}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item lg={6} sm={6}>
              {/* <DropdownField
                control={control} 
                error={errors.SearchResultType}
                name="SearchResultType" 
                dataArray={SearchResultType}
                placeholder="Search"
                isSearchable={true}
                isClearable={false}
                placeholdernotVisible={true}
                inputRef={{...register("SearchResultType", {
                  onChange: (e) => {
                  SearchResult(e);
                  },
              })}}
            /> */}

              <SearchBar
                type="button"
                name="searchableSelect"
                placeholder="Search Service"
                isSearchable={true}
                searchIcon
                handleInputChange={handleInputChange}
                onChange={(e) => {
                  console.log("Service", e);
                  if (e !== null) {
                    setServiceDetails(e);
                    setSelectedValue(e);
                  } else {
                    setSelectedValue("");
                  }
                }}
                dataArray={list}
              />
            </Grid>
            {/* <Grid item lg={3} sm={3} >
            <DropdownField
                control={control} 
                error={errors.PaymentTypes}
                name="PaymentTypes" 
                dataArray={PaymentTypes}
                placeholder="Payment Type"
                isSearchable={false}
                isClearable={false}
            />
            </Grid> */}
            {/* <Box width="100%"/> */}
            <Box width="100%" />
            {/* <Grid item lg={6} sm={6} className="translate-y-4">
              <span className="tracking-wide font-semibold">
                Service Details :
              </span>
            </Grid> */}
            <Box width="100%" />
            <Grid
              item
              lg={12}
              sm={12}
              // sx={{ heigth: "65rem" }}
            >
              {tableData.length > 0 ? (
                <div className=" h-auto max-h-60 overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
                  <TableContainer
                    sx={{
                      marginBottom: "0rem",
                      marginTop: "0rem",
                      maxHeight: "28rem",
                      position: "relative",
                      zIndex: 0,
                    }}
                    className="rounded border overflow-y-scroll "
                  >
                    <Table
                      sx={{ borderRadius: "10px", overflow: "visible" }}
                      className=""
                    >
                      <TableHead>
                        <TableRow>
                          {/* heading of table */}
                          <TableCell
                            className="w-5/12"
                            sx={{ paddingY: "0.4rem" }}
                          >
                            <span className="text-gray-600 tracking-wide font-bold whitespace-nowrap ">
                              Service
                            </span>
                          </TableCell>
                          <TableCell
                            className="w-14"
                            sx={{ paddingY: "0.4rem", width: "2rem" }}
                          >
                            <span className="text-gray-600 font-bold whitespace-nowrap  mx-auto tracking-wide">
                              Quantity
                            </span>
                          </TableCell>

                          <TableCell
                            className="w-20"
                            sx={{ paddingY: "0.4rem" }}
                          >
                            <span className="text-gray-600 font-bold whitespace-nowrap  mx-auto  tracking-wide">
                              Action
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      {tableData.length > 0 ? (
                        <TableBody>
                          {tableData
                            .filter((service) => service.serviceName)
                            .map((row, index) => {
                              console.log("Row", tableData);
                              return (
                                <TableRow
                                  key={index}
                                  sx={{ maxHeight: "1rem" }}
                                >
                                  {/* Service Name */}
                                  <TableCell sx={{ paddingY: "2px" }}>
                                    {row.serviceName}
                                  </TableCell>
                                  {/* Quantity Field */}
                                  <TableCell
                                    className="whitespace-nowrap "
                                    align="left"
                                    sx={{
                                      paddingY: "2px",
                                    }}
                                  >
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      type="number"
                                      name="quantity"
                                      defaultValue={row.quantity}
                                      {...register("quantity")}
                                      onChange={(e) => {
                                        console.log("Change", e.target.value);
                                        if (e.target.value > 0) {
                                          tableData[index].quantity = parseInt(
                                            e.target.value
                                          );
                                          setQuantityError(false);
                                        } else {
                                          setQuantityError(true);
                                        }
                                      }}
                                      InputProps={{
                                        disableUnderline: true,
                                        inputProps: { min: 1 },
                                      }}
                                      sx={{ width: "8rem" }}
                                    />
                                  </TableCell>

                                  {/* Action button */}
                                  <TableCell
                                    sx={{
                                      width: "5rem",
                                      paddingY: "2px",
                                    }}
                                  >
                                    <div className=" ">
                                      {
                                        <DeleteOutlineOutlinedIcon
                                          className="text-red-500 mr-3"
                                          onClick={() => {
                                            deleteRow(row, index);
                                          }}
                                        />
                                      }
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      ) : (
                        <p className="text-center text-base">
                          No Records Found
                        </p>
                      )}
                    </Table>
                  </TableContainer>
                </div>
              ) : (
                ""
              )}

              {errors.notRegisteredInput && (
                <p className="text-sm font-medium tracking-wide text-red-600 px-6">
                  {errors.notRegisteredInput.message}
                </p>
              )}
              {!errors.notRegisteredInput
                ? errors.Services && (
                    <p className="text-sm font-medium tracking-wide text-red-600 px-6">
                      Please Enter Corrent Entries
                    </p>
                  )
                : ""}
            </Grid>
          </Grid>

          {checkDuplicate === true ? (
            <p className="text-sm text-red-500"> Record Already Present</p>
          ) : (
            ""
          )}
          {quantityError === true ? (
            <p className="text-sm text-red-500"> Invalid Quantity</p>
          ) : (
            ""
          )}

          <div className="justify-center w-fit mx-auto mt-2">
            {props.dataId !== null ? (
              <div className="flex justify-end">
                {tableData.length > 0 ? (
                  <>
                    <div className="flex">
                      <button
                        className="border border-red-600 rounded-md px-3 py-1 hover:cursor-pointer mx-2"
                        onClick={() => {
                          props.setOpen(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                        onClick={() => {
                          finalServiceData();
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : tableData.length > 0 ? (
              <>
                <div className="flex">
                  <button
                    className="border border-red-600 rounded-md px-3 py-1 hover:cursor-pointer mx-2"
                    onClick={() => {
                      props.setOpen(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                    onClick={() => {
                      finalServiceData();
                    }}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
