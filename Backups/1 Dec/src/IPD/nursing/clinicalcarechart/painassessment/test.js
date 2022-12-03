// import React, { useContext, useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import SearchBar from "../../../../Common Components/FormFields/SearchBar";
// import CommonTable from "../../common/CommonTable";
// import { Button } from "@mui/material";
// import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
// import InputField from "../../../../Common Components/FormFields/InputField";
// import DropdownField from "../../../../Common Components/FormFields/DropdownField";
// import {
//  getDoctorDropdown,
//  autoSearchService,
//  getAllCharges,
//  addNewCharges,
// } from "../../services/nursingServices/charges/Charges";
// import { useForm } from "react-hook-form";
// import CommonSelectableServiceTable from "../../../../emergency/common/CommonSelectableServiceTable";
// import ChargesServiceTable from "./ChargesTable";
// import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
// import { VisitContext } from "../ClinicalCareChart";
// import ChargesTable from "./ChargesTable";
// import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
// import {
//  successAlert,
//  errorAlert,
// } from "../../../../Common Components/Toasts/CustomToasts";
// import SaveButton from "../../../../Common Components/Buttons/SaveButton";
// import AddTypeButton from "../../../../Common Components/Buttons/AddTypeButton";
// const chargesData = {
//  message: "Charges list found ",
//  result: [
//  {
//  Id: 30,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 65,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 65,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 29,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 5,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 5,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 28,
//  roomNo: "203/ ABC",
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 25,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 25,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 16,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 35,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 35,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 1,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 3,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 3,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 3,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 6,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 6,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 4,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 2,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 2,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 12,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 10,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 10,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 22,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 14,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 14,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 44,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 43,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 43,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 42,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 78,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 78,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 56,
//  DateAndTime: "01/02/2022,11:30Am",
//  ServiceCode: 98,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 98,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  ],
//  statusCode: 200,
//  count: 5,
// };
// const data = {
//  message: "Charges list found ",
//  result: [
//  {
//  Id: 30,

//  ServiceCode: 65,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 65,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 29,

//  ServiceCode: 5,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 5,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 28,
//  roomNo: "203/ ABC",

//  ServiceCode: 25,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 25,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 16,

//  ServiceCode: 35,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 35,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 1,

//  ServiceCode: 3,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 3,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 3,

//  ServiceCode: 6,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 6,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 4,

//  ServiceCode: 2,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 2,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 12,

//  ServiceCode: 10,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 10,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 22,

//  ServiceCode: 14,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 14,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 44,

//  ServiceCode: 43,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 43,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 42,

//  ServiceCode: 78,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 78,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  {
//  Id: 56,

//  ServiceCode: 98,
//  ServiceName: "Lorem Ipsume Dollor",
//  Quantity: 98,
//  DoctorName: "Lorem Ipsume Dollor",
//  },
//  ],
//  statusCode: 200,

//  count: 5,
// };

// export default function Charges(props) {
//  //use Context
//  const patientVisitId = useContext(VisitContext);
//  console.log("Visit Id is : " + patientVisitId);

//  const defaultValues = {
//  serviceName: null,
//  quantity: "",
//  doctor: null,
//  };
//  const serviceheaders = [
//  // "id",
//  "Service Name",
//  "Quantity",
//  "Doctor Name",
//  ];
//  const checkboxVisible = false; // for table checkbox
//  const [service, setService] = React.useState([]);
//  const [data, setData] = React.useState([]); //use for Service data
//  const [referralemployee, setReferralemployee] = React.useState([]);
//  const [recordWarning, showRecordWarning] = useState(false);
//  const [spinner, showSpinner] = useState(false);
//  const [count, setCount] = React.useState();
//  const [finalData, setFinalData] = React.useState();

//  const [chargesData, setChargesData] = React.useState({ result: [] });
//  // const [dataChargesResult, setDataChargesResult] = useState([]);
//  const [openPost, setOpenPost] = React.useState(false);
//  const handleClosePost = () => {
//  console.log("Post modal is going to close");
//  if (openPost) {
//  setOpenPost(false);
//  }
//  };

//  const [serviceErrorMessage, setServiceErrorMessage] = React.useState("");
//  const [qtyErrorMessage, setQtyErrorMessage] = React.useState("");

//  const handleServiceErrorMesg = () => {
//  let searvicError = getValues("serviceName");
//  if (searvicError === null) {
//  setServiceErrorMessage("Required");
//  } else if (searvicError !== null) {
//  setServiceErrorMessage("");
//  }
//  };
//  const handleQtyErrorMesg = () => {
//  let Qty = getValues("quantity");
//  if (Qty === "") {
//  setQtyErrorMessage("Required");
//  } else if (Qty !== "" && Qty <= 1) {
//  setQtyErrorMessage("");
//  }
//  };

//  const {
//  control,
//  handleSubmit,
//  reset,
//  register,
//  watch,
//  getValues,
//  setValue,
//  formState: { errors },
//  } = useForm({
//  mode: "onChange",
//  defaultValues,
//  });

//  useEffect(() => {
//  //API For Referral employee List
//  getDoctorDropdown()
//  .then((response) => {
//  setReferralemployee(response.data.result);
//  console.log("doctor list is:", response.data.result);
//  })
//  .catch((response) => {
//  console.log(response);
//  });
//  }, []);

//  useEffect(() => {
//  populateTable(patientVisitId);
//  }, [finalData, patientVisitId]);

//  //populate the PainAssemssmetTable using the function populateTable
//  const populateTable = (obj) => {
//  console.log("populateTable has been called");
//  showSpinner(true);
//  showRecordWarning(false);
//  getAllCharges(obj)
//  .then((response) => {
//  console.log(
//  "The search result Charges list is " +
//  JSON.stringify(response.data.result)
//  );
//  setCount(response.data.count);
//  return response.data;
//  })
//  .then((res) => {
//  setChargesData(res);
//  showSpinner(false);
//  })
//  .catch(() => {
//  showSpinner(false);
//  showRecordWarning(true);
//  });
//  };

