import React from "react";
//imports from react hook form
import { useForm } from "react-hook-form";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useRef, useEffect } from "react";
import { Divider } from "@mui/material";
import IndentsTable from "./common/IndentsTable";
import IndentListTable from "./common/IndentListTable";
import IndentItemsTable from "./common/IndentItemsTable";
import InputField from "../../Common Components/FormFields/InputField";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import { AddButton } from "../../Common Components/Buttons/CommonButtons";
const itemDetailsData = {
  message: "All Medicine List Found",
  result: [
    {
      Id: 1,
      "Item Code":"12",
      "Item Name":"Pudin Hara",
      Qty: "",
      "Batch No":"",
      "Rate":"1200",
      "Amount":"500",
      "IsConsume":"1",
    },
    {
      Id: 2,
      "Item Code":"13",
      "Item Name": "Liveril",
      Qty: "",
      "Batch No":"",
      "Rate":"700",
      "Amount":"200",
      "IsConsume":"2",
    },
    {
      Id: 3,
      "Item Code":"14",
      "Item Name": "Liveril",
      Qty: "",
      "Batch No":"",
      "Rate":"650",
      "Amount":"150",
      "IsConsume":"3",
    },
  ],
  statusCode: 200,
  actions: ["delete"],
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

function ItemSearchs(props) {
  const defaultValues = {
    typeDrugName: "",
  };
  const {
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
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

  React.useEffect(
    (data) => {
      console.log("table data", data);
    },
    [listTableData]
  );

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
    <div className="mt-2 w-full ">
      <form>
        <div className="grid lg:grid-cols-5 gap-2 items-center">
          <div className="lg:col-span-3">
            <div className="flex gap-2 items-center">
              <span className="text-base font-semibold whitespace-nowrap">
                Item Detail:
              </span>
              <form className="w-full" autocomplete="off">
                <div className="z-10 pr-1">
                  <span ref={inputFieldElement} contenteditable="true">
                    <InputField
                      name="typeDrugName"
                      variant="outlined"
                      label="Search Item"
                      control={control}
                    />
                  </span>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 lg:px-2 lg:pl-3 lg:border-l-2 lg:border-slate-500">
            <div className="flex gap-2 items-center">
              <DropdownField
                control={control}
                name="itemKit"
                // dataArray={itemKit}
                placeholder="Item Kit"
                isMulti={false}
                isSearchable={false}
              />
              <div className="w-52 mt-1">
                <InputField
                  name="quantity"
                  type="number"
                  variant="outlined"
                  label="Qty"
                  control={control}
                />
              </div>
              <AddButton />
            </div>
          </div>
        </div>
        <div>
          {displayTable ? (
            <div className="grid gap-y-2 lg:gap-y-2 lg:flex lg:space-x-3 w-full">
              <div className="w-full">
                <h1 className="text-lg font-semibold">Item Name</h1>
                <div
                  className=" border rounded-md w-full "
                  ref={DemoListTableElement}
                >
                  <IndentsTable
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
              <div className=" rounded-md w-full ">
                <h1 className="text-lg font-semibold pl-2">Alternative Item</h1>
                <div className="w-full" ref={selectionTableElement}>
                  <IndentItemsTable
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
          ) : null}
        </div>
        <div className=" items-center  mt-1">
          <IndentListTable data={medicineData} />
        </div>
      </form>
    </div>
  );
}

export default ItemSearchs;
