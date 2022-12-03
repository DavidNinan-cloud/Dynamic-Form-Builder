import React, { useEffect } from "react";

//imports from react hook form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//importing the style of modal ; which is common to all
import { ModalStyle } from "../../../../Common Components/ModalStyle";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField"
import AddButton from "../../../../Common Components/Buttons/AddButton";

import ResetButton from "../../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../../Common Components/Buttons/UpdateButton";

//imports from the common FormControl folder
import InputField from "../../../../Common Components/FormFields/InputField";

 //imports from material ui library
import { Box, Modal, Button } from "@mui/material";

import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";
// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../../Common Components/Toasts/Toasts";



import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import { textTransform } from "@mui/system";

export default function AnesthesiaModal(props) {
    console.log("MODAL OPEN",props.open);
    // yup Schema validation for form fields
  const schema = yup.object().shape({
otcode:yup.string().required("Required").matches(
  /^[A-Za-z0-9]+$/,
  "Only number and alphabet allow,special character not allowed "
),
otdescription:yup.string().required("Required").matches(
  /^[A-Za-z0-9]+$/,
  "Only number and alphabet allow,special character not allowed "
)
  })


  const {control,handleSubmit,reset,formState:{errors}}=useForm({
    mode:"onChange",
    resolver:yupResolver(schema),
    defaultValues
  })
  const defaultValues = {
   otcode:"",
   otdescription:"",
   active:true
  };

  const [openPost, setOpenPost] = React.useState(false);
  const onSubmitDataHandler = (data) => {
    console.log("data is ",data);
  }

  //state variable to close the confirmation modal for POST request
  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  //state variable to close the confirmation modal for PUT request
  const handleClosePut = () => {
    if (openPut) {
      setOpenPut(false);
    }
  };

   //event listener function for the Add button on the modal form
   function addRecord() {
    if (props.countClick === 0) {
      props.setCountClick(props.countClick + 1);
      postOrganization(finalData);
    }
  }

  return(<>

<div className="w-full grid justify-center items-center rounded lg:px-0 mt-4">
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
            <div className="grid grid-cols-1 md:grid-cols-1  w-full">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                  props.setEdit(false);
                  reset(defaultValues);
                }}
              />
            </div>
            <div className="row">
            <fieldset className="border border-gray-300 text-left lg:mx-auto lg:px-4 md:ml-0 md:mr-0 py-4 rounded lg:mt-6 lg:m-2 ">
            <legend className="md:mx-2 md:px-2 lg:px-2 font-bold text-gray-700">
               Anesthesia              </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-2 md:grid-cols-1 gap-2 md:px-2"
                >

              <div className="py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="">
                    <InputField 
                    name="otcode"
                    varient="outlined"
                    label="Code"
                    control={control}
                    error={errors.otcode}
                    inputProps={{style:{textTransform:"capitalize"}}}
                    />
                    </div>
                    <div className="" >
                    <InputField
                    error={errors.otdescription  }
                    name="otdescription"
                    varient="outlined"
                    label="Description"
                    control={control}
                    inputProps={{style:{textTransform:"capitalize"}}}
                    />
                    </div>
                    <div className="px-2">
                    <CheckBoxField
                      control={control}
                      name="active"
                      label="Active"
                      placeholder="Status"
                    />
                    </div>

                   
            
   
    <div className="flex gap-4 justify-end">
                      {props.edit ? (
                        <CancelButton
                          onClick={() => {
                            props.handleClose();
                            props.setEdit(false);
                            reset(defaultValues);
                          }}
                        />
                      ) : (
                        <ResetButton
                          onClick={() => reset(defaultValues)} //Reset
                        />
                      )}

                      {props.edit ? <UpdateButton /> : <AddButton />}
                    </div>
                    </div>
    
        </form>
        </fieldset>
        </div>
    </Box>
</Modal>
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
  
  </>)
}