//imports from react library
import * as React from "react";
import { useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddNewButton from "../../../../Common Components/Buttons/AddNewButton";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
//internal project functions and componants import
import {
  autoSearchRoute,
  fetchAllRoute,
  deleteRouteById,
  getUnitList,
} from "../../../services/opd/RouteService";
import RouteTable from "./RouteTable";
//fromfield control liberary componant import
import SearchBar from "../../../../Common Components/FormFields/SearchBar";

import ConfirmationModal from "../../../../Common Components/ConfirmationModal";

import {
  deleteAlert,
  errdeleteAlert,
} from "../../../../Common Components/Toasts/Toasts";

//LodingSpinner
import LoadingSpinner from "../../../components/common/loadingspinner/loadingSpinner";
import RouteModal from "../route/RouteModal";
//imports from react hook form
import { useForm } from "react-hook-form";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function PrescriptionRoute() {
  let searchValue = "";
  let unitIdValue = null;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  // for recalling api
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [options, setOptions] = React.useState([]);
  //add edit update and cancel button
  const [edit, setEdit] = React.useState(false);

  //The state variable to store the id for delete operation
  const [deleteId, setDeleteId] = React.useState("");

  //state variable for showing or not showing spinner
  const [spinner, showSpinner] = React.useState(false);

  const [recordWarning, showRecordWarning] = React.useState(false);

  const [openChild, setOpenChild] = React.useState(false);

  const handleOpenChild = () => setOpenChild(true);

  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idValue, setIdValue] = React.useState("");
  //the object to reset the form to blank values
  //Select unit dropdown
  const [unitOptions, setUnitOptions] = React.useState([]);

  //Current option displayed on the "Select Unit" dropdown
  const [currentUnitOption, setCurrentUnitOption] = React.useState({});

  //Current id of the selected unit
  const [unitId, setUnitId] = React.useState(null);

  //yup schema
  const schema = yup.object().shape({
    unit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Please Select Unit"),
        label: yup.string().required("Please Select Unit"),
      }),
  });

  let routeList = {
    statusCode: "",
    result: [],
    actions: [],
  };

  const defaultValues = {
    unit: null,
  };

  const defaultAllDropdown = {
    value: "All",
    label: "All",
    id: null,
  };

  //For search POST Request , set the searchObj into the following variable
  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //Before the component gets mounted , call the asynchronous function fetchAllCountries(). And resolve the promise returned by that function.
  useEffect(() => {
    console.log("useEffect One");
    console.log("getUnitList() is going to be executed");
    getUnitListDropdown();
    setValue("unit", defaultAllDropdown);
  }, []);

  useEffect(() => {
    console.log("useEffect Two");
    callTableDataApi();
  }, [searchString, unitId]);

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    console.log("filter");
    console.log("The search value is " + searchValue);
    setSearchString(searchValue);
    console.log("The current unit dropdown option is");
    console.log(JSON.stringify(getValues("unit")));
    setUnitId(getValues("unit").id);
  };

  //use props for the DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    if (autoSearchString !== "") {
      searchValue = autoSearchString;
      autoSearchRoute(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setOptions(res.result);
        });
    }
  };
  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(value);
    if (value === null) {
      setSearchString("");
    } else {
      console.log("search value by route", JSON.stringify(value));
      searchValue = value.route;
      // unitIdValue = getValues("unit").id;
      // console.log("The unit id is " + unitIdValue);
    }
  };

  //event listener function for edit icon
  function editRow(route) {
    setEdit(true);
    console.log("department object is " + JSON.stringify(route));
    console.log("Required id is deptId" + route.id);

    //the current displayed value of the Select Unit dropdown
    console.log(
      "Current option in the Dropdown field is " +
        JSON.stringify(getValues("unit"))
    );
    setCurrentUnitOption(getValues("unit"));
    setIdValue(route.id);
    handleOpen();
  }

  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }
  // function to delete the table data
  function deleteRow(row) {
    handleOpenChild();
    console.log(row.id);
    setDeleteId(row.id);
  }

  //axios request for data deletion. That is delete request
  function deleteRecord() {
    console.log("The record having id " + deleteId + " is going to be deleted");
    handleCloseChild();
    setOpenBackdrop(true);
    deleteRouteById(deleteId)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          populateTable();
          deleteAlert(response.data.message);
          setOpenBackdrop(false);
        }

        //Close the confirmation modal
        handleCloseChild();
      })
      .catch(() => {
        //Code for React Toast
        setOpenBackdrop(false);
        errdeleteAlert(error.message);
      });
  }

  // Get request to have all the list of Unit. This request belongs to the block-controller on swagger
  function getUnitListDropdown() {
    getUnitList()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);

        //storing the option at the beginnning of the array
        response.data.result.unshift(defaultAllDropdown);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const callTableDataApi = () => {
    console.log("callTableDataApi function was called");
    let obj = {
      page: page,
      size: rowsPerPage,
      searchString: searchString,
      unit: unitId,
    };
    console.log("input to callTableDataApi " + JSON.stringify(obj));
    setPage(0);
    showSpinner(true);
    showRecordWarning(false);
    fetchAllRoute(obj)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));

        res.result.forEach((jsonString) => {
          let jsonObject = JSON.parse(jsonString);
          routeList.result.push(jsonObject);
        });

        routeList.actions = [...res.actions];
        routeList.statusCode = res.statusCode;
        console.log(routeList);
        setData(routeList);
        setDataResult(routeList.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  const onSubmitDataHandler = (formData) => {
    console.log("onSubmitDataHandler function has been invoked");

    console.log(formData);
  };

  return (
    <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
      <div className="flex justify-center text-xl">
        <h1 className=" text-gray-700 font-Poppins lg:hidden ">Route</h1>
      </div>

      {/*searchable dropdown */}
      <div className="flex gap-2 w-full items-center mt-2">
        {/* <div className=" flex items-center w-full gap-14"> */}
        <h1 className="text-xl text-gray-700 font-Poppins hidden lg:block">
          Route
        </h1>

        <div className="flex w-full lg:grid grid-cols-3 gap-2 items-center ">
          <div className="flex gap-2 w-full">
            <SearchBar
              name="SearchableSelect"
              placeholder="Search By Route"
              dataArray={options}
              handleInputChange={handleChange}
              onChange={autoSelectedValue}
            />
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmitDataHandler)}>
              <div className="w-40 xl:w-60">
                <DropdownField
                  control={control}
                  error={errors.unit}
                  name="unit"
                  placeholder="Unit"
                  dataArray={unitOptions}
                  //isDisabled={props.edit}
                />
              </div>
            </form>
          </div>
          <div className="flex  gap-2">
            <Button
              className=" h-9 w-10 px-2 rounded-md text-gray-500"
              type="button"
              variant="outlined"
              size="small"
              sx={{ borderColor: "grey.500", color: "gray" }}
              onClick={filterData}
            >
              <SearchIcon className="cursor-pointer" />
            </Button>
            <Button
              className=" h-9 w-10 px-2 rounded-md text-gray-500"
              type="button"
            >
              <TuneIcon className="cursor-pointer" />
            </Button>
          </div>
        </div>
        {/* </div> */}

        <div className="grid justify-end xl:col-span-3 w-1/3">
          {/* Modal for Add */}
          <AddNewButton
            onClick={() => {
              handleOpen();
            }}
          />
        </div>
        <CommonBackDrop openBackdrop={openBackdrop} />
      </div>

      {spinner ? (
        <div className="grid justify-center pt-28">
          <LoadingSpinner />
        </div>
      ) : null}

      {/* CommonMasterTable Component */}
      {/* CommonMasterTable Component */}
      {data.hasOwnProperty("result") &&
      data.result.length > 0 &&
      data.statusCode === 200 &&
      spinner === false ? (
        <RouteTable
          tableApiFunc={fetchAllRoute}
          searchString={searchString}
          unitId={unitId}
          setUnitId={setUnitId}
          dataResult={dataResult}
          setDataResult={setDataResult}
          data={data}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={count}
          editRow={editRow}
          setOpen={setOpen}
          deleteRow={deleteRow}
          displayView={displayView}
        />
      ) : null}

      {/* do not show "No Records found" when data is loading ; AND when the data has arrived successfully*/}
      {recordWarning === true && spinner === false ? (
        <div className="flex justify-center">
          <h3 className="flex justify-center mt-28 font-bold text-gray-600">
            No Records Found...
          </h3>
        </div>
      ) : null}

      <RouteModal
        // populateTable={populateTable}
        edit={edit}
        setEdit={setEdit}
        open={open}
        setOpen={setOpen}
        idValue={idValue}
        openBackdrop={openBackdrop}
        setOpenBackdrop={setOpenBackdrop}
        handleOpen={handleOpen}
        handleClose={handleClose}
        currentUnitOption={currentUnitOption}
      />
      {/* delete */}
      <ConfirmationModal
        confirmationOpen={openChild}
        confirmationHandleClose={handleCloseChild}
        confirmationSubmitFunc={deleteRecord}
        confirmationLabel="Confirmation "
        confirmationMsg="Are you sure want to delete this record ?"
        confirmationButtonMsg="Delete"
      />
    </div>
  );
}
