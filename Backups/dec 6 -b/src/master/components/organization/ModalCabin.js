import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalStyle } from "../../../Common Components/ModalStyle";
import { useForm } from "react-hook-form";
import InputField from "../../../Common Components/FormFields/InputField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import { Box, Modal, Button } from "@mui/material";
import {
  getCabinById,
  addNewCabin,
  updateCabin,
  getUnitDropdown,
} from "../../services/organization/CabinServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  successAlert,
  errorAlert,
  updateAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CancelButton from "../../../Common Components/Buttons/CancelButton";
import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";

export default function ModalCabin(props) {
  const schema = yup.object().shape({
    cabinCode: yup
      .string()
      .required("Required")
      .min(2, "Add Cabin Code")
      .matches(/^[a-zA-Z0-9]+$/, "Space & Special Char Not Allow"),
    cabinName: yup
      .string()
      .required("Required")
      .min(2, "Add Cabin Name")
      .matches(/^[a-zA-Z0-9\s]+$/, "Numbers Not Allow For This Field "),
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

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    cabinName: "",
    cabinCode: "",
    unit: [],
    active: true,
  };

  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [finalData, setFinalData] = React.useState({});
  //All the options in the unit drop down list are going to be stored in this state variable
  const [unitOptions, setUnitOptions] = React.useState([]);

  const handleClosePost = () => {
    props.setCountClick(0);
    if (openPost) {
      setOpenPost(false);
    }
  };
  const handleClosePut = () => {
    props.setCountClick(0);
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

  //Store all the options of the Country Dropdown before the component gets mounted
  useEffect(() => {
    console.log("getUnitList() is going to be executed");
    getUnitList();
  }, []);

  //axios get request to have all the list of countries. This request belongs to the country-controller on swagger
  function getUnitList() {
    getUnitDropdown()
      .then((response) => {
        console.log("The list of all the units are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    if (props.edit === true) {
      console.log(data);
      let updateObj = {
        active: data.active,
        cabinName: data.cabinName,
        cabinCode: data.cabinCode,
        id: data.id,
        unit: data.unit,
      };
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(data);
      let postedObj = {
        active: data.active,
        cabinName: data.cabinName,
        cabinCode: data.cabinCode,
        unit: data.unit,
      };
      console.log(postedObj);
      setOpenPost(true);
      setFinalData(postedObj);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    props.setOpenBackdrop(true);
      postCabin(finalData);
  }
  //ADD POST API save data
  const { mutate: postCabin } = useMutation(addNewCabin, {
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
      handleClosePost(); // post add data into table, status code 500 close confirmation modal.
    },
  });

  //EDIT GET API
  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["getCabinById", props.idValue],
    //to avoid the automatic firing of the query. Because CabinModal is a child component of Cabin.js
    () => {
      if (props.idValue !== "" && openPut !== true) {
        return getCabinById(props.idValue);
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
        console.log("Final result is" + data.data.result);
        console.log(typeof data.data.result);
        const obj = JSON.parse(data.data.result);
        console.log("converted object ala " + JSON.stringify(obj));
        let resetObj = {
          id: obj.id,
          cabinName: obj.cabinName,
          cabinCode: obj.cabinCode,
          unit: obj.units,
          active: obj.status,
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
      updateCabin(finalData)
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
                <legend className="ml-3 lg:ml-0 font-bold text-gray-600">
                  Cabin
                </legend>
                <form
                  className="grid grid-cols-1 w-full"
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                >
                  <div className="pt-2 grid md:grid-cols-2 lg:grid-cols-4 md:px-3 lg:px-0 gap-2">
                    {/* Input Fields */}
                    <div className="w-full">
                      <InputField
                        name="cabinName"
                        variant="outlined"
                        label="Cabin Name *"
                        error={errors.cabinName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                        required
                      />
                    </div>

                    {/* Input Fields */}
                    <div className=" w-full ">
                      <InputField
                        name="cabinCode"
                        variant="outlined"
                        label="Cabin Code *"
                        error={errors.cabinCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                        required
                      />
                    </div>

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