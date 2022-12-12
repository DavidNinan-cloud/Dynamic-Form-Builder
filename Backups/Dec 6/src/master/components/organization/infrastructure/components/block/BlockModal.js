//imports from material ui library
import { Box, Modal, Button } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
//icon for closing the modal form
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
//imports from react hook form
import { useForm } from "react-hook-form";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../../../../Common Components/ModalStyle";
//imports from the common FormControl folder
import InputField from "../../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../../../Common Components/FormFields/DropdownField";
import CreateableSelect from "../../../../../../Common Components/FormFields/CreateableSelect";
//importing the asynchronous function for using in the react query hooks
import {
  addNewBlock,
  getBlockById,
  updateBlock,
  autoSearchBlock,
} from "../../../../../services/infrastructure/block/BlockServices";

import { getUnitDropdown } from "../../../../../services/organization/UnitServices";

import ConfirmationModal from "../../../../../../Common Components/ConfirmationModal";
// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../../Common Components/Toasts/CustomToasts";

import AddButton from "../../../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../../../Common Components/Buttons/ResetButton";
import UpdateButton from "../../../../../../Common Components/Buttons/UpdateButton";
import CancelButton from "../../../../../../Common Components/Buttons/CancelButton";

import CommonBackDrop from "../../../../../../Common Components/CommonBackDrop/CommonBackDrop";

