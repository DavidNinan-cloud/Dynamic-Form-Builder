import { Divider, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import { Style } from "../../../IPD/components/bedallowcation/Style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SaveButton from "../../../Common Components/Buttons/SaveButton";
import CloseButton from "../../../Common Components/Buttons/CloseButton";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CommonTable from "../../../IPD/nursing/common/CommonTable";
import AddButton from "../../../Common Components/Buttons/AddButton";
import SearchBar from "../../../Common Components/FormFields/SearchBar";

const drugListData = {
  message: " Drug list found ",
  result: [
    {
      Id: 30,
      "Indent No": "982454",
      "Indent Data": "Lorem ipsum dolor ",
      "Indent From Store": "Tab.",
      "Patient Name": "Mukesh Ambani",
      "IPD No.": "IP/22/1234",
    },
    {
      Id: 31,
      "Indent No": "11454",
      "Indent Data": "Lorem ipsum dolor ",
      "Indent From Store": "Tab.",
      "Patient Name": "Rahul Gandhi",
      "IPD No.": "IP/233/33234",
    },
  ],
  statusCode: 200,
  count: 3,
};

export default function IndentModal(props) {
    const schema = yup.object().shape({
        fromStore: yup
          .object()
          .required("Required")
          .nullable()
          .shape({
            value: yup.string().required("Please Select From Store"),
            label: yup.string().required("Please Select From Store"),
            
          }),
          toStore: yup
          .object()
          .required("Required")
          .nullable()
          .shape({
            value: yup.string().required("Please To Store"),
            label: yup.string().required("Please Select To Store"),
            
          }),
      })

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    fromStore: null,
    toStore: null,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    //to set the form fields as blank
    reset(defaultValues);
  };
  const handleChangeSearchBar = (autoSearchString) => {
    console.log("handleChange has been invoked");
    console.log("The value typed by the user is " + autoSearchString);
  };
  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
  };
  return (
    <div className="w-full grid justify-center items-center rounded lg:px-0">
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style} className="h-[80%] w-[80%] px-4 pb-2 ">
          <div className="relative left-10">
            <CancelPresentationIconButton
              className=""
              onClick={() => {
                props.handleClose();
                reset(defaultValues);
              }}
            />
          </div>
          <form   onSubmit={handleSubmit(onSubmitDataHandler)}>
            <div className="row">
              <div className="mt-6">
                <h1 className="text-xl font-semibold">Indent Details</h1>
                <div className="grid grid-cols-2 lg:grid-cols-6 xl:flex items-center gap-2 mt-1">
                  <div className="w-full lg:col-span-2 xl:w-4/12">
                    <DropdownField
                      control={control}
                      error={errors.fromStore}
                      name="fromStore"
                      placeholder="From Store"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>
                  <div className="w-full lg:col-span-2  xl:w-4/12">
                    <DropdownField
                      control={control}
                      error={errors.toStore}
                      name="toStore"
                      placeholder="To Store"
                      // dataArray={groupOptions}
                      isDisabled={props.edit}
                    />
                  </div>

                  {/* <div className="w-full col-span-2 xl:w-4/12 ">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Start Date"
                        name="startDate"
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className="bg-white"
                            fullWidth
                            size="small"
                            {...params}
                            sx={{
                              svg: { color: "#0B83A5" },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="w-full col-span-2 xl:w-4/12  ">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="End Date"
                        name="endDate"
                        value={endDate}
                        onChange={(newValue) => {
                          setEndDate(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className="bg-white"
                            fullWidth
                            size="small"
                            {...params}
                            sx={{
                              svg: { color: "#0B83A5" },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div> */}
                  <div className="flex space-x-2 border rounded  items-center py-[7px] border-gray-300 w-full lg:col-span-2  xl:w-4/12">
                    <h1 className="px-2 font-semibold text-gray-700 ml-3">
                      Is Urgent
                    </h1>
                    <div className="flex space-x-3 items-center ml-3">
                      <div className="flex space-x-3 items-center">
                        <input className="h-4 w-4" type="radio" value="Yes"  />
                        <lable>Yes</lable>
                      </div>
                      <div className="flex space-x-3 items-center">
                        <input className="h-4 w-4" type="radio" value="No" checked />
                        <lable>No</lable>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 space-y-2 lg:space-y-0 xl:flex justify-between  mt-2 w-full gap-2 items-center">
                  <div className="flex  space-x-2 w-full">
                    <h1 className="font-semibold text-gray-700 mt-2 whitespace-nowrap">
                      Item Details
                    </h1>
                    <div className=" overflow-hidden w-9/12  ">
                      <SearchBar
                        control={control}
                        sx={{ overflow: "hidden" }}
                        name="searchItem"
                        label="Search By Item Name / Number"
                        searchIcon={true}
                        // dataArray={itemsData}
                        handleInputChange={handleChangeSearchBar}
                        onChange={autoSelectedValue}
                        placeholder="Search By Item Name / Number"
                        isSearchable={true}
                        isClearable={false}
                      />
                    </div>
                    <TextField
                      className="w-2/12"
                      label="Qty"
                      size="small"
                      variant="outlined"
                    />
                    <AddButton />
                  </div>
                  <Divider
                  className="hidden xl:block"
                    orientation="vertical"
                    flexItem
                    sx={{ borderRightWidth: 2 }}
                  />
                  <div className="flex space-x-2 w-9/12">
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        // error={errors.itemKit}
                        name="itemKit"
                        placeholder="Item Kit"
                        // dataArray={groupOptions}
                        isDisabled={props.edit}
                      />
                    </div>
                    <TextField
                      className=""
                      label="Qty"
                      size="small"
                      variant="outlined"
                    />
                    <AddButton />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:flex lg:space-x-3 items-center w-full">
              <div className="w-full">
                {/* <h1 className="text-lg font-semibold">Drug List Information</h1> */}
                <CommonTable data={drugListData} />
              </div>
            </div>

            <div className="flex space-x-2 justify-end mt-2">

              <ResetButton />
              <SaveButton />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
