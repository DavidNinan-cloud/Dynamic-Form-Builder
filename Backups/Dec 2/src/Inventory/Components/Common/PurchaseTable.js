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
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { TextField, Tooltip } from "@mui/material";

export default function PurchaseTable(props) {
  const { tableApiFunc, searchString, dataResult, setDataResult } = props;

  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();

  //actions
  const [printAction, setPrintAction] = React.useState(true);
  const [deleteAction, setDeleteAction] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [consentFor, setConsentFor] = React.useState(true);
  const [viewfile, setViewFile] = React.useState(true);

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
      if (action === "Print") {
        setPrintAction(true);
      }
      if (action === "Delete") {
        setDeleteAction(true);
      }
      if (action === "ChooseFile") {
        setConsentFor(true);
      }
      if (action === "ViewFile") {
        setViewFile(true);
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
        <Box sx={{ width: "100%", overflow: "hidden" }}>
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
              className="rounded"
            >
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Actions</span>
                    </TableCell>

                    {headers.map((header, index) => (
                      <TableCell
                        className="whitespace-nowrap justify-between"
                        key={index}
                        style={{ background: "#F1F1F1" }}
                      >
                        <span className="text-gray-600 font-bold">
                          {header}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.result.map((row, index) => {
                    return (
                      <TableRow key={index} >
                        {props.data.actions.length > 0 ? (
                          <TableCell className="px-4 py-1 flex whitespace-nowrap">
                            <div className="flex">
                            {viewfile ? (
                                <Tooltip title="View Consent">
                                  <a
                                    href="##"
                                    value="click"
                                    className="text-[#29a8da] mr-1"
                                  >
                                    <VisibilityIcon
                                    // onClick={(e) => {
                                    //   props.setOpen(true);
                                    //   props.editRow(row);
                                    // }}
                                    />
                                  </a>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                            </div>
                          </TableCell>
                        ) : (
                          ""
                        )}
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap flex text-center"
                              key={i}
                              onClick={() => {
                                props.displayView(row, index);
                              }}
                            >
                              {row[header]}
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
      </div>
    </>
  );
}
