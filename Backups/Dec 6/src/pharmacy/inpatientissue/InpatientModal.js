import { Modal, TextareaAutosize, TextField } from "@mui/material";
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
import GetIndentModal from "./GetIndentModal";
import InPatientModalTable from "./inpatienttable/InPatientModalTable";
import PrimaryMedicineTable from "./inpatienttable/PrimaryMedicineTable";
import AlternateMedicineTable from "./inpatienttable/AlternateMedicineTable";
import SelectedMedicineTable from "./inpatienttable/SelectedMedicineTable";
import { useRef } from "react";
import ItemSearch from "../drugitemsearch/ItemSearch";

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

const getPatientInfo = [
  {
    value: "Krishna Gopal Jadhav",
    label: "Krishna Gopal Jadhav",
  },
  {
    value: "Ram Sham Yadav",
    label: "123",
  },
];

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

export default function InpatientModal(props) {
  const defaultValues = {
    searchInPatientIssue: "",
    store: null,
    quantity: "",
    itemKit: null,
    remarks: "",
    searchMedicine: "",
  };

  let searchValue = "";
  const [openChild, setOpenChild] = React.useState(false);
  const handelOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  // Open Get Indent Modal click on Gent Indent Link
  const [openGetIndentModal, setOpenGetIndentModal] = React.useState(false);

 const [arrowKeyName, setArrowKeyName] = React.useState("");
  const handleGetIndentModalOpen = () => setOpenGetIndentModal(true);
  const handleGetIndentModalClose = () => setOpenGetIndentModal(false);
  // State to store value from the input field
  const [inputValue, setInputValue] = React.useState("");

  const [displayTable, setDisplayTable] = React.useState(false);
  const [newHeader, setNewHeader] = React.useState("");
  const PrimaryTableElement = useRef();
  const AlternateTableElement = useRef();

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  let searchMedicine = watch("searchMedicine");

  React.useEffect(() => {
    console.log("value of searchMedicine is ", searchMedicine);
    if (searchMedicine === "") {
      //do not display the tables
      setDisplayTable(false);
    } else {
      //display the tables
      setDisplayTable(true);
    }
  }, [searchMedicine]);

  // console.log("searchMedicine value is", searchMedicine);

  const onSubmitDataHandler = (data) => {
    console.log(data);
  };

  //event listener function for the magnifying glass icon of the search bar
  const filterData = () => {
    setPage(0);
    setSearchString(searchValue);
  };

  //use props forthe DropdownField/ searchbar
  const handleChange = (autoSearchString) => {
    console.log("you can type :");
    // if (autoSearchString !== "") {
    //   searchValue = autoSearchString;
    //   autoSearchGender(autoSearchString)
    //     .then((response) => response.data)
    //     .then((res) => {
    //       setOptions(res.result);
    //     });
    // }
  };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );
    // if (value === null) {
    //   setSearchString("");
    // } else {
    //   searchValue = value.gender;
    // }
  };

  // Display Table Data
  // React.useEffect(() => {
  //   setData(inPatientIssueModalData);
  //   setDataResult(inPatientIssueModalData.result);
  // }, []);

  React.useEffect(() => {
    console.log("The value of displayTable flag is ", displayTable);
  }, [displayTable]);

  React.useEffect(() => {
    if (arrowKeyName === "Right Arrow Key") {
      focusAlternateMedTable();
    } else if (arrowKeyName === "Left Arrow Key") {
      focusPrimaryMedTable();
    } else if (arrowKeyName === "Enter Key Pressed") {
      setValue("searchMedicine", "");
    }
  }, [arrowKeyName]);

  // React.useEffect(() => {
  //   console.log("The selected row is " + JSON.stringify(selectedRow));
  //   console.log("The medicine data is " + JSON.stringify(medicineData));

  //   let obj = structuredClone(medicineData);

  //   if (selectedRow !== "") {
  //     obj.result.push(selectedRow);
  //     // setMedicineData(obj);
  //   }
  // }, [selectedRow]);

  // React.useEffect(() => {
  //   console.log("medicineData is " + JSON.stringify(medicineData));
  // }, [medicineData]);

  const focusPrimaryMedTable = () => {
    console.log("PrimaryTableElement is ");
    if (PrimaryTableElement.current) {
      console.log(PrimaryTableElement.current);
      PrimaryTableElement.current.focus();
    }
  };

  const focusAlternateMedTable = () => {
    console.log("SelectionTableElement is ");
    if (AlternateTableElement.current) {
      console.log(AlternateTableElement.current);
      AlternateTableElement.current.focus();
    }
  };


  return (
    <div className="mt-10">
      <Modal
        open={props.open}
        onClose={() => {
          // props.handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle} className="max-h-[88%] xl:max-h-[80%]">
          <CancelPresentationIconButton
            onClick={() => {
              props.handleClose();
            }}
          />
          <div className="row px-3">
            <fieldset className="border border-gray-300 text-left px-4  py-2 rounded mt-1 lg:m-2 ">
              <legend className="px-2 ml-3 lg:ml-0 font-bold text-gray-600">
                InPatient Issue
              </legend>
              <form
                className="grid grid-cols-1 w-full gap-2"
                onSubmit={handleSubmit(onSubmitDataHandler)}
              >
                <div className="grid grid-cols-2  xl:grid-cols-4 gap-2">
                  <div className=" col-span-2 xl:col-span-2">
                    <SearchBar
                      control={control}
                      searchIcon={true}
                      name="searchInPatientIssue"
                      placeholder="Search by Patient Name/UHID/Mob/Indent No."
                      label="Search by Patient Name/UHID/Mob/Indent No."
                      isSearchable={true}
                      isClearable={false}
                      dataArray={getPatientInfo}
                      handleInputChange={handleChange}
                      onChange={autoSelectedValue}
                    />
                  </div>
                  <div>
                    <DropdownField
                      control={control}
                      name="store"
                      placeholder="Store"
                      dataArray={stores}
                      isMulti={false}
                      isSearchable={false}
                    />
                  </div>
                  <div className=" grid items-center underline text-blue-600 text-base">
                    <a
                      href="#"
                      onClick={() => {
                        handleGetIndentModalOpen();
                        console.log("Get Indent Modal Called!!!");
                      }}
                    >
                      Get Indent
                    </a>
                  </div>
                </div>

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
                      <h1 className="font-semibold text-sm text-black">
                        Mobile No
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

                    <div className="grid grid-cols-2 w-10/12 lg:w-60">
                      <h1 className="font-semibold text-sm text-black">Ward</h1>
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
                  </div>
                </div>

                <ItemSearch />

                <div className="grid lg:grid-cols-5 items-center gap-y-2">
                  <div className="col-span-2 mr-2">
                    <TextareaAutosize
                      minRows={2}
                      placeholder="Remarks"
                      style={{
                        width: "100%",
                        border: "1px solid black",
                        padding: "1rem",
                      }}
                      name="remarks"
                      value={newHeader}
                      onChange={(e) => setNewHeader()}
                    />
                  </div>
                  <div className=" lg:col-span-3 w-full gap-2">
                    <div className="grid md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                      <div className="grid grid-cols-2 ">
                        <h1 className="font-semibold text-sm text-black">
                          No. Of Items
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2">
                        <h1 className="font-semibold text-sm text-black">
                          Total Amt
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2">
                        <h1 className="font-semibold text-sm text-black">
                          Total Qty
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>
                      {/* </div> */}

                      {/* <div className="grid grid-cols-3 mt-2 gap-2"> */}
                      <div className="grid grid-cols-2">
                        <h1 className="font-semibold text-sm text-black">
                          Net Payble Amt
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2">
                        <h1 className="font-semibold text-sm text-black">
                          Rounded Amt
                        </h1>
                        <div className="flex space-x-2 items-center">
                          <span>:</span>
                          <span className="text-black font-normal">-----</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 items-center justify-end ">
                  <ResetButton
                    onClick={() => {
                      reset(defaultValues);
                      setInputValue("");
                    }}
                  />

                  <SaveButton />
                </div>
              </form>
            </fieldset>
            {/* Backdrop */}
            <CommonBackDrop openBackdrop={props.openBackdrop} />
          </div>

          <GetIndentModal
            openGetIndentModal={openGetIndentModal}
            setOpenGetIndentModal={setOpenGetIndentModal}
            handleGetIndentModalOpen={handleGetIndentModalOpen}
            handleGetIndentModalClose={handleGetIndentModalClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
