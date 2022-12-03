import React from "react";
//imports from react hook form
import { useForm } from "react-hook-form";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../Common Components/FormFields/InputField";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import AddButton from "../../Common Components/Buttons/AddButton";
import ResetButton from "../../Common Components/Buttons/ResetButton";
import SearchBillsButton from "../../Common Components/Buttons/SearchBillsButton";
import ProceedButton from "../../Common Components/Buttons/ProceedButton";
// import CommonDetailsTable from "./drugitemsearch/common/CommonDetailsTable";
import CheckBoxField from "../../Common Components/FormFields/CheckBoxField";
import OpdForm from "./OpdForm";
import IpdForm from "./IpdForm";
import IndentModal from "./IndentModal";
import SearchBar from "../../Common Components/FormFields/SearchBar";
import { useRef, useEffect } from "react";
// import CommonParrentSelectionTable from "./drugitemsearch/common/CommonParrentSelectionTable";
// import SelectionCommonTable from "./drugitemsearch/common/SelectionCommonTable";
import { Divider } from "@mui/material";
import ItemSearch from "../drugitemsearch/ItemSearch";
const itemDetailsData = {
  message: "All Medicine List Found",
  result: [
    {
      Id: 1,
      OrderNo: 1,
      MedicineName: "Pudin Hara",
      Qty: "",
    },
    {
      Id: 2,
      OrderNo: 2,
      MedicineName: "Liveril",
      Qty: "",
    },
  ],
  statusCode: 200,

  count: 5,
};
const drugListData = {
  message: " Drug list found ",
  result: [
    {
      Id: 30,
      "Item Name": "Tab Wysolon 40mg",
    },
  ],
  statusCode: 200,
  count: 3,
};

let dOne = [
  {
    Id: 1,
    OrderNo: 1,
    MedicineName: "Liveril",
  },
  {
    Id: 2,
    OrderNo: 2,
    MedicineName: "Liveril",
  },
  {
    Id: 3,
    OrderNo: 3,
    MedicineName: "Liveril",
  },
  {
    Id: 4,
    OrderNo: 4,
    MedicineName: "Liveril",
  },
];

//input for setData function is
let dTwo = {
  message: "Medicine list found ",
  result: [
    {
      Id: 1,
      OrderNo: 1,
      MedicineName: "Liveril",
    },
    {
      Id: 2,
      OrderNo: 2,
      MedicineName: "Liveril",
    },
    {
      Id: 3,
      OrderNo: 3,
      MedicineName: "Liveril",
    },
    {
      Id: 4,
      OrderNo: 4,
      MedicineName: "Liveril",
    },
  ],
  statusCode: 200,
  count: 4,
};

//input for setDataResultTest function
let dThree = [
  {
    Id: 1,
    OrderNo: 1,
    MedicineName: "Pudin Hara",
  },
  {
    Id: 2,
    OrderNo: 2,
    MedicineName: "Pudin Hara",
  },
  {
    Id: 3,
    OrderNo: 3,
    MedicineName: "Pudin Hara",
  },
  {
    Id: 4,
    OrderNo: 4,
    MedicineName: "Pudin Hara",
  },
];

//input setDataTest function is
let dFour = {
  message: "Alternate Medicine list found ",
  result: [
    {
      Id: 1,
      OrderNo: 1,
      MedicineName: "Pudin Hara",
    },
    {
      Id: 2,
      OrderNo: 2,
      MedicineName: "Pudin Hara",
    },
    {
      Id: 3,
      OrderNo: 3,
      MedicineName: "Pudin Hara",
    },
    {
      Id: 4,
      OrderNo: 4,
      MedicineName: "Pudin Hara",
    },
  ],
  statusCode: 200,
};

