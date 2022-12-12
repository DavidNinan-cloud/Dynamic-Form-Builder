import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalStyle } from "../../../../Common Components/ModalStyle";
import { useForm } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import { Box, Modal, Button } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getWeekDayById,
  addNewWeekDay,
  updateWeekDay,
} from "../../../services/weekday/WeekDayServices";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import {
  successAlert,
  errorAlert,
  updateAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";

export default function ModalWeekDay(props) {
  const schema = yup.object().shape({
    dayCode: yup
      .string()
      .required("Required")
      .min(1, "Add Day Code")
      .matches(/^[a-zA-Z0-9]+$/, "Space & Special Char Not Allow"),
    dayName: yup
      .string()
      .required("Required")
      .min(2, "Add Day Name")
      .matches(/^[a-zA-Z]+$/, "Space & Numbers Not Allow"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    dayName: "",
    dayCode: "",
    active: true,
  };

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

  //destructuring the methods and giving them same name , as they have in the useForm() hook
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

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        dayName: data.dayName,
        dayCode: data.dayCode,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        dayName: data.dayName,
        dayCode: data.dayCode,
      };
      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    props.setOpenBackdrop(true);
      postWeekDay(finalData);
   }

  //ADD POST API save data
  //useMutation hook for the implementation of post request data saving
  const { mutate: postWeekDay } = useMutation(addNewWeekDay, {
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
      props.setEdit(false);
      props.setOpen(false);
    },
    onError: (error) => {
      props.setOpenBackdrop(false);
      errorAlert(error.message);
      handleClosePost();
    },
  });

  //EDIT API
  const { status } = useQuery(
    ["getWeekDayById", props.idValue],
    () => {
      if (props.idValue) {
        return getWeekDayById(props.idValue);
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
          dayName: data.data.result.dayName,
          dayCode: data.data.result.dayCode,
          id: data.data.result.id,
          active: data.data.result.status,
        };
        if (data) {
          reset(resetObj);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  //UPDATE PUT API
  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);

    console.log("Your data has been updated");
      updateWeekDay(finalData)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            updateAlert(response.data.message);
            console.log("Record has been updated successfully");
            props.populateTable();
            props.setEdit(false);
            reset(defaultValues);
            props.setOpen(false);
            props.setOpenBackdrop(false);
          }
        })
        .catch((error) => {
          props.setOpenBackdrop(false);
          errorAlert();
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
                <legend className="px-2 ml-3 lg:ml-0 font-bold text-gray-800">
                  Week Day
                </legend>
                <form
                  className="grid grid-cols-1 w-full gap-x-2 py-4"
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 px-5 lg:px-2 gap-2">
                    {/* Input Fields */}
                    <div className="w-full">
                      <InputField
                        name="dayName"
                        variant="outlined"
                        label="Day Name *"
                        error={errors.dayName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>

                    {/* Input Fields */}
                    <div className="w-full ">
                      <InputField
                        name="dayCode"
                        variant="outlined"
                        label="Day Code *"
                        error={errors.dayCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>

                    {/* Active Checkbox */}
                    <div className="flex lg:justify-start px-2">
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Status"
                      />
                    </div>

                  <div className="flex space-x-3 items-center justify-end">
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