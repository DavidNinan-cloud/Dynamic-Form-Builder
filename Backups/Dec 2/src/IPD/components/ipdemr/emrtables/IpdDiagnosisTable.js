import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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

export default function IpdDiagnosisTable(props) {
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
                ICD Code
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Since
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Duration
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Status
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Chronic/Non-Chronic
              </span>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
          {props.data.result.map((row, index) => {
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

                <TableCell className="whitespace-wrap w-96">
                  {row.icd}
                </TableCell>
                <TableCell className="whitespace-nowrap">{row.since}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.duration}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.status}
                </TableCell>
                {row.isChronic === true ? (
                  <TableCell className="whitespace-nowrap">Chronic</TableCell>
                ) : (
                  <TableCell className="whitespace-nowrap">
                    Non-Chronic
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