//  // Handle Change Use For Service api
//  const handleChange = (autoServceSearchString) => {
//  console.log(
//  "The value of service that was typed is " + autoServceSearchString
//  );
//  if (autoServceSearchString !== "") {
//  autoSearchService(autoServceSearchString)
//  .then((response) => response.data)
//  .then((res) => {
//  console.log(
//  "The response of auto-complete / auto-search is " +
//  JSON.stringify(res)
//  );
//  setService(res.result);
//  setServiceErrorMessage("");
//  })
//  .catch((error) => {
//  console.log("Service Error is: ", error);
//  });
//  }
//  };

//  const addServiceData = () => {
//  // ValueObj is (3)[{…}, 1, {…}]
//  // const valueObj = [
//  //[0] Position in the array : {
//  // "id": 41,
//  // "quantity": 1,
//  // "value": 41,
//  // "label": "FOLLOW UP CHARGES"
//  // },
//  // [1] Position in the array :
//  // 1,
//  // [2] Position in the array : {
//  // "value": 21,
//  // "label": "Jayant Pawar|E0007",
//  // "id": 21
//  // }
//  // ]

//  let valueObj = getValues(["serviceName", "quantity", "doctor"]);
//  console.log("ValueObj Qty is", valueObj[1]);
//  console.log("ValueObj is", valueObj);

//  if (valueObj[0] !== null && valueObj[1] !== "" && valueObj[2] !== null) {
//  let obj = valueObj[0];
//  let requiredObj = {};
//  requiredObj["id"] = obj.id;
//  requiredObj["Service Name"] = obj.label;
//  requiredObj["Quantity"] = valueObj[1];
//  requiredObj["Doctor Name"] = valueObj[2].label;
//  let arr = [...data];
//  arr.push(requiredObj);
//  setData(arr);
//  console.log("Array IS: ", arr);
//  }
//  };

//  //We select service quantity value bedefault set 1
//  let services = watch("serviceName");
//  useEffect(() => {
//  if (services !== null) {
//  setValue("quantity", 1);
//  setQtyErrorMessage("");
//  } else if (services === null) {
//  setValue("quantity", "");
//  setQtyErrorMessage("");
//  }
//  }, [services]);

//  function postCharges(obj) {
//  console.log("Record having id ");
//  addNewCharges(obj)
//  .then((response) => {
//  console.log(
//  "POSTED OBJ of Pain Score assessment IS ",
//  JSON.stringify(response)
//  );
//  console.log(JSON.stringify(response));
//  if (response.data.statusCode === 200) {
//  successAlert(response.data.message);
//  populateTable(patientVisitId);
//  }
//  })
//  .catch((error) => {
//  errorAlert(error.message);
//  console.log("error msg" + error.message);
//  });
//  }

//  function addRecord() {
//  console.log("A new record has been added");
//  console.log("The value of openPost flag is ", openPost);
//  setOpenPost(false);
//  postCharges(finalData);
//  }

//  // {id: '', genderCode: 'test01', genderName: 'test', active: true}

//  const onSubmitDataHandler = (data) => {
//  console.log(" charges Data is", data);

//  if (patientVisitId !== null) {
//  // let chargesPostObj = [
//  // {
//  // doctor: {
//  // _id: data.doctor.id,
//  // },
//  // id: data.id,
//  // quantity: data.quantity,
//  // serviceName: data.serviceName,
//  // visitId: patientVisitId,
//  // },
//  // ];
//  setFinalData(chargesPostObj);

//  setOpenPost(true);
//  }

//  // [
//  // "doctor": {
//  // "_id": 0,
//  // },
//  // "id": null,
//  // "quantity": 0,
//  // "serviceName": "string",
//  // "visitId": 1122
//  // ]
//  };

//  return (
//  <>
//  <form onSubmit={handleSubmit(onSubmitDataHandler)}>
//  <div>
//  {spinner ? (
//  <div className="grid justify-center">
//  <LoadingSpinner />
//  </div>
//  ) : null}
//  {chargesData.hasOwnProperty("result") &&
//  chargesData.result.length > 0 &&
//  chargesData.statusCode === 200 &&
//  spinner === false ? (
//  <ChargesTable chargesData={chargesData} />
//  ) : null}
//  {recordWarning === true &&
//  spinner === false &&
//  data.statusCode !== 200 ? (
//  <div className="flex justify-center">
//  <h3 className="flex justify-center mt-20 font-bold text-gray-600">
//  No Records Found...
//  </h3>
//  </div>
//  ) : null}
//  <div className="flex space-x-3 w-full">
//  <div className="w-full">
//  <SearchDropdown
//  control={control}
//  name="serviceName"
//  placeholder="Search by Service"
//  label="Search by Services"
//  searchIcon={true}
//  isSearchable={true}
//  isClearable={false}
//  error={errors.serviceName}
//  dataArray={service}
//  handleInputChange={handleChange}
//  />
//  <p className="text-customRed text-sm">{serviceErrorMessage}</p>
//  </div>
//  <div className="flex space-x-3 w-full">
//  <div className="w-40">
//  <InputField
//  name="quantity"
//  type="number"
//  error={errors.quantity}
//  variant="outlined"
//  label="Qty"
//  control={control}
//  />
//  <p className="text-customRed text-sm">{qtyErrorMessage}</p>
//  </div>

//  <div className="w-full">
//  {/* <ReactSelect placeholder="Floor*" /> */}
//  <DropdownField
//  control={control}
//  error={errors.doctor}
//  name="doctor"
//  placeholder="Doctor"
//  dataArray={referralemployee}
//  // searchIcon={true}
//  isSearchable={false}
//  // isClearable={false}
//  />
//  </div>

