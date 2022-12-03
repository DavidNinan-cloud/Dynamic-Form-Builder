import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Tab,
  Tabs,
  Typography,
  Box,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  List,
  TablePagination,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

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

const headCells = [
  {
    id: "orderdate",
    label: "Order Date",
    numeric: false,
  },
  {
    id: "uhidnumber",
    label: "Uhid",
    numeric: false,
  },
  {
    id: "patientname",
    label: "Patient Name",
    numeric: false,
  },
  {
    id: "testlist",
    label: "Test Name",
    numeric: false,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="bg-gray-100 ">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className="font-semibold"
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const OrderStatusTable = (props) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const { page, setPage, rowsPerPage, setRowsPerPage, count, setCount, rows } =
    props;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    console.log("rowsPerPage", rowsPerPage);
    console.log("event.target.value", event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} elevation={2}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Table sx={{ height: "100%" }} aria-label="simple table" size="small">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={count}
        />

        <TableBody>
          {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>{row?.orderdate}</TableCell>
                  <TableCell>{row?.uhidnumber}</TableCell>
                  <TableCell>{row?.patientname}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1 items-start">
                      {row?.testlist.map((item) => {
                        return (
                          <span className="border border-gray-400 p-1 rounded-sm">
                            {item?.testname}
                          </span>
                        );
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderStatusTable;
