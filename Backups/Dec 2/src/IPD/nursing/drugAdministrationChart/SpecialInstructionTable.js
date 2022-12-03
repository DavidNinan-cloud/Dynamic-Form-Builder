import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import ReactSelect from "react-select";
import OrderListModal from "../drugAdministrationChart/OrderListModal";

export default function SpecialInstructionTable(props) {
  //state varibale for the table
  // show coplete
  const [complete, setComplete] = React.useState(false);
  const [reject, setReject] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeShowCompleteData = (e) => {
    console.log("Value of complete checkbox is ");
    console.log(e.target.checked);
    setComplete(e.target.checked);
    // setReject(true);
  };
  const handleChangeRejectData = (e) => {
    setReject(e.target.checked);
  };
  //actions
  //   const [editAction, setEditAction] = React.useState(false);
  //   const [deleteAction, setDeleteAction] = React.useState(false);
  //   const [confirmAction, setconfirmAction] = React.useState(false);
  //   const [rescheduleAction, setrescheduleAction] = React.useState(false);
  //   const [cancelAction, setcancelAction] = React.useState(false);

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);
  // headers.unshift("#");
  // headers[0] = "#";

  //   React.useEffect(() => {
  //     props.data.actions.forEach((action) => {
  //       if (action === "Edit") {
  //         setEditAction(true);
  //       }
  //       if (action === "Delete") {
  //         setDeleteAction(true);
  //       }
  //       if (action === "Confirm") {
  //         setconfirmAction(true);
  //       }
  //       if (action === "Reschedule") {
  //         setrescheduleAction(true);
  //       }
  //       if (action === "Cancel") {
  //         setcancelAction(true);
  //       }
  //     });
  //   }, []);

  //table start
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
              className="rounded h-56 2xl:h-auto"
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
                        <span className="text-gray-600 font-bold">
                          {header}
                        </span>
                      </TableCell>
                    ))}
                    <TableCell style={{ background: "#F1F1F1" }}>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Complete
                      </span>
                    </TableCell>
                    <TableCell style={{ background: "#F1F1F1" }}>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Reject
                      </span>
                    </TableCell>

                    <TableCell style={{ background: "#F1F1F1" }}>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Complete/Reject DateTime
                      </span>
                    </TableCell>

                    <TableCell style={{ background: "#F1F1F1" }}>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Reject / Complete By
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {props.data.result.map((row, index,i) => {
                    return (
                      <TableRow key={index}>
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap"
                              key={i}
                              onClick={() => {
                                props.displayView(row, index);
                              }}
                            >
                              {row[header]}
                            </TableCell>
                          ))}

                        <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                          <div className="flex">
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={row[i]}
                                    onClick={(e) =>
                                      handleChangeShowCompleteData(e)
                                    }
                                  />
                                }
                              />
                            </FormGroup>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                          <div className="flex">
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={row[i]}
                                    onClick={(e) => handleChangeRejectData(e)}
                                  />
                                }
                              />
                            </FormGroup>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                          {complete || reject ? (
                            <div className="flex">01-10-2022,4:29Pm</div>
                          ) : (
                            ""
                          )}
                        </TableCell>

                        <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                          <div className="flex">
                            <ReactSelect />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        <OrderListModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          // dataModal={DrugScheduleListData}
        />
      </div>
    </>
  );
}
