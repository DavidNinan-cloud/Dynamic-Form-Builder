import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SaveButton from "../../../Common Components/Buttons/SaveButton";
import SaveScheduleButton from "../../../Common Components/Buttons/SaveScheduleButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import { DesktopTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import { Modal, TextField } from "@mui/material";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import { useForm } from "react-hook-form";

import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
// import dayjs from "dayjs";
export const Style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px",

  bgcolor: "background.paper",
  boxShadow: 24,
  border: "1px solid gray",
};

export default function DrugSchedulTable(props) {
  const { control, watch, setValue } = useForm({ mode: "onChange" });

  console.log("props are ");
  console.log(props);

  let applyToAll = watch("applyToAll");
  console.log("Value of applyToAll is ");
  console.log(applyToAll);

  const [time, setTime] = React.useState();

  const [cell, setCell] = React.useState();
  const [scheduleData, setSecheduleData] = React.useState();
  const [rowIndex, setRowIndex] = React.useState("");
  //modal
  const [open, setOpen] = React.useState(false);

  const [saveBtnFlag, setSaveBtnFlag] = React.useState(false);

  const [newSchedule, setNewSchedule] = React.useState({
    Id: "",
    scheduleTitle: "",
    newTime: "",
  });

  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    console.log(time);
  }, [time]);

  const handleClick = (index, row) => {
    console.log("Selected row object is " + JSON.stringify(row));
    setRowIndex(index);
  };

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //Code to get all the headers in the Schedule array
  let scheduleArray = props.data.result[0].Schedule;
  console.log("scheduleArray is");
  console.log(scheduleArray);
  let scheduleHeaders = [];

  for (let scheduleObj of scheduleArray) {
    let tempArray = Object.keys(scheduleObj);

    //if the propertyName is not id ; then do not push into the
    for (let propertyName of tempArray) {
      if (propertyName !== "id") {
        scheduleHeaders.push(propertyName);
        console.log(propertyName);
      }
    }
  }

  console.log("scheduleHeaders are");
  console.log(scheduleHeaders);

  //set rows object to table
  const outerHeaders = Object.keys(props.data.result[0]);
  const finalHeaders = [...outerHeaders, ...scheduleHeaders];
  const headers = removeHeaders(finalHeaders, ["Id", "Schedule"]);
  console.log("headers are ");
  console.log(headers);

  //use Effect to update the table
  React.useEffect(() => {
    console.log("newSchedule is ");
    console.log(newSchedule);

    let clonedData = structuredClone(props.data);

    if (
      newSchedule.Id !== "" &&
      newSchedule.scheduleTitle !== "" &&
      newSchedule.newTime !== ""
    ) {
      setIsDisabled(false);
      clonedData.result.map((singleObj) => {
        if (newSchedule.Id === singleObj.Id) {
          // singleObj.Schedule is an array
          for (let scheduleObj of singleObj.Schedule) {
            console.log("ScheduleObj is ");
            console.log(scheduleObj);

            //check whether the given object has the required scheduleTitle
            if (scheduleObj.hasOwnProperty(newSchedule.scheduleTitle)) {
              console.log(
                "Yes , the scheduleObj is " + JSON.stringify(scheduleObj)
              );
              console.log(
                "newSchedule.scheduleTitle is " + newSchedule.scheduleTitle
              );

              console.log("newSchedule.newTime is " + newSchedule.newTime);

              scheduleObj[newSchedule.scheduleTitle] = newSchedule.newTime;
            }
          }
        }
      });
    }

    //update the ui of the table by modifying the state variable
    if (saveBtnFlag === true) {
      props.setDrugScheduleData(clonedData);
    }
    console.log("modified clonedData is ");
    console.log(clonedData);
  }, [newSchedule, saveBtnFlag]);

  //useEffect to modify the entire data in the column of the table
  React.useEffect(() => {
    if (isDisabled === false) {
      //check whether the applyToAll checkbox has been ticked
      if (applyToAll === true) {
        let clonedData = structuredClone(props.data);

        if (
          newSchedule.Id !== "" &&
          newSchedule.scheduleTitle !== "" &&
          newSchedule.newTime !== ""
        ) {
          setIsDisabled(false);
          clonedData.result.map((singleObj) => {
            // singleObj.Schedule is an array
            for (let scheduleObj of singleObj.Schedule) {
              console.log("ScheduleObj is ");
              console.log(scheduleObj);

              //check whether the given object has the required scheduleTitle
              if (scheduleObj.hasOwnProperty(newSchedule.scheduleTitle)) {
                console.log(
                  "Yes , the scheduleObj is " + JSON.stringify(scheduleObj)
                );
                console.log(
                  "newSchedule.scheduleTitle is " + newSchedule.scheduleTitle
                );

                console.log("newSchedule.newTime is " + newSchedule.newTime);

                scheduleObj[newSchedule.scheduleTitle] = newSchedule.newTime;
              }
            }
          });
        }

        //update the ui of the table by modifying the state variable
        if (saveBtnFlag === true) {
          props.setDrugScheduleData(clonedData);
        }

        console.log("modified clonedData is ");
        console.log(clonedData);
      }
    }
  }, [applyToAll, isDisabled, saveBtnFlag]);

  React.useEffect(() => {
    console.log("props.data is ");
    console.log(props.data);
  }, [props.data]);

  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%" }}>
            <TableContainer
              sx={{
                "&::-webkit-scrollbar": {
                  width: 7,
                  height: 10,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#7393B3",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "lightBlue",
                },
              }}
              className="rounded h-80"
            >
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {/* heading of table */}
                    {headers.map((header, index) => (
                      <TableCell
                        className="whitespace-nowrap"
                        key={index}
                        style={{ background: "#F1F1F1" }}
                      >
                        <span className="text-gray-600 font-bold w-full">
                          {header}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.result.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        className="w-full"
                        sx={{ width: 220 }}
                      >
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell className="whitespace-nowrap " key={i}>
                              {header === "Date" ? (
                                <span>{row[header]}</span>
                              ) : (
                                //iterating the properties in the Schedule array
                                row.Schedule.map((singleObj, i) => (
                                  <span
                                    colSpan={row.Schedule.length}
                                    onClick={(e) => {
                                      console.log("Id is");
                                      console.log(row.Id);
                                      console.log("header is", header);

                                      setNewSchedule((previousState) => {
                                        return {
                                          ...previousState,
                                          Id: row.Id,
                                          scheduleTitle: header,
                                          newTime: "", //set the newTime property to empty
                                        };
                                      });
                                      props.displayView(row, index);
                                      console.log("target is");
                                      console.log(e.target.innerText);
                                      handleClick(index, row);
                                      setCell(
                                        `2020-01-01 ${e.target.innerText}`
                                      );

                                      setValue("applyToAll", false);
                                      //disable the 'applyToAll' checkbox on the modal
                                      setIsDisabled(true);
                                      setSaveBtnFlag(false);
                                      handleOpen();
                                    }}
                                  >
                                    {singleObj[header]}
                                  </span>
                                ))
                              )}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        <div className="flex items-center space-x-3 justify-end my-1">
          <ResetButton />
          <SaveButton />
        </div>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={Style} className=" h-auto  w-[30%] p-4 ">
              <div className="absolute -right-5 -top-1">
                <CancelPresentationIconButton
                  className=""
                  onClick={() => {
                    handleClose();
                  }}
                />
              </div>

              <div className="row mt-7">
                {/* Time picker component */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopTimePicker
                    label=" To Time"
                    name="toTime"
                    value={cell}
                    onChange={(newValue) => {
                      console.log("newValue is ");
                      console.log(newValue);

                      let dateStr = newValue;

                      let date = new Date(dateStr);

                      let hours = date.getHours();
                      let minutes = date.getMinutes();

                      let ampm;

                      if (hours >= 12) {
                        ampm = "PM";
                      } else {
                        ampm = "AM";
                      }

                      hours = hours % 12;

                      if (hours < 10) {
                        hours = "0" + hours;
                      }

                      if (minutes < 10) {
                        minutes = "0" + minutes;
                      }

                      let timeStr = `${hours}:${minutes}` + ` ${ampm}`;

                      console.log("timeStr is");
                      console.log(timeStr);

                      setCell(newValue);

                      setNewSchedule((previousState) => {
                        return {
                          ...previousState,
                          newTime: timeStr,
                        };
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        className="bg-white"
                        fullWidth
                        size="small"
                        {...params}
                        sx={{
                          svg: { color: "#0B83A5" },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex items-center justify-end mt-2 space-x-3">
                <fieldset
                  disabled={isDisabled}
                  style={{ marginRight: "100px" }}
                >
                  <CheckBoxField
                    control={control}
                    name="applyToAll"
                    label="Apply To All"
                    placeholder="Apply To All"
                    style={isDisabled ? { color: "gray" } : null}
                  />
                </fieldset>
                <CancelButton
                  onClick={() => {
                    handleClose();
                  }}
                />
                <SaveScheduleButton
                  onClick={() => {
                    setSaveBtnFlag(true);
                    handleClose();
                  }}
                />
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}
