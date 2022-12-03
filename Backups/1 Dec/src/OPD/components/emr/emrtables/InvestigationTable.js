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

export default function InvestigationTable(props) {
  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //actions
  const [deleteAction, setDeleteAction] = React.useState(false);
  const [editAction, setEditAction] = React.useState(false);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);
  const [reportPic, setReportPic] = React.useState();
  const [reportName, setReportName] = React.useState(null);

  //   const investigationReport = useFileUpload();
  //by default asc order
  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const createSortHandler = (property) => (event) => {
    handleSortRequest(event, property);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  //5,10.25 change as per the selection
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  //table start
  return (
    <div className="w-full h-auto max-h-60 overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
      <Table stickyHeader sx={{ overflow: "scroll" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Actions
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Test Type
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Investigation
              </span>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
          {stableSort(props.data.result, getComparator(order, orderBy))
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
                    {row.testType}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.investigation}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
