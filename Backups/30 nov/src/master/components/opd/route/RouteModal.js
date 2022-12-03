import React, { useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
//yup liberary and hook form imports
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddButton from "../../../../Common Components/Buttons/AddButton";

import ResetButton from "../../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../../Common Components/Buttons/UpdateButton";

import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";
import { ModalStyle } from "../../../../Common Components/ModalStyle";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
//fromfield control liberary componant import
import InputField from "../../../../Common Components/FormFields/InputField";
import {
  getRouteById,
  addNewRoute,
  updateRoute,
} from "../../../services/opd/RouteService";
import { getUnitList } from "../../../services/appointment/AppointmentBookingSourceServices";
import CheckBoxField from "../../common/formfields/CheckBoxField";
import { useQuery, useMutation } from "@tanstack/react-query";

import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../../Common Components/Toasts/Toasts";

export default function RouteModal(props) {
  // yup Schema validation for form fields
  const schema = yup.object().shape({
    routeCode: yup
      .string()
      .required("Required")
      .matches(/^[A-Za-z0-9]+$/, "Only alphabets are allowed for this field "),
    route: yup.string().required("Required"),
    // .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field ")
    routeLocal: yup.string().required("Required"),
    // .matches(/^[A-Za-z\s]+$/, "Only Numner & Dash(-) Allow "),
    unit: yup
      .array()
      .nullable(false, "Required")
      .min(1, "Required")
      .of(
        yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        })
      )
      .required("Required"),
  });
  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    routeCode: "",
    route: "",
    routeLocal: "",
    unit: [],
    active: true,
  };

  const [unit, setUnit] = React.useState([]);

  const [finalData, setFinalData] = React.useState({});
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  //state variable to open the confirmation modal for POST request

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
  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    // errors object for show you the errors in the form
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

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
        routeCode: data.routeCode,
        route: data.route,
        routeLocal: data.routeLocal,
        unit: data.unit,
        id: data.id,
      };
      //invoke the function to send the put request
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      console.log(data);

      let postObj = {
        active: data.active,
        routeCode: data.routeCode,
        route: data.route,
        routeLocal: data.routeLocal,
        unit: data.unit,
      };

      console.log(postObj);

      setOpenPost(true);
      setFinalData(postObj);
    }
  };

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);

    props.setOpenBackdrop(true);
    postRoute(finalData);
  }

  //useMutation hook for the implementation of post request data saving
  //useMutation hook for the implementation of post request data saving
  const { mutate: postRoute } = useMutation(addNewRoute, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);
      //When the request is successfull ; close the confirmation modal for POST
      handleClosePost();
      successAlert();

      props.callTableDataApi({
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
      //Code for React toast
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });
  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["Route", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue !== "" && openPut !== true) {
        return getRouteById(props.idValue);
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
        const obj = JSON.parse(data.data.result);

        console.log("converted object ala " + JSON.stringify(obj));

        const resetObj = {
          active: obj.status,
          routeCode: obj.routeCode,
          route: obj.route,
          routeLocal: obj.routeLocal,
          unit: obj.units,
          id: obj.id,
        };
        console.log(data);
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

  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);
    updateRoute(finalData)
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

  //call unit dropdown list
  useEffect(() => {
    getUnitList(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log("result", res);
        setUnit(res.result);
      });
  }, []);

  return (
    <>
      {/* Model and table name start */}
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
            <div className="grid grid-cols-1 md:grid-cols-1  w-full lg:grid-cols-1">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                  props.setEdit(false);
                  reset(defaultValues);
                }}
              />
            </div>
            <div className="row">
              <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-4 md:ml-0 md:mr-0 py-4 rounded  lg:mt-6 lg:m-2 ">
                <legend className="md:mx-2 md:px-2 lg:px-2 font-bold text-gray-700">
                  Prescription Route
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 md:grid-cols-1  gap-2 mx-2"
                >
                  <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                    <div className="">
                      <InputField
                        name="routeCode"
                        variant="outlined"
                        label="Route Code *"
                        error={errors.routeCode}
                        control={control}
                      />
                    </div>
                    <div className="">
                      <InputField
                        name="route"
                        variant="outlined"
                        label="Route *"
                        error={errors.route}
                        control={control}
                      />
                    </div>

                    <div className="w-full">
                      <InputField
                        name="routeLocal"
                        variant="outlined"
                        type="tel"
                        label="Route(Local) *"
                        error={errors.routeLocal}
                        control={control}
                      />
                    </div>
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        //handleChange={handleChange}
                        error={errors.unit}
                        name="unit"
                        dataArray={unit}
                        placeholder="Unit *"
                        isMulti={true}
                        isSearchable={false}
                      />
                    </div>
                    <div className="px-10 md:px-2">
                      <CheckBoxField
                        control={control}
                        name="active"
                        label="Active"
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
                      <ResetButton
                        onClick={() => reset(defaultValues)} //Reset
                      />
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
      {/* model and table name button end */}
    </>
  );
}
