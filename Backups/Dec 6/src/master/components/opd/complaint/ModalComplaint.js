import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Box, Modal } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ModalStyle } from "../../../../Common Components/ModalStyle";
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import {
  getComplaintById,
  addNewComplaint,
  updateComplaint,
  getUnitDropdown,
} from "../../../services/opd/complaint/ComplaintService";
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

export default function ModalComplaint(props) {
  const schema = yup.object().shape({
    // complaintCode: yup
    //   .string()
    //   .required("Required")
    //   .min(2, "Add Complaint Code")
    //   .matches(/^[a-zA-Z0-9]+$/, "Only Numbers Are Allow"),
    complaint: yup
      .string()
      .required("Required")
      .min(2, "Add Complaint Name")
      .matches(/^[a-zA-Z\s]+$/, "Numbers Not Allow For This Field"),
    unit: yup
    .array()
    .required("Required")
    .of(
      yup.object().shape({
        label: yup.string().required("Required"),
        value: yup.string().required("Required"),
      })
    )
    .nullable(false, "Required")
    .min(1, "Requird")
    .required("Required"),
  });

  const defaultValues = {
    id: "",
    // complaintCode: "",
    complaint: "",
    unit: [],
    active: true,
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});
  const [unitOptions, setUnitOptions] = React.useState([]);

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

  useEffect(() => {
    getUnitDropdown(unitOptions)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnitOptions(res.result);
      });
  }, []);


  // POST Required Obj
  // {
  //   "active": true,
  //   "complaint": "string",
  //   "id": 0,
  //   "unit": []
  // }

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        // complaintCode: data.complaintCode,
        complaint: data.complaint,
        id: data.id,
        unit: data.unit,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        // complaintCode: data.complaintCode,
        complaint: data.complaint,
        unit: data.unit,
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
      postComplaint(finalData);

  }

  //ADD POST API save data
  const { mutate: postComplaint } = useMutation(addNewComplaint, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);

      console.log("Record has been created");
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
  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["getComplaintById", props.idValue],
    () => {
      if (props.idValue !== "" && openPut !== true) {
        return getComplaintById(props.idValue);
      }
    },
    {
      enabled: props.edit,
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(
          "Data fetched from get response by id is " + JSON.stringify(data)
        );
        console.log(status);
        console.log(
          "Data fetched from API after clicking on the edit icon is " +
            JSON.stringify(data)
        );
    
        let resetObj = {
          id: data.data.result.id,
          // complaintCode: obj.complaintCode,
          complaint: data.data.result.complaint,
          unit: data.data.result.units,
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
    console.log("Your data has been updated");
      updateComplaint(finalData)
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
          props.handleClose();
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
              <legend className="ml-3 lg:ml-0 font-bold text-gray-800">
                Complaint
              </legend>
              <form
                className="grid grid-cols-1 w-full"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >
                <div className="pt-2 grid md:grid-cols-2 lg:grid-cols-4 md:px-3 lg:px-0 gap-2">
                  {/* Input Fields */}
                  <div className=" w-full">
                    <InputField
                      name="complaint"
                      variant="outlined"
                      label="Complaint Name *"
                      error={errors.complaint}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>

                  {/* Input Fields
                  <div className="w-full">
                    <InputField
                      name="complaintCode"
                      variant="outlined"
                      label="Complaint Code *"
                      error={errors.complaintCode}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div> */}

                  {/* Dropdown Fields */}
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      error={errors.unit}
                      name="unit"
                      placeholder="Select Unit *"
                      dataArray={unitOptions}
                      isSearchable={false}
                      isMulti={true}
                    />
                  </div>

                  {/* Active Checkbox */}
                  <div className="grid justify-start items-start">
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
    </>
  );
}
