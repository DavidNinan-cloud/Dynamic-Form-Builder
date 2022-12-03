import React from "react";
import { Box, Modal, Button } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalStyle } from "../../../common/ModalStyle";
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  getCategoryById,
  addNewCategory,
  updateCategory,
} from "../../../../services/lims/pathology/CategoryServices";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import AddButton from "../../../../../Common Components/Buttons/AddButton";
import UpdateButton from "../../../../../Common Components/Buttons/UpdateButton";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../../../Common Components/Buttons/CancelButton";
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";

const CategoryModal = (props) => {
  const schema = yup.object().shape({
    categoryCode: yup.string().required("Category Code Required"),
    shortName: yup.string().required("Short Name Required"),
    category: yup.string().required("Category Required"),
  });

  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  const [finalData, setFinalData] = React.useState({});

  //the object to reset the form to blank values
  const defaultValues = {
    categoryCode: "",
    id: "",
    shortName: "",
    category: "",
    status: true,
  };

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

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

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    console.log("Your data has been updated");
    handleClosePut();
    props.setOpenBackdrop(true);
    updateCategory(finalData)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          updateAlert();
          props.setOpenBackdrop(false);
          console.log("Record has been updated successfully");
          props.populateTable();

          props.setEdit(false);

          reset(defaultValues);

          props.setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);

        errorAlert();
        props.setOpenBackdrop(false);
      });
  }

  //event listener function for the Add button on the modal form
  function addRecord() {
    setOpenPost(false);
    console.log("A new record has been added");
    props.setOpenBackdrop(true);
    postCategory(finalData);
  }

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked", data);

    if (props.edit === true) {
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);

      let updateObj = {
        active: data.status,
        categoryCode: data.categoryCode,
        shortName: data.shortName,
        category: data.category,
        id: data.id,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let obj = {
        active: data.status,
        categoryCode: data.categoryCode,
        shortName: data.shortName,
        category: data.category,
        testType: {
          id: 2,
        },
      };

      console.log(obj);

      console.log(obj);
      setOpenPost(true);
      setFinalData(obj);
    }
  };

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["CategoryInfo", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue && openPut !== true) {
        return getCategoryById(props.idValue);
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
          categoryCode: data.data.result.categoryCode,
          shortName: data.data.result.shortName,
          id: data.data.result.id,
          category: data.data.result.category,
          status: data.data.result.status,
        };

        //if data is received ; then only execute the reset function to patch the value
        if (data) {
          reset(resetObj);
        }
      },

      onError: (error) => {
        console.log(error);
        //Code for React Toast
      },
    }
  );

  //useMutation hook for the implementation of post request data saving
  const { mutate: postCategory } = useMutation(addNewCategory, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      //When the request is successfull ; close the confirmation modal for POST

      successAlert();
      props.populateTable({ page: 0, size: 10, searchString: "" });
      props.setOpenBackdrop(false);
      console.log("Record has been created");

      //After the PUT / POST request's execution; change the flag to false for the next execution of onSubmitDataHandlers
      props.setEdit(false);

      //to set the form fields as blank
      reset(defaultValues);

      //for closing the modal form
      props.setOpen(false);
    },
    onError: (error) => {
      console.log(error);

      //Code for React toast
      errorAlert();
      props.setOpenBackdrop(false);
      //When the request is not successfull ; close the confirmation modal for POST
      handleClosePost();
    },
  });

  //axios request for data updation. That is PUT request

  return (
    <div className="w-[100%] grid justify-center items-center rounded lg:px-0 mt-4">
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
            <CancelPresentationIcon
              className="absolute top-3 right-9 text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.handleClose();
                props.setEdit(false);
                reset(defaultValues);
              }}
            />
          </div>

          <div className="row">
            <fieldset className="border border-gray-300 text-left w-full  lg:mx-auto lg:px-4 md:mr-0 py-8 rounded mt-8 lg:m-2 ">
              <legend className="px-2 font-bold text-gray-700">
                Add New Category
              </legend>

              <form
                onSubmit={handleSubmit(onSubmitDataHandler)}
                className="grid grid-cols-1 md:grid-cols-1 w-full gap-2"
              >
                <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 px-2 gap-4">
                  <div className="lg:col-span-2 md:col-span-1">
                    <InputField
                      name="categoryCode"
                      variant="outlined"
                      label="Category Code"
                      error={errors.categoryCode}
                      control={control}
                    />
                  </div>

                  <div className="lg:col-span-2 md:col-span-1">
                    <InputField
                      name="shortName"
                      variant="outlined"
                      label="Short Name"
                      error={errors.shortName}
                      control={control}
                    />
                  </div>

                  <div className="lg:col-span-2 md:col-span-1">
                    <InputField
                      name="category"
                      variant="outlined"
                      label="Category"
                      error={errors.category}
                      control={control}
                    />
                  </div>

                  {/* Active Checkbox */}
                  <div className="lg:col-start-5 pl-0.5 md:col-start-2">
                    {/* Checkbox component */}

                    <CheckBoxField
                      control={control}
                      name="status"
                      label="Active"
                      placeholder="Status"
                    />
                  </div>
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
                    <ResetButton onClick={() => reset(defaultValues)} />
                  )}

                  {props.edit ? <UpdateButton /> : <AddButton />}
                </div>
              </form>
              <CommonBackDrop openBackdrop={props.openBackdrop} />
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

      {/* Confirmation modal for PUT request */}
      <ConfirmationModal
        confirmationOpen={openPut}
        confirmationHandleClose={handleClosePut}
        confirmationSubmitFunc={updateRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to update this record ?"
        confirmationButtonMsg="Update"
      />
    </div>
  );
};

export default CategoryModal;