//  <AddTypeButton
//  onClick={() => {
//  addServiceData();
//  handleServiceErrorMesg(), handleQtyErrorMesg();
//  // reset(defaultValues);
//  }}
//  />
//  </div>
//  </div>
//  <div>
//  <CommonSelectableServiceTable
//  serviceheaders={serviceheaders}
//  data={data}
//  setData={setData}
//  checkboxVisible={checkboxVisible}
//  />
//  </div>
//  <div className="flex justify-end space-x-3 items-center">
//  <Button variant="outlined" color="error">
//  Reset
//  </Button>
//  <SaveButton />
//  </div>
//  </div>
//  </form>
//  <ConfirmationModal
//  confirmationOpen={openPost}
//  confirmationHandleClose={handleClosePost}
//  confirmationSubmitFunc={addRecord}
//  confirmationLabel="Confirmation"
//  confirmationMsg="Are you sure want to add this record ?"
//  confirmationButtonMsg="Add"
//  />
//  </>
//  );
// }











// import React, { useContext, useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import SearchBar from "../../../../Common Components/FormFields/SearchBar";
// import CommonTable from "../../common/CommonTable";
// import { Button, TextField } from "@mui/material";
// import ReactSelect from "react-select";

// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
// import InputField from "../../../../Common Components/FormFields/InputField";
// import DropdownField from "../../../../Common Components/FormFields/DropdownField";
// import {
//   getDoctorDropdown,
//   autoSearchService,
//   getAllCharges,
//   addNewCharges,
// } from "../../services/nursingServices/charges/Charges";
// import { useForm } from "react-hook-form";
// import CommonSelectableServiceTable from "../../../../emergency/common/CommonSelectableServiceTable";
// import AddButton from "../../../../Common Components/Buttons/AddButton";
// import AddTypeButton from "../../../../Common Components/Buttons/AddTypeButton";
// import ChargesServiceTable from "./ChargesTable";
// import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
// import { VisitContext } from "../ClinicalCareChart";
// import ChargesTable from "./ChargesTable";
// import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
// import { successAlert, errorAlert } from "../../../../Common Components/Toasts/CustomToasts";
// import SaveButton from "../../../../Common Components/Buttons/SaveButton";
// const chargesData = {
//   message: "Charges list found ",
//   result: [
//     {
//       Id: 30,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 65,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 65,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 29,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 5,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 5,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 28,
//       roomNo: "203/ ABC",
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 25,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 25,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 16,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 35,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 35,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 1,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 3,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 3,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 3,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 6,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 6,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 4,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 2,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 2,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 12,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 10,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 10,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 22,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 14,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 14,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 44,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 43,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 43,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 42,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 78,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 78,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 56,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 98,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 98,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//   ],
//   statusCode: 200,
//   count: 5,
// };
// const data = {
//   message: "Charges list found ",
//   result: [
//     {
//       Id: 30,

//       ServiceCode: 65,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 65,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 29,

//       ServiceCode: 5,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 5,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 28,
//       roomNo: "203/ ABC",

//       ServiceCode: 25,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 25,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 16,

//       ServiceCode: 35,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 35,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 1,

//       ServiceCode: 3,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 3,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 3,

//       ServiceCode: 6,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 6,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 4,

//       ServiceCode: 2,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 2,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 12,

//       ServiceCode: 10,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 10,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 22,

//       ServiceCode: 14,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 14,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 44,

//       ServiceCode: 43,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 43,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 42,

//       ServiceCode: 78,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 78,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 56,

//       ServiceCode: 98,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 98,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//   ],
//   statusCode: 200,

//   count: 5,
// };

// export default function Charges(props) {
//   //use Context
//   const patientVisitId = useContext(VisitContext);
//   console.log("Visit Id is : " + patientVisitId);


//   const defaultValues = {
//     services: null,
//     quantity: "",
//     doctor: null,
//   };
//   const serviceheaders = [
//     // "id",
//     "Service Name",
//     "Quantity",
//     "Doctor Name",
//   ];
//   const checkboxVisible = false; // for table checkbox
//   const [service, setService] = React.useState([]);
//   const [data, setServiceData] = React.useState([]);
//   const [referralemployee, setReferralemployee] = React.useState([]);
//   const [recordWarning, showRecordWarning] = useState(false);
//   const [spinner, showSpinner] = useState(false);
//   const [count, setCount] = React.useState();
//   const [finalData, setFinalData] = React.useState();

//   const [chargesData, setChargesData] = React.useState({ result: [] });
//   const [serviceErrorMessage, setServiceErrorMessage] = React.useState("");
//  const [qtyErrorMessage, setQtyErrorMessage] = React.useState("");

//   const handleServiceErrorMesg = () => {
//  let searvicError = getValues("serviceName");
//  if (searvicError === null) {
//  setServiceErrorMessage("Required");
//  } else if (searvicError !== null) {
//  setServiceErrorMessage("");
//  }
//  };
//  const handleQtyErrorMesg = () => {
//  let Qty = getValues("quantity");
//  if (Qty === "") {
//  setQtyErrorMessage("Required");
//  } else if (Qty !== "" && Qty <= 1) {
//  setQtyErrorMessage("");
//  }
//  };

//   const [openPost, setOpenPost] = React.useState(false);
//   const handleClosePost = () => {
//     console.log("Post modal is going to close");
//     if (openPost) {
//       setOpenPost(false);
//     }
//   };

//   const {
//     control,
//     handleSubmit,
//     reset,
//     register,
//     watch,
//     getValues,
//     setValue,
//     formState: { errors, isDirty },
//   } = useForm({
//     mode: "onChange",
//     defaultValues,
//   });

