import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  TextField,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
} from "@mui/material";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import ApplyButton from "../../../../Common Components/Buttons/ApplyButton";
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import SearchableDropdown from "../../../../Common Components/FormFields/searchDropdown";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import {
//   getCategoryDropdown,
//   fetchWorkOrdersList,
//   getTestTypeDropdown,
// } from "../../services/WorkOrderViewServices";

const FiltersModal = (props) => {
  const {
    showFiltersModal,
    setShowFiltersModal,
    setBackdropOpen,
    fetchWorkOrdersListData,
    rowsPerPage,
  } = props;

  const [categoryOptions, setCategoryOptions] = React.useState([]);

  const [testTypeOptions, setTestTypeOptions] = React.useState([]);

  const formOptions = {
    // resolver: yupResolver(validationSchemaPatientDetails, validationSchemaContactDetails),
    mode: "onChange",
    defaultValues: {
      patientType: "",
      sampleStatus: "",
      testType: "",
      category: "",
    },
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  useEffect(() => {
    // getCategoryDropdownList();
    // getTestTypeDropdownList();
  }, []);

  // const getCategoryDropdownList = () => {
  //   getCategoryDropdown()
  //     .then((response) => {
  //       console.log("The list of all the unit are as follows" + response);
  //       console.log(JSON.stringify(response));
  //       console.log(response.data.result);
  //       setCategoryOptions(response.data.result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getTestTypeDropdownList = () => {
  //   getTestTypeDropdown()
  //     .then((response) => {
  //       console.log("The list of all the unit are as follows" + response);
  //       console.log(JSON.stringify(response));
  //       console.log(response.data.result);
  //       setTestTypeOptions(response.data.result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const onSubmit = (data, e) => {
    console.log("data", data);
    if (data.patientType === "patientTypeAll") {
      data.patientType = null;
    } else {
      data.patientType = Number(data.patientType);
    }
    let defaultParams = {
      categoryId: Number(data.category.id),
      fromDate: null,
      fromOrderNo: null,
      page: 0,
      // patientType: null,
      opdIpd: data.patientType,
      sampleStatus: data.sampleStatus ? data.sampleStatus : null,
      searchString: "",
      patientId: null,
      size: rowsPerPage,
      testTypeId: Number(data.testType.id),
      toDate: null,
      toOrderNo: null,
      unitId: null,
    };
    fetchWorkOrdersListData(defaultParams);
    console.log("Data", data);

    setShowFiltersModal(false);
    setBackdropOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <form>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md p-4 shadow-xl bg-white">
          <div className="-mt-3">
            <div className="flex items-center justify-between border-b-2 pb-2 pt-2">
              <div className="text-lg">Filters</div>

              <CancelPresentationIcon
                className="cursor-pointer text-red-500"
                onClick={() => {
                  setShowFiltersModal(false);
                  setBackdropOpen(false);
                }}
              />
            </div>
            <div className="py-4 grid grid-cols-4 gap-2">
              <fieldset className="lg:col-span-4 md:col-span-4 flex items-center space-x-2 border border-gray-300 p-1 rounded-md">
                <legend className="text-sm ml-2 font-semibold">
                  Patient Type
                </legend>
                <FormControl>
                  <Controller
                    render={({ field }) => (
                      <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="patientType"
                        {...field}
                        defaultValue={""}
                        // value={patientType}
                        // onChange={handlePatientTypeChange}
                        size="small"
                        className="space-x-6"
                      >
                        <FormControlLabel
                          value="patientTypeAll"
                          control={<Radio size="small" />}
                          label="All"
                          size="small"
                        />
                        <FormControlLabel
                          value={1}
                          control={<Radio size="small" />}
                          label="IPD"
                          size="small"
                        />
                        <FormControlLabel
                          value={0}
                          control={<Radio size="small" />}
                          label="OPD"
                          size="small"
                        />
                      </RadioGroup>
                    )}
                    name="patientType"
                    control={control}
                    defaultValue={""}
                  />
                </FormControl>
              </fieldset>
              <fieldset className="lg:col-span-4 md:col-span-4 flex items-center space-x-2 border border-gray-300 p-1 rounded-md">
                <legend className="text-sm ml-2 font-semibold">
                  Sample Status
                </legend>
                <FormControl>
                  <Controller
                    render={({ field }) => (
                      <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="sampleStatus"
                        {...field}
                        defaultValue={""}
                        size="small"
                        className="space-x-6"
                      >
                        <FormControlLabel
                          value="all"
                          control={<Radio size="small" />}
                          label="All"
                          size="small"
                        />
                        <FormControlLabel
                          value="Sample Collected"
                          control={<Radio size="small" />}
                          label="Collected"
                          size="small"
                        />
                        <FormControlLabel
                          value="Not Collected"
                          control={<Radio size="small" />}
                          label="Not Collected"
                          size="small"
                        />
                      </RadioGroup>
                    )}
                    name="sampleStatus"
                    control={control}
                    defaultValue={""}
                  />
                </FormControl>
              </fieldset>
              <div className="col-span-4">
                <DropdownField
                  control={control}
                  error={errors.testType}
                  name="testType"
                  label="Test Type"
                  dataArray={testTypeOptions}
                  isSearchable={false}
                  placeholder="Test Type"
                  isClearable={false}
                />
              </div>
              <div className="col-span-4">
                <DropdownField
                  control={control}
                  error={errors.category}
                  name="category"
                  label="Category (Pathology Profile)"
                  dataArray={categoryOptions}
                  isSearchable={false}
                  placeholder="Category (Pathology Profile)"
                  isClearable={false}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <ResetButton onClick={() => reset()} />
            <ApplyButton
              onClick={handleSubmit(onSubmit)}
              // onClick={() => {
              //   setShowFiltersModal(false);
              //   setBackdropOpen(false);
              // }}
            />
          </div>
        </Box>
      </form>
    </div>
  );
};

export default FiltersModal;
