import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Modal } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import InputField from "../../../../Common Components/FormFields/InputField";
import CreateableSelect from "../../../../Common Components/FormFields/CreateableSelect";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import IpdComplaintTable from "../emrtables/IpdComplaintTable";
import { getComplaints } from "../../../services/IpdEmr/IpdEmrServices";

export default function AddIpdComplaintsModal(props) {
  const validationSchema = yup.object().shape({
    complaint: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Add Complaints"),
    since: yup
      .string()
      .required("Required")
      .matches(/^[0-9\s]+$/, "Only Digits Allowed"),
    duration: yup
      .object()
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Please Select Duration"),
  });

  const [data, setData] = useState({ result: [], actions: ["Delete"] }); // emr Master Table
  const [open, setOpen] = useState(false); // emr master Table
  const [complaints, setComplaints] = useState();
  const [complaintsList, setComplaintsList] = useState();
  const [checkDuplicate, setCheckDuplicate] = useState(false);

  // const formOptions = { resolver: yupResolver(validationSchema) };
  // active checkbox always active

  // get functions to build form with useForm() hook
  const { handleSubmit, reset, formState, control, register } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      complaint: null,
      since: "",
      duration: null,
    },
  });
  const { errors } = formState;

  function onSubmit(complaintData) {
    console.log(complaintData);
    let isNew;
    {
      typeof complaintData.complaint.__isNew__ !== "undefined"
        ? (isNew = true)
        : (isNew = false);
    }

    // display form data on success
    let complaintDetails = {
      complaint: complaintData.complaint.label,
      isNew: isNew,
      since: parseInt(complaintData.since),
      duration: complaintData.duration.label,
    };
    let obj = data.result.find(
      (o) => o.complaint === complaintData.complaint.label
    );
    if (typeof obj === "undefined") {
      data.result.push(complaintDetails);
      setCheckDuplicate(false);
    } else {
      setCheckDuplicate(true);
    }
    // addedComplaint.push(complaintData)
    reset();
    //for closing the modal form
    // props.setOpen(false);
  }
  useEffect(() => {
    console.log("editInfo", props.dataId);
    if (props.editInfo !== null && props.dataId !== null) {
      let complaint = {
        value: 1,
        label: props.editInfo.complaint,
      };
      let duration = {
        value: 1,
        label: props.editInfo.duration,
      };
      let myObj = {
        complaint: complaint,
        since: props.editInfo.since,
        duration: duration,
      };
      reset(myObj);
    }
  }, [props.editInfo]);

  const deleteRow = (index) => {
    data.result.splice(index, 1);
    console.log(data);
    setData({ ...data });
  };

  const handleSave = () => {
    if (props.dataId !== null) {
      let updatedComplaints = [];
      data.result.map((item, index) => {
        console.log("Data", item);
        updatedComplaints.push(item);
      });
      console.log("Complaints Value", updatedComplaints);
      props.complaints[props.dataId] = updatedComplaints[0];
    } else {
      data.result.map((item, index) => {
        console.log("Data", item);
        props.complaints.push(item);
      });
    }
    props.setOpen(false);
  };

  //Complaints List
  const handleChange = (e) => {
    console.log(e);
    if (e.length > 0) {
      getComplaints(e)
        .then((response) => {
          // console.log("Complaints", response.data.result);
          setComplaintsList(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  const duration = [
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
          <h1>Complaint</h1>
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
            <div className="w-full grid md:grid-cols-3 gap-2">
              <div>
                <CreateableSelect
                  control={control}
                  error={errors.complaint}
                  name="complaint"
                  placeholder="Complaints"
                  dataArray={complaintsList}
                  isSearchable={false}
                  // handleChange={handleChange}
                  onInputChange={handleChange}
                  inputRef={{
                    ...register("complaint", {
                      onChange: (e) => {
                        if (e.target.value !== null) {
                          setComplaints(e.target.value.value);
                        } else {
                          setComplaints(null);
                        }
                      },
                    }),
                  }}
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
                  dataArray={duration}
                  isSearchable={false}
                  handleChange={handleChange}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  size="small"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "35px",
                    minWidth: "90px",
                    minHeight: "35px",
                    fontWeight: "bold",
                    textTransform: "none",
                    marginLeft: "1rem",
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
                <IpdComplaintTable
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
}
