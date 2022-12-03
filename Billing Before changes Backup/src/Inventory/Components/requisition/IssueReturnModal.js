import { Divider, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import { Style } from "../../../IPD/components/bedallowcation/Style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SaveButton from "../../../Common Components/Buttons/SaveButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import CommonParrentSelectionTable from "./common/getIndent/CommonParrentSelectionTable";
import SelectionCommonTable from "./common/getIndent/SelectionCommonTable";
import GetIndentButton from "../../../Common Components/Buttons/GetIndentButton";
import CommonDetailsTable from "./common/getIndent/CommonDetailsTable";
import WithoutIndentSelectionCommonTable from './common/withoutIndent/SelectionCommonTable'
import WithoutIndentParrentSelectionTable from './common/withoutIndent/WithoutIndentParrentSelectionTable'
import { useRef, useEffect,useState } from "react";

const itemDetailsData = {
  message: "In Patient Issued Modal list found ",
  result: [
    {
      "Item Code": "123",
      "Item Name": "SEVORANE 250 ML",
      "Batch No": "01",
      Qty: "",
      Rate: "44500",
      Amount: "75",
      IsConsumer: "1",
      Rack: "lorem ipusm",
      Shelf: "lorem ipsum",
      Schedule: "09:15 PM",
    },
    {
      "Item Code": "234",
      "Item Name": "ACCOLADE STEM",
      "Batch No": "02",
      Qty: "",
      Rate: "44500",
      Amount: "666",
      IsConsumer: "3",
      Rack: "lorem ipusm",
      Shelf: "lorem ipsum",
      Schedule: "08:15 PM",
    },
    {
      "Item Code": "633",
      "Item Name": "ACCU-CHEK",
      "Batch No": "04",
      Qty: "",
      Rate: "98500",
      Amount: "895",
      IsConsumer: "6",
      Rack: "lorem ipusm",
      Shelf: "lorem ipsum",
      Schedule: "09:15 PM",
    },
    {
      "Item Code": "45",
      "Item Name": "ACT TUBE",
      "Batch No": "31",
      Qty: "",
      Rate: "1110",
      Amount: "455",
      IsConsumer: "84",
      Rack: "lorem ipusm",
      Shelf: "lorem ipsum",
      Schedule: "07:15 PM",
    },
    {
      "Item Code": "987",
      "Item Name": "ACCU-CHEK",
      "Batch No": "78",
      Qty: "",
      Rate: "44500",
      Amount: "879",
      IsConsumer: "71",
      Rack: "lorem ipusm",
      Shelf: "lorem ipsum",
      Schedule: "10:15 PM",
    },
    {
      "Item Code": "44",
      "Item Name": "ACCOLADE STEM",
      "Batch No": "12",
      Qty: "",
      Rate: "4870",
      Amount: "895",
      IsConsumer: "10",
      Rack: "lorem ipusm",
      Shelf: "lorem ipsum",
      Schedule: "06:15 PM",
    },
    {
      "Item Code": "804",
      "Item Name": "ACT TUBE",
      "Batch No": "09",
      Qty: "",
      Rate: "44500",
      Amount: "895",
      IsConsumer: "32",
      Rack: "lorem ipusm",
      Shelf: "lorem ipsum",
      Schedule: "02:15 PM",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

let getIndentDataOne = [
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
  {
    Id: 5,
    OrderNo: 5,
    MedicineName: "Liveril",
  },
  {
    Id: 6,
    OrderNo: 6,
    MedicineName: "Liveril",
  },
  {
    Id: 7,
    OrderNo: 7,
    MedicineName: "Liveril",
  },
];

//input for setData function is
let getIndentDataTwo = {
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
let getIndentDataThree = [
  {
    Id: 1,
    OrderNo: 1,
    MedicineName: "Pudin Hara",
  },
  {
    Id: 2,
    OrderNo: 2,
    MedicineName: "Vitamin E",
  },
  {
    Id: 3,
    OrderNo: 3,
    MedicineName: "dolo500",
  },
  {
    Id: 4,
    OrderNo: 4,
    MedicineName: "cipla",
  },
];

//input setDataTest function is
let getIndentDataFour = {
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
      MedicineName: "Vitamin E",
    },
    {
      Id: 3,
      OrderNo: 3,
      MedicineName: "dolo500",
    },
    {
      Id: 4,
      OrderNo: 4,
      MedicineName: "cipla",
    },
  ],
  statusCode: 200,
};
const options = [
  { value: "Color", label: "Yellow" },
  { value: "Fruit", label: "Apple" },
  { value: "Tool", label: "Spanner" },
];

export default function IndentModal(props) {
  const schema = yup.object().shape({
    fromStore: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select From Store"),
        label: yup.string().required("Please Select From Store"),
      }),
    toStore: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please To Store"),
        label: yup.string().required("Please Select To Store"),
      }),
  });
  //set data from getindentButton

  const [selectIndentType, setSelectedIndentType] = React.useState(false);
  const [getIndent, setGetIndent] = React.useState(true);
  const [getIndentTable, setGetIndentTable] = React.useState(false);
  //tabledata Show
  const [params, setParams] = React.useState();
  const [arrowKeyName, setArrowKeyName] = React.useState("");

  const [displayTable, setDisplayTable] = React.useState(false);
  const [medicineData, setMedicineData] = React.useState(itemDetailsData);
  const [selectedRow, setSelectedRow] = React.useState("");
  const [orderID, setOrderID] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState(null);
  const [data, setData] = React.useState(getIndentDataTwo);
  const [dataResult, setDataResult] = React.useState(getIndentDataOne);
  const [dataTest, setDataTest] = React.useState(getIndentDataFour);
  const [dataResultTest, setDataResultTest] = React.useState(getIndentDataThree);
  const [showReportDetailsModal, setShowReportDetailsModal] = React.useState(
    false
  );
  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    fromStore: null,
    toStore: null,
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  React.useEffect(() => {
    setSelectedIndentType("issue");
  }, []);

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

  // const handleChangeShowData = () => {
  //   setData(drugListData);
  // };

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    //to set the form fields as blank
    reset(defaultValues);
  };

  //keypress
  useEffect(() => {
    if (arrowKeyName === "Right Arrow Key") {
      focusSelectionTable();
    } else if (arrowKeyName === "Left Arrow Key") {
      focusDemoListTable();
    } else if (arrowKeyName === "Enter Key Pressed") {
      setValue("typeDrugName", "");
    }
  }, [arrowKeyName]);
  return (
    <div className="w-full grid justify-center items-center rounded lg:px-0">
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style} className="h-[80%] w-[80%]  pb-2 ">
          <div className="flex justify-between px-2">
            <div className="ml-2 mt-2">
              <h1 className="text-xl font-semibold whitespace-nowrap">
                Indent Details
              </h1>
            </div>
            <div className="relative w-full flex justify-end">
              <CancelPresentationIconButton
                className=""
                onClick={() => {
                  props.handleClose();
                  reset(defaultValues);
                }}
              />
            </div>
          </div>
          <form
            className="px-8 mt-2"
            onSubmit={handleSubmit(onSubmitDataHandler)}
          >
            <div className="grid grid-cols-2 lg:grid-cols-6 xl:flex items-center gap-2 mt-1">
              <div className="w-full lg:col-span-2 xl:w-4/12">
                <DropdownField
                  control={control}
                  error={errors.fromStore}
                  name="fromStore"
                  placeholder="From Store"
                  dataArray={options}
                  isDisabled={props.edit}
                />
              </div>
              <div className="w-full lg:col-span-2  xl:w-4/12">
                <DropdownField
                  control={control}
                  error={errors.toStore}
                  name="toStore"
                  placeholder="To Store"
                  // dataArray={groupOptions}
                  isDisabled={props.edit}
                />
              </div>

              <div className="flex space-x-2 items-center">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  value="Yes"
                  name="getIndent"
                  checked={getIndent}
                  control={control}
                  onChange={(e) => {
                    console.log("checkbox value" + e.target.checked);
                    // setGetIndent(e.target.checked);
                    if (e.target.checked === true) {
                      setGetIndent(true);
                      setDisplayTable(false);
                    } else {
                      setDisplayTable(true);
                      setGetIndent(false);
                      setGetIndentTable(false);
                    }
                  }}
                  // onClick={() => {
                  //   setGetIndentTable(false);
                  //   setDisplayTable(false)
                  // }}
                />
                <h1 className="px-2 font-semibold text-gray-700 ml-1">
                  With Indent
                </h1>
              </div>
              {getIndent ? (
                <GetIndentButton
                  onClick={() => {
                    setGetIndentTable(true);
                    handleChangeShowData();
                  }}
                />
              ) : (
                ""
              )}
              <div></div>
            </div>
            {getIndentTable ? (
              <div className="lg:flex lg:space-x-3 items-center w-full">
                <div className="grid gap-y-2 lg:gap-y-2 lg:flex lg:space-x-3 w-full">
                  <div className=" rounded-md w-full ">
                    <h1 className="text-lg font-semibold pl-2">
                      Alternative Item
                    </h1>
                    <div className="w-full" ref={selectionTableElement}>
                      <CommonParrentSelectionTable
                        //data to be displayed
                        dataResult={dataResult}
                        // tableApiFunc={fetchWorkOrdersList}
                        setDataResult={setDataResult}
                        setSelectedRow={setSelectedRow}
                        data={data}
                        selected={selected}
                        setSelected={setSelected}
                        selectedObj={selectedObj}
                        setSelectedObj={setSelectedObj}
                        setArrowKeyName={setArrowKeyName}
                        arrowKeyName={arrowKeyName}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <h1 className="text-lg font-semibold">Item Name</h1>
                    <div
                      className=" border rounded-md w-full "
                      ref={DemoListTableElement}
                    >
                      <SelectionCommonTable
                        //data to be displayed
                        dataResult={dataResultTest}
                        // tableApiFunc={fetchWorkOrderWiseTestsListData}
                        setDataResult={setDataResultTest}
                        setSelectedRow={setSelectedRow}
                        // searchString={searchString}
                        data={dataTest}
                        orderID={orderID}
                        setShowReportDetailsModal={setShowReportDetailsModal}
                        setParams={setParams}
                        params={params}
                        setArrowKeyName={setArrowKeyName}
                        arrowKeyName={arrowKeyName}
                        setSelectedObj={setSelectedObj}
                        selectedObj={selectedObj}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {displayTable ? <div>

              <div className="lg:flex lg:space-x-3 items-center w-full">
                <div className="grid gap-y-2 lg:gap-y-2 lg:flex lg:space-x-3 w-full">
             
                  <div className="w-full">
                    <h1 className="text-lg font-semibold">Item Name</h1>
                    <div
                      className=" border rounded-md w-full "
                      ref={DemoListTableElement}
                    >
                      <WithoutIndentSelectionCommonTable
                        //data to be displayed
                        dataResult={dataResultTest}
                        // tableApiFunc={fetchWorkOrderWiseTestsListData}
                        setDataResult={setDataResultTest}
                        setSelectedRow={setSelectedRow}
                        // searchString={searchString}
                        data={dataTest}
                        orderID={orderID}
                        setShowReportDetailsModal={setShowReportDetailsModal}
                        setParams={setParams}
                        params={params}
                        setArrowKeyName={setArrowKeyName}
                        arrowKeyName={arrowKeyName}
                        setSelectedObj={setSelectedObj}
                        selectedObj={selectedObj}
                      />
                    </div>
                  </div>
                  <div className=" rounded-md w-full ">
                    <h1 className="text-lg font-semibold pl-2">
                      Alternative Item
                    </h1>
                    <div className="w-full" ref={selectionTableElement}>
                      <WithoutIndentParrentSelectionTable
                        //data to be displayed
                        dataResult={dataResult}
                        // tableApiFunc={fetchWorkOrdersList}
                        setDataResult={setDataResult}
                        setSelectedRow={setSelectedRow}
                        data={data}
                        selected={selected}
                        setSelected={setSelected}
                        selectedObj={selectedObj}
                        setSelectedObj={setSelectedObj}
                        setArrowKeyName={setArrowKeyName}
                        arrowKeyName={arrowKeyName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> : ""}
            <div className=" items-center  mt-1">
              <CommonDetailsTable data={medicineData} />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 ">
                <TextField label="Remark" fullWidth multiline rows={3} />
              </div>
              <div className="grid space-y-1 mt-1 ">
                <DropdownField
                  control={control}
                  error={errors.batchCode}
                  name="batchCode"
                  placeholder="Batch Code"
                  // dataArray={groupOptions}
                  isDisabled={props.edit}
                />
                <TextField label="Qty" size="small" fullWidth />
              </div>
            </div>
            <div
              className="w-full"
              hidden={selectIndentType !== "return" ? true : false}
            >
              <div className="grid grid-cols-2 lg:grid-cols-6 xl:flex items-center gap-2 mt-1">
                <div className="w-full lg:col-span-2 xl:w-4/12">
                  <DropdownField
                    control={control}
                    error={errors.fromStore}
                    name="fromStore"
                    placeholder="From Store"
                    // dataArray={groupOptions}
                    isDisabled={props.edit}
                  />
                </div>
                <div className="w-full lg:col-span-2  xl:w-4/12">
                  <DropdownField
                    control={control}
                    error={errors.toStore}
                    name="toStore"
                    placeholder="To Store"
                    // dataArray={groupOptions}
                    isDisabled={props.edit}
                  />
                </div>

                <div className="flex space-x-3 items-center">
                  <input
                    className="h-5 w-5"
                    type="checkbox"
                    checked
                    value="Yes"
                  />
                  <h1 className="px-2 font-semibold text-gray-700 ml-3">
                    With Indent
                  </h1>
                </div>
                <div>
                  <GetIndentButton />
                </div>
              </div>
            </div>
            <div className="flex space-x-2 justify-end mt-2">
              <ResetButton />
              <SaveButton />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