//   useEffect(() => {
//     //API For Referral employee List
//     getDoctorDropdown()
//       .then((response) => {
//         setReferralemployee(response.data.result);
//         console.log("doctor list is:", response.data.result);
//       })
//       .catch((response) => {
//         console.log(response);
//       });
//   }, []);

//   useEffect(() => {
//     populateTable(patientVisitId);
//   }, [finalData, patientVisitId]);

//   //populate the PainAssemssmetTable using the function populateTable
//   const populateTable = (obj) => {
//     console.log("populateTable has been called");
//     showSpinner(true);
//     showRecordWarning(false);
//     getAllCharges(obj)
//       .then((response) => {
//         console.log(
//           "The search result Charges list is " +
//             JSON.stringify(response.data.result)
//         );
//         setCount(response.data.count);
//         return response.data;
//       })
//       .then((res) => {
//         setChargesData(res);
//         showSpinner(false);
//       })
//       .catch(() => {
//         showSpinner(false);
//         showRecordWarning(true);
//       });
//   };

//   // Handle Change Use For Service api
//   const handleChange = (autoServceSearchString) => {
//     console.log(
//       "The value of service that was typed is " + autoServceSearchString
//     );
//     if (autoServceSearchString !== "") {
//       autoSearchService(autoServceSearchString)
//         .then((response) => response.data)
//         .then((res) => {
//           console.log(
//             "The response of auto-complete / auto-search is " +
//               JSON.stringify(res)
//           );
//           setService(res.result);
//           setServiceErrorMessage("");
//         })
//         .catch((error) => {
//           console.log("Service Error is: ", error);
//         });
//     }
//   };

//   const addServiceData = () => {
//     let valueObj = getValues(["services", "quantity", "doctor"]);
//     console.log("ValueObj Qty is", valueObj[1]);
//     console.log("ValueObj is", valueObj);
//     if (valueObj[0] !== null && valueObj[1] !== "" && valueObj[2] !== null) {
//       let obj = valueObj[0];
//       let requiredObj = {};
//       requiredObj["id"] = obj.id;
//       requiredObj["Service Name"] = obj.label;
//       requiredObj["Quantity"] = valueObj[1];
//       requiredObj["Doctor Name"] = valueObj[2].label;
//       let arr = [...data];
//       arr.push(requiredObj);
//       setServiceData(arr);
//     }
//   };

//   //We select service quantity value bedefault set 1
//   let services = watch("services");
//   useEffect(() => {
//     if (services !== null) {
//       setValue("quantity", 1);
//       // setQtyErrorMessage("");
//     } else if (services === null) {
//       setValue("quantity", "");
//       // setQtyErrorMessage("");
//     }
//   }, [services]);

//   function postCharges(obj) {
//     console.log("Record having id ");
//     addNewCharges(obj)
//       .then((response) => {
//         console.log(
//           "POSTED OBJ of Pain Score assessment  IS ",
//           JSON.stringify(response)
//         );
//         console.log(JSON.stringify(response));
//         if (response.data.statusCode === 200) {
//           successAlert(response.data.message);
//           populateTable(patientVisitId);
//         }
//       })
//       .catch((error) => {
//         errorAlert(error.message);
//         console.log("error msg" + error.message);
//       });
//   }

//   function addRecord() {
//     console.log("A new record has been added");
//     console.log("The value of openPost flag is ", openPost);
//     setOpenPost(false);
//     postCharges(finalData);
//   }

//   // {id: '', genderCode: 'test01', genderName: 'test', active: true}

//   const onSubmitDataHandler = (data) => {
//     console.log(" charges Data is", data);

//     if (patientVisitId !== null) {
//       let chargesPostObj = [
//         {
        
//           doctor:{ 
//             _id: data.doctor.id
//           },  
//         id: data.id,
//         quantity: data.quantity,
//         serviceName: data.serviceName,
//         visitId: patientVisitId,
//       }
//       ];
//       setFinalData(chargesPostObj);

//       setOpenPost(true);
//     }

//     //   [
//     //     "doctor": {
//     //       "_id": 0,
//     //     },
//     //     "id": null,
//     //     "quantity": 0,
//     //     "serviceName": "string",
//     //     "visitId": 1122
//     // ]
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmitDataHandler)}>
//         <div>
//           {spinner ? (
//             <div className="grid justify-center">
//               <LoadingSpinner />
//             </div>
//           ) : null}
//           {chargesData.hasOwnProperty("result") &&
//           chargesData.result.length > 0 &&
//           chargesData.statusCode === 200 &&
//           spinner === false ? (
//             <ChargesTable chargesData={chargesData} />
//           ) : null}
//           {recordWarning === true &&
//           spinner === false &&
//           data.statusCode !== 200 ? (
//             <div className="flex justify-center">
//               <h3 className="flex justify-center mt-20 font-bold text-gray-600">
//                 No Records Found...
//               </h3>
//             </div>
//           ) : null}
//           <div className="flex space-x-3 w-full">
//             <div className="w-full">
//               <SearchDropdown
//                 control={control}
//                 name="services"
//                 placeholder="Search by Service"
//                 label="Search by Services"
//                 searchIcon={true}
//                 isSearchable={true}
//                 isClearable={false}
//                 error={errors.services}
//                 dataArray={service}
//                 handleInputChange={handleChange}
//               />
//                 <p className="text-customRed text-sm">{serviceErrorMessage}</p>
//             </div>
//             <div className="flex space-x-3 w-full">
//               <div className="w-40">
//                 <InputField
//                   name="quantity"
//                   type="number"
//                   error= {errors.quantity}
//                   variant="outlined"
//                   label="Qty"
//                   control={control}
//                 />
//                  <p className="text-customRed text-sm">
//                         {qtyErrorMessage}
//                       </p>
//               </div>

