import React, { useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Backdrop,
  TextField,
} from "@mui/material";
import { getEmpForAuthorization } from "../../services/ReportDetailsServices";
import { useForm, Controller } from "react-hook-form";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import AuthorizationCodeModal from "./AuthorizationCodeModal";
import InputField from "../../../../Common Components/FormFields/InputField";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";

const AuthorizationTable = (props) => {
  let loggedUserObj = {};
  const { reportEntryDetails, authArr, setAuthArr } = props;

  const [empIndex, setEmpIndex] = React.useState();
  const [authObj, setAuthObj] = React.useState({});

  const [toggleAuth1, setToggleAuth1] = React.useState(false);
  const [toggleAuth2, setToggleAuth2] = React.useState(false);
  const [toggleAuth3, setToggleAuth3] = React.useState(false);
  const [confirmation1, setConfirmation1] = React.useState(false);
  const [confirmation2, setConfirmation2] = React.useState(false);

  const [empOptionsLevel1, setEmpOptionsLevel1] = React.useState([]);
  const [empOptionsLevel2, setEmpOptionsLevel2] = React.useState([]);
  const [empOptionsLevel3, setEmpOptionsLevel3] = React.useState([]);

  const [currentUserObj, setCurrentUserObj] = React.useState();
  const [checkLevel1, setCheckLevel1] = React.useState({});
  const [checkLevel2, setCheckLevel2] = React.useState([]);
  const [checkLevel3, setCheckLevel3] = React.useState([]);

  React.useEffect(() => {
    if (authObj) console.log("authObj", authObj);
  }, [authObj]);

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: {
      authorizationLevel1: "",
      authorizationLevel2: "",
      authorizationLevel3: "",
      empAuthLevel1: "",
      empAuthLevel2: "",
      empAuthLevel3: "",
    },
  });

  let rows = [
    {
      id: 1,
      label: "Level 1",
    },
    {
      id: 2,
      label: "Level 2",
    },
    {
      id: 3,
      label: "Level 3",
    },
  ];

  //   let watchEmp = watch("employee");
  let watchEmp;
  rows.map((item) => {
    watchEmp = watch(item.id);
  });

  useEffect(() => {
    loggedUserObj = JSON.parse(localStorage.getItem("loggedUser"));
    console.log("loggedUserObj", loggedUserObj);
    setAuthObj({
      authLevel: loggedUserObj.authorityLevel,
      empName: loggedUserObj.firstName + " " + loggedUserObj.lastName,
      empId: loggedUserObj.employeeId,
    });
  }, []);

  React.useEffect(() => {
    getEmpForAuthorizationDropdownLevel1(1);
    getEmpForAuthorizationDropdownLevel2(2);
    getEmpForAuthorizationDropdownLevel3(3);
  }, []);

  const getEmpForAuthorizationDropdownLevel1 = (level) => {
    getEmpForAuthorization(level)
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setEmpOptionsLevel1(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEmpForAuthorizationDropdownLevel2 = (level) => {
    getEmpForAuthorization(level)
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setEmpOptionsLevel2(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEmpForAuthorizationDropdownLevel3 = (level) => {
    getEmpForAuthorization(level)
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setEmpOptionsLevel3(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   let watchEmp = watch(rows.map((item) => item.id));

  React.useEffect(() => {
    if (watchEmp) {
      console.log(watchEmp);
    }
  }, [watchEmp]);

  useEffect(() => {
    if (reportEntryDetails?.authorizationLevel === 1) {
      reset({
        authorizationLevel1: 1,
        empAuthLevel1: "",
      });
    } else if (reportEntryDetails?.authorizationLevel === 2) {
      reset({
        authorizationLevel1: 1,
        authorizationLevel2: 2,
        empAuthLevel1: "",
        empAuthLevel2: "",
      });
    } else if (reportEntryDetails?.authorizationLevel === 3) {
      reset({
        authorizationLevel1: 1,
        authorizationLevel2: 2,
        authorizationLevel3: 3,
        empAuthLevel1: "",
        empAuthLevel2: "",
        empAuthLevel3: "",
      });
    }
  }, [reportEntryDetails]);

  const onSubmit = (data) => {
    console.log("data?.empAuthLevel2?.id", data?.empAuthLevel2?.id);
    console.log("Data", data);
    let arr = [];
    let objLevel1 = {
      authorizationLevel: data?.authorizationLevel1,
      employee: {
        id: data?.empAuthLevel1?.id ? data.empAuthLevel1.id : authObj.empId,
      },
      passcode: data["Level 1"] || null,
    };
    arr.push(objLevel1);

    let objLevel2 = {
      authorizationLevel: data?.authorizationLevel2,
      employee: {
        id: data?.empAuthLevel2?.id ? data.empAuthLevel2.id : authObj?.empId,
      },
      passcode: data["Level 2"] || null,
    };
    arr.push(objLevel2);

    // let objLevel3 = {
    //   authorizationLevel: data?.authorizationLevel3,
    //   employee: {
    //     id: data?.empAuthLevel3?.id ? data.empAuthLevel3.id : authObj.empId,
    //   },
    //   passcode: data["Level 3"] || null,
    // };
    // arr.push(objLevel3);

    console.log("objLevel1", objLevel1);
    console.log("objLevel2", objLevel2);
    //console.log("objLevel3", objLevel3);
    // setAuthArr([...authArr, { ...objLevel1, ...objLevel2 }]);
    setAuthArr([...arr]);
    console.log("authArr", authArr);
    // let authArr = [
    //   {
    //     authorizationLevel: 1,
    //     employee: {
    //       id: 40,
    //     },

    //     passcode: "1234",
    //   },
    // ];
  };

  return (
    <div className="flex flex-col">
      <TableContainer component={Paper} elevation={2}>
        <form onChange={handleSubmit(onSubmit)}>
          <Table aria-label="simple table" size="small" sx={{ height: "100%" }}>
            <TableHead sx={{ backgroundColor: "lightgrey" }}>
              <TableRow>
                <TableCell>Level</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows
                  .filter(
                    (item) => item?.id <= reportEntryDetails?.authorizationLevel
                  )
                  .map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.label}
                      </TableCell>
                      <TableCell className="z-50 w-2/5">
                        {/* {reportEntryDetails.authenticationdetails.length >
                          0 && (
                          <b>
                            {reportEntryDetails?.authenticationdetails[0]?.name}
                          </b>
                        )} */}
                        <div className="z-40">
                          {row.id === 1 &&
                            authObj.authLevel !== 1 &&
                            reportEntryDetails?.authenticationdetails[1]
                              ?.status !== "Authorized" && (
                              <div>
                                <DropdownField
                                  control={control}
                                  // error={errors.employee}
                                  name="empAuthLevel1"
                                  label="Employee"
                                  dataArray={empOptionsLevel1}
                                  isSearchable={false}
                                  placeholder="Employee"
                                  isClearable={false}
                                />{" "}
                                <input
                                  type="hidden"
                                  name="authorizationLevel1"
                                />
                              </div>
                            )}

                          {row.id === 1 &&
                            authObj.authLevel !== 1 &&
                            reportEntryDetails.authenticationdetails.length >
                              0 &&
                            reportEntryDetails?.authenticationdetails[0]
                              ?.status === "Authorized" && (
                              <div>
                                {
                                  reportEntryDetails?.authenticationdetails[0]
                                    ?.name
                                }
                              </div>
                            )}

                          {row.id === 1 && authObj.authLevel === 1 && (
                            <div>{authObj.empName}</div>
                          )}
                          {row.id === 2 &&
                            authObj.authLevel !== 2 &&
                            reportEntryDetails?.authenticationdetails[1]
                              ?.status !== "Authorized" && (
                              <div className="">
                                <DropdownField
                                  control={control}
                                  // error={errors.employee}
                                  name="empAuthLevel2"
                                  label="Employee"
                                  dataArray={empOptionsLevel2}
                                  isSearchable={false}
                                  placeholder="Employee"
                                  isClearable={false}
                                />
                                <input
                                  type="hidden"
                                  name="authorizationLevel2"
                                />
                              </div>
                            )}

                          {row.id === 2 &&
                            authObj.authLevel !== 2 &&
                            reportEntryDetails.authenticationdetails.length >
                              0 &&
                            reportEntryDetails?.authenticationdetails[1]
                              ?.status === "Authorized" && (
                              <div>
                                {
                                  reportEntryDetails?.authenticationdetails[1]
                                    ?.name
                                }
                              </div>
                            )}

                          {row.id === 2 && authObj.authLevel === 2 && (
                            <div>{authObj.empName}</div>
                          )}
                          {row.id === 3 && authObj.authLevel !== 3 && (
                            <div>
                              {" "}
                              <DropdownField
                                control={control}
                                // error={errors.employee}
                                name="empAuthLevel3"
                                label="Employee"
                                dataArray={empOptionsLevel3}
                                isSearchable={false}
                                placeholder="Employee"
                                isClearable={false}
                              />{" "}
                              <input type="hidden" name="authorizationLevel3" />
                            </div>
                          )}
                          {row.id === 3 && authObj.authLevel === 3 && (
                            <div>{authObj.empName}</div>
                          )}
                        </div>
                      </TableCell>

                      {/* {reportEntryDetails &&
                        reportEntryDetails?.authenticationdetails[0]?.status !==
                          "Authorized" &&
                        row.id === 1 && (
                          <TableCell className="w-1/2">
                            <div className="flex items-center space-x-1 w-full">
                              {toggleAuth1 ? (
                                <div className="flex items-center space-x-1 w-full">
                                  {row.id !== authObj.authLevel ? (
                                    <input
                                      type="password"
                                      className="border border-gray-300 rounded-sm p-1.5"
                                      placeholder="Enter Authorization Code"
                                      name={`${row.label}`}
                                      {...register(`${row.label}`)}
                                    />
                                  ) : !confirmation1 ? (
                                    <div className="flex items-center space-x-1">
                                      <span className="text-blue-500">
                                        Authorization Initiated...
                                      </span>

                                      <ClearIcon
                                        onClick={() => {
                                          setConfirmation1(false);
                                          setToggleAuth1(false);
                                        }}
                                        fontSize="small"
                                        className="cursor-pointer"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex items-center space-x-2">
                                      <div
                                        onClick={() => setConfirmation1(false)}
                                      >
                                        Cancel
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!toggleAuth1) {
                                      setToggleAuth1(true);
                                    } else {
                                      setToggleAuth1(false);
                                    }
                                  }}
                                  className="border border-orange-400 text-orange-400 rounded-md h-8 mb-1 px-1"
                                >
                                  Authorize
                                </button>
                              )}
                            </div>
                          </TableCell>
                        )} */}

                      {reportEntryDetails &&
                        reportEntryDetails?.authenticationdetails[0]?.status !==
                          "Authorized" &&
                        row.id === 1 && (
                          <TableCell className="w-1/2">
                            {!confirmation1 ? (
                              <div className="flex items-center space-x-1 w-full">
                                {toggleAuth1 && row.id !== authObj.authLevel ? (
                                  <div className="flex items-center space-x-1 w-full">
                                    <input
                                      type="password"
                                      className="border border-gray-300 rounded-sm p-1.5"
                                      placeholder="Enter Authorization Code"
                                      name={`${row.label}`}
                                      {...register(`${row.label}`)}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        //setToggleAuth2(false);
                                        setConfirmation1(true);
                                      }}
                                      className="border border-orange-500 text-orange-500 rounded-md h-8 -mt-1 px-1"
                                    >
                                      Save
                                    </button>{" "}
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (!toggleAuth1) {
                                        setToggleAuth1(true);
                                      } else {
                                        setToggleAuth1(false);
                                      }
                                    }}
                                    className="border border-orange-400 text-orange-400 rounded-md py-1.5 px-1 mb-2"
                                  >
                                    Authorize
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1 py-1.5 px-1 mb-2">
                                <span className="text-blue-500">
                                  Authorization Initiated...
                                </span>

                                <ClearIcon
                                  onClick={() => {
                                    setConfirmation1(false);
                                    setToggleAuth1(false);
                                    setValue("Level 1", "");
                                  }}
                                  fontSize="small"
                                  className="cursor-pointer"
                                />
                              </div>
                            )}
                          </TableCell>
                        )}

                      {reportEntryDetails &&
                        reportEntryDetails?.authenticationdetails[1]?.status !==
                          "Authorized" &&
                        row.id === 2 && (
                          <TableCell className="w-1/2">
                            {!confirmation2 ? (
                              <div className="flex items-center space-x-1 w-full">
                                {toggleAuth2 && row.id !== authObj.authLevel ? (
                                  <div className="flex items-center space-x-1 w-full">
                                    <input
                                      type="password"
                                      className="border border-gray-300 rounded-sm p-1.5"
                                      placeholder="Enter Authorization Code"
                                      name={`${row.label}`}
                                      {...register(`${row.label}`)}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        //setToggleAuth2(false);
                                        setConfirmation2(true);
                                      }}
                                      className="border border-orange-500 text-orange-500 rounded-md h-8 -mt-1 px-1"
                                    >
                                      Save
                                    </button>{" "}
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (!toggleAuth2) {
                                        setToggleAuth2(true);
                                      } else {
                                        setToggleAuth2(false);
                                      }
                                    }}
                                    className="border border-orange-400 text-orange-400 rounded-md py-1.5 px-1 mb-2"
                                  >
                                    Authorize
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1 py-1.5 px-1 mb-2">
                                <span className="text-blue-500">
                                  Authorization Initiated...
                                </span>

                                <ClearIcon
                                  onClick={() => {
                                    setConfirmation2(false);
                                    setToggleAuth2(false);
                                    setValue("Level 2", "");
                                  }}
                                  fontSize="small"
                                  className="cursor-pointer"
                                />
                              </div>
                            )}
                          </TableCell>
                        )}

                      {/* {reportEntryDetails &&
                      reportEntryDetails?.authenticationdetails[1]?.status !==
                        "Authorized" &&
                      row.id === 2 && (
                        <TableCell className="w-1/2">
                          <div className="flex items-center space-x-1 w-full">
                            {toggleAuth2 ? (
                              <div className="flex items-center space-x-1 w-full">
                                {row.id !== authObj.authLevel ? (
                                  <input
                                    type="password"
                                    className="border border-gray-300 rounded-sm p-1.5"
                                    placeholder="Enter Authorization Code"
                                    name={`${row.label}`}
                                    {...register(`${row.label}`)}
                                  />
                                ) : confirmation2 ? (
                                  <div className="flex items-center space-x-1">
                                    <span className="text-blue-500">
                                      Authorization Initiated...
                                    </span>

                                    <ClearIcon
                                      onClick={() => {
                                        setConfirmation2(false);
                                        setToggleAuth2(false);
                                      }}
                                      fontSize="small"
                                      className="cursor-pointer"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <div
                                      onClick={() => setConfirmation2(false)}
                                    >
                                      Cancel
                                    </div>
                                  </div>
                                )}

                                {row.id !== authObj.authLevel && (
                                  <div className="flex items-center space-x-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setToggleAuth2(false);
                                        setConfirmation2(true);
                                      }}
                                      className="border border-orange-500 text-orange-500 rounded-md h-8 -mt-1 px-1"
                                    >
                                      Save
                                    </button>{" "}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  if (!toggleAuth2) {
                                    setToggleAuth2(true);
                                  } else {
                                    setToggleAuth2(false);
                                  }
                                }}
                                className="border border-orange-400 text-orange-400 rounded-md h-8 mb-1 px-1"
                              >
                                Authorize
                              </button>
                            )}
                          </div>
                        </TableCell>
                      )} */}

                      {reportEntryDetails &&
                        reportEntryDetails?.authenticationdetails[0]?.status ===
                          "Authorized" &&
                        row.id === 1 && (
                          <TableCell className="w-1/2">
                            <span className="text-blue-500 rounded-md">
                              Authorized
                            </span>
                          </TableCell>
                        )}

                      {reportEntryDetails &&
                        reportEntryDetails?.authenticationdetails[1]?.status ===
                          "Authorized" &&
                        row.id === 2 && (
                          <TableCell className="w-1/2">
                            <span className="text-blue-500 rounded-md">
                              Authorized
                            </span>
                          </TableCell>
                        )}

                      {reportEntryDetails &&
                        reportEntryDetails?.authenticationdetails[2]?.status ===
                          "Authorized" &&
                        row.id === 3 && (
                          <TableCell className="w-1/2">
                            <span className="text-blue-500 rounded-md">
                              Authorized
                            </span>
                          </TableCell>
                        )}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {/* <div className="flex justify-end mr-2 mb-2">
            <button
              className="border border-blue-500 p-0-5 text-blue-500 rounded-md"
              onClick={handleSubmit(onSubmit)}
            >
              Save Authorization
            </button>
          </div> */}
        </form>
      </TableContainer>
    </div>
  );
};

export default AuthorizationTable;
