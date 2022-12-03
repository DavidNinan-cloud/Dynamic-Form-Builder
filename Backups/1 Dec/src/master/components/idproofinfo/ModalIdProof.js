import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalStyle } from "../../../Common Components/ModalStyle";
import { useForm } from "react-hook-form";
import InputField from "../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import { Box, Modal } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getIdProofById,
  addNewIdProof,
  updateIdProof,
} from "../../services/idproof/IdProofServices";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";

export default function ModalIdProof(props) {
  const schema = yup.object().shape({
    idProofCode: yup
      .string()
      .required("Required")
      .min(2, "Add Citizen Id Proof Code")
      .matches(/^[a-zA-Z0-9]+$/, "Space & Special Char Not Allow"),
    idProofName: yup
      .string()
      .required("Required")
      .min(2, "Add Citizen Id Proof Name")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    idProofLength: yup
      .string()
      .required("Required")
      .min(2, "Add IdProof Length")
      .length(2)
      .matches(/^[0-9]+$/, "Space & Special Char Not Allow"),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    idProofName: "",
    idProofCode: "",
    idProofLength: "",
    active: true,
  };
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

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
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmitDataHandler = (data) => {
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        idProofName: data.idProofName,
        idProofCode: data.idProofCode,
        idProofLength: data.idProofLength,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        idProofName: data.idProofName,
        idProofCode: data.idProofCode,
        idProofLength: data.idProofLength,
      };
      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);

    //close the confirmation modal
    setOpenPost(false);

    setOpenBackdrop(true);
    postIdProof(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  const { mutate: postIdProof } = useMutation(addNewIdProof, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      setOpenBackdrop(false);
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
      setOpenBackdrop(false);
      errorAlert(error.message);
      handleClosePost();
    },
  });

  //EDIT API
  const { status } = useQuery(
    ["getIdProof", props.idValue],
    () => {
      if (props.idValue && openPut !== true) {
        return getIdProofById(props.idValue);
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
          idProofName: data.data.result.idProofName,
          idProofCode: data.data.result.idProofCode,
          id: data.data.result.id,
          idProofLength: data.data.result.idProofLength,
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
    setOpenBackdrop(true);
    updateIdProof(finalData)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          updateAlert(response.data.message);
          console.log("Record has been updated successfully");
          props.populateTable();
          props.setEdit(false);
          reset(defaultValues);
          setOpenBackdrop(false);
          props.setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setOpenBackdrop(false);
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

          <div className="row ">
            <fieldset className="border border-gray-300 text-left lg:px-4  py-2 rounded mt-1 lg:m-2">
              <legend className="ml-3 lg:ml-0 font-bold text-gray-800">
                Citizen Id Proof
              </legend>
              <form
                className="grid grid-cols-1 w-full"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >
                <div className="pt-2 grid md:grid-cols-2 lg:grid-cols-4 md:px-3 lg:px-0 gap-2">
                  {/* Input Fields */}
                  <div className="w-full">
                    <InputField
                      name="idProofName"
                      variant="outlined"
                      label="IDProof Name *"
                      error={errors.idProofName}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  {/* Input Fields */}
                  <div className="w-full">
                    <InputField
                      name="idProofCode"
                      variant="outlined"
                      label="IDProof Code *"
                      error={errors.idProofCode}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  {/* Input Fields */}
                  <div className="w-full">
                    <InputField
                      name="idProofLength"
                      variant="outlined"
                      label="IDProof Length *"
                      error={errors.idProofLength}
                      control={control}
                      //When the user types any input ; the hint "Example:10" should disappear
                      inputRef={{
                        ...register("idProofLength", {
                          onChange: () => {
                            //function call
                            props.setIdProofLengthHint("");
                          },
                        }),
                      }}
                    />
                    <p className="text-gray-500 text-sm">
                      {props.idProofLengthHint}
                    </p>
                  </div>

                  {/* Active Checkbox */}
                  <div className="grid justify-start items-start">
                    {/* Checkbox component */}
                    <CheckBoxField
                      control={control}
                      name="active"
                      label="Active"
                      placeholder="Status"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 md:px-3 lg:px-0 pb-2 justify-end">
                  {/* conditional rendering of the Reset button */}
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
            <CommonBackDrop openBackdrop={openBackdrop} />
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