//               <div className="w-full">
//                 {/* <ReactSelect placeholder="Floor*" /> */}
//                 <DropdownField
//                   control={control}
//                   error={errors.doctor}
//                   name="doctor"
//                   placeholder="Doctor"
//                   dataArray={referralemployee}
//                   // searchIcon={true}
//                   isSearchable={false}
//                   // isClearable={false}
//                 />
//               </div>

//               <AddTypeButton
//                 onClick={() => {
//                   addServiceData();
//                   handleServiceErrorMesg(),
//                   handleQtyErrorMesg()
//                   // reset(defaultValues);
//                 }}
//               />
//             </div>
//           </div>
//           <div>
//             <CommonSelectableServiceTable
//               serviceheaders={serviceheaders}
//               data={data}
//               setServiceData={setServiceData}
//               checkboxVisible={checkboxVisible}
//             />
//           </div>
//           <div className="flex justify-end space-x-3 items-center">
//             <Button variant="outlined" color="error">
//               Reset
//             </Button>
//             <SaveButton />
//           </div>
//         </div>
//       </form>
//       <ConfirmationModal
//         confirmationOpen={openPost}
//         confirmationHandleClose={handleClosePost}
//         confirmationSubmitFunc={addRecord}
//         confirmationLabel="Confirmation"
//         confirmationMsg="Are you sure want to add this record ?"
//         confirmationButtonMsg="Add"
//       />
//     </>
//   );
// }




// import React, { useContext, useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import SearchBar from "../../../../Common Components/FormFields/SearchBar";
// import CommonTable from "../../common/CommonTable";
// import { Button, TextField } from "@mui/material";
// import ReactSelect from "react-select";

// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
// import InputField from "../../../../Common Components/FormFields/InputField";
// import DropdownField from "../../../../Common Components/FormFields/DropdownField";
// import {
//   getDoctorDropdown,
//   autoSearchService,
//   getAllCharges,
//   addNewCharges,
// } from "../../services/nursingServices/charges/Charges";
// import { useForm } from "react-hook-form";
// import CommonSelectableServiceTable from "../../../../emergency/common/CommonSelectableServiceTable";
// import AddButton from "../../../../Common Components/Buttons/AddButton";
// import AddTypeButton from "../../../../Common Components/Buttons/AddTypeButton";
// import ChargesServiceTable from "./ChargesTable";
// import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
// import { VisitContext } from "../ClinicalCareChart";
// import ChargesTable from "./ChargesTable";
// import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
// import {
//   successAlert,
//   errorAlert,
// } from "../../../../Common Components/Toasts/CustomToasts";
// import SaveButton from "../../../../Common Components/Buttons/SaveButton";
// const chargesData = {
//   message: "Charges list found ",
//   result: [
//     {
//       Id: 30,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 65,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 65,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 29,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 5,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 5,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 28,
//       roomNo: "203/ ABC",
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 25,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 25,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 16,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 35,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 35,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 1,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 3,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 3,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 3,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 6,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 6,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 4,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 2,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 2,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 12,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 10,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 10,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 22,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 14,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 14,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 44,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 43,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 43,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 42,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 78,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 78,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 56,
//       DateAndTime: "01/02/2022,11:30Am",
//       ServiceCode: 98,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 98,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//   ],
//   statusCode: 200,
//   count: 5,
// };
// const data = {
//   message: "Charges list found ",
//   result: [
//     {
//       Id: 30,

//       ServiceCode: 65,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 65,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 29,

//       ServiceCode: 5,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 5,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 28,
//       roomNo: "203/ ABC",

//       ServiceCode: 25,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 25,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 16,

//       ServiceCode: 35,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 35,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 1,

//       ServiceCode: 3,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 3,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 3,

//       ServiceCode: 6,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 6,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 4,

//       ServiceCode: 2,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 2,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 12,

//       ServiceCode: 10,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 10,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 22,

//       ServiceCode: 14,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 14,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 44,

//       ServiceCode: 43,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 43,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 42,

//       ServiceCode: 78,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 78,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//     {
//       Id: 56,

//       ServiceCode: 98,
//       ServiceName: "Lorem Ipsume Dollor",
//       Quantity: 98,
//       DoctorName: "Lorem Ipsume Dollor",
//     },
//   ],
//   statusCode: 200,

//   count: 5,
// };

// export default function Charges(props) {
//   //use Context
//   const patientVisitId = useContext(VisitContext);
//   console.log("Visit Id is : " + patientVisitId);

//   // const schema = yup.object().shape({
//   //   serviceName: yup
//   //   .object()
//   //   .nullable()
//   //   .shape({
//   //     value: yup.string().required("Required"),
//   //     label: yup.string().required("Required"),
//   //   })
//   //   .required("Required"),
//   //   quantity: yup
//   //     .string()
//   //     .required("Required")
//   //     // .min(1, "Add Quantity")
//   //     .matches(/^[0-9]+$/, "Only digits are allow"),
//   //   doctor: yup
//   //   .object()
//   //   .nullable()
//   //   .shape({
//   //     value: yup.string().required("Required"),
//   //     label: yup.string().required("Required"),
//   //   })
//   //   .required("Required"),
//   // });

//   const defaultValues = {
//     serviceName: null,
//     quantity: "",
//     doctor: null,
//   };
//   const serviceheaders = [
//     // "id",
//     "Service Name",
//     "Quantity",
//     "Doctor Name",
//   ];
//   const checkboxVisible = false; // for table checkbox
//   const [service, setService] = React.useState([]);
//   const [data, setData] = React.useState([]); //use for Service data
//   const [referralemployee, setReferralemployee] = React.useState([]);
//   const [recordWarning, showRecordWarning] = useState(false);
//   const [spinner, showSpinner] = useState(false);
//   const [count, setCount] = React.useState();
//   const [finalData, setFinalData] = React.useState();

