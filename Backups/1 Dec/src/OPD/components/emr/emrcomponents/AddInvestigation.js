import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CreateableSelect from "../../../../Common Components/FormFields/CreateableSelect";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import InvestigationTable from ".././emrtables/InvestigationTable";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import {
  getInvestigationList,
  getTestType,
} from "../../../services/EMRServices/emrServices";
import useFileUpload from "../../../Common Components/hooks/useFileUpload";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";

const testTypes = [
  { id: 1, value: "Pathology", label: "Pathology" },
  { id: 2, value: "Radiology", label: "Radiology" },
  { id: 3, value: "Other", label: "Other" },
];
const AddInvestigation = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    testType: yup
      .string()
      .nullable()
      .required("Please Select Test Type"),
    investigation: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Select Investigation"),
  });
  // const defaultValues = {
  //   investigation: "",
  //   testType: "pathology",
  // };

  const [data, setData] = useState({ result: [], actions: ["Delete"] }); // emr Master Table
  const [open, setOpen] = useState(false); // emr master Table
  const [testType, setTestType] = useState([]);
  const [investigationList, setInvestigationList] = useState();
  const [investigation, setInvestigation] = useState();
  const [investigationPathBase64, setInvestigationPathBase64] = useState(null);
  const [investigationImageName, setInvestigationImageName] = React.useState(
    null
  );
  const [checkDuplicate, setCheckDuplicate] = useState(false);

  const [selected, setSelected] = React.useState(false); // SelectingRadio Button
  const changeHandler = (e) => {
    setSelected(e.target.value);
  };

  const imgData = useFileUpload();

  React.useEffect(() => {
    setSelected("pathology");
  }, []);

  const handleDocChange = (target) => {
    const result = imgData.onProfilePicChange(target);
  };

  useEffect(() => {
    console.log("Upload Data", imgData.fileName);
    imgData.fileName.length === 0
      ? setInvestigationPathBase64(null)
      : setInvestigationPathBase64(imgData.path);

    imgData.fileName === ""
      ? setInvestigationImageName(null)
      : setInvestigationImageName(imgData.fileName);
  }, [imgData]);
  // const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const {
    handleSubmit,
    reset,
    formState,
    control,
    register,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      testType: 1,
      investigation: null,
    },
  });
  const { errors } = formState;

  function onSubmit(investigationData) {
    // display form data on success
    console.log("Props", props);
    let testTypeValue;
    if (investigationData.testType === "1") {
      testTypeValue = "Pathology";
    } else if (investigationData.testType === "2") {
      testTypeValue = "Radiology";
    } else {
      testTypeValue = "Other";
    }

    let investigationDetails = {
      testType: testTypeValue,
      investigation: investigationData.investigation.label,
      testId: investigationData.investigation.id,
      investigationImageName: investigationImageName,
      investigationPathBase64: investigationPathBase64,
      serviceId: investigationData.investigation.serviceId,
      serviceName: investigationData.investigation.serviceName,
    };

    let isPresent = props.investigations.some((element) => {
      if (element.investigation === investigationData.investigation.label) {
        return true;
      }
      return false;
    });

    if (props.dataId !== null) {
      data.result[props.dataId] = investigationDetails;
    } else {
      if (isPresent === false) {
        let obj = data.result.find(
          (o) => o.investigation === investigationData.investigation.label
        );
        if (typeof obj === "undefined") {
          data.result.push(investigationDetails);
          setCheckDuplicate(false);
        } else {
          setCheckDuplicate(true);
        }
      } else {
        setCheckDuplicate(true);
      }
    }

    reset();
    //for closing the modal form
    // props.setOpen(false);
  }

  useEffect(() => {
    console.log("props.dataId", props.dataId);
  }, [props.dataId]);

  const deleteRow = (index) => {
    data.result.splice(index, 1);
    setData({ ...data });
  };

  useEffect(() => {
    if (props.editInfo !== null && props.dataId !== null) {
      console.log("editInfo", props.editInfo);
      let selectedRadioButton;
      if (props.editInfo.testType === "Pathology") {
        selectedRadioButton = 1;
      } else if (props.editInfo.testType === "Radiology") {
        selectedRadioButton = 2;
      }
      let myObj = {
        testType: selectedRadioButton,
      };
      reset(myObj);
      getInvestigationList(selectedRadioButton)
        .then((response) => {
          let investigationArray = response.data.result;
          let val = investigationArray.find(
            (x) => x.label === props.editInfo.investigation
          );
          if (val) {
            console.log("Value", val);
            setValue("investigation", val, { shouldValidate: true });
          }
        })
        .catch((response) => {
          console.log(response);
        });

      // let investigation = {
      //   value: 1,
      //   label: props.editInfo.investigation,
      // };
    }
  }, [props.editInfo]);

  let newData = [...props.services];

  const handleSave = () => {
    if (props.dataId !== null) {
      let updatedInvestigation = [];
      data.result.map((item, index) => {
        console.log("Data", item);
        updatedInvestigation.push(item);
      });
      console.log("Complaints Value", updatedInvestigation);
      props.investigations[props.dataId] = updatedInvestigation[0];
    } else {
      data.result.map((item, index) => {
        console.log("Data", item);
        props.investigations.push(item);
        if (item.serviceName && item.serviceName !== null) {
          let addService = {
            serviceName: item.serviceName,
            id: item.serviceId,
            quantity: 1,
          };
          let obj = newData.find((o) => o.serviceName === item.serviceName);

          if (typeof obj === "undefined") {
            newData.push(addService);
          }
        }
        console.log("New Data Investigation", newData);
        props.setServices(newData);
      });
    }
    props.setOpen(false);
  };

  let testTypeValue = watch("testType");
  useEffect(() => {
    console.log("Test Type Value", testTypeValue);
    setValue("investigation", null);
  }, [testTypeValue]);

  //Test Type
  useEffect(() => {
    getTestType()
      .then((response) => {
        console.log(("Response", response.data));
        setTestType(response.data.result);
      })
      .catch((res) => {
        console.log("Error");
      });
  }, []);

  //Investigation List
  // const handleChange = (e) => {
  //   console.log(e);
  //   if (e.length > 0) {
  useEffect(() => {
    if (testTypeValue) {
      getInvestigationList(testTypeValue)
        .then((response) => {
          // console.log("Complaints", response.data.result);
          setInvestigationList(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [testTypeValue]);
  //   }
  // };

  return (
    <div className="row">
      <fieldset className="border border-gray-300 text-left w-full items-center  lg:mx-auto px-2 lg:px-4 xl:pl-2 md:mr-0 py-6 rounded-md lg:m-2 ">
        <div className="text-base font-semibold  mb-3 flex justify-between">
          <h1>Investigation</h1>
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
          {/* <div className="grid  items-center  w-full "> */}
          <div className=" grid grid-cols-5 gap-x-2">
            <div className="flex mt-2 col-span-2 mx-auto">
              <div className="w-full flex">
                <p className="text-sm mt-1 mx-4">Test Type :</p>
                <RadioField
                  label=""
                  name="testType"
                  control={control}
                  dataArray={testType}
                />
              </div>
            </div>

            <div className="w-full">
              {/* <CreateableSelect
                control={control}
                error={errors.investigation}
                name="investigation"
                placeholder="Investigation"
                dataArray={investigationList}
                isSearchable={false}
                inputRef={{
                  ...register("investigation", {
                    onChange: (e) => {
                      if (e.target.value !== null) {
                        setInvestigation(e.target.value.value);
                      } else {
                        setInvestigation(null);
                      }
                    },
                  }),
                }}
              /> */}

              <SearchDropdown
                control={control}
                error={errors.investigation}
                searchIcon={false}
                name="investigation"
                placeholder="Investigation *"
                label="Investigation *"
                dataArray={investigationList}
                isSearchable={true}
                isClearable={false}
                inputRef={{
                  ...register("investigation", {
                    onChange: (e) => {
                      if (e.target.value !== null) {
                        setInvestigation(e.target.value.value);
                      } else {
                        setInvestigation(null);
                      }
                    },
                  }),
                }}
              />
            </div>

            {props.dataId !== null ? (
              <div className="w-full">
                <input
                  type="file"
                  accept="image/*, .pdf"
                  style={{ display: "none" }}
                  id="outlined-button-file"
                  onChange={handleDocChange}
                />
                <label htmlFor="outlined-button-file" className="w-full">
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{
                      paddingY: "0.4rem",
                      color: "#636e72",
                      width: "100%",
                      borderColor: "#b2bec3",
                      "& MuiButton-outlined.mui-focused": {
                        borderColor: "#b2bec3",
                      },
                    }}
                  >
                    Upload Report
                  </Button>
                </label>
              </div>
            ) : (
              ""
            )}

            <div className="w-full flex justify-end">
              <Button
                type="submit"
                variant="outlined"
                size="small"
                style={{
                  maxWidth: "10rem",
                  maxHeight: "35px",
                  minWidth: "7rem",
                  minHeight: "35px",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </form>

        {/* </div> */}
        <div>
          {data.result.length > 0 ? (
            <div>
              {/* <div className="text-xl font-semibold">
                <h1>Investegation Details</h1>
              </div> */}
              <div>
                <InvestigationTable
                  //data to be displayed
                  data={data}
                  deleteRow={deleteRow}
                  // setOpen={setOpen}
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
      </div>{" "}
    </div>
  );
};

export default AddInvestigation;
