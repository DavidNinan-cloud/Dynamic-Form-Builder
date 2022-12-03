import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import IpdDiagnosisTable from "../emrtables/IpdDiagnosisTable";
import { getICDCode } from "../../../services/IpdEmr/IpdEmrServices";

const AddIpdDiagnosisModal = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    icdCode: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Select ICD Code"),
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
    status: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Select Status"),
  });

  let addedData = props.details;
  const [data, setData] = useState({ result: [], actions: ["Delete"] }); // emr Master Table
  const [open, setOpen] = useState(false); // emr master Table
  const [icdCode, setICDCode] = useState();
  const [checkDuplicate, setCheckDuplicate] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  // const formOptions = { resolver: yupResolver(validationSchema) };

  const [checked, setChecked] = React.useState(false);
  // const handleChange = (event) => {
  //   setChecked(!checked);
  // };

  // get functions to build form with useForm() hook
  const { handleSubmit, reset, formState, control, register } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      icdCode: null,
      since: "",
      duration: null,
      status: null,
      isChronic: false,
    },
  });
  const { errors } = formState;

  function onSubmit(diagnosisData) {
    // display form data on success
    console.log("diagnosisData", diagnosisData);
    // let isNew;
    // {
    //   typeof diagnosisData.icdCode.__isNew__ !== "undefined"
    //     ? (isNew = true)
    //     : (isNew = false);
    // }
    let diagnosisDetails;
    if (props.dataId !== null) {
      diagnosisDetails = {
        icd: diagnosisData.icdCode.label,
        // isNew: isNew,
        since: parseInt(diagnosisData.since),
        duration: diagnosisData.duration.label,
        status: diagnosisData.status.label,
        isChronic: diagnosisData.isChronic,
      };
    } else {
      diagnosisDetails = {
        icd: diagnosisData.icdCode.icdcode,
        // isNew: isNew,
        since: parseInt(diagnosisData.since),
        duration: diagnosisData.duration.label,
        status: diagnosisData.status.label,
        isChronic: diagnosisData.isChronic,
      };
    }

    let obj = data.result.find((o) => o.icd === diagnosisData.icdCode.icdcode);
    let duplicateObj = addedData.result.find(
      (o) => o.icd === diagnosisData.icdCode.icdcode
    );

    if (typeof obj === "undefined" && typeof duplicateObj === "undefined") {
      data.result.push(diagnosisDetails);
      setCheckDuplicate(false);
    } else {
      setCheckDuplicate(true);
    }
    if (props.dataId !== null) {
      setIsDisabled(true);
    }
    reset();
    //for closing the modal form
    // props.setOpen(false);
  }

  const deleteRow = (index) => {
    data.result.splice(index, 1);
    setData({ ...data });
  };

  useEffect(() => {
    if (props.editInfo !== null && props.dataId !== null) {
      console.log("editInfo", props.editInfo.icd);
      let icdCode = {
        value: 1,
        label: props.editInfo.icd,
      };
      let duration = {
        value: 1,
        label: props.editInfo.duration,
      };
      let status = {
        value: 1,
        label: props.editInfo.status,
      };
      let myObj = {
        icdCode: icdCode,
        since: props.editInfo.since,
        duration: duration,
        status: status,
        isChronic: props.editInfo.isChronic,
      };
      console.log("editInfo", myObj);
      reset(myObj);
    }
  }, [props.editInfo]);

  const handleSave = () => {
    if (props.dataId !== null) {
      let updatedDiagnosis = [];
      data.result.map((item, index) => {
        console.log("Data", item);
        updatedDiagnosis.push(item);
      });
      console.log("Diagnosis Value", updatedDiagnosis);
      props.diagnosis[props.dataId] = updatedDiagnosis[0];
    } else {
      data.result.map((item, index) => {
        console.log("Data", item);
        props.diagnosis.push(item);
      });
    }
    props.setOpen(false);
  };

  //ICD Code List
  const handleChange = (e) => {
    setCheckDuplicate(false);
    if (e.length > 0) {
      getICDCode(e)
        .then((response) => {
          // console.log("Complaints", response.data.result);
          setICDCode(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  // sinceOption

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

  // durationOption
  const statusOption = [
    {
      value: "1",
      label: "Provisional",
    },
    {
      value: "2",
      label: "Final",
    },
  ];
  return (
    <div className="row">
      <fieldset className="border border-gray-300 text-left w-full items-center  lg:mx-auto px-2 lg:px-4 xl:pl-2 md:mr-0 py-6 rounded-md lg:m-2 ">
        <div className="text-base font-semibold  mb-3 flex justify-between">
          <h1>Diagnosis</h1>
          <div className="-mt-2">
            <CancelPresentationIcon
              className="text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.setOpen(false);
              }}
            />
          </div>
        </div>
        <fieldset disabled={isDisabled}>
          <form onSubmit={handleSubmit(onSubmit)} className=" w-full  gap-2">
            {/* <div className="flex flex-col xl:flex-row  space-x-3 items-center  w-full "> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-2">
              <div className="flex space-x-2 z-40 lg:col-span-2">
                <SearchDropdown
                  control={control}
                  error={errors.icdCode}
                  name="icdCode"
                  placeholder="ICD Code"
                  dataArray={icdCode}
                  handleInputChange={handleChange}
                />
              </div>

              <div className="flex  space-x-2 w-full">
                <InputField
                  name="since"
                  variant="outlined"
                  label="Since"
                  error={errors.since}
                  control={control}
                />
              </div>

              <div className="flex space-x-2 w-full">
                <DropdownField
                  control={control}
                  error={errors.duration}
                  name="duration"
                  placeholder="Duration"
                  dataArray={durationOption}
                  isSearchable={false}
                  // handleChange={handleChange}
                />
              </div>
              <div className="flex space-x-2 w-full">
                <DropdownField
                  control={control}
                  error={errors.status}
                  name="status"
                  placeholder="Status"
                  dataArray={statusOption}
                  isSearchable={false}
                  // handleChange={handleChange}
                />
              </div>

              <div className="flex space-x-2 w-full justify-center sm:justify-between sm:col-span-2 lg:col-span-1">
                <CheckBoxField
                  control={control}
                  name="isChronic"
                  label="Chronic"
                />
                {props.dataId !== null ? (
                  <button
                    type="submit"
                    className="border border-blue-500 text-blue-500 h-10 lg:px-1 lg:h-8 my-auto rounded-md -ml-8"
                  >
                    Change
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="border border-blue-500 text-blue-500  px-7 h-10 lg:px-3 lg:h-8 my-auto rounded-md"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
            {/* </div> */}
          </form>
        </fieldset>

        <div>
          {data.result.length > 0 ? (
            <div>
              <div>
                <IpdDiagnosisTable
                  //data to be displayed
                  data={data}
                  deleteRow={deleteRow}
                  // setOpen={setOpen}
                />
              </div>
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
                <div
                  className="border border-red-600 rounded-md px-3 py-1 hover:cursor-pointer"
                  onClick={() => {
                    props.setOpen(false);
                  }}
                >
                  Cancel
                </div>
                <div
                  className="border border-green-700 rounded-md px-3 py-1 mx-2 hover:cursor-pointer"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  Update
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ) : data.result.length > 0 ? (
          <>
            <div className="flex">
              <div
                className="border border-red-600 rounded-md px-3 py-1 hover:cursor-pointer"
                onClick={() => {
                  props.setOpen(false);
                }}
              >
                Close
              </div>
              <div
                className="border border-green-700 rounded-md px-3 py-1 mx-2 hover:cursor-pointer"
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddIpdDiagnosisModal;
