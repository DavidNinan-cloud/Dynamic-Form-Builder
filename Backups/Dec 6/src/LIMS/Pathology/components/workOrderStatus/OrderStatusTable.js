import React, { useEffect } from "react";
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
import { useForm, Controller, useFieldArray } from "react-hook-form";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";

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

  {
    id: "isreportwhatsapp",
    label: "Whatsapp",
    numeric: false,
  },
  {
    id: "isreportemailed",
    label: "Email",
    numeric: false,
  },
  {
    id: "isreportcollected",
    label: "Report Collected",
    numeric: false,
  },
  {
    id: "reportremark",
    label: "Remark",
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

  //     {
  //   id: "orderdate",
  //   label: "Order Date",
  //   numeric: false,
  // },
  // {
  //   id: "uhidnumber",
  //   label: "Uhid",
  //   numeric: false,
  // },
  // {
  //   id: "patientname",
  //   label: "Patient Name",
  //   numeric: false,
  // },
  // {
  //   id: "testlist",
  //   label: "Test Name",
  //   numeric: false,
  // },

  // {
  //   id: "isreportwhatsapp",
  //   label: "Whatsapp",
  //   numeric: false,
  // },
  // {
  //   id: "isreportcollected",
  //   label: "Report Collected",
  //   numeric: false,
  // },
  // {
  //   id: "reportremark",
  //   label: "Remark",
  //   numeric: false,
  // },
  // {
  //   id: "isreportemailed",
  //   label: "Email",
  //   numeric: false,
  // },

  const defaultValues = {
    statusDetails: [
      {
        orderdate: "",
        uhidnumber: "",
        patientname: "",
        testlist: [],
        isreportwhatsapp: "",
        isreportcollected: "",
        reportremark: "",
        isreportemailed: "",
      },
    ],
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { fields } = useFieldArray({
    control,
    name: "statusDetails",
  });

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

  const onSubmitTableData = (data) => {
    console.log("data", data);
  };

  useEffect(() => {
    if (rows.length > 0) {
      reset({ statusDetails: [...rows] });
    }
  }, [rows]);

  return (
    <div className="flex flex-col">
      <from>
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
              {fields.length > 0 &&
                fields.map((item, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <span> {item?.orderdate}</span>
                          <input
                            type="hidden"
                            name={`statusDetails.${index}.orderdate`}
                            {...register(`statusDetails.${index}.orderdate`)}
                            // value={row?.orderdate}
                          />
                        </div>
                      </TableCell>
                      <TableCell>{item?.uhidnumber}</TableCell>
                      <TableCell>{item?.patientname}</TableCell>{" "}
                      <TableCell>
                        <div className="flex flex-col space-y-1 items-start">
                          {item.testlist.map((item1) => {
                            return (
                              <span className="border border-gray-400 p-1 rounded-md">
                                {item1?.testname}
                              </span>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Controller
                          name={`statusDetails.${index}.isreportwhatsapp`}
                          control={control}
                          // defaultValue={true}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  {...field}
                                  // disabled={row.IsCollected}
                                  defaultChecked={item?.isreportwhatsapp}
                                  // checked={item?.isreportwhatsapp}
                                  size="small"
                                />
                              }
                            />
                          )}
                        />
                      </TableCell>{" "}
                      <TableCell>
                        {" "}
                        <Controller
                          name={`statusDetails.${index}.isreportemailed`}
                          control={control}
                          // defaultValue={true}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  {...field}
                                  // disabled={row.isreportemailed}
                                  defaultChecked={item?.isreportemailed}
                                  // checked={item?.isreportemailed}
                                  size="small"
                                />
                              }
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Controller
                          name={`statusDetails.${index}.isreportcollected`}
                          control={control}
                          // defaultValue={true}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  {...field}
                                  // disabled={row.isreportcollected}
                                  defaultChecked={item?.isreportcollected}
                                  // checked={item?.isreportcollected}
                                  size="small"
                                />
                              }
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        {/* <div className="w-28">
                          <input
                            type="text"
                            className="border border-gray-400 rounded-sm w-28 h-8"
                            placeholder="Remark"
                            name={`statusDetails.${index}.reportremark`}
                            {...register(`statusDetails.${index}.reportremark`)}
                          />
                        </div> */}
                        <TextField
                          size="small"
                          label="Remark"
                          placeholder="Remark"
                          name={`statusDetails.${index}.reportremark`}
                          {...register(`statusDetails.${index}.reportremark`)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {/* {stableSort(rows, getComparator(order, orderBy))
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
                          <TableCell>
                            <div className="flex items-center">
                              <span> {row?.orderdate}</span>
                              <input
                                type="hidden"
                                name={`statusDetails.${index}.orderdate`}
                                {...register(
                                  `statusDetails.${index}.orderdate`
                                )}
                                // value={row?.orderdate}
                              />
                            </div>
                          </TableCell>
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
                          <TableCell></TableCell>
                        </TableRow>
                      );
                    })} */}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-end mt-2">
          {/* <SaveButton /> */}
          <button
            onClick={handleSubmit(onSubmitTableData)}
            type="submit"
            className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
          >
            Save
          </button>
        </div>
      </from>
    </div>
  );
};

export default OrderStatusTable;
