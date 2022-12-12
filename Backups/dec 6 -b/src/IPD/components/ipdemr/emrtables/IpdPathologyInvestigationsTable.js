import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useFileUpload from "../../admission/admissionform/common component/hooks/useFileUpload";
// import { baseUrl } from "../../../http-common-emr";
import { pathologyInvestigationContext } from "../Context";
import { useEffect } from "react";

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

export default function IpdPathologyInvestigationsTable(props) {
  console.log("Table Props", props);

  const { pathologyInvestigations } = React.useContext(
    pathologyInvestigationContext
  );

  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //actions
  const [deleteAction, setDeleteAction] = React.useState(true);
  const [editAction, setEditAction] = React.useState(true);
  const [
    pathologyInvestigationsData,
    setPathologyInvestigationsData,
  ] = React.useState(pathologyInvestigations);

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

  //table start
  return (
    <div className="w-full h-60 overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
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
                Date
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Investigation
              </span>
            </TableCell>

            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Status
              </span>
            </TableCell>

            {/* {row.investigationImageName !== null ? ( */}
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                View/Upload
              </span>
            </TableCell>
            {/* ) : (
              ""
            )} */}
            {/* {props.dataId !== null ? (
              <TableCell>
                <span className="text-gray-600 font-bold whitespace-nowrap">
                  Report
                </span>
              </TableCell>
            ) : (
              ""
            )} */}
          </TableRow>
        </TableHead>

        <TableBody>
          {stableSort(props.data.result, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //splice use for show rows upto 5 when splice is not use that time show all rows
            .map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                    <div className="flex">
                      {editAction ? (
                        <button className="text-blue-500 mr-1">
                          <DriveFileRenameOutlineIcon
                            fontSize="small"
                            onClick={(e) => {
                              // props.setOpen(true);
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

                  {typeof row.collectedTime !== "undefined" ? (
                    <TableCell className="whitespace-nowrap">
                      {row.collectedTime}
                    </TableCell>
                  ) : (
                    <TableCell className="whitespace-nowrap">-</TableCell>
                  )}
                  <TableCell className="whitespace-nowrap">
                    {row.investigation}
                  </TableCell>
                  {typeof row.status !== "undefined" ? (
                    <TableCell className="whitespace-nowrap">
                      {row.status}
                    </TableCell>
                  ) : (
                    <TableCell className="whitespace-nowrap">-</TableCell>
                  )}

                  {row.pathologyInvestigationReport !== null ? (
                    <TableCell className="whitespace-nowrap ">
                      <button
                        className="w-10 overflow-hidden text-ellipsis"
                        onClick={() => {
                          props.setOpenViewDoc(true);
                          props.setInvestigationReport(
                            row.pathologyInvestigationReportPath
                          );
                          //     `${baseUrl}/file/investigation/${row.investigationImageName}`
                          //   );
                        }}
                      >
                        {row.pathologyInvestigationReport}
                      </button>
                    </TableCell>
                  ) : (
                    <TableCell className="whitespace-nowrap">
                      <div>
                        <input
                          type="file"
                          accept="image/*, .pdf"
                          style={{ display: "none" }}
                          id="uploadBtn"
                          onChange={(e) => props.handleDocChange(e, index)}
                        />
                        <label htmlFor="uploadBtn">
                          <Button
                            variant="outlined"
                            component="span"
                            sx={{
                              fontSize: "0.65rem",
                            }}
                          >
                            Upload Report
                          </Button>
                        </label>
                      </div>
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
