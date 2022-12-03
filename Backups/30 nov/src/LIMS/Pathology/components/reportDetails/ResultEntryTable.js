import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { TextField, FormControl, Backdrop } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";
import CloseButton from "../../../../Common Components/Buttons/CloseButton";
import AuthorizationTable from "./AuthorizationTable";
import AuthorizationCodeModal from "./AuthorizationCodeModal";

const headCells = [
  {
    id: "testName",
    label: "Test Name",
  },
  {
    id: "subTestName",
    label: "Sub Test Name",
  },
  {
    id: "parameter",
    label: "Parameter",
  },
  {
    id: "reportValues",
    label: "Report Values",
  },
  {
    id: "normalRange",
    label: "Normal Range",
  },
];

export default function ResultEntryTable(props) {
  const {
    reportEntryDetails,
    onSubmitResultEntryTable,
    scheduleData,
    patchArr,
    authArr,
    setAuthArr,
    initiateAuth,
    setInitiateAuth,
    authObj,
    setAuthObj,
  } = props;

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    defaultValues: {
      reportDetails: [
        {
          reportValues: "",
        },
      ],
      suggestionNote: "",
      footNote: "",
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "reportDetails",
  });

  React.useEffect(() => {
    if (patchArr && patchArr.length > 0) {
      console.log("patchArr", patchArr);
      let arr = [];
      patchArr.map((item) => {
        let myObj = {
          reportValues: item,
        };
        arr.push(myObj);
      });
      console.log("arr", arr);
      reset({ reportDetails: arr });
    }
  }, [patchArr]);

  React.useEffect(() => {
    if (authObj) console.log("authObj", authObj);
  }, [authObj]);

  // React.useEffect(() => {
  //   if (scheduleData) {
  //     console.log("scheduleData", scheduleData);
  //   }
  // }, []);

  React.useEffect(() => {
    if (reportEntryDetails) {
      console.log("reportEntryDetails", reportEntryDetails);
      let arr = [];
      reportEntryDetails?.parameterslist &&
        reportEntryDetails.parameterslist.map((item) => {
          let myObj = {
            reportValues: item.reportValue,
          };
          arr.push(myObj);
        });
      console.log("arr", arr);

      reset({
        reportDetails: arr,
        suggestionNote: reportEntryDetails?.suggestion,
        footNote: reportEntryDetails?.footnote,
      });
    }
  }, [reportEntryDetails]);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleSortRequest(event, property);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <fieldset
        disabled={
          reportEntryDetails &&
          reportEntryDetails?.authorizationLevel &&
          reportEntryDetails?.authorizationLevel === authObj.authLevel
            ? false
            : true
        }
      >
        <form onBlur={handleSubmit(onSubmitResultEntryTable)}>
          {reportEntryDetails?.parameterslist && (
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table aria-labelledby="tableTitle" size="small">
                  <TableHead className="bg-gray-200">
                    <TableRow>
                      {headCells.map((headCell) => (
                        <TableCell
                          className="whitespace-nowrap"
                          key={headCell.id}
                          sortDirection={
                            orderBy === headCell.id ? order : false
                          }
                        >
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                          >
                            <span className="text-gray-600 font-bold">
                              {" "}
                              {headCell.label}
                            </span>
                            {orderBy === headCell.id ? (
                              <Box component="span" sx={visuallyHidden}>
                                {order === "desc"
                                  ? "sorted descending"
                                  : "sorted ascending"}
                              </Box>
                            ) : null}
                          </TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      reportEntryDetails?.parameterslist &&
                        reportEntryDetails.parameterslist.map((item, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                {reportEntryDetails.testname}
                              </TableCell>
                              <TableCell>
                                {item.subtestName ? item.subtestName : "-"}
                              </TableCell>
                              <TableCell>{item.parameterName}</TableCell>
                              <TableCell>
                                <div className="w-28">
                                  <input
                                    type="number"
                                    className="border border-gray-300 rounded-sm w-28"
                                    placeholder="Enter values"
                                    name={`reportDetails.${index}.reportValues`}
                                    {...register(
                                      `reportDetails.${index}.reportValues`
                                    )}
                                  />
                                </div>
                              </TableCell>
                              <TableCell>
                                {item.normalRange === "null"
                                  ? "-"
                                  : item.normalRange}
                              </TableCell>
                            </TableRow>
                          );
                        })

                      /* <TableRow>
                    <TableCell>{reportEntryDetails.testname}</TableCell>

                    <TableCell>
                      <div>
                        {reportEntryDetails &&
                          reportEntryDetails.parameterslist
                            .filter((item, index) => index === 0)
                            .map((test, index) => {
                              return (
                                <div key={index} className="my-2 p-1">
                                  <span>{test.subtestname}</span>
                                </div>
                              );
                            })}
                      </div>
                      {reportEntryDetails.parameterslist.map((item, index) => {
                        return (
                          <div key={index} className="my-2 p-1">
                            <span>{item.subtestname}</span>
                          </div>
                        );
                      })}
                    </TableCell>

                    <TableCell>
                      {reportEntryDetails.parameterslist.map((item, index) => {
                        return (
                          <div className="my-2 p-1" key={index}>
                            <span>{item.parametername}</span>
                          </div>
                        );
                      })}
                    </TableCell>
                    <TableCell>
                      {reportEntryDetails.parameterslist.map((item, index) => {
                        return (
                          <div key={index} className="my-2 w-28">
                            <input
                              type="number"
                              className="border border-gray-300 rounded-sm w-28 p-1"
                              placeholder="Enter values"
                              name={`reportDetails.${index}.reportValues`}
                              {...register(
                                `reportDetails.${index}.reportValues`
                              )}
                            />
                          </div>
                        );
                      })}
                    </TableCell>
                    <TableCell>
                      {reportEntryDetails.parameterslist.map((item, index) => {
                        return (
                          <div key={index} className="my-2 p-1">
                            <span className="">{item.normalrange}</span>
                          </div>
                        );
                      })}
                    </TableCell>
                  </TableRow> */
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
          {scheduleData &&
            !scheduleData.isCultureTest &&
            !scheduleData.isTemplate && (
              <div className="flex items-center space-x-2 my-2 ">
                <TextField
                  name="suggestionNote"
                  {...register("suggestionNote")}
                  size="small"
                  label="Suggestion/Note"
                  placeholder="Suggestion/Note"
                  multiline
                  fullWidth
                  rows={2}
                  className="bg-white"
                />
                <TextField
                  name="footNote"
                  {...register("footNote")}
                  size="small"
                  label="Foot Note"
                  placeholder="Foot Note"
                  multiline
                  fullWidth
                  rows={2}
                  className="bg-white"
                />
              </div>
            )}
        </form>
      </fieldset>{" "}
      {scheduleData &&
        !scheduleData.isCultureTest &&
        !scheduleData.isTemplate && (
          <AuthorizationTable
            reportEntryDetails={reportEntryDetails}
            authArr={authArr}
            setAuthArr={setAuthArr}
            initiateAuth={initiateAuth}
            setInitiateAuth={setInitiateAuth}
          />
        )}
    </Box>
  );
}
