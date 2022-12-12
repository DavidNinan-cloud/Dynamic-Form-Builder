import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Modal,
    TextField,
  } from "@mui/material";
  import Box from "@mui/material/Box";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
  import ControlledCheckBoxField from "../../Common Components/FormFields/ControlledCheckBoxField";
  import { useForm } from "react-hook-form";
  import { styled } from "@mui/material/styles";
  import TableCell, { tableCellClasses } from "@mui/material/TableCell";
  import HighlightOffIcon from "@mui/icons-material/HighlightOff";
  import ReactSelect from "react-select";
  import React from "react";
  import CancelPresentationIconButton from "../../Common Components/Buttons/CancelPresentationIconButton";
  import { Style } from "../../IPD/components/admission/Style";
  import SearchBar from "../../Common Components/FormFields/SearchBar";
  import SaveButton from "../../Common Components/Buttons/SaveButton";
  
  const DrugAdministratorDetailsData = {
    message: "Drug Administrator Details list found ",
    result: [
      {
        Id: 30,
        Date: "01/02/2022",
        PatientDrugDetails: [
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
        ],
      },
      {
        Id: 56,
        Date: "03/02/2022",
        PatientDrugDetails: [
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
          {
            SchTime: "8:00 Am",
            Given: false,
            DateTime: "01/02/2022,11:30Am",
            GivenBy: "Anand Patil",
            Dose: "15mg",
            HoldDrug: false,
            HoldBy: "Anand Patil",
            Instructions: "Lorem ipsum dolor sit",
            CancelSchTime: false,
          },
        ],
      },
    ],
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      background: "#F1F1F1",
      position: "sticky",
      top: "0px",
      left: "0px",
      zIndex: 50,
    },
  }));
  export default function DrugAdministratorOrderModal(props) {
    const removeHeaders = (headers, fieldToRemove) => {
      return headers.filter((v) => {
        return !fieldToRemove.includes(v);
      });
    };
  
    //set rows object to table
    const allHeaders = Object.keys(
      DrugAdministratorDetailsData.result[0].PatientDrugDetails[0]
    );
  
    const headers = removeHeaders(allHeaders, ["Id"]);
    const methods = useForm({
      mode: "onChange",
      // resolver: yupResolver(schema),
      // defaultValues
    });
    const {
      register,
      handleSubmit,
      reset,
      trigger,
      formState: { errors },
      control,
      setValue,
      watch,
      getValues,
    } = methods;
  
    const onSubmitDataHandler = (data) => {
      console.log("onSubmitDataHandler function has been invoked");
    };
  
    function displayView(row) {
      console.log(row);
      console.log("Open View Modal");
    }
  
    return (
      <div className="w-full grid justify-center items-center rounded lg:px-0">
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={Style} className="h-[80%] w-[80%] p-4 ">
            <CancelPresentationIconButton
              onClick={() => {
                props.handleClose();
                reset(defaultValues);
              }}
            />
            <div className="row">
              <h1 className="absolute top-3  text-xl font-semibold">
                Drug Administrator Details
              </h1>
              <div className="mt-8">
                <div className="flex space-x-2 items-center w-6/12">
                  <div className="w-full">
                    <SearchBar
                      type="button"
                      name="SearchableSelect"
                      placeholder="Search By UHID"
                      // dataArray={options}
                      isSearchable={true}
                      // handleInputChange={handleChange}
                      // selectedValue={autoSelectedValue}
                      // selectedObj={selectedObj}
                    />
                  </div>
                  <div>
                    <button className="h-[38px] px-3 rounded border border-green-500 text-green-500">
                      Change
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded shadow flex justify-between p-4 border mt-2">
                  <div className="flex space-x-2 items-center">
                    <h1>Drug Name </h1>
                    <span>:</span>
                    <span>Dolo 650 mg</span>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <h1>Route </h1>
                    <span>:</span>
                    <span>Oral</span>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <h1>Dr. Name </h1>
                    <span>:</span>
                    <span>Suyash Patil</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmitDataHandler)}>
                <div>
                  <div className="mt-2 bg-white ">
                    <Box sx={{ width: "100%", overflow: "hidden" }}>
                      <Paper sx={{ width: "100%", my: 2, display: "flex" }}>
                        <TableContainer
                          sx={{
                            "&::-webkit-scrollbar": {
                              width: 7,
                            },
                            "&::-webkit-scrollbar-track": {
                              backgroundColor: "#7393B3",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "lightBlue",
                            },
                          }}
                          className="rounded  border-gray-300 py-2"
                        >
                          <Table
                            size="small"
                            stickyHeader
                            aria-label="sticky table"
                          >
                            <TableBody>
                              <TableRow>
                                <StyledTableCell className="whitespace-nowrap border border-gray-300">
                                  <span className="text-gray-600 font-semibold">
                                    Date
                                  </span>
                                </StyledTableCell>
                                {DrugAdministratorDetailsData.result.map(
                                  (row, index) => {
                                    return (
                                      <TableCell
                                        key={index}
                                        className="whitespace-nowrap border border-gray-300 "
                                        sx={{ background: "#F1F1F1" }}
                                        colSpan={row.PatientDrugDetails.length}
                                        align="justify"
                                      >
                                        <div className="flex justify-center text-gray-700 font-semibold">
                                          {row.Date}
                                        </div>
                                      </TableCell>
                                    );
                                  }
                                )}
                              </TableRow>
                              {headers &&
                                headers.map((header, i) => (
                                  <TableRow key={i}>
                                    <StyledTableCell className="whitespace-nowrap border border-gray-300">
                                      <span className="text-gray-600 font-semibold">
                                        {header}
                                      </span>
                                    </StyledTableCell>
                                    {DrugAdministratorDetailsData.result.map(
                                      (row, index) => {
                                        return (
                                          <>
                                            {row.PatientDrugDetails.map(
                                              (
                                                PatientDrugDetails,
                                                innerIndex
                                              ) => {
                                                return (
                                                  <TableCell
                                                    key={innerIndex}
                                                    className="whitespace-nowrap flex justify-center border border-gray-300  "
                                                    sx={
                                                      i == 0
                                                        ? {
                                                            background: "#F1F1F1",
                                                          }
                                                        : {
                                                            background: "#ffffff",
                                                          }
                                                    }
                                                  >
                                                    <div className="w-fit mx-auto">
                                                      {header === "Given" ? (
                                                        <div className="">
                                                          <input
                                                            type="checkbox"
                                                            name="Given"
                                                            value={
                                                              PatientDrugDetails
                                                            }
                                                            // value={PatientDrugDetails[header]}
                                                            onChange={(e) => {
                                                              console.log(
                                                                e.target.checked
                                                              );
                                                            }}
                                                            control={control}
                                                          />
                                                        </div>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>
                                                    {header === "GivenBy" ? (
                                                      <div>
                                                        <ReactSelect
                                                          placeholder={
                                                            PatientDrugDetails[
                                                              header
                                                            ]
                                                          }
                                                          value={
                                                            PatientDrugDetails[
                                                              header
                                                            ]
                                                          }
                                                        />
                                                      </div>
                                                    ) : (
                                                      ""
                                                    )}
                                                    {header === "HoldDrug" ? (
                                                      <div className="text-center">
                                                        <input
                                                          type="checkbox"
                                                          name="holdDrug"
                                                          value={
                                                            PatientDrugDetails
                                                          }
                                                          onChange={(e) => {
                                                            console.log(
                                                              e.target.checked
                                                            );
                                                          }}
                                                          control={control}
                                                        />
                                                      </div>
                                                    ) : (
                                                      ""
                                                    )}
                                                    {header === "HoldBy" ? (
                                                      <div className="">
                                                        <ReactSelect
                                                          placeholder={
                                                            PatientDrugDetails[
                                                              header
                                                            ]
                                                          }
                                                          value={
                                                            PatientDrugDetails[
                                                              header
                                                            ]
                                                          }
                                                        />
                                                      </div>
                                                    ) : (
                                                      ""
                                                    )}
                                                    {header ===
                                                    "CancelSchTime" ? (
                                                      <div className="text-center ">
                                                        <HighlightOffIcon className="text-red-600 cursor-pointer" />
                                                      </div>
                                                    ) : (
                                                      ""
                                                    )}
                                                    {header !== "CancelSchTime" &&
                                                    header !== "Given" &&
                                                    header !== "GivenBy" &&
                                                    header !== "HoldDrug" &&
                                                    header !== "HoldBy" ? (
                                                      <div className="flex justify-center text-gray-500 font-semibold">
                                                        {
                                                          PatientDrugDetails[header]
                                                        }
                                                      </div>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </TableCell>
                                                );
                                              }
                                            )}
                                          </>
                                        );
                                      }
                                    )}
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  </div>
                </div>
                <div className="flex justify-end">
                  <SaveButton />
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
  