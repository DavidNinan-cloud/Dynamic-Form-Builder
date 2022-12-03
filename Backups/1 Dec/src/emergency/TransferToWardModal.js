import { Modal ,TextareaAutosize,TextField} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";

import CancelPresentationIconButton from "../Common Components/Buttons/CancelPresentationIconButton";
import SaveButton from "../Common Components/Buttons/SaveButton";
import DropdownField from "../Common Components/FormFields/DropdownField";
import InputField from "../Common Components/FormFields/InputField";

export default function TransferToWardModal(props) {

    const [newHeader, setNewHeader] = React.useState("");

    const {
        control,
        handleSubmit,
        reset,
        register,
        watch,
        getValues,
        setValue,
      } = useForm({
        mode: "onChange",
        // resolver: yupResolver(schema),
        // defaultValues,
      });

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minHeight: "30%",
    // maxHeight: "80%",
    overflowY: "scroll",
    bgcolor: "background.paper",
    border: "1px solid gray",
    boxShadow: 20,
    py: 4,
    px: 2,
  };
  return (
    <div>
      <Modal
        open={props.openTransferToWard}
        onClose={() => {
          props.handleCloseTransferToWard();
          //   reset(defaultValues);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle} className="max-h-[88%] xl:max-h-[100%]">
          <CancelPresentationIconButton
            onClick={() => {
              props.handleCloseTransferToWard();
              //   reset(defaultValues);
            }}
          />
          <fieldset className="border border-gray-400 w-full text-left px-4 rounded">
            <legend className="font-semibold text-sm text-gray-800 ml-2 lg:ml-1">
              Patient Transfer Ward
            </legend>
            <div className="grid gap-2 w-full py-2">
                    <DropdownField
                      control={control}
                    //   error={errors.unit}
                      name="delayreason"
                    //   dataArray={unit}
                      placeholder="Select Admission Delay Reason"
                      isMulti={false}
                      isSearchable={false}
                    />

                   <TextareaAutosize
                      minRows={2}
                      placeholder="Remark"
                      style={{
                        width: "100%",
                        border: "1px solid gray",
                        padding: "1rem",
                      }}
                      className="rounded"
                      name="reason"
                      value={newHeader}
                      onChange={(e) => setNewHeader()}
                    />
                  </div>
                  <div className="grid justify-end pb-2">
                    <SaveButton />
                  </div>
          </fieldset>
        </Box>
      </Modal>
    </div>
  );
}
