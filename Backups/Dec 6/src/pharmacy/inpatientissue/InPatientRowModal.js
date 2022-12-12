import { Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import AddButton from "../../Common Components/Buttons/AddButton";
import CancelPresentationIconButton from "../../Common Components/Buttons/CancelPresentationIconButton";
import ResetButton from "../../Common Components/Buttons/ResetButton";
import SaveButton from "../../Common Components/Buttons/SaveButton";
import CommonBackDrop from "../../Common Components/CommonBackDrop/CommonBackDrop";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import InputField from "../../Common Components/FormFields/InputField";
import SearchBar from "../../Common Components/FormFields/SearchBar";
import InPatientModalTable from "./inpatienttable/InPatientModalTable";

const stores = [
  {
    value: "Pathology",
    label: "Pathology",
  },
  {
    value: "10 TH FLOOR",
    label: "10 TH FLOOR",
  },
  {
    value: "7 TH FLOOR",
    label: "7 TH FLOOR",
  },
  {
    value: "ETU",
    label: "ETU",
  },
  {
    value: "BioMedical NIBM",
    label: "BioMedical NIBM",
  },
];

const inPatientIssueModalData = {
  message: "In Patient Issued Modal list found ",
  result: [
    {
      "Item Code": "123",
      "Item Name": "SEVORANE 250 ML",
      "Batch No": "01",
      Qty: "154",
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
      Qty: "654",
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
      Qty: "754",
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
      Qty: "187",
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
      Qty: "634",
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
      Qty: "78",
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
      Qty: "154",
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
export default function InpatientRowModal(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState({ result: [], actions: [] });

  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [searchId, setSearchId] = React.useState(null);
  const [spinner, showSpinner] = React.useState(false);
  const [openChild, setOpenChild] = React.useState(false);
  const handelOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  const {
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitDataHandler = (data) => {
    console.log(data);
  };

  // Display Table Data
  React.useEffect(() => {
    setData(inPatientIssueModalData);
    setDataResult(inPatientIssueModalData.result);
  }, []);

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    overflowY: "scroll",
    bgcolor: "background.paper",
    border: "1px solid gray",
    boxShadow: 20,
    py: 4,
    px: 2,
  };

  return (
    <div className="mt-10">
      <Modal
        open={props.openRowModal}
        onClose={() => {
          props.handleCloseRowModal();     
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle} className="max-h-[88%] xl:max-h-[80%]">
          <CancelPresentationIconButton
            onClick={() => {
              props.handleCloseRowModal();
            }}
          />
          <div className="row">
            <fieldset className="border border-gray-300 text-left px-3  py-2 rounded mt-1 lg:m-2 ">
              <legend className="px-2 ml-3 lg:ml-0 font-bold text-gray-600">
                InPatient Issue Details
              </legend>
              <form
                className="grid grid-cols-1 w-full gap-2"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >

                {/* Patient Information */}
                <div className=" text-sm lg:text-base grid border bg-gray-100 border-gray-300 px-2 rounded">
                  <div className="py-2 grid grid-cols-2 lg:grid-cols-3 gap-2">
                    <div className="grid grid-cols-2 w-10/12 lg:w-60">
                      <h1 className="font-semibold text-sm text-black">
                        Patient Name
                      </h1>
                      <div className="flex space-x-2 items-center">
                        <span>:</span>
                        <span className="text-black font-normal">-----</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 w-10/12 lg:w-60">
                      <h1 className="font-semibold text-sm text-black">UHID</h1>
                      <div className="flex space-x-2 items-center">
                        <span>:</span>
                        <span className="text-black font-normal">-----</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 w-10/12 lg:w-60">
                      <h1 className="font-semibold text-sm text-black">Age</h1>
                      <div className="flex space-x-2 items-center">
                        <span>:</span>
                        <span className="text-black font-normal">-----</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 w-10/12 lg:w-60">
                      <h1 className="font-semibold text-sm text-black">
                        Gender
                      </h1>
                      <div className="flex space-x-2 items-center">
                        <span>:</span>
                        <span className="text-black font-normal">-----</span>
                      </div>
                    </div>

                  <div className="grid grid-cols-2 w-10/12 lg:w-60">
                      <h1 className="font-semibold text-sm text-black">Ward No</h1>
                      <div className="flex space-x-2 items-center">
                        <span>:</span>
                        <span className="text-black font-normal">-----</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 w-10/12 lg:w-60">
                      <h1 className="font-semibold text-sm text-black">
                        Bed Category
                      </h1>
                      <div className="flex space-x-2 items-center">
                        <span>:</span>
                        <span className="text-black font-normal">-----</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 w-10/12 lg:w-60">
                      <h1 className="font-semibold text-sm text-black">
                        Bed/Room No.
                      </h1>
                      <div className="flex space-x-2 items-center">
                        <span>:</span>
                        <span className="text-black font-normal">-----</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 w-10/12 lg:w-60">
                      <h1 className="font-semibold text-sm text-black">
                        Indent No
                      </h1>
                      <div className="flex space-x-2 items-center">
                        <span>:</span>
                        <span className="text-black font-normal">-----</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Table */}
                {data.hasOwnProperty("result") &&
                data.result.length > 0 &&
                data.statusCode === 200 &&
                spinner === false ? (
                  <InPatientModalTable
                    searchString={searchString}
                    dataResult={dataResult}
                    setDataResult={setDataResult}
                    data={data}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    // count={count}
                    // editRow={editRow}
                    // deleteRow={deleteRow}
                    setOpenRowModal={props.setOpenRowModal}
                  />
                ) : null}
              
              </form>
            </fieldset>
            {/* Backdrop */}
            <CommonBackDrop openBackdrop={props.openBackdrop} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
