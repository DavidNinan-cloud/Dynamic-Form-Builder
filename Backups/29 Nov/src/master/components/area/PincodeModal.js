//imports from material ui library
import { Box, Modal, Button } from "@mui/material";

import * as React from "react";

import { useEffect, useState } from "react";

//icon for closing the modal form
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";

//imports from react hook form
import { useForm } from "react-hook-form";

//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../Common Components/ModalStyle";

//imports from the common FormControl folder
// import InputField from "../common/formfields/InputField";
import InputField from "../../../Common Components/FormFields/InputField";

import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";

import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";

import DropdownField from "../../../Common Components/FormFields/DropdownField";

//importing the asynchronous function for using in the react query hooks
import {
  addNewPincode,
  getPincodeById,
  updatePincode,
} from "./../../services/area/PincodeService";

import { getCountryDropdown } from "./../../services/area/CountryService";

import { getStateDropdown } from "./../../services/area/StateService";

import { getDistrictDropdown } from "./../../services/area/DistrictService";

import { getTalukaDropdown } from "./../../services/area/TalukaService";

import { getCityDropdown } from "./../../services/area/CityService";

import ConfirmationModal from "../../../Common Components/ConfirmationModal";

import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../Common Components/Toasts/Toasts";

import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../Common Components/Buttons/UpdateButton";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";

