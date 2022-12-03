import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Modal, Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ModalStyle } from "../../../Common Components/ModalStyle";
import InputField from "../../../Common Components/FormFields/InputField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  updateAlert, 
  errorAlert,
  successAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import {
  getPrefixById,
  addNewPrefix,
  updatePrefix,
  getGenderDropdown,
} from "../../services/prefix/PrefixServices";
import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";

export default function ModalPrefix(props) {
  const schema = yup.object().shape({
    prefixName: yup
      .string()
      .required("Required")
      .min(2, "Add Prefix Name")
      .matches(/^[a-zA-Z\s/]+$/, "Numbers Not Allow"),
    prefixCode: yup
      .string()
      .required("Required")
      .min(2, "Add Prefix Code")
      .matches(/^[a-zA-Z0-9]+$/, "Space & Special Char Not Allow"),
    genderPrefix: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Gender"),
        label: yup.string().required("Please Select Gender"),
      }),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    prefixName: "",
    prefixCode: "",
    genderPrefix: null,
    active: true,
  };

  //All the options in the genderPrefix drop down list are going to be stored in this state variable
  const [gederPrefixOptions, setGenderPrefixOptions] = React.useState([]);
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});

  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };
  const handleClosePut = () => {
    if (openPut) {
      setOpenPut(false);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //Store options of the Gender Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getGenderList() is going to be executed");
    getGenderList();
  }, []);

  //axios get request to have all the list of gender.
  function getGenderList() {
    getGenderDropdown()
      .then((response) => {
        console.log(
          "The list of all the gender Prefix are as follows" + response
        );
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setGenderPrefixOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onSubmitDataHandler = (data) => {
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        genderPrefix: {
          id: data.genderPrefix.value,
        },
        id: data.id,
        prefixCode: data.prefixCode,
        prefixName: data.prefixName,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        genderPrefix: {
          id: data.genderPrefix.id,
        },
        prefixCode: data.prefixCode,
        prefixName: data.prefixName,
      };
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    props.setOpenBackdrop(true);
    postPrefix(finalData);
  }

  //ADD POST API save data
  const { mutate: postPrefix } = useMutation(addNewPrefix, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);
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
      props.setOpenBackdrop(false);
      errorAlert(error.message);
      handleClosePost();
    },
  });

  //EDIT API
  const { status } = useQuery(
    ["getPrefixById", props.idValue],
    () => {
      if (props.idValue && openPut !== true) {
        return getPrefixById(props.idValue);
      }
    },
    {
      enabled: props.edit,
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(
          "data fetched with no problem by using the react query library"
        );
        console.log(status);
        console.log(
          "Data fetched from API after clicking on the edit icon is " +
            JSON.stringify(data)
        );
        let resetObj = {
          prefixName: data.data.result.prefixName,
          prefixCode: data.data.result.prefixCode,
          id: data.data.result.id,
          genderPrefix: data.data.result.genderPrefix,
          active: data.data.result.status,
        };
        if (data) {
          reset(resetObj);
        }
      },
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  //UPDATE PUT API
  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);
      updatePrefix(finalData)
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

  return (
    <>
        {/* Modal/popup (textField)*/}
        <Modal
          open={props.open}
          onClose={() => {
            // props.handleClose();
            props.setEdit(false);
            reset(defaultValues);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>

              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                  props.setEdit(false);
                  reset(defaultValues);
                }}
              />
              

            <div className="row">
              <fieldset className="border border-gray-300 text-left lg:px-4  py-2 rounded mt-1 lg:m-2">
                <legend className=" ml-2 lg:ml-0 font-bold text-gray-800">
                  Prefix
                </legend>
                <form
                  className="grid grid-cols-1 w-full"
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                >
                  <div className="pt-2 grid md:grid-cols-2 lg:grid-cols-4 md:px-3 lg:px-0 gap-2 ">
                    {/* Input Fields */}
                    <div className="w-full">
                      <InputField
                        name="prefixName"
                        variant="outlined"
                        label="Prefix Name *"
                        error={errors.prefixName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }} // use inputProps props for return 1st letter in upper case
                      />
                    </div>

                    {/* Input Fields */}
                    <div className=" w-full">
                      <InputField
                        name="prefixCode"
                        variant="outlined"
                        label="Prefix Code *"
                        error={errors.prefixCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }} // use inputProps props for return 1st letter in upper case
                      />
                    </div>

                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.genderPrefix}
                        name="genderPrefix"
                        placeholder="Prefix Gender *"
                        dataArray={gederPrefixOptions}
                        isSearchable={false}
                        // isDisabled={props.edit}
                      />
                    </div>

                    {/* Active Checkbox */}
                    <div className=" grid justify-start items-start">
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 md:px-3 lg:px-0 pb-2 justify-end">
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

        <ConfirmationModal
          confirmationOpen={openPut}
          confirmationHandleClose={handleClosePut}
          confirmationSubmitFunc={updateRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to update this record ?"
          confirmationButtonMsg="Update"
        />

        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={handleClosePost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
    
    </>
  );
}