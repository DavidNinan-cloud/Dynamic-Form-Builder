import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import RadioField from "../../../Common Components/FormFields/RadioField";
import SearchIcon from "@mui/icons-material/Search";
import OTConsentTable from "./common/OTConsentTable";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import { getDepartmentlist } from "../../../master/services/otconsent/OTConsentService";
import SearchIconButton from "../../../Common Components/Buttons/SearchIconButton";
const OTConsentData = {
  message: "Order Drug Details list found ",
  result: [
    {
      Date: "11/02/2022 ,12:20 PM",
      "Consent For": "Lorem ipsum dolor ",
      // "Upload Consent":
      //   "Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit...",
    },
    {
      Date: "01/05/2022 ,12:20 PM",
      "Consent For": null,
      // "Upload Consent":
      //   "Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit...",
    },
    {
      Date: "01/02/2022 ,12:20 PM",
      "Consent For": "Lorem ipsum dolor ",
      // "Upload Consent":
      //   "Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit...",
    },
    {
      Date: "01/02/2022 ,12:20 PM",
      "Consent For": "Lorem dolor ",
      // "Upload Consent":
      //   "Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit...",
    },
    // {
    //   Date: "01/02/2022 ,12:20 PM",
    //   "Consent For": "Lorem ipsum dolor ",
    // "Upload Consent":
    //   "Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit Lorem Lorem ipsum dolor sit...",
    // },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

export default function OTConsent() {
  console.log("OTConsent Component Called!!");

  const defaultValues = {
    patientInfo: null,
    opdIpd: "IPD",
    department: null,
    consentTempalate: null,
    englishMarathi: "English",
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [openPost, setOpenPost] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [idValue, setidValue] = React.useState("");
  const [department, setDepartment] = React.useState([]);

  const opdIpd = [
    {
      id: "OPD",
      value: "OPD",
      label: "OPD",
    },
    {
      id: "IPD",
      value: "IPD",
      label: "IPD",
    },
  ];

  const englishMarathi = [
    {
      id: "English",
      value: "English",
      label: "English",
    },
    {
      id: "Marathi",
      value: "Marathi",
      label: "Marathi",
    },
  ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmitDataHandler = (data) => {
    console.log(data);
  };

  //API For department dropdown list
  useEffect(() => {
    getDepartmentlist(department)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setDepartment(res.result);
      });
  }, []);

  useEffect(() => {
    setData(OTConsentData);
    setDataResult(OTConsentData.result);
  }, []);

  const tempalate =
    "Tempalate Description \n Coding, sometimes called computer programming, is how we communicate with computers. Code tells a computer what actions to take, and writing code is like creating a set of instructions. By learning to write code, you can tell computers what to do or how to behave in a much faster way. Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem                                                                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet. ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet. lorem  \n Coding, sometimes called computer programming, is how we communicate with computers. \n Code tells a computer what actions to take, and writing code is like creating a set of  sometimes called computer programming, is how we communicate with computers. Code tells a computer what actions to take, and writing code is like creating a set of instructions. By learning to write code, you can tell computers what to do or how to behave in a much faster way. Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem                                                                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet. ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet. lorem  \n Coding, sometimes called computer programming, is how we instructions. By learning to write code, you can tell computers what to do or how to behave in a much faster way.";

  // const handleChange = (autoSearchString) => {
  //     console.log("search string in modal", autoSearchString);
  //     if (autoSearchString !== "" && autoSearchString !== null) {
  //       autoSerachPatient(autoSearchString).then((response) => {
  //         console.log(
  //           "The response of autoSearchString service is " +
  //             JSON.stringify(response)
  //         );

  //         let obj = response.data.result[0];

  //         console.log("The first element is ", obj);

  //         setOptions(response.data.result);
  //         setPatientInfo("");
  //       });
  //     }
  //   };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  //   const autoSelectedValue = (value) => {
  //     console.log(
  //       "The auto-complete object clicked by user is " + JSON.stringify(value)
  //     );
  //   };

  return (
    <div className="w-full grid pt-10 px-6 mt-8 md:rounded-md">
      <form onSubmit={handleSubmit(onSubmitDataHandler)} className="">
        <div className=" lg:hidden">
          <h1 className="grid items-center justify-center whitespace-nowrap text-xl text-black pr-5">
            OT Consent
          </h1>
        </div>

        <div className="grid gap-2 grid-cols-2 py-2">
          <div className="flex  gap-2">
            <div className="hidden lg:block">
              <h1 className="grid items-center whitespace-nowrap text-xl text-black xl:pr-5">
                OT Consent
              </h1>
            </div>
            <SearchDropdown
              control={control}
              searchIcon={true}
              name="patientInfo"
              label="Search by UHID/Patient Name/Mob No."
              placeholder="Search by UHID/Patient Name/Mob No."
              isSearchable={true}
              isClearable={false}
              //   dataArray={options}
              //   handleInputChange={handleChange}
              //   onChange={autoSelectedValue}
              //   inputRef={{
              //     ...register("patientInfo", {
              //       onChange: (e) => {
              //         console.log(
              //           "The selected PatientName object is" +
              //             JSON.stringify(e)
              //         );

              //         setPatientInfo(true);
              //         setPatientData(e);

              //         if (e.target.value !== null) {
              //           console.log(
              //             "target value in the patientInfo",
              //             e.target.value
              //           );
              //           let PatientData = e.target.value;

              //           console.log("patient data", PatientData);
              //           setPatientData(e.target.value);
              //           setPatientInfoId(e.target.value.id);
              //         }
              //       },
              //     }),
              //   }}
            />
          </div>

          <div className="flex px-4 items-center">
            <RadioField
              label=""
              name="opdIpd"
              control={control}
              dataArray={opdIpd}
            />

            <SearchIconButton
              onClick={()=>{
                console.log("Click SearchIcon Button");
                // onClick={filterData}
              }} />
          </div>
        </div>

        {/* Populate Patient Info Fields */}
        <div className="grid border bg-gray-100 border-gray-300 px-3 rounded mt-1">
           <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 py-2">
            <div className="grid gap-2 border-r-2 border-slate-500 my-1 lg:py-2 ">
              <div className="flex gap-2 ">
                <h1 className="text-black font-semibold flex space-x-1">
                  <span className="text-sm">Patient Name </span>
                  <span className=""> :</span>
                </h1>
                <h1 className="font-normal">
                  {/* {props.patientData.patientName} */}
                  ----
                </h1>
              </div>

              <div className="flex gap-2 ">
                <h1 className="text-black font-semibold flex space-x-12 ">
                  <span className="text-sm">Gender</span>
                  <span className="">:</span>
                </h1>

                <h1 className="font-normal">
                  {/* {props.patientData.gender} */}
                  ----
                </h1>
              </div>
            </div>

            <div className="grid gap-2 lg:border-r-2 pl-4 border-slate-500 lg:py-2 my-1 ">
              <div className="flex gap-2 ">
                <h1 className="text-black font-semibold flex space-x-4 lg:space-x-9">
                  <span className="text-sm">UHID</span>
                  <span className="">:</span>
                </h1>
                <h1 className="font-normal">
                  {/* {props.patientData.uhid} */}
                  ----
                </h1>
              </div>
              <div className="flex gap-2 ">
                <h1 className="text-black font-semibold flex space-x-5 lg:space-x-10">
                  <span className="text-sm">Age</span>
                  <span className="">:</span>
                </h1>
                <h1 className="font-normal">
                  {/* {props.patientData.age} */}
                  ----
                </h1>
              </div>
            </div>

            <div className="lg:pl-4 lg:py-2">
              <div className="flex gap-2 ">
                <h1 className="text-black font-semibold flex space-x-8 lg:space-x-1">
                  <span className="text-sm">Mobile No</span>
                  <span className="">:</span>
                </h1>
                <h1 className="font-normal">
                  {/* {props.patientData.mobileNumber} */}
                  ----
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <OTConsentTable
            searchString={searchString}
            dataResult={dataResult}
            setDataResult={setDataResult}
            data={data}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            count={count}
          />
        ) : null}

        <div className="border border-gray-300 bg-white px-4 rounded-lg my-2">
          <div className="flex pt-4 gap-2">
            <div className="grid grid-cols-2 gap-2 w-2/3 lg:w-9/12">
              <div className="w-full">
                <DropdownField
                  control={control}
                  placeholder="Department"
                  name="department"
                  isMulti={false}
                  isSearchable={false}
                  dataArray={department}
                />
              </div>
              <div className="w-full">
                <DropdownField
                  control={control}
                  placeholder="Consent Tempalate"
                  name="consentTempalate"
                  isMulti={false}
                  isSearchable={false}
                  //   dataArray={unit}
                />
              </div>
            </div>
            <div className="lg:pl-3">
              <RadioField
                label=""
                name="englishMarathi"
                control={control}
                dataArray={englishMarathi}
              />
            </div>
          </div>

          <div className="w-full my-2">
            <TextareaAutosize
              maxRows={12}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              defaultValue={tempalate}
              // style={{ width: 600 }}
              disabled={true}
              className="w-full border border-gra-300 rounded-lg px-2"
            />
          </div>
        </div>

        {/* RESET N ADD Button */}
        <div className="flex space-x-3 items-center justify-end ">
          <ResetButton onClick={() => reset(defaultValues)} />
          <AddButton />
        </div>
      </form>
    </div>
  );
}
