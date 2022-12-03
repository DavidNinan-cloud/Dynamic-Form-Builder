import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { TextField, FormControl } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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

const headCells = [
  {
    id: "isCollected",
    label: "Is Collected",
  },
  {
    id: "testName",
    label: "Test Name",
  },
  {
    id: "collectedTime",
    label: "Collected Time",
  },
  {
    id: "isOutsource",
    label: "Is Outsource",
  },
  {
    id: "agency",
    label: "Agency",
  },
  {
    id: "technicianName",
    label: "Technician Name",
  },
];

let myArr = [];
export default function PathologyTestDetailsTable(props) {
  const [checkedIsCollected, setCheckedIsCollected] = React.useState();
  const [collected, setCollected] = React.useState(false);

  const {
    rows,
    onSubmitTableData,
    agencyOptions,
    selectedTest,
    setSelectedTest,
    selectedObjTest,
    setSelectedObjTest,
    showCollectedTimeModal,
    setShowCollectedTimeModal,
    setBackdropOpen,

    technicianOptions,
  } = props;

  React.useEffect(() => {
    if (rows.length > 0) {
      let myObj;
      rows.map((item) => {
        myObj = {
          id: item.Id,
        };
        myArr.push(myObj);
      });
    }
  }, []);

  React.useEffect(() => {
    if (rows) {
      rows.map((item) => {
        console.log("item", item);
      });
    }
  }, []);

  const defaultValues = {
    orderDetails: [
      {
        IsOutSourced: false,
        IsCollected: false,
        CollectedTime: null,
        AgencyName: "",
        SampleNo: "",
        TestName: "",
        TechnicianName: "",
      },
    ],
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,

    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    defaultValues,
  });

  const { fields } = useFieldArray({
    control,
    name: "orderDetails",
  });

  let watchOrderDetails = watch("orderDetails");

  console.log("watchOrderDetails", watchOrderDetails);

  let watchIsOutSourced = watchOrderDetails.map((item) => item.IsOutSourced);

  console.log("watchIsOutSourced", watchIsOutSourced);

  const handleChangeIsCollected = (event) => {
    console.log("event.target.checked", event.target.checked);
    setCheckedIsCollected(event.target.checked);
  };

  const [checkedIsOutsourced, setCheckedIsOutsourced] = React.useState();

  const [IsOutsourcedIndex, setIsOutsourcedIndex] = React.useState();

  const handleChangeIsOutsourced = (event, index) => {
    console.log("event.target.checked", event.target.checked);
    setCheckedIsOutsourced(event.target.checked);
    setIsOutsourcedIndex(index);
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      // setSelected(newSelected);
      return;
    }
    //setSelected([]);
  };

  const handleClick = (event, row, id) => {
    setSelectedObjTest(row);
    console.log("row", row);
    const selectedIndex = selectedTest.indexOf(id);
    let newSelected = [];

    newSelected = newSelected.concat(id);

    console.log("newSelected", newSelected);
    console.log("selectedIndex", selectedIndex);

    console.log("selected", selectedTest);

    if (selectedIndex === 0) {
      newSelected = [];
      setSelectedTest(null);
    }
    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }

    setSelectedTest(newSelected);
  };

  const isSelected = (name) => selectedTest.indexOf(name) !== -1;

  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleSortRequest(event, property);
  };

  // React.useEffect(() => {
  //   if (rows.length > 0) {
  //     setCheckedIsCollected(rows.map((item) => item.IsCollected));
  //   }
  // }, [checkedIsCollected]);

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmitTableData)}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            {fields.map((item, index) => {
              return (
                <Table aria-labelledby="tableTitle" size="small" key={index}>
                  <TableHead className="bg-gray-200">
                    <TableRow>
                      {/* <TableCell className="whitespace-nowrap">
                        <span className="text-gray-600 font-bold">Select</span>
                      </TableCell> */}
                      {headCells.map((headCell) => (
                        <TableCell
                          className="whitespace-nowrap"
                          key={headCell.id}
                          sortDirection={
                            orderBy === headCell.id ? order : false
                          }
                        >
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                          >
                            <span className="text-gray-600 font-bold">
                              {" "}
                              {headCell.label}
                            </span>
                            {orderBy === headCell.id ? (
                              <Box component="span" sx={visuallyHidden}>
                                {order === "desc"
                                  ? "sorted descending"
                                  : "sorted ascending"}
                              </Box>
                            ) : null}
                          </TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(rows, getComparator(order, orderBy)).map(
                      (row, index) => {
                        const isItemSelected = isSelected(row.testId);

                        return (
                          <TableRow
                            hover
                            onClick={(event) =>
                              handleClick(event, row, row.testId)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.testId}
                            selected={isItemSelected}
                          >
                            {/* <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                size="small"
                              />
                            </TableCell> */}
                            <TableCell>
                              {row.IsCollected && (
                                <Controller
                                  name={`orderDetails.${index}.IsCollected`}
                                  control={control}
                                  defaultValue={row.IsCollected}
                                  render={({ field }) => (
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          {...field}
                                          disabled={row.IsCollected}
                                          checked={row.IsCollected}
                                          size="small"
                                        />
                                      }
                                    />
                                  )}
                                />
                              )}
                              {!row.IsCollected && (
                                <Controller
                                  name={`orderDetails.${index}.IsCollected`}
                                  control={control}
                                  defaultValue={row.IsCollected}
                                  render={({ field }) => (
                                    <FormControlLabel
                                      control={
                                        <Checkbox {...field} size="small" />
                                      }
                                    />
                                  )}
                                />
                              )}
                            </TableCell>

                            <TableCell>
                              <div className="flex items-center">
                                <span>{row.TestName}</span>
                                <input
                                  type="hidden"
                                  name={`orderDetails.${index}.TestName`}
                                  {...register(
                                    `orderDetails.${index}.TestName`
                                  )}
                                  value={row.TestName}
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              {row.CollectedTime ? (
                                row.CollectedTime
                              ) : (
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <FormControl className="w-60">
                                    <Controller
                                      control={control}
                                      name={`orderDetails.${index}.CollectedTime`}
                                      defaultValue={null}
                                      //rules={{ required: true }}
                                      render={({
                                        field: { ref, ...field },
                                      }) => (
                                        <DateTimePicker
                                          size="small"
                                          {...field}
                                          label="Collected Date & Time"
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              placeholder="Collected Date & Time"
                                              size="small"
                                              fullWidth
                                            />
                                          )}
                                        />
                                      )}
                                    />
                                  </FormControl>
                                  {/* <TextField
                                  className="w-40"
                                  size="small"
                                  label="Collected Time"
                                  name={`orderDetails.${index}.CollectedTime`}
                                  {...register(
                                    `orderDetails.${index}.CollectedTime`
                                  )}
                                /> */}
                                </LocalizationProvider>
                              )}
                            </TableCell>
                            {/* <TableCell>{row.Barcode}</TableCell> */}

                            <TableCell>
                              {row.IsOutSourced && row.IsOutSourced && (
                                <Controller
                                  name={`orderDetails.${index}.IsOutSourced`}
                                  control={control}
                                  defaultValue={row.IsOutSourced}
                                  render={({ field }) => (
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          {...field}
                                          disabled={row.IsCollected}
                                          checked={row.IsOutSourced}
                                          size="small"
                                        />
                                      }
                                    />
                                  )}
                                />
                              )}
                              {!row.IsOutSourced && !row.IsOutSourced && (
                                <Controller
                                  name={`orderDetails.${index}.IsOutSourced`}
                                  control={control}
                                  defaultValue={row.IsOutSourced}
                                  render={({ field }) => (
                                    <FormControlLabel
                                      control={
                                        <Checkbox {...field} size="small" />
                                      }
                                    />
                                  )}
                                />
                              )}
                              {/* <Checkbox
                                color="primary"
                                defaultChecked={row.IsOutSourced}
                                disabled={row.IsCollected}
                                // checked={row.IsCollected}
                                onChange={(event) =>
                                  handleChangeIsOutsourced(event, index)
                                }
                                size="small"
                              /> */}
                            </TableCell>
                            {/* {watchIsOutSourced[index] === true ? ( */}
                            <TableCell className="w-1/5">
                              {row.AgencyName ? (
                                row.AgencyName
                              ) : agencyOptions &&
                                watchIsOutSourced[index] === true ? (
                                <div className="w-full">
                                  <DropdownField
                                    control={control}
                                    error={errors.agency}
                                    name={`orderDetails.${index}.AgencyName`}
                                    label="Agency"
                                    dataArray={agencyOptions}
                                    isSearchable={false}
                                    placeholder="Agency"
                                    isClearable={false}
                                  />
                                </div>
                              ) : (
                                <span className="w-full">N.A.</span>
                              )}
                            </TableCell>
                            {/* ) : (
                              <TableCell className="w-1/5">
                                <span className="w-full">N.A.</span>
                              </TableCell>
                            )} */}
                            <TableCell className="w-1/5">
                              {row.TechnicianName && row.TechnicianName}
                              {row.TechnicianName === " " && (
                                <div className="w-full">
                                  <DropdownField
                                    control={control}
                                    error={errors.TechnicianName}
                                    name={`orderDetails.${index}.TechnicianName`}
                                    label="Technician"
                                    dataArray={technicianOptions}
                                    isSearchable={false}
                                    placeholder="Technician"
                                    isClearable={false}
                                  />
                                </div>
                              )}
                              {/* {!row.TechnicianName === " " ? (
                                row.TechnicianName
                              ) : (
                                <div className="">
                                  <DropdownField
                                    control={control}
                                    error={errors.TechnicianName}
                                    name={`orderDetails.${index}.TechnicianName`}
                                    label="Technician Name"
                                    dataArray={technicianOptions}
                                    isSearchable={false}
                                    placeholder="Technician Name"
                                    isClearable={false}
                                  />
                                </div>
                              )} */}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              );
            })}
          </TableContainer>
        </Paper>
        <div className="flex justify-end">
          <SaveButton />
        </div>
      </form>
    </Box>
  );
}