function PharmacySales(props) {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    lastName: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    doctorName: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    address: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    area: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    city: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    remark: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    discount: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    discountAmount: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    tax: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Group"),
        label: yup.string().required("Please Select Group"),
      }),
    searchItems: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Group"),
        label: yup.string().required("Please Select Group"),
      }),
    paidAmount: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    doctorName: "",
    searchItems: null,
    address: "",
    area: "",
    typeDrugName: "",
    city: "",
    remark: "",
    discount: "",
    discountAmount: "",
    tax: null,
    paidAmount: "",
  };
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  let typeDrugName = watch("typeDrugName");

  useEffect(() => {
    console.log("value of typeDrugName is ", typeDrugName);
    if (typeDrugName === "") {
      //do not display the tables
      setDisplayTable(false);
    } else {
      //display the tables
      setDisplayTable(true);
    }
  }, [typeDrugName]);

  useEffect(() => {
    console.log("isSubmitting flag value is ", isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    console.log("The value of displayTable flag is ", displayTable);
  }, [displayTable]);

  console.log("typeDrugName is ", typeDrugName);
  // indent modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //table selection
  const [unitOptions, setUnitOptions] = React.useState([]);

  const [params, setParams] = React.useState();

  const [arrowKeyName, setArrowKeyName] = React.useState("");

  const [displayTable, setDisplayTable] = React.useState(false);
  const [listTableData, setListTableData] = React.useState(drugListData);
  const [medicineData, setMedicineData] = React.useState(itemDetailsData);
  const [selectedRow, setSelectedRow] = React.useState("");
  const [orderID, setOrderID] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState(null);
  const [data, setData] = React.useState(dTwo);
  const [dataResult, setDataResult] = React.useState(dOne);
  const [dataTest, setDataTest] = React.useState(dFour);
  const [dataResultTest, setDataResultTest] = React.useState(dThree);
  // State variable and useEffect used for radio buttons
  const [selectedPatientType, setSelectedPatientType] = React.useState(false);
  const [showReportDetailsModal, setShowReportDetailsModal] = React.useState(
    false
  );

  const changeHandler = (e) => {
    setSelectedPatientType(e.target.value);
  };
  const DemoListTableElement = useRef();
  const selectionTableElement = useRef();
  const inputFieldElement = useRef();

  //applying event listener function on the input tag
  if (inputFieldElement.current) {
    let requiredInputElement = inputFieldElement.current.querySelector(
      "input[name='typeDrugName']"
    );

    console.log("requiredElement", requiredInputElement);

    requiredInputElement.addEventListener("keydown", function(event) {
      console.log("Key that is pressed on the input tag is ", event.key);
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });
  }

  const focusDemoListTable = () => {
    console.log("DemoListTableElement is ");
    if (DemoListTableElement.current) {
      console.log(DemoListTableElement.current);
      DemoListTableElement.current.focus();
    }
  };

  const focusSelectionTable = () => {
    console.log("SelectionTableElement is ");
    if (selectionTableElement.current) {
      console.log(selectionTableElement.current);
      selectionTableElement.current.focus();
    }
  };
  React.useEffect(() => {
    console.log("The selected row is " + JSON.stringify(selectedRow));
    console.log("The medicine data is " + JSON.stringify(medicineData));

    let obj = structuredClone(medicineData);

    if (selectedRow !== "") {
      obj.result.push(selectedRow);
      setMedicineData(obj);
    }
  }, [selectedRow]);

  React.useEffect(() => {
    console.log("medicineData is " + JSON.stringify(medicineData));
  }, [medicineData]);

  React.useEffect(() => {
    setSelectedPatientType("OPD");
  }, []);

  //end
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    //to set the form fields as blank
    reset(defaultValues);
  };

  React.useEffect(
    (data) => {
      console.log("table data", data);
    },
    [listTableData]
  );

  const handleChangeSearchBar = (autoSearchString) => {
    console.log("handleChange has been invoked");
    console.log("The value typed by the user is " + autoSearchString);
  };
  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
  };

  useEffect(() => {
    if (arrowKeyName === "Right Arrow Key") {
      focusSelectionTable();
    } else if (arrowKeyName === "Left Arrow Key") {
      focusDemoListTable();
    } else if (arrowKeyName === "Enter Key Pressed") {
      setValue("typeDrugName", "");
    }
  }, [arrowKeyName]);

  const getUnitDropDown = () => {
    getUnitList()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setUnitOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="mt-20 px-6 w-full ">
      <h1 className="text-xl font-semibold">Counter Sales</h1>
      <div className="grid grid-cols-3 lg:flex gap-x-2 w-full  overflow-hidden">
        <div className=" flex items-center md:space-x-3  col-span-3">
          <h1 className="font-semibold texl-lg whitespace-nowrap">
            Patient Type :
          </h1>
          <input
            className=" h-5 w-5 ml-5 md:ml-0 "
            type="radio"
            value="OPD"
            id="OPD"
            checked={selectedPatientType === "OPD"}
            name="OPD"
            onChange={changeHandler}
          />

          <label htmlFor="OPD" className="ml-2">
            OPD
          </label>
          <input
            className=" h-5 w-5 ml-5 md:ml-0 "
            type="radio"
            value="IPD"
            id="IPD"
            checked={selectedPatientType === "IPD"}
            name="IPD"
            onChange={changeHandler}
          />

          <label htmlFor="IPD" className="ml-2">
            IPD
          </label>
          <input
            className=" h-5 w-5 ml-3"
            type="radio"
            name="Counter"
            value="Counter"
            id="Counter"
            checked={selectedPatientType === "Counter"}
            onChange={changeHandler}
          />
          <label htmlFor="courses" className="ml-2">
            Counter
          </label>
        </div>
        <div
          className="w-full xl:w-5/12 lg:px-2 col-span-2"
          hidden={selectedPatientType !== "OPD" ? true : false}
        >
          <div className=" lg:px-2 overflow-hidden my-2 w-full ">
            <SearchBar
              control={control}
              sx={{ overflow: "hidden" }}
              name="searchItem"
              label="Search By UHID/Name/MobNo/VisitNo"
              searchIcon={true}
              // dataArray={itemsData}
              handleInputChange={handleChangeSearchBar}
              onChange={autoSelectedValue}
              placeholder="Search By UHID/Name/MobNo/VisitNo"
              isSearchable={true}
              isClearable={false}
            />
          </div>
        </div>
        <div
          className="w-full xl:w-5/12 lg:px-2 col-span-2"
          hidden={selectedPatientType !== "IPD" ? true : false}
        >
          <div className=" lg:px-2 overflow-hidden my-2 w-full ">
            <SearchBar
              control={control}
              sx={{ overflow: "hidden" }}
              name="searchItem"
              label="Search By UHID/Name/MobNo/VisitNo"
              searchIcon={true}
              // dataArray={itemsData}
              handleInputChange={handleChangeSearchBar}
              onChange={autoSelectedValue}
              placeholder="Search By UHID/Name/MobNo/VisitNo"
              isSearchable={true}
              isClearable={false}
            />
          </div>
        </div>

        <div className="">
          <button
            className="whitespace-nowrap bg-customBlue text-white rounded px-3 h-10  mt-2"
            onClick={() => {
              // handleClick(index, row);
              handleOpen();
            }}
          >
            Get Indent
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmitDataHandler)}>
        <div hidden={selectedPatientType !== "Counter" ? true : false}>
          <div className="grid grid-cols-4 gap-2 items-center my-2">
            <div
              className="w-full col-span-2"
              hidden={selectedPatientType !== "Counter" ? true : false}
            >
              <div className="  overflow-hidden w-full ">
                <SearchBar
                  control={control}
                  sx={{ overflow: "hidden" }}
                  name="searchItem"
                  label="Search By UHID/Name/MobNo/VisitNo"
                  searchIcon={true}
                  // dataArray={itemsData}
                  handleInputChange={handleChangeSearchBar}
                  onChange={autoSelectedValue}
                  placeholder="Search By UHID/Name/MobNo/VisitNo"
                  isSearchable={true}
                  isClearable={false}
                />
              </div>
            </div>
            <InputField
              name="firstName"
              variant="outlined"
              label="First Name*"
              error={errors.firstName}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
            <InputField
              name="lastName"
              variant="outlined"
              label="Last Name*"
              error={errors.lastName}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
            <InputField
              name="doctorName"
              variant="outlined"
              label="Doctor Name*"
              error={errors.doctorName}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
            <InputField
              name="address"
              variant="outlined"
              label="Address*"
              error={errors.address}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
            <InputField
              name="area"
              variant="outlined"
              label="Area*"
              error={errors.area}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
            <InputField
              name="city"
              variant="outlined"
              label="City*"
              error={errors.city}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
          </div>
        </div>

        <div hidden={selectedPatientType !== "OPD" ? true : false}>
          <fieldset className="border bg-gray-100 border-gray-300 text-left w-full  rounded-md mb-2 px-2 mt-1 ">
            <div className="py-2 grid grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="border-r-2 border-gray-600">
                <div className="flex items-center space-x-3 ">
                  <h1 className="font-semibold text-sm">Patient Name</h1>
                  <div className="flex space-x-2 items-center pl-3.5">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">----</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <h1 className="font-semibold text-sm">Doctor Name</h1>
                  <div className="flex space-x-2 items-center pl-4">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-semibold text-sm">Employee Code</h1>
                  <div className="flex space-x-2 items-center pl-0.5">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
              </div>
              <div className="lg:border-r-2 border-gray-600">
                <div className="flex items-center space-x-2 ">
                  <h1 className="font-semibold text-sm">Gender</h1>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
                <div className="flex items-center space-x-[13px]">
                  <h1 className="font-semibold text-sm">IPD No.</h1>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
                <div className="flex items-center space-x-7">
                  <h1 className="font-semibold text-sm">UHID</h1>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-[30px]  ">
                  <h1 className="font-semibold text-sm">Age</h1>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
                <div className="flex items-center space-x-[6px]   ">
                  <h1 className="font-semibold text-sm">Bed No.</h1>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-[26px]">
                    <h1 className="font-semibold text-sm">Limit</h1>
                    <div className="flex space-x-2  items-center">
                      <span>:</span>
                      <span className="text-gray-500 font-normal">-----</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <h1 className="font-semibold text-sm">Used</h1>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-500 font-normal">-----</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div hidden={selectedPatientType !== "IPD" ? true : false}>
          <fieldset className="border bg-gray-100 border-gray-300 text-left w-full  rounded-md mb-2 px-2 mt-1">
            <div className="py-2 grid grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="border-r-2 border-gray-600">
                <div className="flex items-center space-x-3 ">
                  <h1 className="font-semibold text-sm">Patient Name</h1>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">----</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <h1 className="font-semibold text-sm">Doctor Name</h1>
                  <div className="flex space-x-2 items-center pl-0.5">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
              </div>

              <div className="lg:border-r-2 border-gray-600">
                <div className="flex items-center space-x-2 ">
                  <h1 className="font-semibold text-sm">Gender</h1>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <h1 className="font-semibold text-sm">Age</h1>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-[73px] lg:space-x-3  ">
                  <h1 className="font-semibold text-sm">UHID</h1>
                  <div className="flex space-x-2 items-center">
                    <span>:</span>
                    <span className="text-gray-500 font-normal">-----</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-[73px] lg:space-x-3">
                    <h1 className="font-semibold text-sm">Limit</h1>
                    <div className="flex space-x-2  items-center">
                      <span>:</span>
                      <span className="text-gray-500 font-normal">-----</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <h1 className="font-semibold text-sm">Used</h1>
                    <div className="flex space-x-2 items-center">
                      <span>:</span>
                      <span className="text-gray-500 font-normal">-----</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
       {/* item search component  */}
        <ItemSearch />

        <div className=" items-center  mt-1">
          {/* <CommonDetailsTable data={medicineData} /> */}
        </div>
        <div hidden={selectedPatientType !== "Counter" ? true : false}>
          <div className=" grid grid-cols-2 lg:grid-cols-4 items-center  gap-2 border-t-2  border-t-customBlue py-2">
            <div>
              <h1 className="flex items-center space-x-5">
                <span className="flex space-x-12">
                  <span>Total Item</span> <span>:</span>
                </span>
                <span>25</span>
              </h1>
            </div>
            <div>
              <h1 className="flex items-center space-x-5">
                <span className="flex space-x-5">
                  <span>Total Quantity</span>
                  <span>:</span>
                </span>
                <span>255</span>
              </h1>
            </div>
            <div>
              <h1 className="flex items-center space-x-5">
                <span className="flex space-x-20">
                  <span>Credit</span>
                  <span>:</span>
                </span>
                <span>255</span>
              </h1>
            </div>
            <InputField
              name="remark"
              variant="outlined"
              label="Remark*"
              error={errors.remark}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
            <div className="flex items-center space-x-2">
              <InputField
                name="discount"
                variant="outlined"
                label="Discount (%)"
                error={errors.discount}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
              <InputField
                name="discountAmount"
                variant="outlined"
                label="Discount Amount"
                error={errors.discountAmount}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
            <div>
              <DropdownField
                control={control}
                error={errors.tax}
                name="tax"
                placeholder="Tax"
                //   dataArray={groupOptions}
                isDisabled={props.edit}
              />
            </div>
            <div>
              <h1 className="flex items-center space-x-5">
                <span className="flex space-x-16">
                  <span>GST Amt</span> <span>:</span>
                </span>
                <span>12322</span>
              </h1>
            </div>
            <div>
              <h1 className="flex items-center space-x-5">
                <span className="flex space-x-4 items-center">
                  <spn>Rounding Amt</spn>
                  <span>:</span>
                </span>
                <span>0.25</span>
              </h1>
            </div>
            <div>
              <h1 className="flex items-center space-x-5">
                <span className="flex space-x-8 ">
                  <span>Net Pay Amt</span> <span className="pl-0.5"> :</span>
                </span>
                <span>25</span>
              </h1>
            </div>

            <div>
              <CheckBoxField
                control={control}
                name="cashPayment"
                label="Cash Payment"
                value="Cash Payment"
              />
            </div>
            <div>
              <InputField
                name="paidAmount"
                variant="outlined"
                label="Paid Amount"
                error={errors.paidAmount}
                control={control}
                inputProps={{ style: { textTransform: "capitalize" } }}
              />
            </div>
          </div>
          <div className="flex justify-end items-center space-x-3 my-2">
            <SearchBillsButton />
            <ResetButton />
            <ProceedButton />
          </div>
        </div>
      </form>
      <div hidden={selectedPatientType !== "OPD" ? true : false}>
        <OpdForm />
      </div>
      <div hidden={selectedPatientType !== "IPD" ? true : false}>
        <IpdForm />
      </div>
      <IndentModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
}

export default PharmacySales;
