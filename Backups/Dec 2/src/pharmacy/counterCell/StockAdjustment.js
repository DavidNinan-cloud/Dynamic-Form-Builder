import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import InputField from "../../Common Components/FormFields/InputField";
import SearchBar from "../../Common Components/FormFields/SearchBar";
import CommonTable from "../common/CommonTable";
import ResetButton from "../../Common Components/Buttons/ResetButton";
import AddButton from "../../Common Components/Buttons/AddButton";


const data = {
  message: "Charges list found ",
  result: [
    {
      Id: 30,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 29,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 28,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 16,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 1,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 3,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 4,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 12,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 22,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 44,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 42,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
    {
      Id: 56,
      ItemCode: "0110",
      ItemName: "Acetones 500 mg",
      BatchNo: 65,
      "Expepiray Date": "01/02/2023",
      "Current Balance": "202222",
      "Adj Qty": 2,
      "Current MRP": "300",
      "Adj MRP": "180",
      "Purchase Rate": "315",
      "Pucrchase Rate Qty": 23,
      "Adj Pucrchase Rate ": 230,
      "LND Rate": 100,
      "Adj LND Rate": 300,
      "GST %": 10,
      "Adj GST %": 8,
      "Adj Type": "Lorem Ipsume Dollor",
      "Add Deducted": "Lorem Ipsume Dollor",
      Reasons: "Lorem Ipsume Dollor",
      Amt: 12000,
      "Added Amt": 4000,
      "Deducted Amt": 4000,
    },
  ],
  statusCode: 200,

  count: 5,
};
function StockAdjustment(props) {
  const defaultValues = {
    itemCode: null,
    authorizedBy: null,
    paidAmount: "",
  };
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",

    defaultValues,
  });
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
  return (
    <div className="mt-20 px-6">
      <div className="grid grid-cols-3 gap-x-2">
        <div>
          <DropdownField
            control={control}
            error={errors.itemCode}
            name="itemCode"
            placeholder="ItemCode"
            // dataArray={groupOptions}
            isDisabled={props.edit}
          />
        </div>
        <div>
          <DropdownField
            control={control}
            error={errors.authorizedBy}
            name="aurthorizedBy"
            placeholder="AuthorizedBy"
            // dataArray={groupOptions}
            isDisabled={props.edit}
          />
        </div>
        <div className="flex space-x-2 items-center">
          <input
            className="w-5 h-5"
            name="consignmentStock"
            type="checkbox"
            control={control}
          />
          <label>Consignment Stock</label>
        </div>
      </div>
      <div className="lg:flex  lg:space-x-5 xl:space-x-3 w-full">
        <div className="lg:w-[50%] xl:w-[70%]">
          <CommonTable data={data} />
        </div>
        <Divider
          sx={{ color: "#0B83A5", borderRightWidth: 2 }}
          orientation="vertical"
          flexItem
        />
        <div className="lg:w-[50%] xl:w-[35%] bg-white rounded border p-2">
          <div>
            <div className=" overflow-hidden my-2 w-full ">
              <SearchBar
                control={control}
                sx={{ overflow: "hidden" }}
                name="searchItem"
                label="Search By Items"
                searchIcon={true}
                // dataArray={itemsData}
                handleInputChange={handleChangeSearchBar}
                onChange={autoSelectedValue}
                placeholder="Search By Items"
                isSearchable={true}
                isClearable={false}
              />
            </div>
            <div className="grid grid-cols-2 text-sm lg:text-xs xl:text-sm font-semibold gap-3">
              <div className="flex space-x-4 lg:space-x-10 xl:space-x-4 lg:col-span-2 whitespace-nowrap">
                <h1>Item Name</h1>
                <label className="pl-[1.5px]  lg:pl-[3px] xl:pl-[0px]">
                  {" "}
                  : &nbsp; ......
                </label>
              </div>
              <div className="flex space-x-3 whitespace-nowrap">
                <h1>Current Qty</h1>
                <label className="pl-[1px]"> : &nbsp; ......</label>
              </div>
              <div className="flex space-x-2 lg:space-x-2 xl:space-x-2 whitespace-nowrap">
                <h1 className="">Current MRP</h1>
                <label className=" lg:pl-[4px] xl:pl-[3px]">
                  {" "}
                  : &nbsp; ......
                </label>
              </div>
              <div className="flex space-x-6 xl:space-x-8  whitespace-nowrap">
                <h1>Pur.Rate </h1>
                <label className="xl:pl-[4.5px]"> : &nbsp; ......</label>
              </div>
              <div className="flex space-x-2 whitespace-nowrap">
                <h1 className="">Landed Rate</h1>
                <label> : &nbsp; ......</label>
              </div>
              <div className="flex space-x-16 lg:space-x-12 xl:space-x-12 whitespace-nowrap">
                <h1>GST %</h1>
                <label className=" pl-[20px] lg:pl-[11.5px] xl:pl-[4.5px]">
                  {" "}
                  : &nbsp; ......
                </label>
              </div>
            </div>
            <div className=" grid grid-cols-2 gap-2 mt-1">
              <div>
                <DropdownField
                  control={control}
                  error={errors.authorizedBy}
                  name="aurthorizedBy"
                  placeholder="Batch"
                  // dataArray={groupOptions}
                  isDisabled={props.edit}
                />
              </div>
              <div className="w-full ">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Date"
                    name="date"
                    value={new Date()}
                    onChange={(newValue) => {
                      setFromDate(newValue);
                    }}
                    // readOnly={true}
                    renderInput={(params) => (
                      <TextField
                        className="bg-white"
                        fullWidth
                        size="small"
                        {...params}
                        sx={{
                          svg: { color: "#0B83A5" },
                        }}
                        isDisabled
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <InputField
                  control={control}
                  //   error={errors.authorizedBy}
                  name="aurthorizedBy"
                  label="Adj Qty"
                  isDisabled={props.edit}
                />
              </div>
              <div>
                <InputField
                  control={control}
                  //   error={errors.authorizedBy}
                  name="aurthorizedBy"
                  label="Adj MRP"
                  isDisabled={props.edit}
                />
              </div>
              <div>
                <InputField
                  control={control}
                  //   error={errors.authorizedBy}
                  name="aurthorizedBy"
                  label="Adj Pur Rate"
                  isDisabled={props.edit}
                />
              </div>
              <div>
                <InputField
                  control={control}
                  //   error={errors.authorizedBy}
                  name="aurthorizedBy"
                  label="Adj Landed Rate"
                  isDisabled={props.edit}
                />
              </div>
              <div>
                <InputField
                  control={control}
                  //   error={errors.authorizedBy}
                  name="aurthorizedBy"
                  label="Adj GST"
                  isDisabled={props.edit}
                />
              </div>
              <div>
                <DropdownField
                  control={control}
                  error={errors.authorizedBy}
                  name="aurthorizedBy"
                  placeholder="Adj Type"
                  // dataArray={groupOptions}
                  isDisabled={props.edit}
                />
              </div>
              <div>
                <DropdownField
                  control={control}
                  error={errors.authorizedBy}
                  name="aurthorizedBy"
                  placeholder="Reasons"
                  // dataArray={groupOptions}
                  isDisabled={props.edit}
                />
              </div>
              <div className="flex space-x-2 justify-end">
                <ResetButton />
                <AddButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockAdjustment;
