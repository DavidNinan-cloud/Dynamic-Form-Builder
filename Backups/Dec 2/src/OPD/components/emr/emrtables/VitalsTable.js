import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

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

export default function VitalsTable(props) {
  console.log("Props", props);
  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);

  //actions
  const [deleteAction, setDeleteAction] = React.useState(false);

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
      if (action === "Delete") {
        setDeleteAction(true);
      }
    });
  }, []);

  //table start
  return (
    <div className="w-full h-auto max-h-60 overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50 ">
      <Table stickyHeader sx={{ overflow: "scroll" }} size="small">
        <TableHead>
          <TableRow>
            {props.data.actions.length > 0 ? (
              <TableCell>
                <span className="text-gray-600 font-bold whitespace-nowrap">
                  Actions
                </span>
              </TableCell>
            ) : (
              ""
            )}
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Temp
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Pulse Rate
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                BP(Systolic)
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                BP(Diastolic)
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                SpO2
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Weight
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Height
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                BMI
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Respiration
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Blood Sugar
              </span>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
          {stableSort(props.data.result, getComparator(order, orderBy)).map(
            (row, index) => {
              return (
                <TableRow key={index}>
                  {props.data.actions.length > 0 ? (
                    <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                      <div className="flex">
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
                    {row.temperature}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.pulseRate}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.bloodPressureSystolic}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.bloodPressureDiastolic}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.spO2}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.weight}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.height}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{row.bmi}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.respiration}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.bloodSugar}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
}
