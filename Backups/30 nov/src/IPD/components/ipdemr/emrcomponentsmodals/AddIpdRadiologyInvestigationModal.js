import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
import useFileUpload from "../../../../OPD/Common Components/hooks/useFileUpload";
import IpdInvestigationTable from "../emrtables/IpdInvstigationTable";

const AddIpdRadioInvestigationModal = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    investigation: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Select Investigation"),
  });

  const [data, setData] = useState({ result: [], actions: ["Delete"] }); // emr Master Table
  const [open, setOpen] = useState(false); // emr master Table

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
      investigation: null,
    },
  });
  const { errors } = formState;

  function onSubmit(investigationData) {
    // display form data on success
    console.log(investigationData);

    let investigationDetails = {
      investigation: investigationData.investigation.label,
      testId: investigationData.investigation.id,
      investigationImageName: investigationImageName,
      investigationPathBase64: investigationPathBase64,
    };

    let isPresent = props.investigations.some((element) => {
      if (element.investigation === investigationData.investigation.label) {
        return true;
      }
      return false;
    });

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

      let investigation = {
        value: 1,
        label: props.editInfo.investigation,
      };
      let myObj = {
        investigation: investigation,
      };

      reset(myObj);
    }
  }, [props.editInfo]);

  const handleSave = () => {
    if (props.dataId !== null) {
      let updatedInvestigation = [];
      data.result.map((item, index) => {
        console.log("Data", item);
        updatedInvestigation.push(item);
      });
      props.investigations[props.dataId] = updatedInvestigation[0];
    } else {
      data.result.map((item, index) => {
        props.investigations.push(item);
      });
    }
    props.setOpen(false);
  };

  //Test Type
  // useEffect(() => {
  //   getTestType()
  //     .then((response) => {
  //       console.log(("Response", response.data));
  //       setTestType(response.data.result);
  //     })
  //     .catch((res) => {
  //       console.log("Error");
  //     });
  // }, []);

  //   useEffect(() => {
  //     getInvestigationList(testTypeValue)
  //       .then((response) => {
  //         setInvestigationList(response.data.result);
  //       })
  //       .catch((response) => {
  //         console.log(response);
  //       });
  //   }, [testTypeValue]);

  return (
    <div className="row">
      <fieldset className="border border-gray-300 text-left w-full items-center  lg:mx-auto px-2 lg:px-4 xl:pl-2 md:mr-0 py-6 rounded-md lg:m-2 ">
        <div className="text-base font-semibold  mb-3 flex justify-between">
          <h1>Investigation : Radiology</h1>
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
          <div className=" grid grid-cols-3 gap-x-2">
            <div className="w-full">
              <SearchDropdown
                control={control}
                error={errors.investigation}
                searchIcon={false}
                name="investigation"
                placeholder="Investigation"
                label="Investigation"
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
              <div>
                <IpdInvestigationTable
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
      </div>{" "}
    </div>
  );
};

export default AddIpdRadioInvestigationModal;
