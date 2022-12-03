import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import InputField from "../../../../Common Components/FormFields/InputField";
import SymptomsTable from ".././emrtables/SymptomsTable";
import CreateableSelect from "../../../../Common Components/FormFields/CreateableSelect";
import { getSymptoms } from "../../../services/EMRServices/emrServices";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const AddSymptoms = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    symptoms: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Select Frequency"),
    since: yup
      .string()
      .required("Required")
      .matches(/^[0-9\s]+$/, "Please Provide Valid Info"),
    duration: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Select Duration"),
  });
  // const defaultValues = {
  //   symptoms: "",
  //   since: "",
  //   duration: [{}],
  // };

  const [data, setData] = useState({ result: [], actions: ["Delete"] }); // emr Master Table
  const [open, setOpen] = useState(false); // emr master Table
  const [symptomsList, setSymptomsList] = useState();
  const [symptoms, setSymptoms] = useState();
  const [checkDuplicate, setCheckDuplicate] = useState(false);

  // const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { handleSubmit, reset, formState, control, register } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      symptoms: null,
      since: "",
      duration: null,
    },
  });
  const { errors } = formState;

  function onSubmit(symptomsData) {
    // display form data on success
    console.log(symptomsData);

    let isNew;
    {
      typeof symptomsData.symptoms.__isNew__ !== "undefined"
        ? (isNew = true)
        : (isNew = false);
    }

    let symptomsDetails = {
      symptoms: symptomsData.symptoms.label,
      isNew: isNew,
      since: parseInt(symptomsData.since),
      duration: symptomsData.duration.label,
    };
    let obj = data.result.find(
      (o) => o.symptoms === symptomsData.symptoms.label
    );
    if (typeof obj === "undefined") {
      data.result.push(symptomsDetails);
      setCheckDuplicate(false);
    } else {
      setCheckDuplicate(true);
    }

    reset();
    //for closing the modal form
    // props.setOpen(false);
  }

  useEffect(() => {
    if (props.editInfo !== null && props.dataId !== null) {
      console.log("editInfo", props.editInfo);
      let symptoms = {
        value: 1,
        label: props.editInfo.symptoms,
      };
      let duration = {
        value: 1,
        label: props.editInfo.duration,
      };

      let myObj = {
        symptoms: symptoms,
        since: props.editInfo.since,
        duration: duration,
      };
      // console.log("editInfo", myObj);
      reset(myObj);
    }
  }, [props.editInfo]);

  const deleteRow = (index) => {
    data.result.splice(index, 1);
    setData({ ...data });
  };
  const handleSave = () => {
    if (props.dataId !== null) {
      let updatedSymptoms = [];
      data.result.map((item, index) => {
        console.log("Data", item);
        updatedSymptoms.push(item);
      });
      console.log("Diagnosis Value", updatedSymptoms);
      props.symptoms[props.dataId] = updatedSymptoms[0];
    } else {
      data.result.map((item, index) => {
        console.log("Data", item);
        props.symptoms.push(item);
      });
    }

    props.setOpen(false);
  };

  //Symptoms List
  const handleChange = (e) => {
    console.log(e);
    if (e.length > 0) {
      getSymptoms(e)
        .then((response) => {
          // console.log("Complaints", response.data.result);
          setSymptomsList(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  // symptomsOption
  // const symptomsOption = [
  //   {
  //     value: "1",
  //     label: "Cold",
  //   },
  //   {
  //     value: "2",
  //     label: "Flue",
  //   },
  //   {
  //     value: "3",
  //     label: "Fever",
  //   },
  //   {
  //     value: "4",
  //     label: "Chest Pain",
  //   },
  // ];

  // durationOption
  const durationOption = [
    {
      value: "1",
      label: "Days",
    },
    {
      value: "2",
      label: "Months",
    },
    {
      value: "3",
      label: "Years",
    },
  ];
  return (
    <div className="row">
      <fieldset className="border border-gray-300 text-left w-full items-center  lg:mx-auto px-2 lg:px-4 xl:pl-2 md:mr-0 py-6 rounded-md lg:m-2 ">
        <div className="text-base font-semibold  mb-3 flex justify-between">
          <h1>Symptoms</h1>
          <div className="-mt-2">
            <CancelPresentationIcon
              className="text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.setOpen(false);
              }}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full  gap-2">
          <div className="flex flex-col xl:flex-row  space-x-3 items-center  w-full ">
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              <div>
                <CreateableSelect
                  name="symptoms"
                  // variant="outlined"

                  placeholder="Symptoms *"
                  dataArray={symptomsList}
                  error={errors.symptoms}
                  control={control}
                  isSearchable={false}
                  onInputChange={handleChange}
                  inputRef={{
                    ...register("symptoms", {
                      onChange: (e) => {
                        if (e.target.value !== null) {
                          setSymptoms(e.target.value.value);
                        } else {
                          setSymptoms(null);
                        }
                      },
                    }),
                  }}
                />
              </div>
              <div className="flex space-x-2">
                <InputField
                  name="since"
                  variant="outlined"
                  label="Since *"
                  error={errors.since}
                  control={control}
                />
              </div>
              <div className="flex  space-x-2 w-full sm:justify-between sm:col-span-2 lg:col-span-1">
                <div className="lg:w-full sm:w-6/12 sm:pr-1">
                  <DropdownField
                    control={control}
                    error={errors.duration}
                    name="duration"
                    placeholder="Duration *"
                    dataArray={durationOption}
                    isSearchable={false}
                    // handleChange={handleChange}
                  />
                </div>
                <div className="flex gap-4 justify-end md:mb-3 lg:mb-0 ">
                  <Button
                    type="submit"
                    variant="outlined"
                    size="small"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "40px",
                      minWidth: "90px",
                      minHeight: "40px",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          {data.result.length > 0 ? (
            <div>
              {/* <div className="text-xl font-semibold">
                <h1>Symptoms Details</h1>
              </div> */}
              <div>
                <SymptomsTable
                  //data to be displayed
                  data={data}
                  deleteRow={deleteRow}
                />
              </div>
              {/* <div className="flex justify-end items-center space-x-3">
                  <Button variant="outlined" color="danger">
                    Close
                  </Button>
                  <Button variant="outlined" color="success">
                    Save
                  </Button>
                </div> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </fieldset>
      <div className="flex justify-between">
        <div>
          {checkDuplicate === true ? (
            <p className="text-sm text-red-500"> Record Already Present</p>
          ) : (
            ""
          )}
        </div>
        {props.dataId !== null ? (
          <div className="flex justify-end">
            {data.result.length > 0 ? (
              <>
                <div className="flex">
                  <button
                    className="border border-red-600 rounded-md px-3 py-1 hover:cursor-pointer mx-2"
                    onClick={() => {
                      props.setOpen(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    Update
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ) : data.result.length > 0 ? (
          <>
            <div className="flex">
              <button
                className="border border-red-600 rounded-md px-3 py-1 hover:cursor-pointer mx-2"
                onClick={() => {
                  props.setOpen(false);
                }}
              >
                Close
              </button>
              <button
                className="h-10 px-3  bg-customGreen text-white rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddSymptoms;