//   const [chargesData, setChargesData] = React.useState({ result: [] });
//   // const [dataChargesResult, setDataChargesResult] = useState([]);
//   const [openPost, setOpenPost] = React.useState(false);
//   const handleClosePost = () => {
//     console.log("Post modal is going to close");
//     if (openPost) {
//       setOpenPost(false);
//     }
//   };

//   const {
//     control,
//     handleSubmit,
//     reset,
//     register,
//     watch,
//     getValues,
//     setValue,
//     formState: { errors, isDirty },
//   } = useForm({
//     mode: "onChange",
//     // resolver: yupResolver(schema),
//     defaultValues,
//   });

//   useEffect(() => {
//     //API For Referral employee List
//     getDoctorDropdown()
//       .then((response) => {
//         setReferralemployee(response.data.result);
//         console.log("doctor list is:", response.data.result);
//       })
//       .catch((response) => {
//         console.log(response);
//       });
//   }, []);

//   useEffect(() => {
//     populateTable(patientVisitId);
//     // postCharges(finalData);
//   }, [finalData, patientVisitId]);

//   //populate the PainAssemssmetTable using the function populateTable
//   const populateTable = (obj) => {
//     console.log("populateTable has been called");
//     showSpinner(true);
//     showRecordWarning(false);
//     getAllCharges(obj)
//       .then((response) => {
//         console.log(
//           "The search result Charges list is " +
//             JSON.stringify(response.data.result)
//         );
//         setCount(response.data.count);
//         return response.data;
//       })
//       .then((res) => {
//         setChargesData(res);
//         showSpinner(false);
//       })
//       .catch(() => {
//         showSpinner(false);
//         showRecordWarning(true);
//       });
//   };

//   // Handle Change Use For Service api
//   const handleChange = (autoServceSearchString) => {
//     console.log(
//       "The value of service that was typed is " + autoServceSearchString
//     );
//     if (autoServceSearchString !== "") {
//       autoSearchService(autoServceSearchString)
//         .then((response) => response.data)
//         .then((res) => {
//           console.log(
//             "The response of auto-complete / auto-search is " +
//               JSON.stringify(res)
//           );
//           setService(res.result);
//           // setServiceErrorMessage("");
//         })
//         .catch((error) => {
//           console.log("Service Error is: ", error);
//         });
//     }
//   };
  // let requiredArr = [];
//   const addServiceData = () => {
    // let serviceName = getValues("serviceName");
    // let quantity = getValues("quantity");
    // let doctor = getValues("doctor");
    // {
    //   "doctor": {
    //     "_id": 0,
    //   },
    //   "id": "string",
    //   "quantity": 0,
    //   "serviceName": "string",
    //   "visitId": 0
    // }

    // let requiredObj = {
    //   doctor: {
    //     _id: doctor.id,
    //   },
    //   quantity: quantity,
    //   serviceName: serviceName.label,
    //   visitId: patientVisitId,
    // };
    // console.log("serviceName is ", serviceName);
    // console.log("quantity is ", quantity);
    // console.log("doctor", doctor);

    // requiredArr.push(requiredObj);

    // console.log("requiredArr is ", requiredArr);

    // setFinalData(requiredArr)

    // setData(requiredArr);


//     let valueObj = getValues(["serviceName", "quantity", "doctor"]);
//     console.log("ValueObj Qty is", valueObj[1]);
//     console.log("ValueObj is", valueObj);
//     if (valueObj[0] !== null && valueObj[1] !== "" && valueObj[2] !== null) {
//       let obj = valueObj[0];
//       let requiredObj = {};
//       requiredObj["id"] = obj.id;
//       requiredObj["Service Name"] = obj.label;
//       requiredObj["Quantity"] = valueObj[1];
//       requiredObj["Doctor Name"] = valueObj[2].label;
//       let arr = [...data];
//       arr.push(requiredObj);
//       setData(arr);
//     }
//   };


//   //We select service quantity value bedefault set 1
//   let services = watch("serviceName");
//   useEffect(() => {
//     if (services !== null) {
//       setValue("quantity", 1);
//       // setQtyErrorMessage("");
//     } else if (services === null) {
//       setValue("quantity", "");
//       // setQtyErrorMessage("");
//     }
//   }, [services]);

//   function postCharges(obj) {
//     console.log("Record having id ");
//     addNewCharges(obj)
//       .then((response) => {
//         console.log(
//           "POSTED OBJ of Pain Score assessment  IS ",
//           JSON.stringify(response)
//         );
//         console.log(JSON.stringify(response));
//         if (response.data.statusCode === 200) {
//           successAlert(response.data.message);
//           populateTable(patientVisitId);
//         }
//       })
//       .catch((error) => {
//         errorAlert(error.message);
//         console.log("error msg" + error.message);
//       });
//   }

//   function addRecord() {
//     console.log("A new record has been added");
//     console.log("The value of openPost flag is ", openPost);
//     setOpenPost(false);
//     postCharges(finalData);
//   }

//   // {id: '', genderCode: 'test01', genderName: 'test', active: true}
//   const onSubmitDataHandler = () => {
//     console.log(" charges Data is", data);
//     // let requiredArr = [];

//     // let serviceName = getValues("serviceName");
//     // let quantity = getValues("quantity");
//     // let doctor = getValues("doctor");

//     if (patientVisitId !== null) {
//       let chargesPostObj = [
//                 {
//                   doctor:{ 
//                     _id: data.doctor.id
//                   },  
//                 id: data.id,
//                 quantity: data.quantity,
//                 serviceName: data.serviceName,
//                 visitId: patientVisitId,
//               }
//               ];
//               setFinalData(chargesPostObj);
        
