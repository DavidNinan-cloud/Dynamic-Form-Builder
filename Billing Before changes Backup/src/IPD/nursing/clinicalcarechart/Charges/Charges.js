import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import CommonTable from "../../common/CommonTable";
import { Button, TextField } from "@mui/material";
import ReactSelect from "react-select";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
import InputField from "../../../../Common Components/FormFields/InputField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import {
  getDoctorDropdown,
  autoSearchService,
  getAllCharges,
  addNewCharges,
} from "../../services/nursingServices/charges/Charges";
import { useForm } from "react-hook-form";
import CommonSelectableServiceTable from "../../../../emergency/common/CommonSelectableServiceTable";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import AddTypeButton from "../../../../Common Components/Buttons/AddTypeButton";
import ChargesServiceTable from "./ChargesTable";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import { VisitContext } from "../ClinicalCareChart";
import ChargesTable from "./ChargesTable";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import {
  successAlert,
  errorAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";
const chargesData = {
  message: "Charges list found ",
  result: [
    {
      Id: 30,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 65,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 65,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 29,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 5,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 5,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 28,
      roomNo: "203/ ABC",
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 25,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 25,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 16,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 35,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 35,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 1,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 3,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 3,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 3,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 6,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 6,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 4,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 2,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 2,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 12,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 10,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 10,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 22,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 14,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 14,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 44,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 43,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 43,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 42,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 78,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 78,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 56,
      DateAndTime: "01/02/2022,11:30Am",
      ServiceCode: 98,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 98,
      DoctorName: "Lorem Ipsume Dollor",
    },
  ],
  statusCode: 200,
  count: 5,
};
const data = {
  message: "Charges list found ",
  result: [
    {
      Id: 30,

      ServiceCode: 65,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 65,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 29,

      ServiceCode: 5,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 5,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 28,
      roomNo: "203/ ABC",

      ServiceCode: 25,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 25,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 16,

      ServiceCode: 35,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 35,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 1,

      ServiceCode: 3,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 3,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 3,

      ServiceCode: 6,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 6,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 4,

      ServiceCode: 2,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 2,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 12,

      ServiceCode: 10,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 10,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 22,

      ServiceCode: 14,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 14,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 44,

      ServiceCode: 43,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 43,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 42,

      ServiceCode: 78,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 78,
      DoctorName: "Lorem Ipsume Dollor",
    },
    {
      Id: 56,

      ServiceCode: 98,
      ServiceName: "Lorem Ipsume Dollor",
      Quantity: 98,
      DoctorName: "Lorem Ipsume Dollor",
    },
  ],
  statusCode: 200,

  count: 5,
};

export default function Charges(props) {
  //use Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id is : " + patientVisitId);

  // const schema = yup.object().shape({
  //   serviceName: yup
  //   .object()
  //   .nullable()
  //   .shape({
  //     value: yup.string().required("Required"),
  //     label: yup.string().required("Required"),
  //   })
  //   .required("Required"),
  //   quantity: yup
  //     .string()
  //     .required("Required")
  //     // .min(1, "Add Quantity")
  //     .matches(/^[0-9]+$/, "Only digits are allow"),
  //   doctor: yup
  //   .object()
  //   .nullable()
  //   .shape({
  //     value: yup.string().required("Required"),
  //     label: yup.string().required("Required"),
  //   })
  //   .required("Required"),
  // });

  const defaultValues = {
    serviceName: null,
    quantity: "",
    doctor: null,
  };
  const serviceheaders = [
    // "id",
    "Service Name",
    "Quantity",
    "Doctor Name",
  ];
  const checkboxVisible = false; // for table checkbox
  const [service, setService] = React.useState([]);
  const [data, setData] = React.useState([]); //use for Service data
  const [referralemployee, setReferralemployee] = React.useState([]);
  const [recordWarning, showRecordWarning] = useState(false);
  const [spinner, showSpinner] = useState(false);
  const [count, setCount] = React.useState();
  const [finalData, setFinalData] = React.useState();

  const [chargesData, setChargesData] = React.useState({ result: [] });
  // const [dataChargesResult, setDataChargesResult] = useState([]);
  const [openPost, setOpenPost] = React.useState(false);
  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    //API For Referral employee List
    getDoctorDropdown()
      .then((response) => {
        setReferralemployee(response.data.result);
        console.log("doctor list is:", response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  useEffect(() => {
    populateTable(patientVisitId);
    postCharges(finalData);
  }, [finalData, patientVisitId]);

  //populate the PainAssemssmetTable using the function populateTable
  const populateTable = (obj) => {
    console.log("populateTable has been called");
    showSpinner(true);
    showRecordWarning(false);
    getAllCharges(obj)
      .then((response) => {
        console.log(
          "The search result Charges list is " +
            JSON.stringify(response.data.result)
        );
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        setChargesData(res);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  // Handle Change Use For Service api
  const handleChange = (autoServceSearchString) => {
    console.log(
      "The value of service that was typed is " + autoServceSearchString
    );
    if (autoServceSearchString !== "") {
      autoSearchService(autoServceSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setService(res.result);
          // setServiceErrorMessage("");
        })
        .catch((error) => {
          console.log("Service Error is: ", error);
        });
    }
  };
  let requiredArr = [];
  const addServiceData = () => {
    let serviceName = getValues("serviceName");
    let quantity = getValues("quantity");
    let doctor = getValues("doctor");

    // serviceName is  {quantity: 1, id: 72, value: 72, label: 'Routine checkup'}

    // doctor is {label: 'Aishwarya Gaikwad|E00015', id: 35, value: 35}

    // quantity

    // {
    //   "doctor": {
    //     "_id": 0,
    //   },
    //   "id": "string",
    //   "quantity": 0,
    //   "serviceName": "string",
    //   "visitId": 0
    // }

    let requiredObj = {
      doctor: {
        _id: doctor.id,
      },
      quantity: quantity,
      serviceName: serviceName.label,
      visitId: patientVisitId,
    };

    console.log("serviceName is ", serviceName);
    console.log("quantity is ", quantity);
    console.log("doctor", doctor);

    requiredArr.push(requiredObj);

    console.log("requiredArr is ", requiredArr);

    setFinalData(requiredArr)

    // setData(requiredArr);
  };

  //We select service quantity value bedefault set 1
  let services = watch("serviceName");
  useEffect(() => {
    if (services !== null) {
      setValue("quantity", 1);
      // setQtyErrorMessage("");
    } else if (services === null) {
      setValue("quantity", "");
      // setQtyErrorMessage("");
    }
  }, [services]);

  function postCharges(obj) {
    console.log("Record having id ");
    addNewCharges(obj)
      .then((response) => {
        console.log(
          "POSTED OBJ of Pain Score assessment  IS ",
          JSON.stringify(response)
        );
        console.log(JSON.stringify(response));
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
          populateTable(patientVisitId);
        }
      })
      .catch((error) => {
        errorAlert(error.message);
        console.log("error msg" + error.message);
      });
  }

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    postCharges(finalData);
  }

  // {id: '', genderCode: 'test01', genderName: 'test', active: true}

  const onSubmitDataHandler = () => {
    console.log(" charges Data is", data);

    if (patientVisitId !== null) {
      let chargesPostObj = [
        {
          doctor: {
            _id: data.doctor.id,
          },
          id: data.id,
          quantity: data.quantity,
          serviceName: data.serviceName,
          visitId: patientVisitId,
        },
      ];
      setFinalData(data);

      setOpenPost(true);
    }

    //   [
    //     "doctor": {
    //       "_id": 0,
    //     },
    //     "id": null,
    //     "quantity": 0,
    //     "serviceName": "string",
    //     "visitId": 1122
    // ]
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitDataHandler)}>
        <div>
          {spinner ? (
            <div className="grid justify-center">
              <LoadingSpinner />
            </div>
          ) : null}
          {chargesData.hasOwnProperty("result") &&
          chargesData.result.length > 0 &&
          chargesData.statusCode === 200 &&
          spinner === false ? (
            <ChargesTable chargesData={chargesData} />
          ) : null}
          {recordWarning === true &&
          spinner === false &&
          data.statusCode !== 200 ? (
            <div className="flex justify-center">
              <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                No Records Found...
              </h3>
            </div>
          ) : null}
          <div className="flex space-x-3 w-full">
            <div className="w-full">
              <SearchDropdown
                control={control}
                name="serviceName"
                placeholder="Search by Service"
                label="Search by Services"
                searchIcon={true}
                isSearchable={true}
                isClearable={false}
                error={errors.serviceName}
                dataArray={service}
                handleInputChange={handleChange}
              />
            </div>
            <div className="flex space-x-3 w-full">
              <div className="w-40">
                <InputField
                  name="quantity"
                  type="number"
                  error={errors.quantity}
                  variant="outlined"
                  label="Qty"
                  control={control}
                />
                {/* <p className="text-customRed text-sm">
                        {qtyErrorMessage}
                      </p> */}
              </div>

              <div className="w-full">
                {/* <ReactSelect placeholder="Floor*" /> */}
                <DropdownField
                  control={control}
                  error={errors.doctor}
                  name="doctor"
                  placeholder="Doctor"
                  dataArray={referralemployee}
                  // searchIcon={true}
                  isSearchable={false}
                  // isClearable={false}
                />
              </div>

              <AddTypeButton
                onClick={() => {
                  addServiceData();
                  // handleServiceErrorMesg(),
                  // handleQtyErrorMesg(),
                  // reset(defaultValues);
                }}
              />
            </div>
          </div>
          <div>
            <CommonSelectableServiceTable
              serviceheaders={serviceheaders}
              data={data}
              setData={setData}
              checkboxVisible={checkboxVisible}
            />
          </div>
          <div className="flex justify-end space-x-3 items-center">
            <Button variant="outlined" color="error">
              Reset
            </Button>
            <SaveButton />
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
    </>
  );
}