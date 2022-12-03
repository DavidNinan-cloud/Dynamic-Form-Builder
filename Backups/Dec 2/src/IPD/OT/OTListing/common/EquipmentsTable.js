import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import InputField from "../../../../Common Components/FormFields/InputField";

export default function EquipmentsTable(props) {
  const { tableApiFunc, searchString, dataResult, setDataResult } = props;

  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();

  //actions
  const [editAction, setEditAction] = React.useState(true);
  const [deleteAction, setDeleteAction] = React.useState(true);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);

  const callAgainTableApi = (recordsNeeded) => {
    console.log("defaultParams", defaultParams);
    tableApiFunc(defaultParams)
      .then((response) => response.data)
      .then((res) => {
        let incomingData = res.result;
        let onlyNeededData = incomingData.slice(-Math.abs(recordsNeeded));

        // append needed data
        let existData = [...dataResult];
        for (let value of onlyNeededData) {
          existData.push(value);
        }
        setDataResult(existData);
      });
  };

  React.useEffect(() => {
    props.data.actions.forEach((action) => {
        if (action === "Edit") {
            setEditAction(true);
          }
      if (action === "Delete") {
        setDeleteAction(true);
      }
      if (action === "Confirm") {
        setconfirmAction(true);
      }
      if (action === "Reschedule") {
        setrescheduleAction(true);
      }
      if (action === "Cancel") {
        setcancelAction(true);
      }
    });
  }, []);

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);

  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden", }}>
          <Paper sx={{ width: "100%", my: 1 }}>
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
              className="rounded h-full"
            >
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
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
                        Rate
                      </span>
                    </TableCell>
                    <TableCell style={{ background: "#F1F1F1" }}>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Quantity
                      </span>
                    </TableCell>
                    <TableCell style={{ background: "#F1F1F1" }}>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Amount
                      </span>
                    </TableCell>
                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Actions</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.result.map((row, index) => {
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
                          <div className="flex w-32">
                            <InputField
                            name="rate"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                          <div className="flex w-32">
                            <InputField
                            name="qty"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                          <div className="flex w-96">
                            <label name="Amount"/>
                          </div>
                        </TableCell>
                        {props.data.actions.length > 0 ? (
                          <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                            <div className="flex">
                              {deleteAction ? (
                                <a
                                  href="##"
                                  className="text-red-500 mr-3"
                                  onClick={() => props.deleteRow(row)}
                                  // onClick={() => props.deleteRow(index)}
                                >
                                  {<DeleteOutlineOutlinedIcon />}
                                </a>
                              ) : (
                                ""
                              )}
                            </div>
                          </TableCell>
                        ) : (
                          ""
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
}