//               setOpenPost(true);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmitDataHandler)}>
//         <div>
//           {spinner ? (
//             <div className="grid justify-center">
//               <LoadingSpinner />
//             </div>
//           ) : null}
//           {chargesData.hasOwnProperty("result") &&
//           chargesData.result.length > 0 &&
//           chargesData.statusCode === 200 &&
//           spinner === false ? (
//             <ChargesTable chargesData={chargesData} />
//           ) : null}
//           {recordWarning === true &&
//           spinner === false &&
//           data.statusCode !== 200 ? (
//             <div className="flex justify-center">
//               <h3 className="flex justify-center mt-20 font-bold text-gray-600">
//                 No Records Found...
//               </h3>
//             </div>
//           ) : null}
//           <div className="flex space-x-3 w-full">
//             <div className="w-full">
//               <SearchDropdown
//                 control={control}
//                 name="serviceName"
//                 placeholder="Search by Service"
//                 label="Search by Services"
//                 searchIcon={true}
//                 isSearchable={true}
//                 isClearable={false}
//                 error={errors.serviceName}
//                 dataArray={service}
//                 handleInputChange={handleChange}
//               />
//             </div>
//             <div className="flex space-x-3 w-full">
//               <div className="w-40">
//                 <InputField
//                   name="quantity"
//                   type="number"
//                   error={errors.quantity}
//                   variant="outlined"
//                   label="Qty"
//                   control={control}
//                 />
//                 {/* <p className="text-customRed text-sm">
//                         {qtyErrorMessage}
//                       </p> */}
//               </div>

//               <div className="w-full">
//                 {/* <ReactSelect placeholder="Floor*" /> */}
//                 <DropdownField
//                   control={control}
//                   error={errors.doctor}
//                   name="doctor"
//                   placeholder="Doctor"
//                   dataArray={referralemployee}
//                   // searchIcon={true}
//                   isSearchable={false}
//                   // isClearable={false}
//                 />
//               </div>

//               <AddTypeButton
//                 onClick={() => {
//                   addServiceData();
//                   // handleServiceErrorMesg(),
//                   // handleQtyErrorMesg(),
//                   reset(defaultValues);
//                 }}
//               />
//             </div>
//           </div>
//           <div>
//             <CommonSelectableServiceTable
//               serviceheaders={serviceheaders}
//               data={data}
//               setData={setData}
//               checkboxVisible={checkboxVisible}
//             />
//           </div>
//           <div className="flex justify-end space-x-3 items-center">
//             <Button variant="outlined" color="error">
//               Reset
//             </Button>
//             <SaveButton />
//           </div>
//         </div>
//       </form>
//       <ConfirmationModal
//         confirmationOpen={openPost}
//         confirmationHandleClose={handleClosePost}
//         confirmationSubmitFunc={addRecord}
//         confirmationLabel="Confirmation"
//         confirmationMsg="Are you sure want to add this record ?"
//         confirmationButtonMsg="Add"
//       />
//     </>
//   );
// }


//succsion n saturation
import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import CommonTable from "../../common/CommonTable";
import { getAllSuctionSaturation } from "../../services/nursingServices/SuctionSaturationService/SuctionSaturationService";
import { VisitContext } from "../ClinicalCareChart";