function BlockModal(props) {
  //All the options in the Block drop down list are going to be stored in this state variable
  const [unitOptions, setUnitOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [searhObj, setSearchObj] = useState({
    searchString: "",
    resultExists: false,
  });

  const defaultAllDropdown = {
    value: "All",
    label: "All",
    id: null,
  };

  //Yup schemaOne for the modal form of Post request
  const schemaOne = yup.object().shape({
    unit: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Unit"),
        label: yup.string().required("Please Select Unit"),
      }),
    block: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Block Code"),
        label: yup.string().required("Please Select Block Code"),
      }),
    name: yup
      .string()
      .required("Required")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Only number and alphabet allow,special character not allowed"
      ),
  });

  //Yup schemaTwo for the modal form of Put request
  const schemaTwo = yup.object().shape({
    unit: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Unit"),
        label: yup.string().required("Please Select Unit"),
      }),
    blockCodeName: yup.string().required("Required"),
    name: yup
      .string()
      .required("Required")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Only number and alphabet allow,special character not allowed"
      ),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    unit: null,
    blockCodeName: "",
    block: null,
    name: "",
    active: true,
  };

  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);
  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  const [finalData, setFinalData] = React.useState({});

  //state variables to open and close the delete modal
  const [openChild, setOpenChild] = useState(false);

  //state variable to open the confirmation modal for POST request
  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };
  const handleClosePut = () => {
    console.log("handleCloePutHAs been called");
    if (openPut) {
      setOpenPut(false);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm(multipleSchemaGenerator());

  function multipleSchemaGenerator() {
    if (props.edit === true) {
      return {
        // use mode to specify the event that triggers each input field
        //schema for put request
        mode: "onChange",
        resolver: yupResolver(schemaTwo),
        defaultValues,
      };
    } else if (props.edit === false) {
      return {
        // use mode to specify the event that triggers each input field
        //schema for post request
        mode: "onChange",
        resolver: yupResolver(schemaOne),
        defaultValues,
      };
    }
  }

  //onSubmitDataHandler function is passed as argument to the
  //built in handleSubmit() function of react hook forms.
  //This function is called after clicking on the Update button of modal form and after clicking on the Add button of modal form
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      //  && props.delete === false
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);
      let updateObj = {
        active: data.active,
        id: data.id,
        blockCode: data.blockCodeName,
        blockName: data.name,
        unit: {
          id: data.unit.id,
        },
      };
      console.log(updateObj);
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log("data", data);

      let postedObj = {
        active: data.active,
        id: data.id,
        unit: {
          unitName: data.unit.label,
          id: data.unit.value,
        },
        block: {
          id: data.block.id,
          code: data.block.value,
          name: data.name,
        },
        name: data.name,
      };
      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    setOpenPost(false);
    props.setOpenBackdrop(true);
    postBlock(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postBlock } = useMutation(addNewBlock, {
    onSuccess: (res) => {
      console.log("onSuccess block of post request");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);
      console.log("Record has been created");
      successAlert(result.data.message);
      props.populateTable({
        page: 0,
        size: 10,
        searchString: "",
      });
      reset(defaultValues);
      props.setOpen(false);
      props.setEdit(false);
    },
    onError: (error) => {
      console.log(error);
      errorAlert(error.message);
      props.setOpenBackdrop(false);
      handleClosePost();
      //Code for React toast
    },
  });

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["blockInfo", props.idValue],
    //to avoid the automatic firing of the query. Because StateModal is a child component of State.js
    () => {
      if (props.idValue && openPut !== true) {
        console.log("useQuery is going to be executed");
        return getBlockById(props.idValue);
      }
    },
    {
      enabled: props.edit,
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(
          "The current value of dropdown is " +
            JSON.stringify(props.currentUnitOption)
        );

        console.log("onSuccess block of useQuery");

        console.log("Value is " + props.currentUnitOption.value);
        console.log("Label is " + props.currentUnitOption.label);

        console.log(
          "data fetched with no problem by using the react query library"
        );
        console.log(status);
        console.log(
          "Data fetched from API after clicking on the edit icon is " +
            JSON.stringify(data)
        );

        if (props.deleteFlag === false) {
          let resetObj = {
            active: data.data.result.status,
            blockCodeName: data.data.result.blockCode,
            // block: null,
            unit: {
              value: props.currentUnitOption.value,
              label: props.currentUnitOption.label,
            },
            name: data.data.result.blockName,
            id: data.data.result.id,
          };
          console.log(
            "The resetObj for patching is " + JSON.stringify(resetObj)
          );

          reset(resetObj);
        } else if (props.deleteFlag === true) {
          getUnitList();

          let resetObj = {
            blockCodeName: data.data.result.blockCode,
            name: data.data.result.blockName,
            id: data.data.result.id,
          };

          reset(resetObj);
        }
      },
      onError: (error) => {
        console.log("onError block of useQuery");
        errorAlert();
        console.log(error);
        //Code for React Toast
      },
    }
  );
  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);
    console.log("Update record clicked");
    updateBlock(finalData)
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
      });
  }
  //event listener function for the Add button on the modal form

  // Get request to have all the list of countries. This request belongs to the block-controller on swagger
  function getUnitList() {
    getUnitDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        response.data.result.unshift(defaultAllDropdown);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Store all the options of the block Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getUnitList() is going to be executed");
    getUnitList();
    // setValue("unit", defaultAllDropdown);
  }, []);

  //This function is props to the Searchbar component
  const handleChange = (e) => {
    console.log(e);

    console.log(
      "The current value in the Creatale select is " +
        JSON.stringify(getValues("block"))
    );

    if (e.length > 0) {
      autoSearchBlock(e).then((response) => {
        console.log(
          "The response of autoSearchBlock is " + JSON.stringify(response)
        );

        if (response.data.result.length !== 0) {
          let displayObj = { value: e, label: e };
          console.log("displayObj " + JSON.stringify(displayObj));
          setBlockOptions(response.data.result);
        }
      });
    }
  };

  return (
    <>
      {/* Body of State Modal */}
      <div className="w-full grid justify-center items-center rounded lg:px-0 mt-4">
        <Modal
          open={props.open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <div className="grid grid-cols-1 md:grid-cols-1 w-full">
              <CancelPresentationIcon
                className="absolute top-3 right-9 text-red-600 rounded cursor-pointer"
                onClick={() => {
                  props.handleClose();
                  props.setEdit(false);
                  reset(defaultValues);
                }}
              />
            </div>
            <div className="row">
              <fieldset className="border border-gray-300 text-left w-full md:mr-0 py-8 rounded mt-8 lg:m-2 ">
                {props.edit ? (
                  <legend className="px-2 font-bold text-gray-700 ml-3">
                    Edit Block
                  </legend>
                ) : (
                  <legend className="px-2 font-bold text-gray-700 ml-3">
                    Add Block
                  </legend>
                )}
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 w-full gap-2 px-5"
                >
                  <div className="py-2 grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className=" w-full">
                      <DropdownField
                        control={control}
                        error={errors.unit}
                        name="unit"
                        placeholder="Select Unit*"
                        dataArray={unitOptions}
                        isDisabled={props.edit}
                      />
                    </div>

                    {props.edit ? (
                      <div className="w-full">
                        {/* block code input field */}
                        <InputField
                          name="blockCodeName"
                          variant="outlined"
                          label="Block Code*"
                          error={errors.blockCodeName}
                          control={control}
                          inputProps={{
                            style: { textTransform: "capitalize" },
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full">
                        {/* block code input field */}
                        <CreateableSelect
                          control={control}
                          error={errors.block}
                          name="block"
                          placeholder="Block Code*"
                          dataArray={blockOptions}
                          onInputChange={handleChange}
                          inputRef={{
                            ...register("block", {
                              onChange: (e) => {
                                console.log(
                                  "Selected option is " + JSON.stringify(e)
                                );

                                // console.log(typeof(e));

                                if (e.target.value !== null) {
                                  setValue("name", e.target.value.block);
                                  console.log(e.target.value.block);
                                } else if (e.target.value === null) {
                                  setValue("name", "");
                                }
                              },
                            }),
                          }}
                        />
                      </div>
                    )}

                    <div className="w-full">
                      {/* block Name Input field */}
                      <InputField
                        name="name"
                        variant="outlined"
                        label="Block Name*"
                        error={errors.name}
                        control={control}
                        inputProps={{
                          style: { textTransform: "capitalize" },
                        }}
                      />
                    </div>
                    {/* Active Checkbox */}
                    <div className="">
                      {/* Checkbox component */}
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 justify-end">
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
              <CommonBackDrop openBackdrop={props.openBackdrop} />
            </div>
          </Box>
        </Modal>
        {/* modal and table name button end */}
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
export default BlockModal;
