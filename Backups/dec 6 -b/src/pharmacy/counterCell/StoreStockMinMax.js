import React from "react";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import { useForm } from "react-hook-form";
import SearchBar from "../../Common Components/FormFields/SearchBar";
import SearchIconButton from "../../Common Components/Buttons/SearchIconButton";
import StoreStockMinMaxTable from "../common/StoreStockMinMaxTable";
import ResetButton from "../../Common Components/Buttons/ResetButton";
import SaveButton from "../../Common Components/Buttons/SaveButton"

const storeStockList = {
  message: "storeData list found ",
  result: [
    {
      "Item Name": "lorem",
      "Min. Stock": "",
      "Max. Stock": "",
      "Eco Order Qty": 4,
      "Re-Order Level": 4,
      "Storage Area": 200,
      Rack: "",
      Shelf: "",
    },
  ],
  statusCode: 200,

  count: 5,
};

function StoreStockMinMax() {
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

  return (
    <div className="px-6 mt-20">
      <div className="text-lg font-semibold">Store Stock &nbsp;(Min/Max)</div>
      <div className="flex space-x-3 mt-4">
        <div className="w-[24.5%]">
          <DropdownField
            control={control}
            // error={errors.authorizedBy}
            name="aurthorizedBy"
            placeholder="Store"
            //   dataArray={groupOptions}
            isDisabled={true}
          />
        </div>
        <div className="flex space-x-4 mx-1">
          <div>
            <input type="checkbox" className="h-4 w-4 mt-3" />
          </div>
          <div className="mt-2">
            <label>0 Balance Items</label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
        <div>
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
        <div>
          <DropdownField
            control={control}
            // error={errors.authorizedBy}
            name="aurthorizedBy"
            placeholder="Type"
            //   dataArray={groupOptions}
            // isDisabled={true}
          />
        </div>
        <div>
          <DropdownField
            control={control}
            // error={errors.authorizedBy}
            name="aurthorizedBy"
            placeholder="Category"
            //   dataArray={groupOptions}
            // isDisabled={true}
          />
        </div>
        <div className="flex space-x-2">
          <DropdownField
            control={control}
            // error={errors.authorizedBy}
            name="aurthorizedBy"
            placeholder="Class"
            //   dataArray={groupOptions}
            // isDisabled={true}
          />
          <div className="justify-start">
            <SearchIconButton />
          </div>
        </div>
      </div>
      <div>
        <StoreStockMinMaxTable data={storeStockList} />
        <div className="flex justify-end space-x-4">
          <ResetButton />
          <SaveButton />
        </div>
      </div>
    </div>
  );
}

export default StoreStockMinMax;