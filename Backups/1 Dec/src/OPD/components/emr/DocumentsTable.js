import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Modal, { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { baseUrl } from "../../http-common-emr";
// import useFileUpload from "../../Common Components/hooks/useFileUpload";
//set descending sort order
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

//set sort desc
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function DocumentsTable(props) {
  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //actions
  const [deleteAction, setDeleteAction] = React.useState(false);
  const [editAction, setEditAction] = React.useState(false);

  //   const investigationReport = useFileUpload();
  //by default asc order

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

  //table start
  return (
    <div className="w-full h-[100%] scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50">
      <Table stickyHeader className="overflow-scroll">
        <TableHead>
          <TableRow>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Actions
              </span>
            </TableCell>
            {/* heading of table */}
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Document Name
              </span>
            </TableCell>
            <TableCell>
              <span className="whitespace-nowrap text-gray-600 font-bold ">
                Document Type
              </span>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
          {props.data.result
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not use that time show all rows
            .map((row, index) => {
              return (
                <TableRow key={index}>
                  {props.data.actions.length > 0 ? (
                    <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                      <div className="flex">
                        {editAction ? (
                          <button className="text-blue-500 mr-1">
                            <DriveFileRenameOutlineIcon
                              fontSize="small"
                              onClick={(e) => {
                                props.setOpen(true);
                                props.editRow(row, index);
                              }}
                            />
                          </button>
                        ) : (
                          ""
                        )}

                        {deleteAction ? (
                          <button
                            className="text-red-500 mr-3"
                            // onClick={() => props.deleteRow(row)}
                            onClick={() => props.deleteRow(index)}
                          >
                            {<DeleteOutlineOutlinedIcon fontSize="small" />}
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </TableCell>
                  ) : (
                    ""
                  )}
                  <TableCell className="whitespace-nowrap">
                    <button
                      onClick={() => {
                        props.setOpenViewDoc(true);
                        props.setDocumentPdf(
                          `${baseUrl}/file/documents/${row.documentName}`
                        );
                      }}
                    >
                      {row.documentName}
                    </button>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.documentType}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {/* </TableContainer> */}

      {/* //table end */}
      {/* pagination */}
      {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.data.result.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
      {/* </Paper>
      </Box> */}
    </div>
  );
}