//body of taluka component
function PincodeModal(props) {
  console.log("This is Pincode Modal Component");

  //All the options in the country drop down list are going to be stored in this state variable
  const [countryOptions, setCountryOptions] = useState([]);

  //All the options in the state drop down list are going to be stored in this state variable
  const [stateOptions, setStateOptions] = useState([]);

  //All the options in the district drop down list are going to be stored in this state variable
  const [districtOptions, setDistrictOptions] = useState([]);

  //All the options in the taluka drop down list are going to be stored in this state variable
  const [talukaOptions, setTalukaOptions] = useState([]);

  //All the options in the city drop down list are going to be stored in this state variable
  const [cityOptions, setCityOptions] = useState([]);

  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  const [finalData, setFinalData] = React.useState({});

  //validation start
  //form validation
  const schema = yup.object().shape({
    country: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    state: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    district: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    taluka: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    city: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    pinCode: yup
      .string()
      .required("Required")
      .matches(/^[0-9]+$/, "Only Numbers are allowed"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    country: null,
    state: null,
    district: null,
    taluka: null,
    city: null,
    pinCode: "",
    active: true,
  };

  //state variable to close the confirmation modal for POST request
  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  //state variable to close the confirmation modal for PUT request
  const handleClosePut = () => {
    props.setCountClick(0);
    if (openPut) {
      setOpenPut(false);
    }
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    console.log("Your data has been updated");
    handleClosePut();
    props.setOpenBackdrop(true);
    console.log("Your data has been updated");
    updatePincode(finalData)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          updateAlert(response.data.message);
          console.log("Record has been updated successfully");
          props.populateTable();
          props.setEdit(false);
          reset(defaultValues);
          props.setOpenBackdrop(false);
          props.setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
        props.setOpenBackdrop(false);
        errorAlert(error.message);
        handleClosePut();
      });
  }

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);

    //close the confirmation modal
    setOpenPost(false);

    props.setOpenBackdrop(true);
    postPincode(finalData);
  }

  //onSubmitDataHandler function is passed as argument to the
  //built in handleSubmit() function of react hook forms.
  //This function is called after clicking on the Update button of modal form and after clicking on the Add button of modal form
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");

    if (props.edit === true) {
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);

      let updateObj = {
        active: data.active,
        city: {
          cityName: data.city.label,
          id: data.city.value,
          taluka: {
            district: {
              districtName: data.district.label,
              state: {
                country: {
                  countryName: data.country.label,
                  id: data.country.value,
                },
                id: data.state.value,
                stateName: data.state.label,
              },
            },
            id: data.taluka.value,
            talukaName: data.taluka.label,
          },
        },
        id: data.id,
        pinCode: data.pinCode,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let postedObj = {
        active: data.active,
        city: {
          cityName: data.city.label,
          id: data.city.id,
          taluka: {
            district: {
              districtName: data.district.label,
              id: data.district.id,
              state: {
                country: {
                  countryName: data.country.label,
                  id: data.country.id,
                },
                id: data.state.id,
                stateName: data.state.label,
              },
            },
            id: data.taluka.id,
            talukaName: data.taluka.label,
          },
        },
        pinCode: data.pinCode,
      };
      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  //axios get request to have all the list of countries. This request belongs to the country-controller on swagger
  function getCountryList() {
    getCountryDropdown()
      .then((response) => {
        console.log(
          "The list of all the countries are as follows" +
            JSON.stringify(response)
        );
        console.log(JSON.stringify(response));
        console.log(response.data.result);

        console.log(
          "The id of the default country is " + response.data.result[0].id
        );

        console.log(
          "The single object of the default country is " +
            JSON.stringify(response.data.result[0])
        );

        setValue("country", response.data.result[0]);

        //send the axios GET request to get all the list of states of the default country.
        getStateList(response.data.result[0].id);

        setCountryOptions(response.data.result);

        //send
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //GET request to have all the list of countries. This request belongs to the state-controller on swagger
  function getStateList(requiredCountryId) {
    getStateDropdown(requiredCountryId)
      .then((response) => {
        console.log(
          "The list of all the states for the selected country are as follows" +
            response
        );
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setStateOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //update the state options upon change in country dropdown. This is event listener function for country dropdown
  function updateStateOptions(requiredCountryObj) {
    getStateDropdown(requiredCountryObj.id)
      .then((response) => {
        console.log(response);

        setValue("state", null);
        setStateOptions(response.data.result);

        setValue("district", null);
        setDistrictOptions([]);

        setValue("taluka", null);
        setTalukaOptions([]);

        setValue("city", null);
        setCityOptions([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //update the district dropdown upon change in state dropdown. This is event listener function for state dropdown
  function updateDistrictOptions(requiredStateObj) {
    console.log("State id is " + JSON.stringify(requiredStateObj));
    getDistrictDropdown(requiredStateObj.id)
      .then((response) => {
        console.log(response);

        setValue("district", null);
        setDistrictOptions(response.data.result);

        setValue("taluka", null);
        setTalukaOptions([]);

        setValue("city", null);
        setCityOptions([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //update the taluka dropdown upon change in district dropdown. This is event listener function for district dropdown
  function updateTalukaOptions(requiredDistrictObj) {
    console.log("State id is " + JSON.stringify(requiredDistrictObj));
    getTalukaDropdown(requiredDistrictObj.id)
      .then((response) => {
        console.log(response);

        setValue("taluka", null);
        setTalukaOptions(response.data.result);

        setValue("city", null);
        setCityOptions([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //update the city dropdown upon change in taluka dropdown. This is event listener function for taluka dropdown
  function updateCityOptions(requiredTalukaObj) {
    console.log("Taluka Object is " + JSON.stringify(requiredTalukaObj));
    getCityDropdown(requiredTalukaObj.id)
      .then((response) => {
        console.log(response);

        setValue("city", null);
        setCityOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Store all the options of the Country Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getCountryList() is going to be executed");
    getCountryList();
  }, []);

  // useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["PincodeInfo", props.idValue],

    //to avoid the automatic firing of the query. Because CityModal is a child component of City.js
    () => {
      if (props.idValue && openPut !== true) {
        return getPincodeById(props.idValue);
      }
    },

    {
      enabled: props.edit,

      staleTime: 0,

      cacheTime: 0,

      refetchOnWindowFocus: false,

      onSuccess: (data) => {
        console.log(
          "data fetched with GET request by id using the react query library"
        );

        console.log(status);

        console.log(data);

        //if data is received ; then only execute the reset function to patch the value
        if (data) {
          console.log("The data coming from get response by id request is ");
          console.log(JSON.stringify(data));

          let resetObj = {
            id: data.data.result.id,
            country: data.data.result.city.taluka.district.state.country,
            state: {
              value: data.data.result.city.taluka.district.state.value,
              label: data.data.result.city.taluka.district.state.label,
            },
            district: {
              value: data.data.result.city.taluka.district.value,
              label: data.data.result.city.taluka.district.label,
            },
            taluka: {
              value: data.data.result.city.taluka.value,
              label: data.data.result.city.taluka.label,
            },
            city: {
              value: data.data.result.city.value,
              label: data.data.result.city.label,
            },
            pinCode: data.data.result.pinCode,
            active: data.data.result.status,
          };

          reset(resetObj);
        }
      },

      onError: (error) => {
        console.log(error);
        //Code for React Toast
      },
    }
  );

  // useMutation hook for the implementation of post request data saving
  const { mutate: postPincode } = useMutation(addNewPincode, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);

      props.setOpenBackdrop(false);
      successAlert(result.data.message);
      props.populateTable({ page: 0, size: 10, searchPin: "" });
      console.log("Data has been Recorded successfully");

      //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers
      props.setEdit(false);

      //to set the form fields as blank
      reset(defaultValues);

      //for closing the modal form
      props.setOpen(false);
    },
    onError: (error) => {
      errorAlert(error.message);
      //When the request is not successfull ; close the confirmation modal for POST
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });

  return (
    <>
      <div className="w-full grid items-center rounded  mt-4">
        <Modal
          open={props.open}
          onClose={() => {
            props.handleClose();
            props.setEdit(false);
            reset(defaultValues);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <div className="grid md:grid-cols-1  w-full">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                  props.setEdit(false);
                  reset(defaultValues);
                }}
              />
            </div>

            <div className="row">
              <fieldset className="border border-gray-300 text-left lg:mx-auto lg:px-4 py-8 rounded mt-8 lg:m-2  ">
                <legend className="px-2 ml-3 lg:ml-0 font-bold text-gray-600">
                  Pincode
                </legend>

                <form
                  className="grid md:grid-cols-1  gap-2 mx-2"
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                >
                  <div className="py-2 grid md:grid-cols-2 lg:grid-cols-4 md:px-3 lg:px-0 gap-2 ">
                    {/*Select Country drop down menu*/}
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.country}
                        name="country"
                        placeholder="Select Country*"
                        dataArray={countryOptions}
                        isSearchable={false}
                        isDisabled={props.edit}
                        inputRef={{
                          ...register("country", {
                            onChange: (e) => {
                              //api call
                              console.log(e.target.value);
                              updateStateOptions(e.target.value);
                              console.log(e.target.value);
                            },
                          }),
                        }}
                      />
                    </div>

                    {/* State Dropdown */}
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        error={errors.state}
                        name="state"
                        placeholder="Select State*"
                        dataArray={stateOptions}
                        isSearchable={false}
                        isDisabled={props.edit}
                        inputRef={{
                          ...register("state", {
                            onChange: (e) => {
                              //api call
                              updateDistrictOptions(e.target.value);
                              console.log(e.target.value);
                            },
                          }),
                        }}
                      />
                    </div>

                    {/*Select District Dropdwon menu*/}
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        error={errors.district}
                        name="district"
                        placeholder="Select District*"
                        dataArray={districtOptions}
                        isSearchable={false}
                        isDisabled={props.edit}
                        inputRef={{
                          ...register("district", {
                            onChange: (e) => {
                              //api call
                              console.log(e.target.value);
                              updateTalukaOptions(e.target.value);
                              console.log(e.target.value);
                            },
                          }),
                        }}
                      />
                    </div>

                    {/* Select Taluka dropdown field */}
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.taluka}
                        name="taluka"
                        placeholder="Select Taluka*"
                        dataArray={talukaOptions}
                        isSearchable={false}
                        isDisabled={props.edit}
                        inputRef={{
                          ...register("taluka", {
                            onChange: (e) => {
                              //api call
                              console.log(e.target.value);
                              updateCityOptions(e.target.value);
                              console.log(e.target.value);
                            },
                          }),
                        }}
                      />
                    </div>

                    {/* Select City dropdown field */}
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.city}
                        name="city"
                        placeholder="Select City*"
                        dataArray={cityOptions}
                        isSearchable={false}
                        isDisabled={props.edit}
                      />
                    </div>

                    {/*Pincode text field*/}
                    <div className="w-full">
                      {/* City code input field */}
                      <InputField
                        name="pinCode"
                        variant="outlined"
                        label="Pincode*"
                        error={errors.pinCode}
                        control={control}
                      />
                    </div>

                    {/* Active Checkbox */}
                    <div className=" grid justify-start">
                      {/* Checkbox component */}

                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 space-x-3 md:px-3 lg:px-0 justify-end">
                    {/* conditional rendering of the Reset , Add , Cancel , Update buttons */}
                    {props.edit ? (
                      <CancelButton
                        onClick={() => {
                          props.handleClose();
                          props.setEdit(false);
                          reset(defaultValues);
                        }}
                      />
                    ) : (
                      <ResetButton onClick={() => reset(defaultValues)} />
                    )}

                    {props.edit ? <UpdateButton /> : <AddButton />}
                  </div>
                </form>
              </fieldset>
              {/* Backdrop component to disable the screen after submitting the form */}
              <CommonBackDrop openBackdrop={props.openBackdrop} />
            </div>
          </Box>
        </Modal>

        {/* Confirmation modal for PUT request */}
        <ConfirmationModal
          confirmationOpen={openPut}
          confirmationHandleClose={handleClosePut}
          confirmationSubmitFunc={updateRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to update this record ?"
          confirmationButtonMsg="Update"
        />

        {/* Confirmation modal for POST request */}
        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={handleClosePost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
      </div>
    </>
  );
}

export default PincodeModal;
