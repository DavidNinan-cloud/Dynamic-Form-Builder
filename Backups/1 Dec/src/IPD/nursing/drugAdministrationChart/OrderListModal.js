import { Checkbox, FormControlLabel, FormGroup, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import { Style } from "../../../IPD/components/bedallowcation/Style";
import DrugScheduleTable from "./DrugScheduleTable";
import SearchIcon from "@mui/icons-material/Search";

export default function OrderListModal({setDrugScheduleData, data, open, handleClose ,modifyDrugData}) {
  function displayView(row) {
    console.log(row);
    console.log("Open View Modal");
  }
  return (
    <div className="w-full grid justify-center items-center rounded lg:px-0">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style} className="h-[80%] w-[80%] p-4 ">
          <CancelPresentationIconButton
            onClick={() => {
              handleClose();
           
            }}
          />
          <div className="row">
            <h1 className="absolute top-3  text-xl font-semibold">
              Set Drug Schedule
            </h1>
            <div className="mt-4">
              <FormGroup>
                <div className="w-full flex items-center space-x-3">
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Select if substitute Drug"
                  />
                </div>
              </FormGroup>
            </div>
            <div className="flex items-center space-x-3 w-5/12 mb-2">
              <SearchBar placeholder="Drug Name" />
              <button className="text-customBlue border rounded border-customBlue px-3 h-9">
                <SearchIcon className="cursor-pointer" />
              </button>
            </div>
            {data && data.result.length > 0 ? (
              <div>
                <DrugScheduleTable displayView={displayView} data={data} setDrugScheduleData={setDrugScheduleData} modifyDrugData={modifyDrugData}/>
              </div>
            ) : (
              ""
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
