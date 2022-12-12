import { Divider, TextField } from "@mui/material";
import React from "react";
import CommonTable from "../common/CommonTable";
import Button from "@mui/material/Button";
import { red, green } from "@mui/material/colors";
import SearchBar from "../../Common Components/FormFields/SearchBar";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import { useForm } from "react-hook-form";
import AddButton from "../../Common Components/Buttons/AddButton";
import ResetButton from "../../Common Components/Buttons/ResetButton";
import SaveButton from "../../Common Components/Buttons/SaveButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";


const expList = {
  message: "storeData list found ",
  result: [
    {
      "Item Code": "1234",
      "Batch No.": "12",
      "Expiry date": "30/11/2022",
      "Current Bal.": "1234",
      "Current MRP.": "123",
      "New Unit EXP.": "567",
    },
    {
      "Item Code": "1234",
      "Batch No.": "12",
      "Expiry date": "30/11/2022",
      "Current Bal.": "1234",
      "Current MRP.": "123",
      "New Unit EXP.": "567",
    },
    {
      "Item Code": "1234",
      "Batch No.": "12",
      "Expiry date": "30/11/2022",
      "Current Bal.": "1234",
      "Current MRP.": "123",
      "New Unit EXP.": "567",
    },
    {
      "Item Code": "1234",
      "Batch No.": "12",
      "Expiry date": "30/11/2022",
      "Current Bal.": "1234",
      "Current MRP.": "123",
      "New Unit EXP.": "567",
    },
    {
      "Item Code": "1234",
      "Batch No.": "12",
      "Expiry date": "30/11/2022",
      "Current Bal.": "1234",
      "Current MRP.": "123",
      "New Unit EXP.": "567",
    },
    {
      "Item Code": "1234",
      "Batch No.": "12",
      "Expiry date": "30/11/2022",
      "Current Bal.": "1234",
      "Current MRP.": "123",
      "New Unit EXP.": "567",
    },
    {
      "Item Code": "1234",
      "Batch No.": "12",
      "Expiry date": "30/11/2022",
      "Current Bal.": "1234",
      "Current MRP.": "123",
      "New Unit EXP.": "567",
    },
  ],
  statusCode: 200,

  count: 5,
};
function ExpAdjustment() {


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

  const [value, setValue] = React.useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-20 px-6">
      <div className="flex fles-wrap">
        <div className="text-lg font-bold mt-1">Expiry Adjustment</div>
        <div className="w-[30%] mx-5">
          <DropdownField
            control={control}
            // error={errors.authorizedBy}
            name="aurthorizedBy"
            placeholder="Store"
            //   dataArray={groupOptions}
            isDisabled={true}
          />
        </div>
      </div>

      <div className=" flex flex-col-reverse lg:flex-row space-x-3 text-sm ">
        <div className="lg:w-[55%] xl:w-[70%] border rounded bg-white p-2  mt-2 lg:mt-0 lg:pb-0 lg:bg-transparent lg:border-none ">
          <CommonTable data={expList} />
          <div className="text-right">
            <SaveButton />
          </div>
        </div>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ color: "black", borderRightWidth: 2 }}
        />
        <div className="lg:w-[50%] xl:w-[35%] bg-white rounded border p-2">
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
            <div className="mt-4 col-span-3 lg:col-span-2 ">
              <SearchBar
                //   control={control}
                sx={{ overflow: "hidden" }}
                name="searchItem"
                label="Item Search"
                searchIcon={true}
                // dataArray={itemsData}
                //   handleInputChange={handleChangeSearchBar}
                //   onChange={autoSelectedValue}
                placeholder="Item Search "
                isSearchable={true}
                isClearable={false}
              />
            </div>
            <div className="mt-4 flex space-x-3 lg:space-x-6 whitespace-nowrap">
              <h1 className="text-sm font-bold">Item Name</h1>
              <label className="text-gray-600 ">:&nbsp;abcd</label>
            </div>
            <div className="mt-4 flex space-x-2 lg:space-x-2 whitespace-nowrap">
              <h1 className="text-sm font-bold">Curr. Batch No.</h1>
              <label className="text-gray-600 ">:&nbsp;1234</label>
            </div>
            <div className="mt-4 flex space-x-7  lg:space-x-[14px] whitespace-nowrap">
              <h1 className="text-sm font-bold">Curr. Expiry</h1>
              <label className="text-gray-600 ">:&nbsp;30/11/2022</label>
            </div>
            <div className="mt-4 flex space-x-6 lg:space-x-[53px] whitespace-nowrap">
              <h1 className="text-sm font-bold">Curr. Bal</h1>
              <label className="text-gray-600 ">:&nbsp;5678</label>
            </div>
            <div className="mt-4 flex space-x-[44px] lg:space-x-[27px] whitespace-nowrap">
              <h1 className="text-sm font-bold">Curr. MRP</h1>
              <label className="text-gray-600 ">:&nbsp;2345</label>
            </div>
            <div className="mt-4 flex space-x-[10px] lg:space-x-3 whitespace-nowrap">
              <h1 className="text-sm font-bold">New EXP. Date</h1>
              <label className="text-gray-600 ">:&nbsp;2345</label>
            </div>
            <div className="mt-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="New EXP. Date"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div className="mt-3 flex space-x-3 lg:justify-end ">
              <ResetButton />
              <AddButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExpAdjustment;
