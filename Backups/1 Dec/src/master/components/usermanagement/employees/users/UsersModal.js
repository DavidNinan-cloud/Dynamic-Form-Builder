import React, { useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import * as yup from "yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
//fromfield control liberary componant import
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import SearchDropdown from "../../../../../Common Components/FormFields/searchDropdown";
import InputField from "../../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import { useForm } from "react-hook-form";
import AddButton from "../../../../../Common Components/Buttons/AddButton";
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../../../Common Components/Buttons/UpdateButton";
import CancelPresentationIconButton from "../../../../../Common Components/Buttons/CancelPresentationIconButton";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  updateUserById,
  autoSearchEmployee,
  getRolesDropdown,
  addNewUsers,
  getDepartmentListByUnitId,
  getEmployeeDropdown,
  getFunctionalities,
} from "../../services/users/UserServices";

import { getUnitlist } from "../../../../services/organization/DepartmentServices";

import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../../../Common Components/Toasts/Toasts";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
//the object to reset the form to blank values
import MapUserFunctionality from "../../employees/users/MapUserFunctionality";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxHeight: "95%",
  overflowY:'scroll',
  bgcolor: "background.paper",
  border: "1px solid gray",
  borderRadius: 1,
  boxShadow: 20,
  p: 2,
};

let usersId = "";
let employeeId = "";
export default function UserModal(props) {
  const { open, userValue } = props;
  // yup Schema validation for form fields

  const schema = yup.object().shape({
    units: yup
      .array()
      .nullable()
      .when("alreadyexist", (value) => {
        if (!value) {
          console.log("value", value);
          return yup
            .object()
            .nullable()
            .shape({
              label: yup.string().required("Select units"),
              value: yup.string().required("Select units"),
            })
            .required("Select units");
        } else {
          return yup.string().nullable();
        }
      }),
    department: yup
      .array()
      .nullable()
      .when("alreadyexist", (value) => {
        if (!value) {
          console.log("value", value);
          return yup
            .object()
            .nullable()
            .shape({
              label: yup.string().required("Select units"),
              value: yup.string().required("Select units"),
            })
            .required("Select units");
        } else {
          return yup.string().nullable();
        }
      }),
    roles:
      // yup
      // .array()
      // .min(1, "Select Employee Role")
      // .of(
      yup
        .object()
        .shape({
          label: yup.string().required("Select Employee Role"),
          value: yup.string().required("Select Employee Role"),
        })
        // )
        .required("Select Employee Role"),

    employee: yup
      .string()
      .nullable()
      .when("allreadyexist", (value) => {
        if (!value) {
          return;
          yup
            .object()
            .nullable()
            .shape({
              label: yup.string().required("Select units"),
              value: yup.string().required("Select units"),
            })
            .required("Select units");
        } else {
          return yup.string().nullable();
        }
      }),
  });

  const defaultValues = {
    alreadyexist: false,
    id: "",
    units: "",
    department: "",
    employee: "",
    roles: "",
    active: true,
  };

  const [tableData, setTableData] = React.useState([]);
  const [expandPanal, setExpandPanal] = React.useState([]);
  const [incomingData, setIncomingData] = React.useState({});

  const [units, setunits] = React.useState([]);
  const [department, setDepartment] = React.useState([]);
  const [employeeOptions, setEmployeeOptions] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [searchEmployee, setSearchEmployee] = React.useState([]);
  const [employeeExist, setEmployeeExist] = React.useState(false);
  const [departmentId, setDepartmentId] = React.useState("");
  const [unitsId, setunitsId] = React.useState("");
  const [visibility, setVisibility] = React.useState(true);
  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  //useState and handle Methods for Modal Open & Close
  const [autoSearchOpen, setAutoSearchOpen] = React.useState(false);

  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  const [finalData, setFinalData] = React.useState({});
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
    register,
    handleSubmit,
    reset,
    setValue,
    // errors object for show you the errors in the form
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues,
  });

  const calculateExpandArray = (tableArray) => {
    // console.log(tableArray.length)
    let expandData = [...expandPanal];
    for (let i = 0; i < tableArray.length; i++) {
      expandData[i] = false;
    }
    console.log("expand Data", expandData);
    console.log("expand Data", expandData);
    setExpandPanal(expandData);
  };
  //call units dropdown list
  useEffect(() => {
    getUnitlist()
      .then((response) => response.data)
      .then((res) => {
        console.log("units dropdown is " + JSON.stringify(res));
        setunits(res.result);
      });

    getRolesDropdown().then((response) => {
      console.log("Roles drop down is " + JSON.stringify(response.data));
      setRoles(response.data.result);
    });
  }, []);

  //use effect to Employee dropdown
  useEffect(() => {
    if (unitsId !== "" && departmentId !== "") {
      getEmployeeDropdown(departmentId, unitsId)
        .then((response) => response.data)
        .then((res) => {
          console.log("employee list is " + JSON.stringify(res));
          setEmployeeOptions(res.result);
        });
    }
  }, [departmentId]);

  useEffect(() => {
    console.log("The incoming data is " + JSON.stringify(incomingData));
  }, [incomingData]);

  //This function is called after clicking on the Update button of modal form and after clicking on the Add button of modal form
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    let postObj = {
      active: data.active,
    };
    let roleValue = data.roles;
    let roleSubmit = [];
    for (let i = 0; i < roleValue.length; i++) {
      roleSubmit = [
        ...roleSubmit,
        {
          id: parseInt(roleValue[i].value),
        },
      ];
    }
    postObj.users = {
      active: data.active,
      employee: {
        id: parseInt(data.employee.value),
      },
      roles: roleSubmit,
    };
    // postObj.users.roles = roleSubmit

    console.log("postObj", postObj);
    if (props.edit === true) {
      postObj.users.id = parseInt(usersId);
      setOpenPut(true);
      setFinalData(postObj);
      postObj.assignRoleDto = {
        functionalities: tableData,
      };
    } else if (props.edit === false) {
      (postObj.assignRoleDto = {
        functionalities: tableData,
      }),
        postUser(postObj);
    }
  };

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);

    props.setOpenBackdrop(true);
    postUser(finalData);
  }

  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);
    updateUserById(finalData)
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

  const handleChange = (autoSearchString) => {
    console.log("search string in modal", autoSearchString);
    if (autoSearchString !== "" && autoSearchString !== null) {
      autoSearchEmployee(autoSearchString).then((response) => {
        console.log(
          "The response of autoSearchString service is " +
            JSON.stringify(response)
        );

        let obj = JSON.parse(response.data.result[0]);

        console.log("The first element is " + JSON.stringify(obj));

        let arr = [];

        for (let x of response.data.result) {
          let obj = JSON.parse(x); //convert string to object
          let option = {
            value: obj.employee,
            label: obj.employee,
            allInfo: obj,
          };
          arr.push(option);
        }

        setSearchEmployee(arr);
      });
    }
  };

  // getFunctionalities
  const { mutate: postFunctionalities } = useMutation(getFunctionalities, {
    onSuccess: (response) => {
      console.log("functionalities", response.data.result);

      setTableData(response.data.result);
      calculateExpandArray(response.data.result);
    },
    onError: (error) => {
      console.log(error);
      errorAlert();
    },
  });
  //useMutation hook for the implementation of post request data saving
  const { mutate: postUser } = useMutation(addNewUsers, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);
      handleClosePost();
      console.log("Record has been created");
      successAlert();
      props.populateTable({
        page: 0,
        size: 10,
        searchString: "",
      });
      props.setEdit(false);
      reset(defaultValues);
      props.setOpen(false);
    },
    onError: (error) => {
      console.log(error);

      errorAlert(error.message);
      //Code for React toast
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });

  function updateDepartmentOptions(requiredunitsId) {
    console.log("requiredunitsId is " + requiredunitsId);
    getDepartmentListByUnitId(requiredunitsId)
      .then((response) => {
        console.log("Department options are" + JSON.stringify(response));

        setValue("department", null);

        setDepartment(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (open && props.edit) {
      console.log("userValue", userValue);
      let obj = userValue;
      let employee = {
        value: obj.EmployeeId,
        label: obj.EmployeeName,
      };
      employeeId = obj.EmployeeId;
      const resetObj = {
        id: obj.id,
        employee: {
          value: obj.employeeId,
          label: obj.employee,
        },
        roles: obj.roles,
        units: obj.units,
        department: obj.departments,

        active: obj.activeStatus,
      };
      // call functions
      let roleArr = obj.roles;
      let roleIds = [];
      for (let value of roleArr) {
        roleIds.push(value.value);
      }
      let callObj = {
        rolesId: roleIds,
        usersId: obj.id,
      };
      console.log("call role talble callObj", callObj);
      if (tableData.length > 0) {
      } else {
        postFunctionalities(callObj);
      }

      usersId = obj.id;
      setIncomingData(resetObj);
      if (obj) {
        reset(resetObj);
      }
      setValue("employee", employee);
    }
  }, [open]);

  return (
    <>
      {/* Model and table name start */}

      <Modal
        open={open}
        onClose={() => {
          props.handleClose();
          props.setEdit(false);
          reset(defaultValues);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <div className="grid grid-cols-1 md:grid-cols-1 w-full">
            <CancelPresentationIconButton
              className="absolute top-3 right-9 text-red-400 rounded cursor-pointer"
              onClick={() => {
                props.handleClose();
                props.setEdit(false);
                reset(defaultValues);
              }}
            />
          </div>
          <div className="row">
            <fieldset className="border border-gray-300 text-left lg:mx-auto lg:px-4 md:ml-0 md:mr-0 py-4 rounded lg:mt-6 lg:m-2 ">
              <legend className="md:mx-2 md:px-2 lg:px-2 font-bold text-gray-700">
                User
              </legend>
              <form
                onSubmit={handleSubmit(onSubmitDataHandler)}
                className="grid grid-cols-2 md:grid-cols-1 gap-2 md:px-2"
              >
                {props.edit === true ? (
                  <>
                    <div className="py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      <div className="w-full">
                        <DropdownField
                          control={control}
                          error={errors.units}
                          name="units"
                          label="Select units"
                          placeholder="Select units"
                          dataArray={units}
                          isDisabled={props.edit}
                          isSearchable={false}
                          inputRef={{
                            ...register("units", {
                              onChange: (e) => {
                                console.log(
                                  "Selected units object is " +
                                    JSON.stringify(e)
                                );

                                setunitsId(e.target.value.id);

                                updateDepartmentOptions(e.target.value.id);
                              },
                            }),
                          }}
                        />
                      </div>
                      <div className="w-full ">
                        <DropdownField
                          control={control}
                          error={errors.department}
                          name="department"
                          label="Select Department"
                          placeholder="Select Department"
                          dataArray={department}
                          isSearchable={false}
                          isDisabled={props.edit}
                          inputRef={{
                            ...register("department", {
                              onChange: (e) => {
                                console.log(
                                  "Selected Department object is " +
                                    JSON.stringify(e)
                                );

                                setDepartmentId(e.target.value.id);
                              },
                            }),
                          }}
                        />
                      </div>
                      <div className="w-full">
                        <DropdownField
                          control={control}
                          error={errors.employee}
                          name="employee"
                          label="Select Employee Name"
                          placeholder="Select Employee Name"
                          isSearchable={false}
                          isDisabled={props.edit}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid md:grid-cols-1 lg:w-1/2 z-50">
                      <SearchDropdown
                        control={control}
                        error={errors.employeeCode}
                        dataArray={searchEmployee}
                        searchIcon={true}
                        name="employeeCode"
                        label="Employee Code / Name"
                        placeholder="Search by Employee Name / Mobile Number"
                        isSearchable={true}
                        isClearable={false}
                        handleInputChange={handleChange}
                        inputRef={{
                          ...register("employeeCode", {
                            onChange: (e) => {
                              console.log(
                                "The selected employeeCode object is" +
                                  JSON.stringify(e)
                              );

                              setEmployeeExist(true);
                              setValue("alreadyexist", true);
                              if (e.target.value !== null) {
                                let EmployeeData = e.target.value.allInfo;
                                let employee = {
                                  value: EmployeeData.employeeid,
                                  label: EmployeeData.employee,
                                };
                                console.log("employee is", employee);
                                setValue("employee", employee);
                                setIncomingData(e.target.value.allInfo);
                              }
                            },
                          }),
                        }}
                      />
                    </div>
                    <div class="flex items-center lg:w-1/2 md:justify-center">
                      <div class="flex-grow h-px bg-gray-400"></div>

                      <span class="flex-shrink px-4 font-light font-Poppins ">
                        OR
                      </span>

                      <div class="flex-grow h-px bg-gray-400"></div>
                    </div>

                    {employeeExist ? (
                      <>
                        <div className=" border border-gray-300 rounded py-4">
                          <div className="grid lg:grid-cols-2">
                            <div className="py-2">
                              <span className="px-6">units Name:</span>
                              {incomingData.units[0].label}
                            </div>
                            <div className="py-2">
                              <span className="px-6">Department Name:</span>
                              {incomingData.department.label}
                            </div>
                          </div>
                          <div className="grid lg:grid-cols-2">
                            <div className="py-2 w-full ">
                              <span className="px-6">Employee Name:</span>
                              {incomingData.employee}
                            </div>
                            <div className="py-2">
                              <span className="px-6">Employee Name:</span>
                              {incomingData.employeefirstname}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="py-1 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
                          <div className="w-full">
                            <DropdownField
                              control={control}
                              error={errors.units}
                              name="units"
                              label="Select units"
                              placeholder="Select units"
                              dataArray={units}
                              isDisabled={props.edit}
                              isSearchable={false}
                              inputRef={{
                                ...register("units", {
                                  onChange: (e) => {
                                    console.log(
                                      "Selected units object is " +
                                        JSON.stringify(e)
                                    );

                                    setunitsId(e.target.value.id);

                                    updateDepartmentOptions(e.target.value.id);
                                  },
                                }),
                              }}
                            />
                          </div>
                          <div className="w-full ">
                            <DropdownField
                              control={control}
                              error={errors.department}
                              name="department"
                              label="Select Department"
                              placeholder="Select Department"
                              dataArray={department}
                              isSearchable={false}
                              isDisabled={props.edit}
                              inputRef={{
                                ...register("department", {
                                  onChange: (e) => {
                                    console.log(
                                      "Selected Department object is " +
                                        JSON.stringify(e)
                                    );

                                    setDepartmentId(e.target.value.id);
                                  },
                                }),
                              }}
                            />
                          </div>
                          <div className="w-full">
                            <DropdownField
                              control={control}
                              error={errors.employee}
                              name="employee"
                              label="Select Employee Name"
                              placeholder="Select Employee Name"
                              isSearchable={false}
                              isDisabled={props.edit}
                              dataArray={employeeOptions}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                <div className="grid lg:grid-cols-3 md:grid-cols-1">
                  <div className="w-full md:w-full">
                    <DropdownField
                      control={control}
                      error={errors.roles}
                      name="roles"
                      // isDisabled={props.edit}
                      placeholder="Assign Role"
                      isSearchable={false}
                      inputRef={{
                        ...register("roles", {
                          onChange: (e) => {
                            console.log("roles selected", e);
                            let roleArr = e.target.value;
                            let roleIds = [];
                            for (let value of roleArr) {
                              roleIds.push(value.value);
                            }
                            let callObj = {
                              rolesId: roleIds,
                            };
                            if (props.edit) {
                              callObj.usersId = usersId;
                            }
                            console.log("call role talble callObj", callObj);
                            postFunctionalities(callObj);
                          },
                        }),
                      }}
                      dataArray={roles}
                      isMulti={true}
                    />
                  </div>
                  <div className="px-6">
                    <CheckBoxField
                      control={control}
                      name="active"
                      label="Active"
                    />
                  </div>
                </div>
                <div className="w-full pt-6">
                  {
                    <>
                      <label className=" font-bold text-gray-700">
                        Functionalities :
                      </label>
                      <div className="h-40 w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-slate-50">
                      <MapUserFunctionality
                        tableData={tableData}
                        setTableData={setTableData}
                        expandPanal={expandPanal}
                        setExpandPanal={setExpandPanal}
                      />
                      </div>
                    </>
                  }
                </div>
                <div className="flex gap-4 -ml-10 justify-end mt-6">
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
                      onClick={() => {
                        reset(defaultValues);
                        setEmployeeExist(false);
                      }} //Reset
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

      {/* model and table name button end */}
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
