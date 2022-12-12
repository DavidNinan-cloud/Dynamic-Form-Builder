import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import {
  getDepartment,
  getDoctors,
} from "../../../services/IpdEmr/IpdEmrServices";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Card, CardContent } from "@mui/material";

const IpdDoctorDetails = () => {
  const [departmentList, setDepartmentList] = useState();
  const [doctorList, setDoctorList] = useState();
  const [departmentId, setDepartmentId] = useState(null);
  const [errorDoctorDetails, setErrorDoctorDetails] = React.useState(
    "invisible"
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      doctorDetails: [{ department: "", doctor: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "doctorDetails",
  });

  let departmentDetails, doctorsDetail;

  let doctorDetailsData = watch("doctorDetails");
  useEffect(() => {
    console.log("doctorDetailsData", doctorDetailsData);
  }, [doctorDetailsData]);
  doctorDetailsData.map((item) => {
    // console.log("doctorDetailsData", doctorDetailsData);
    departmentDetails = item.department;
    doctorsDetail = item.doctor;
  });

  const handleChange = (e) => {
    console.log(e);
  };

  useEffect(() => {
    getDepartment()
      .then((response) => {
        console.log("response", response.data.result);
        setDepartmentList(response.data.result);
      })
      .catch((response) => {
        console.log("Error");
      });
  }, []);

  useEffect(() => {
    if (departmentId !== null) {
      getDoctors(departmentId)
        .then((response) => {
          setDoctorList(response.data.result);
        })
        .catch((response) => {
          console.log("Error");
        });
    }
  });

  const onSubmit = (data) => {
    console.log("Data", data);
  };

  return (
    <div>
      <div className="ml-3 h-auto">
        <Card
          square={true}
          elevation={1}
          sx={{
            marginY: "6px",
            overflow: "visible",
            paddingY: "0.3rem",
          }}
          className=" mx-auto h-full overflow-y-visible "
        >
          <CardContent>
            <div className="text-sm font-semibold py-2 bg-[#FFD9D4] -mt-2">
              <h1 className="pl-2">Doctor/Department Details</h1>
            </div>
            <hr className="border mb-2 border-slate-300" />
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((item, index) => {
                  return (
                    <div className="grid grid-cols-2 gap-2" key={item.id}>
                      {/* //Department// */}
                      <div>
                        <SearchDropdown
                          control={control}
                          error={errors.doctorDetails?.[index]?.department}
                          searchIcon={false}
                          name={`doctorDetails[${index}].department`}
                          label="Department"
                          dataArray={departmentList}
                          isSearchable={true}
                          placeholder="Department"
                          isClearable={false}
                          handleInputChange={handleChange}
                          inputRef={{
                            ...register(`doctorDetails[${index}].department`, {
                              onChange: (e) => {
                                if (e.target.value !== null) {
                                  setDepartmentId(e.target.value.value);
                                } else {
                                  setDepartmentId(null);
                                }
                              },
                            }),
                          }}
                        />
                      </div>
                      {/* //Doctor// */}
                      <div className="flex">
                        <SearchDropdown
                          control={control}
                          error={errors.doctorDetails?.[index]?.doctor}
                          searchIcon={false}
                          name={`doctorDetails[${index}].doctor`}
                          label="Doctor"
                          dataArray={doctorList}
                          isSearchable={true}
                          placeholder="Doctor"
                          isClearable={false}
                          handleInputChange={handleChange}
                          inputRef={{
                            ...register(`doctorDetails[${index}].doctor`, {
                              onChange: (e) => {
                                // if (e.target.value !== null) {
                                //   setDepartmentId(e.target.value.value);
                                // } else {
                                //   setDepartmentId(null);
                                // }
                              },
                            }),
                          }}
                        />
                        <div className="flex mx-2">
                          {fields.length !== 1 && (
                            <CloseRoundedIcon
                              className="mt-2 cursor-pointer text-sky-600 rounded-full"
                              onClick={() => {
                                remove(index);
                                if (index !== fields.length - 1) {
                                  setValue(
                                    `doctorDetails[${index}].department`,
                                    ""
                                  );
                                  setValue(
                                    `doctorDetails[${index}].doctor`,
                                    ""
                                  );
                                }
                                doctorDetailsData.map((item) => {
                                  if (item.internalReferenceDoctor !== "") {
                                    // setDepartment("");
                                  }
                                });
                              }}
                            />
                          )}
                          {fields.length - 1 === index && (
                            <AddOutlinedIcon
                              className="mt-2 mx-1 cursor-pointer text-sky-600 border border-sky-600 rounded-full"
                              onClick={(index) => {
                                console.log("departmentDetails", doctorsDetail);
                                if (departmentDetails && doctorsDetail) {
                                  if (
                                    departmentDetails.id !== "" &&
                                    doctorsDetail.id !== ""
                                  ) {
                                    append({ department: "", doctor: "" });
                                    //   setDepartment(null);
                                    console.log(
                                      "Inside departmentDetails",
                                      departmentDetails.id
                                    );
                                    setErrorDoctorDetails("invisible");
                                  } else {
                                    setErrorDoctorDetails(
                                      "visible mx-auto text-red-500 text-xs mt-3"
                                    );
                                  }
                                } else {
                                  setErrorDoctorDetails(
                                    "visible mx-auto text-red-500 text-xs mt-3"
                                  );
                                }
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <p className={errorDoctorDetails}>Please Add Details</p>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IpdDoctorDetails;