function SuccionSaturation() {
  // Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);

  const [spinner, showSpinner] = useState(false);
  //state variable for showing or not showing "No Recrods Found" message
  const [recordWarning, showRecordWarning] = useState(false); // record error and sucess warnings
  const [
    succionSaturationDataResult,
    setSuccionSaturationDataResult,
  ] = useState([]); // populate table data

  useEffect(() => {
    PopulateTable(patientVisitId);
  }, [patientVisitId]);
  //populate the CommonTable using the function inputPopulateTable
  const PopulateTable = (obj) => {
    console.log("populateTable has been called");
    showSpinner(true);
    console.log("obj is", obj);
    showRecordWarning(false);
    getAllSuctionSaturation(obj)
      .then((response) => {
        console.log(
          "The search result is " + JSON.stringify(response.data.result)
        );
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setSuccionSaturationDataResult(res);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };
  return (
    <div>
      {spinner ? (
        <div className="grid justify-center">
          <LoadingSpinner />
        </div>
      ) : null}
      {succionSaturationDataResult.hasOwnProperty("result") &&
      succionSaturationDataResult.result.length > 0 &&
      succionSaturationDataResult.statusCode === 200 &&
      spinner === false ? (
        <CommonTable data={succionSaturationDataResult} />
      ) : null}
      {recordWarning === true && spinner === false ? (
        <div className="flex justify-center items-center">
          <h3 className="flex justify-center mt-20 font-bold text-gray-600">
            No Records Found...
          </h3>
        </div>
      ) : null}
    </div> 
  );
}

export default SuccionSaturation;





// Care N Position
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CancelPresentationIconButton from "../../../../../Common Components/Buttons/CancelPresentationIconButton";
import CheckBoxField from "../../../../../Common Components/FormFields/CheckBoxField";
import { VisitContext } from "../../ClinicalCareChart";
import { Style } from "../../../../components/bedallowcation/Style";
// Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllCareNPosition , addNewcareNPosition } from "../../../services/nursingServices/carenposition/CareNPositionServices";
import LoadingSpinner from "../../../../../Common Components/loadingspinner/loadingSpinner";
import CareNPositionTable from "./CareNPositionTable";
import SaveButton from "../../../../../Common Components/Buttons/SaveButton";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import {
  errorAlert,
  successAlert,
} from "../../../../../Common Components/Toasts/CustomToasts";

export default function CareNPosition(props) {
  // Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);
  const [count, setCount] = React.useState();
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [spinner, showSpinner] = React.useState(false);
  const [finalData, setFinalData] = React.useState();
  const [openPost, setOpenPost] = React.useState(false);
  const [careNPositionResult, setCareNPositionResult] = React.useState([]);
  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };
  const defaultValues = {
    eyeCare: false,
    mouthCare: false,
    backCare: false,
    foleysCathater: false,
    s: false,
    l: false,
    r: false,
    p: false,
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    populateCareNPositionTable(patientVisitId);
  }, [finalData, patientVisitId]);

  const populateCareNPositionTable = (obj) => {
    console.log("PopulateTable Has been called!!");
    showSpinner(true);
    showRecordWarning(false);
    getAllCareNPosition(obj)
      .then((response) => {
        console.log("getAllCareNPosition data is", getAllCareNPosition);
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("care n position res.result", res.result);
        setCareNPositionResult(res);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };
  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    postCareNPosition(finalData);
  }
  function postCareNPosition(obj) {
    console.log("The record having id " + obj + " is going to be deleted");
    addNewcareNPosition(obj)
    .then((response) => {
      console.log( "Posted OBJ of Care N Position IS ",
      JSON.stringify(response));
      console.log(JSON.stringify(response));
      if (response.data.statusCode === 200) {
        successAlert(response.data.message);
        populateCareNPositionTable(patientVisitId);
      }
    })
    .catch((error) => {
      errorAlert(error.message);
      console.log("error msg" + error.message);
    })
  }
  const onSubmitDataHandler = (postdata) => {
    console.log("care n position data is: ", postdata);
    if (patientVisitId !== null) {
    let carePositionPostObj = {
      backCare: postdata.backCare,
      eyeCare: postdata.eyeCare,
      foleysCatheter: postdata.foleysCathater,
      leftPosition: postdata.leftPosition,
      mouthCare: postdata.mouthCare,
      pronePosition: postdata.pronePosition,
      rightPosition: postdata.rightPosition,
      supinePosition: postdata.supinePosition,
      visitId: patientVisitId,
    };
    console.log("Care n Position Post Obj is :" ,carePositionPostObj );
        setOpenPost(true);
      setFinalData(carePositionPostObj);
    }
  };

 
  return (
    <div className=" backdrop-blur-0">
      <Modal
        open={props.open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style} className="w-[90%] h-[85%] xl:h-[75%] px-4 pb-2">
          <form
            className="grid grid-cols-1 w-full gap-x-2"
            onSubmit={handleSubmit(onSubmitDataHandler)}
          >
            <div className="sticky top-0 bg-white z-50 w-full">
              <div className="flex justify-between items-center w-full py-2">
                <div className="w-full font-semibold text-xl mt-1">
                  Care And Position
                </div>
                <CancelPresentationIconButton
                  onClick={() => {
                    props.handleClose();
                  }}
                />
              </div>
              <div className="bg-gray-100 px-2 rounded-md  border border-gray-300 mt-2">
                <div className="grid grid-cols-2 lg:grid-cols-3 text-gray-500  text-sm items-center gap-1 w-full py-3">
                  {/* Patient Name */}
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-1">
                      <span className="whitespace-nowrap">Patient Name </span>
                      <span className=""> :</span>
                    </h1>
                    <h1 className="text-black font-normal">
                      Venkata Narasimha Rajuvaripet
                    </h1>
                  </div>
                  {/* UHID */}
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-16 lg:space-x-9">
                      <span>UHID</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">124584 </h1>
                  </div>
                  {/* Age */}
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-16 lg:space-x-6 xl:space-x-10">
                      <span>Age</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">
                      23 Year 02 Months 04 Days.
                    </h1>
                  </div>
                  {/* Gender */}
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-12">
                      <span>Gender</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">Male </h1>
                  </div>
                  {/* Bed Category */}
                  <div className="flex gap-2 ">
                    <h1 className="text-black font-semibold flex space-x-12 lg:space-x-6">
                      <span>BedNo</span>
                      <span className="">:</span>
                    </h1>
                    <h1 className="text-black font-normal">9857 </h1>
                  </div>
                </div>
              </div>

              {spinner ? (
                <div className="grid justify-center">
                  <LoadingSpinner />
                </div>
              ) : null}
              {careNPositionResult.hasOwnProperty("result") &&
              careNPositionResult.result.length > 0 &&
              careNPositionResult.statusCode === 200 &&
              spinner === false ? (
                <CareNPositionTable data={careNPositionResult} />
              ) : null}
              {recordWarning === true && spinner === false ? (
                <div className="flex justify-center items-center">
                  <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                    No Records Found...
                  </h3>
                </div>
              ) : null}

              <div className="grid md:grid-cols-1 xl:grid-cols-2 items-center gap-x-2 ">
                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-black"> Care : </p>
                  <CheckBoxField
                    control={control}
                    name="eyeCare"
                    label="Eye Care"
                  />
                  <CheckBoxField
                    control={control}
                    name="mouthCare"
                    label="Mouth Care"
                  />
                  <CheckBoxField
                    control={control}
                    name="backCare"
                    label="Back Care"
                  />
                  <CheckBoxField
                    control={control}
                    name="foleysCathater"
                    label="Foleys Cathater"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-black"> Position : </p>
                  <CheckBoxField control={control} name="s" label="S" />
                  <CheckBoxField control={control} name="l" label="L" />
                  <CheckBoxField control={control} name="r" label="R" />
                  <CheckBoxField control={control} name="p" label="P" />
                  <SaveButton />
                </div>
              </div>
            </div>
          </form>

          <ConfirmationModal
        confirmationOpen={openPost}
        confirmationHandleClose={handleClosePost}
        confirmationSubmitFunc={addRecord}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure want to add this record ?"
        confirmationButtonMsg="Add"
      />

        </Box>
      </Modal>
    </div>
  );
}
