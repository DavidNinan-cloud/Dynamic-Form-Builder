import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Box, Button, Modal, TextField } from "@mui/material";
import CreateableSelect from "../../../../Common Components/FormFields/CreateableSelect";
import InputField from "../../../../Common Components/FormFields/InputField";
import IpdAllergiesTable from "../emrtables/IpdAllergiesTable";
import { getAllergies } from "../../../services/IpdEmr/IpdEmrServices";

export default function AddIpdAllergiesModal(props) {
  // form validation rules
  const validationSchema = yup.object().shape({
    allergyDescription: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Only Alphabets are Allowed"),
    allergyType: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Select Allergies Type"),
  });

  const [data, setData] = useState({ result: [], actions: ["Delete"] }); // emr Master Table
  const [open, setOpen] = useState(false); // emr master Table
  const [allergiesTypeList, setAllergiesTypeList] = useState([]);
  const [allergiesType, setAllergiesType] = useState();
  const [checkDuplicate, setCheckDuplicate] = useState(false);

  // get functions to build form with useForm() hook
  const { handleSubmit, reset, formState, control, register } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      allergyType: null,
      allergyDescription: "",
    },
  });
  const { errors } = formState;

  function onSubmit(allergiesData) {
    // display form data on success
    console.log(allergiesData);
    let isNew;
    {
      typeof allergiesData.allergyType.__isNew__ !== "undefined"
        ? (isNew = true)
        : (isNew = false);
    }
    let allergiesDetails = {
      allergyType: allergiesData.allergyType.label,
      isNew: isNew,
      allergyDescription: allergiesData.allergyDescription,
    };
    let obj = data.result.find(
      (o) => o.allergyType === allergiesData.allergyType.label
    );
    if (typeof obj === "undefined") {
      data.result.push(allergiesDetails);
      setCheckDuplicate(false);
    } else {
      setCheckDuplicate(true);
    }

    reset();
  }

  useEffect(() => {
    console.log("editInfo", props.dataId);
    if (props.editInfo !== null && props.dataId !== null) {
      let allergyType = {
        value: 1,
        label: props.editInfo.allergyType,
      };

      let myObj = {
        allergyType: allergyType,
        allergyDescription: props.editInfo.allergyDescription,
      };
      console.log("editInfo", myObj);
      reset(myObj);
    }
  }, [props.editInfo]);

  const deleteRow = (index) => {
    data.result.splice(index, 1);
    setData({ ...data });
  };
  const handleSave = () => {
    if (props.dataId !== null) {
      let updatedAllergies = [];
      data.result.map((item, index) => {
        console.log("Data", item);
        updatedAllergies.push(item);
      });
      console.log("Allergy Value", updatedAllergies);
      props.allergies[props.dataId] = updatedAllergies[0];
    } else {
      data.result.map((item, index) => {
        console.log("Data", item);
        props.allergies.push(item);
      });
    }

    props.setOpen(false);
  };

  //Allergies Type Option List
  const handleChange = (e) => {
    console.log(e);
    if (e.length > 0) {
      getAllergies(e)
        .then((response) => {
          setAllergiesTypeList(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  return (
    <div className="row">
      <fieldset className="border border-gray-300 text-left w-full items-center  lg:mx-auto px-2 lg:px-4 xl:pl-2 md:mr-0 py-6 rounded-md lg:m-2 ">
        <div className="text-base font-semibold  mb-1 flex justify-between">
          <h1>Allergies</h1>
          <div className="-mt-2">
            <CancelPresentationIcon
              className="text-red-600  rounded cursor-pointer"
              onClick={() => {
                props.setOpen(false);
              }}
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-[90%] mx-auto gap-2 "
        >
          <div className="mt-4 flex flex-col xl:flex-row  space-x-3 items-center  w-full ">
            <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-2">
              <div>
                <CreateableSelect
                  control={control}
                  error={errors.allergyType}
                  name="allergyType"
                  label="Allergies Type"
                  placeholder="Allergies Type"
                  dataArray={allergiesTypeList}
                  isSearchable={false}
                  handleChange={handleChange}
                  onInputChange={handleChange}
                  inputRef={{
                    ...register("allergyType", {
                      onChange: (e) => {
                        if (e.target.value !== null) {
                          setAllergiesType(e.target.value.value);
                        } else {
                          setAllergiesType(null);
                        }
                      },
                    }),
                  }}
                />
              </div>
              <div className="flex space-x-2">
                <InputField
                  name="allergyDescription"
                  variant="outlined"
                  label="Allergies Description"
                  error={errors.allergyDescription}
                  control={control}
                />
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
        </form>

        <div>
          {data.result.length > 0 ? (
            <div>
              <div>
                <IpdAllergiesTable
                  //data to be displayed
                  data={data}
                  deleteRow={deleteRow}
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
}
