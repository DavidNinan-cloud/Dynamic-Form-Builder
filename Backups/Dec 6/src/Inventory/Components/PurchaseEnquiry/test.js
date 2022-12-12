// import React from "react";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import DropdownField from "../../../Common Components/FormFields/DropdownField";
// import SearchBar from "../../../Common Components/FormFields/SearchBar";
// import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
// import InputField from "../../../Common Components/FormFields/InputField";
// import AddButton from "../../../Common Components/Buttons/AddButton";
// import ResetButton from "../../../Common Components/Buttons/ResetButton";
// import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
// import PurchaseEnquiryTable from "./PurchaseEnquiryTable";
// import HeaderModal from "./HeaderModal";
// import {
//   Checkbox,
//   FormControl,
//   InputLabel,
//   ListItemText,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   TextareaAutosize,
// } from "@mui/material";
// import { Box } from "@mui/material";
// import { Modal } from "@mui/material";
// // import { ModalStyle } from "../../../Common Components/ModalStyle";
// import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
// import {
//   getAllSupplier,
//   getItemType,
//   getUnitlist,
//   getAllItemCategory,
// } from "../../commonservices/CommonService";
// import AddTypeButton from "../../../Common Components/Buttons/AddTypeButton";
// import {
//   errorAlert,
//   successAlert,
// } from "../../../Common Components/Toasts/CustomToasts";
// import ConfirmationModal from "../../../Common Components/ConfirmationModal";
// import {
//   autoItemService,
//   addNewEnquiry,
// } from "../../services/enquiry/EnquiryServices";

// // const orderdDrugDetailsData = {
// //   message: "Order Drug Details list found ",
// //   result: [
// //     {
// //       "Item Name": "Tab Wysolon 40mg",
// //       "U.O.M.": "Lorem ipsum dolor ",
// //       Quantity: 10,
// //       Remark: "Item Supplied",
// //       "Package Size": 50,
// //     },
// //   ],
// //   statusCode: 200,
// //   actions: ["Delete"],
// //   count: 3,
// // };

// const suppliers = ["Babu", "Sakshi", "Shubham Enterprises", "Shivam"];

// const PurchaseEnquiryModal = (props) => {
//   const ModalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "90%",
//     overflowY: "scroll",
//     bgcolor: "background.paper",
//     border: "1px solid gray",
//     boxShadow: 20,
//     py: 2,
//     px: 2,
//   };

//   const [newHeader, setNewHeader] = useState("");
//   const [noteValue, setNoteValue] = React.useState("");
//   const [termsConditions, setTermsCondition] = React.useState("");
//   const [openHeader, setOpenHeader] = React.useState(false);
//   const handleHeaderOpen = () => setOpenHeader(true);
//   const handleHeaderClose = () => setOpenHeader(false);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [count, setCount] = React.useState();
//   const [data, setData] = React.useState({ result: [], actions: [] });
//   const [dataResult, setDataResult] = React.useState([]);
//   const [searchString, setSearchString] = React.useState("");
//   const [spinner, showSpinner] = React.useState(false);
//   const [recordWarning, showRecordWarning] = React.useState(false);
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // const [itemSearchErrorMessage, setItemsearchErrorMessage] = React.useState("");
//   const [unit, setUnit] = React.useState([]);
//   const [itemTypeOptions, setItemTypeOptions] = React.useState();
//   const [itemsTypeId, setItemsTypeId] = useState(null);
//   const [itemCategory, setItemCategory] = React.useState();
//   const [itemsCategoryeId, setItemsCategoryId] = useState(null);
//   const [suppliers, setSuppliers] = React.useState([]);

//   const [finalData, setFinalData] = React.useState({});
//   const [openPost, setOpenPost] = React.useState(false);
//   const [openPut, setOpenPut] = React.useState(false);
//   const [itemOptions, setItemOption] = React.useState([]);
//   const [packsizeMessage, setpacksizeErrorMessage] = React.useState("");
//   const [qtyErrorMessage, setQtyErrorMessage] = React.useState("");
//   const handleItemErrorMesg = () => {
//     let packsizeError = getValues("packSize");
//     if (packsizeError === null) {
//       setpacksizeErrorMessage("Required");
//     } else if (packsizeError !== null) {
//       setpacksizeErrorMessage("");
//     }
//   };
//   const handleQtyErrorMesg = () => {
//     let Qty = getValues("quantity");
//     if (Qty === "") {
//       setQtyErrorMessage("Required");
//     } else if (Qty !== "" && Qty <= 1) {
//       setQtyErrorMessage("");
//     }
//   };
//   const handleClosePost = () => {
//     console.log("Post modal is going to close");
//     if (openPost) {
//       setOpenPost(false);
//     }
//   };
//   const handleClosePut = () => {
//     console.log("handleCloePut has been called");
//     if (openPut) {
//       setOpenPut(false);
//     }
//   };

//   const defaultValues = {
//     unit: null,
//     itemType: null,
//     itemCategory: null,
//     supplierMasters: null,
//     store: null,
//     itemMaster: null,
//     uom: "",
//     quantity: "",
//     packSize: "",
//     remarks: "",
//     note: "",
//     termsAndConditions: "",
//   };

//   // const handleItemSearchErrorMesg = () => {
//   //   let searvicError = getValues("services");
//   //   if (searvicError === null) {
//   //     setItemsearchErrorMessage("Required");
//   //   } else if (searvicError !== null) {
//   //     setItemsearchErrorMessage("");
//   //   }
//   // };

//   const schema = yup.object().shape({
//     supplierMasters: yup
//       .array()
//       .nullable()
//       .min(1, "Required")
//       .of(
//         yup.object().shape({
//           label: yup.string().required("Required"),
//           value: yup.string().required("Required"),
//         })
//       )
//       .required("Select atleast 1 supplier"),

//     // itemMaster: yup
//     //   .object()
//     //   .nullable()
//     //   .shape({
//     //     value: yup.string(),
//     //     label: yup.string(),
//     //   })
//     //   .required("Required"),

//     // quantity: yup
//     //   .string()
//     //   .required("Required")
//     //   .matches(/^\d+$/, "Enter numeric value"),

//     // packSize: yup
//     //   .string()
//     //   .required("Required")
//     //   .matches(/^\d+$/, "Enter numeric value"),
//   });

//   const {
//     control,
//     handleSubmit,
//     reset,
//     register,
//     getValues,
//     setValue,
//     watch,
//     isValid,
//     formState: { errors },
//   } = useForm({
//     mode: "onChange",
//     resolver: yupResolver(schema),
//     defaultValues,
//   });

//   // useEffect(() => {
//   //   setData(orderdDrugDetailsData);
//   //   setDataResult(orderdDrugDetailsData.result);
//   // }, []);

//   const handleChange = (autoSearchItemString) => {
//     console.log("handleChange has been invoked");

//     console.log(
//       "The value of service that was typed is " + autoSearchItemString
//     );
//     if (
//       itemsTypeId !== null &&
//       itemsCategoryeId !== null &&
//       autoSearchItemString !== ""
//     ) {

//       // {"message":"item class found.","result":[{"label":"AMANTREL 100 MG CAP","value":14,"uom":1,"id":14},{"uom":1,"label":"ACUTRET TAB 20MG","value":5,"id":5},{"uom":1,"label":"ACUTRET TAB 10MG","value":4,"id":4},{"label":"ANTOXID CAP","value":21,"uom":265,"id":21}],"statusCode":200}

//       autoItemService(itemsTypeId, itemsCategoryeId, autoSearchItemString)
//         .then((response) => response.data)
//         .then((res) => {
//           console.log(
//             "The response of auto-complete / auto-search is " +
//               JSON.stringify(res)
//           );

//           setValue("uom" , "");
//           setItemOption(res.result);
//           // setServiceErrorMessage("");
//         })
//         .catch((error) => {
//           console.log("Item Error is: ", error);
//         });
//     }
//   };

//   //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
//   const autoSelectedValue = (value) => {
//     console.log(
//       "The auto-complete object clicked by user is " + JSON.stringify(value)
//     );
//   };

//   function postEnquiry(obj) {
//     console.log("Record having id ");
//     addNewEnquiry(obj)
//       .then((response) => {
//         console.log("POSTED OBJ of Enquiry IS ", JSON.stringify(response));
//         console.log(JSON.stringify(response));
//         if (response.data.statusCode === 200) {
//           successAlert(response.data.message);
//         }
//       })
//       .catch((error) => {
//         errorAlert(error.message);
//         console.log("error msg" + error.message);
//       });
//   }

//   function addRecord() {
//     console.log("A new record has been added");
//     console.log("The value of openPost flag is ", openPost);
//     setOpenPost(false);
//       setValue("itemMaster"  , null);
//      setValue("uom" , "");
//       setValue("packSize", "");
//       setValue("quantity", "");
//       setValue("remarks", ""); 
//     postEnquiry(finalData);

//   }

//   const onSubmitDataHandler = (data) => {
//     console.log("The Value is" + JSON.stringify(data));
//     // requiredObj={
//     // "unit":{"id":1},
//     // "enquiryDetails": [
//     // {
//     // "id": null,
//     // "itemMaster": {"id":1},
//     // "uom":1,
//     // "packSize": "string",
//     // "quantity": 0,
//     // "remarks": "string"
//     // }
//     // ],
//     // "header": "string",
//     // "id": null,
//     // "note": "string",
//     // "supplierMasters": [
//     // {"id":1}
//     // ],
//     // "termsAndConditions": "string",
//     // "totalQuantity": 0
//     // }

//     let postObj = {
//       unit: {
//         id: data.unit.value,
//       },
//       enquiryDetails: [
//         {
//           id: data.id,
//           itemMaster: {
//             id: data.itemMaster.id,
           
//           },
//           uom: data.uom,
//           packSize: data.packSize,
//           quantity: data.quantity,
//           remarks: data.remarks,
//         },
//       ],
//       header: data.header,
//       note: data.note,
//       supplierMasters: [
//         {
//           id: data.supplierMasters.id,
//         },
//       ],
//       termsAndConditions: data.termsAndConditions,
//       totalQuantity: data.totalQuantity,
//     };

    
//     setFinalData(postObj);
//     setOpenPost(true);
//   };

//   //API For unit dropdown list
//   useEffect(() => {
//     getUnitlist(unit)
//       .then((response) => response.data)
//       .then((res) => {
//         console.log(res);
//         setUnit(res.result);
//       });

//     //API For unit dropdown list
//     getAllSupplier(suppliers)
//       .then((response) => response.data)
//       .then((res) => {
//         console.log(res);
//         setSuppliers(res.result);
//       });

//     //API For Item Type dropdown list
//     getItemType()
//       .then((response) => response.data)
//       .then((res) => {
//         console.log("Item Type ressult is", res);
//         setItemTypeOptions(res.result);
//       });
//   }, []);

//   //API For unit dropdown list
//   useEffect(() => {
//     if (itemsTypeId !== null) {
//       getAllItemCategory(itemsTypeId)
//         .then((response) => response.data)
//         .then((res) => {
//           console.log(res);
//           setItemCategory(res.result);
//         })
//         .catch((error) => {
//           console.log("Error Response of Item Category is :", error);
//         });
//     }

//     console.log("Form is Valid", isValid);
//   }, [itemsTypeId, isValid]);

//   const addItemsData = () => {
//     let itemMaster = getValues("itemMaster");
//     let uom = getValues("uom");
//     let quantity = getValues("quantity");
//     let packSize = getValues("packSize");
//     let remarks = getValues("remarks");

//     console.log("Items Master", itemMaster);
//     // {uom: 1, label: 'ACUTRET TAB 20MG', value: 5, id: 5}
//     let itemObj = {
//       itemMaster: {
//         id: itemMaster.id,
//         label: itemMaster.label,
//       },
//       uom: uom,
//       packageSize: packSize,
//       quantity: quantity,
//       remark: remarks,
//     };

//     let arr = [...dataResult];
//     arr.push(itemObj);

//     let dataObj = data;
//     let arrNew = dataObj.result;
//     arrNew.push(itemObj);
//     dataObj.result = arrNew;
//     setData(dataObj);
//     setDataResult(arr);
//     console.log("ItemObj is ", itemObj);
//     // reset()


//     //  setValue("itemMaster"  , null);
//     //  setValue("uom" , "");
//     //   setValue("packSize", "");
//     //   setValue("quantity", "");
//     //   setValue("remarks", "");  

//   };

//   let items = watch("itemMaster");
//   useEffect(() => {
//     if (items !== null) {
//       // setValue("uom", 1);
//       setValue("quantity", 1);
//     } else if (items === null) {
//       // setValue("uom", "");
//       setValue("quantity", "");
//     }
//   });

//   return (
//     <>
//       <div className="m-2">
//         <Modal open={props.openModal}>
//           <Box sx={ModalStyle} className="h-[80%] max-h-[80%]">
//             <form onSubmit={handleSubmit(onSubmitDataHandler)}>
//               <div className="grid grid-cols-1 md:grid-cols-1  w-full ">
//                 <CancelPresentationIconButton
//                   onClick={() => {
//                     props.handleClose();
//                     reset(defaultValues);
//                   }}
//                 />
//               </div>
//               <div className="text-xl text-center text-gray-700 mb-4">
//                 Add Enquiry
//               </div>
//               <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full gap-2">
//                 <div className="w-full">
//                   <DropdownField
//                     error={errors.unit}
//                     control={control}
//                     //handleChange={handleChange}
//                     name="unit"
//                     dataArray={unit}
//                     placeholder="Unit"
//                     isMulti={false}
//                     isSearchable={false}
//                     isClearable={false}
//                   />
//                 </div>
//                 <div className="w-full">
//                   <DropdownField
//                     control={control}
//                     handleChange={handleChange}
//                     error={errors.itemType}
//                     name="itemType"
//                     dataArray={itemTypeOptions}
//                     placeholder="Item Type"
//                     inputRef={{
//                       ...register("itemType", {
//                         onChange: (e) => {
//                           console.log("Get itemType Id is", e.target.value.id);
//                           setItemsTypeId(e.target.value.id);
//                         },
//                       }),
//                     }}
//                   />
//                 </div>
//                 <div className="w-full">
//                   <DropdownField
//                     control={control}
//                     //handleChange={handleChange}
//                     error={errors.itemCategory}
//                     name="itemCategory"
//                     dataArray={itemCategory}
//                     placeholder="Item Category"
//                     inputRef={{
//                       ...register("itemCategory", {
//                         onChange: (e) => {
//                           setItemsCategoryId(e.target.value.id);
//                           console.log("Item Category id is", e.target.value.id);
//                         },
//                       }),
//                     }}
//                   />
//                 </div>
//                 <div className="w-full">
//                   <DropdownField
//                     control={control}
//                     //handleChange={handleChange}
//                     error={errors.supplierMasters}
//                     name="supplierMasters"
//                     dataArray={suppliers}
//                     placeholder="Suppliers*"
//                     isMulti={true}
//                     isSearchable={false}
//                     isClearable={false}
//                   />
//                 </div>
//                 <div className="w-full">
//                   <DropdownField
//                     control={control}
//                     //handleChange={handleChange}
//                     name="store"
//                     // dataArray={itemOptions}
//                     placeholder="Store"
//                     isMulti={true}
//                     isSearchable={false}
//                     isClearable={false}
//                   />
//                 </div>
//                 <div className="w-full underline text-customBlue text-base pt-4">
//                   <a
//                     href="#"
//                     onClick={() => {
//                       handleHeaderOpen();
//                     }}
//                   >
//                     Show Header
//                   </a>
//                 </div>
//               </div>
//               <hr className="w-full my-2 border-t-2 border-customBlue" />

//               <div className="gap-2  grid grid-cols-3 xl:grid-cols-6 2xl:grid-cols-9">
//                 <div className="flex gap-2 w-full col-span-3">
//                   <div className="text-lg text-gray-700 text-center whitespace-nowrap">
//                     Item Info
//                   </div>
//                   <div className=" grid grid-cols-3 w-full gap-2 z-10">
//                     <div className="col-span-2">
//                       <SearchDropdown
//                         name="itemMaster"
//                         placeholder="Search Item"
//                         dataArray={itemOptions}
//                         handleInputChange={handleChange}
//                         onChange={autoSelectedValue}
//                         searchIcon={true}
//                         error={errors.itemMaster}
//                         control={control}
//                       />
//                     </div>
//                     <div className="w-full hidden xl:block                                                    ">
//                       <InputField
//                         // sx={{background:"white"}}
//                         name="uom"
//                         variant="outlined"
//                         label="U.O.M"
//                         disabled={true}
//                         // error={errors.uom}
//                         control={control}
//                         inputProps={{ style: { textTransform: "capitalize" } }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full xl:hidden">
//                   <InputField
//                     // sx={{background:"white"}}
//                     name="uom"
//                     variant="outlined"
//                     label="U.O.M"
//                     disabled={true}
//                     // error={errors.uom}
//                     control={control}
//                     inputProps={{ style: { textTransform: "capitalize" } }}
//                   />
//                 </div>
//                 <div className="w-full grid gap-2 grid-cols-5">
//                   <div className="col-span-2">
//                     <InputField
//                       name="quantity"
//                       variant="outlined"
//                       label="Qty"
//                       // type="number"
//                       error={errors.quantity}
//                       control={control}
//                     />
//                     <p className="text-customRed text-sm">{qtyErrorMessage}</p>
//                   </div>

//                   <div className="col-span-3">
//                     <InputField
//                       name="packSize"
//                       variant="outlined"
//                       label="Pack Size"
//                       error={errors.packSize}
//                       control={control}
//                       inputProps={{ style: { textTransform: "capitalize" } }}
//                     />
//                     <p className="text-customRed text-sm">{packsizeMessage}</p>
//                   </div>
//                 </div>
//                 <div className="w-full flex gap-2 col-span-2">
//                   <InputField
//                     name="remarks"
//                     variant="outlined"
//                     label="Remark"
//                     control={control}
//                     inputProps={{ style: { textTransform: "capitalize" } }}
//                   />
//                   <AddTypeButton
//                     onClick={() => {
//                       // handleItemSearchErrorMesg()
//                       addItemsData();
//                       handleItemErrorMesg();
//                       handleQtyErrorMesg();
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="w-full">
//                 {data.hasOwnProperty("result") ? (
//                   // data.result.length >= 0 &&
//                   // data.statusCode === 200 &&
//                   // spinner === false ? (
//                   <>
//                     <PurchaseEnquiryTable
//                       searchString={searchString}
//                       dataResult={dataResult}
//                       setDataResult={setDataResult}
//                       data={data}
//                       page={page}
//                       setPage={setPage}
//                       rowsPerPage={rowsPerPage}
//                       setRowsPerPage={setRowsPerPage}
//                       count={count}
//                     />
//                   </>
//                 ) : null}
//               </div>
//               <div className="my-2">
//                 <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
//                   <div className="xl:col-span-2">
//                     <TextareaAutosize
//                       control={control}
//                       minRows={2}
//                       placeholder="Note"
//                       style={{
//                         width: "100%",
//                         border: "1px solid black",
//                         padding: "1rem",
//                       }}
//                       name="note"
//                       value={noteValue}
//                       onChange={(event) => {
//                         setNoteValue(event.target.value);
//                       }}
//                     />
//                   </div>
//                   <div className="xl:col-span-2">
//                     <TextareaAutosize
//                       control={control}
//                       minRows={2}
//                       placeholder="Terms & Conditions"
//                       style={{
//                         width: "100%",
//                         border: "1px solid black",
//                         padding: "1rem",
//                       }}
//                       name="termsAndConditions"
//                       value={termsConditions}
//                       onChange={(e) => {
//                         setTermsCondition(e.target.value);
//                         console.log("Terms value is:", termsConditions);
//                       }}
//                     />
//                   </div>
//                   <div className="flex justify-end gap-2 col-span-2 xl:col-span-1">
//                     <ResetButton
//                       onClick={() => {
//                         setNewHeader("");
//                         reset(defaultValues);
//                       }}
//                     />
//                     <SubmitButton />
//                   </div>
//                 </div>
//               </div>
//             </form>
//             <HeaderModal
//               openHeader={openHeader}
//               setOpenHeader={setOpenHeader}
//               handleHeaderOpen={handleHeaderOpen}
//               handleHeaderClose={handleHeaderClose}
//             />
//           </Box>
//         </Modal>
//         <ConfirmationModal
//           confirmationOpen={openPost}
//           confirmationHandleClose={handleClosePost}
//           confirmationSubmitFunc={addRecord}
//           confirmationLabel="Confirmation"
//           confirmationMsg="Are you sure want to add this record ?"
//           confirmationButtonMsg="Add"
//         />
//       </div>
//     </>
//   );
// };

// export default PurchaseEnquiryModal;



import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import InputField from "../../../Common Components/FormFields/InputField";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import PurchaseEnquiryTable from "./PurchaseEnquiryTable";
import HeaderModal from "./HeaderModal";
import {
  TextareaAutosize,
} from "@mui/material";
import { Box } from "@mui/material";
import { Modal } from "@mui/material";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import {
  getAllSupplier,
  getItemType,
  getUnitlist,
  getAllItemCategory,
} from "../../commonservices/CommonService";
import AddTypeButton from "../../../Common Components/Buttons/AddTypeButton";
import {
  errorAlert,
  successAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import {
  autoItemService,
  addNewEnquiry,
} from "../../services/enquiry/EnquiryServices";

const PurchaseEnquiryModal = (props) => {
  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    overflowY: "scroll",
    bgcolor: "background.paper",
    border: "1px solid gray",
    boxShadow: 20,
    py: 2,
    px: 2,
  };

  const [newHeader, setNewHeader] = useState("");
  const [noteValue, setNoteValue] = React.useState("");
  const [termsConditions, setTermsCondition] = React.useState("");
  const [openHeader, setOpenHeader] = React.useState(false);
  const handleHeaderOpen = () => setOpenHeader(true);
  const handleHeaderClose = () => setOpenHeader(false);
  const [itemData, setItemData] = React.useState([]);
  // const [dataResult, setDataResult] = React.useState([]);

  // const [itemSearchErrorMessage, setItemsearchErrorMessage] = React.useState("");
  const [unit, setUnit] = React.useState([]);
  const [itemTypeOptions, setItemTypeOptions] = React.useState();
  const [itemsTypeId, setItemsTypeId] = useState(null);
  const [itemCategory, setItemCategory] = React.useState();
  const [itemsCategoryeId, setItemsCategoryId] = useState(null);
  const [suppliers, setSuppliers] = React.useState([]);

  const [finalData, setFinalData] = React.useState({});
  const [openPost, setOpenPost] = React.useState(false);

  const [itemOptions, setItemOption] = React.useState([]);
  const [itemErrorMessage, setItemErrorMessage] = React.useState("");
  const [packsizeMessage, setpacksizeErrorMessage] = React.useState("");
  const [qtyErrorMessage, setQtyErrorMessage] = React.useState("");
  const [supplierAlert , setSupplierAlert] = React.useState("");

  const [headerStore, setHeaderStore] = React.useState("");
  const handleItemMasterErrorMesg = () => {
    let itemMasterError = getValues("itemMaster");
    if (itemMasterError === null) {
      setItemErrorMessage("Required");
    } else if (itemMasterError !== null) {
      setItemErrorMessage("");
    }
  };

  const handlePackSizeErrorMesg = () => {
    let packsizeError = getValues("packSize");
    if (packsizeError === "") {
      setpacksizeErrorMessage("Required");
    } else if (packsizeError !== "") {
      setpacksizeErrorMessage("");
    }
  };
  const handleQtyErrorMesg = () => {
    let Qty = getValues("quantity");
    if (Qty === "") {
      setQtyErrorMessage("Required");
    } else if (Qty !== "" && Qty <= 1) {
      setQtyErrorMessage("");
    }
  };
  const handleClosePost = () => {
    console.log("Post modal is going to close");
    if (openPost) {
      setOpenPost(false);
    }
  };

  const defaultValues = {
    unit: null,
    itemType: null,
    itemCategory: null,
    supplierMasters: null,
    store: null,
    itemMaster: null,
    uom: "",
    quantity: "",
    packSize: "",
    remarks: "",
    note: "",
    termsAndConditions: "",
  };

  // const handleItemSearchErrorMesg = () => {
  //   let searvicError = getValues("services");
  //   if (searvicError === null) {
  //     setItemsearchErrorMessage("Required");
  //   } else if (searvicError !== null) {
  //     setItemsearchErrorMessage("");
  //   }
  // };

  const schema = yup.object().shape({
    supplierMasters: yup
      .array()
      .nullable()
      .min(1, "Required")
      .of(
        yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        })
      )
      .required("Select atleast 1 supplier"),
  });

  const {
    control,
    handleSubmit,
    reset,
    register,
    getValues,
    setValue,
    watch,
    isValid,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleChange = (autoSearchItemString) => {
    console.log("handleChange has been invoked");

    console.log(
      "The value of service that was typed is " + autoSearchItemString
    );
    let supplierData = getValues("supplierMasters")
    if(supplierData === null ){
      setSupplierAlert("Plz Select Supplier!!")
    }
    else if(supplierData  !== null) {
      setSupplierAlert("");
    }
    if (
      itemsTypeId !== null &&
      itemsCategoryeId !== null &&
      autoSearchItemString !== ""

    ) {
      // {"message":"item class found.","result":[{"label":"AMANTREL 100 MG CAP","value":14,"uom":1,"id":14},{"uom":1,"label":"ACUTRET TAB 20MG","value":5,"id":5},{"uom":1,"label":"ACUTRET TAB 10MG","value":4,"id":4},{"label":"ANTOXID CAP","value":21,"uom":265,"id":21}],"statusCode":200}

      autoItemService(itemsTypeId, itemsCategoryeId, autoSearchItemString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          // setValue("uom", "");
          setItemOption(res.result);
          setItemErrorMessage("");
          setpacksizeErrorMessage("");
          setQtyErrorMessage("");
        })
        .catch((error) => {
          console.log("Item Error is: ", error);
        });
    }
  };

  function postEnquiry(obj) {
    console.log("Post Enquiry function called");
    addNewEnquiry(obj)
      .then((response) => {
        console.log("POSTED OBJ of Enquiry IS ", JSON.stringify(response));
        console.log(JSON.stringify(response));
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
        }

      })
      .catch((error) => {
        errorAlert(error.message);
        console.log("error msg" + error.message);
      });
  }

  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    postEnquiry(finalData);
  }

  const onSubmitDataHandler = (data) => {
    console.log("The Value is" + JSON.stringify(data));
    let postObj = {
      unit: {
        id: data.unit.id,
      },
      enquiryDetails: itemData,
      header: headerStore,
      note: data.note,

      supplierMasters: data.supplierMasters,

      termsAndConditions: data.termsAndConditions,
      totalQuantity: data.totalQuantity,
    };

    console.log("postObj", postObj);

    setFinalData(postObj);
    setOpenPost(true);
  };

  //API For unit dropdown list
  useEffect(() => {
    getUnitlist(unit)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setUnit(res.result);
      });

    //API For unit dropdown list
    getAllSupplier(suppliers)
      .then((response) => response.data)
      .then((res) => {
        console.log(res);
        setSuppliers(res.result);
      });

    //API For Item Type dropdown list
    getItemType()
      .then((response) => response.data)
      .then((res) => {
        console.log("Item Type ressult is", res);
        setItemTypeOptions(res.result);
      });
  }, []);

  //API For unit dropdown list
  useEffect(() => {
    if (itemsTypeId !== null) {
      getAllItemCategory(itemsTypeId)
        .then((response) => response.data)
        .then((res) => {
          console.log(res);
          setItemCategory(res.result);
        })
        .catch((error) => {
          console.log("Error Response of Item Category is :", error);
        });
    }
    console.log("Form is Valid", isValid);
  }, [itemsTypeId, isValid]);

  const addItemsData = () => {
    let itemMaster = getValues("itemMaster");
    let uom = getValues("uom");
    let quantity = getValues("quantity");
    let packSize = getValues("packSize");
    let remarks = getValues("remarks");

    if (
      itemMaster !== null &&
      uom !== "" &&
      quantity !== "" &&
      packSize !== ""
    ) {
      console.log("Items Master", itemMaster);
      // {uom: 1, label: 'ACUTRET TAB 20MG', value: 5, id: 5}
      let itemObj = {
        itemMaster: {
          id: itemMaster.id,
          label: itemMaster.label,
        },
        uom: uom,
        packSize: packSize,
        quantity: quantity,
        remark: remarks,
      };
      let arr = [...itemData];
      arr.push(itemObj);

      // let dataObj = itemData;
      // let arrNew = dataObj.result;
      // arrNew.push(itemObj);
      // dataObj.result = arrNew;
      setItemData(arr);
      // setDataResult(arr);
      console.log("ItemObj is ", itemObj);
      // reset()
    }
  };

  let item = watch("itemMaster");
  useEffect(() => {
    if (item !== null) {
      setValue("uom", 1);
      setValue("quantity", 1);
    }
    log("",item);
    setValue("uom",item.uom)

  },[item]);

  return (
    <>
      <div className="m-2">
        <Modal open={props.openModal}>
          <Box sx={ModalStyle} className="h-[80%] max-h-[80%]">
              <form onSubmit={handleSubmit(onSubmitDataHandler)}>
                <div className="grid grid-cols-1 md:grid-cols-1  w-full ">
                  <CancelPresentationIconButton
                    onClick={() => {
                      props.handleClose();
                      setItemData([]);
                      reset(defaultValues);
                    }}
                  />
                </div>
            <fieldset className="border border-gray-300 text-left px-2  py-2 rounded mt-4">
              <legend className="px-2 ml-3 lg:ml-0 font-bold text-gray-800">
                Enquiry
              </legend>
                {/* <div className="text-xl text-center text-gray-700 mb-4">
                Add Enquiry
              </div> */}

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full gap-2">
                  <div className="w-full">
                    <DropdownField
                      error={errors.unit}
                      control={control}
                      //handleChange={handleChange}
                      name="unit"
                      dataArray={unit}
                      placeholder="Unit"
                      isMulti={false}
                      isSearchable={false}
                      isClearable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      handleChange={handleChange}
                      error={errors.itemType}
                      name="itemType"
                      dataArray={itemTypeOptions}
                      placeholder="Item Type"
                      inputRef={{
                        ...register("itemType", {
                          onChange: (e) => {
                            console.log(
                              "Get itemType Id is",
                              e.target.value.id
                            );
                            setItemsTypeId(e.target.value.id);
                          },
                        }),
                      }}
                      isMulti={false}
                      isClearable={false}
                      isSearchable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      error={errors.itemCategory}
                      name="itemCategory"
                      dataArray={itemCategory}
                      placeholder="Item Category"
                      inputRef={{
                        ...register("itemCategory", {
                          onChange: (e) => {
                            setItemsCategoryId(e.target.value.id);
                            console.log(
                              "Item Category id is",
                              e.target.value.id
                            );
                          },
                        }),
                      }}
                      isMulti={false}
                      isClearable={false}
                      isSearchable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      error={errors.supplierMasters}
                      name="supplierMasters"
                      dataArray={suppliers}
                      placeholder="Suppliers*"
                      isMulti={true}
                      isSearchable={false}
                      isClearable={false}
                    />
                    <p className="text-customRed text-sm">{supplierAlert}</p>
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      //handleChange={handleChange}
                      name="store"
                      // dataArray={itemOptions}
                      placeholder="Store"
                      isMulti={true}
                      isSearchable={false}
                      isClearable={false}
                    />
                  </div>
                  <div className="w-full underline text-customBlue text-base pt-4">
                    <a
                      href="#"
                      onClick={(value) => {
                        handleHeaderOpen();
                      }}
                    >
                      Show Header
                    </a>
                  </div>
                </div>
                <hr className="w-full my-2 border-t-2 border-customBlue" />

                <div className="gap-2  grid grid-cols-3 xl:grid-cols-6 2xl:grid-cols-9">
                  <div className="flex gap-2 w-full col-span-3">
                    <div className="text-lg text-gray-700 text-center whitespace-nowrap">
                      Item Info
                    </div>
                    <div className=" grid grid-cols-3 w-full gap-2 z-10">
                      <div className="col-span-2">
                        <SearchDropdown
                          name="itemMaster"
                          placeholder="Search Item"
                          dataArray={itemOptions}
                          handleInputChange={handleChange}
                          // onChange={autoSelectedValue}
                          searchIcon={true}
                          error={errors.itemMaster}
                          control={control}
                        />
                        <p className="text-customRed text-sm">
                          {itemErrorMessage}
                        </p>
                      </div>
                      <div className="w-full hidden xl:block                                                    ">
                        <InputField
                          // sx={{background:"white"}}
                          name="uom"
                          variant="outlined"
                          label="U.O.M"
                          disabled={true}
                          // error={errors.uom}
                          control={control}
                          inputProps={{
                            style: { textTransform: "capitalize" },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full xl:hidden">
                    <InputField
                      // sx={{background:"white"}}
                      name="uom"
                      variant="outlined"
                      label="U.O.M"
                      disabled={true}
                      // error={errors.uom}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  <div className="w-full grid gap-2 grid-cols-5">
                    <div className="col-span-2">
                      <InputField
                        name="quantity"
                        variant="outlined"
                        label="Qty"
                        // type="number"
                        error={errors.quantity}
                        control={control}
                      />
                      <p className="text-customRed text-sm">
                        {qtyErrorMessage}
                      </p>
                    </div>

                    <div className="col-span-3">
                      <InputField
                        name="packSize"
                        variant="outlined"
                        label="Pack Size"
                        error={errors.packSize}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                      <p className="text-customRed text-sm">
                        {packsizeMessage}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex gap-2 col-span-2">
                    <InputField
                      name="remarks"
                      variant="outlined"
                      label="Remark"
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                    <AddTypeButton
                      onClick={() => {
                        handleItemMasterErrorMesg();
                        handlePackSizeErrorMesg();
                        handleQtyErrorMesg();
                        addItemsData();
                        setValue("itemMaster", null);
                        setValue("uom", "");
                        setValue("packSize", "");
                        setValue("quantity", "");
                        setValue("remarks", "");
                      }}
                    />
                  </div>
                </div>

                <div className="w-full">
                  {/* {itemData.hasOwnProperty("result") ? ( */}
                  {/* // data.result.length >= 0 &&
                  // data.statusCode === 200 &&
                  // spinner === false ? ( */}
                  <>
                    <PurchaseEnquiryTable
                      // dataResult={dataResult}
                      // setDataResult={setDataResult}
                      itemData={itemData}
                      setItemData={setItemData}
                    />
                  </>
                  {/* ) : null} */}
                </div>
                <div className="my-2">
                  <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
                    <div className="xl:col-span-2">
                      <TextareaAutosize
                        {...register("note")}
                        control={control}
                        minRows={2}
                        placeholder="Note"
                        style={{
                          width: "100%",
                          border: "1px solid gray",
                          padding: "1rem",
                        }}
                        name="note"
                        value={noteValue}
                        onChange={(event) => {
                          setNoteValue(event.target.value);
                        }}
                      />
                    </div>
                    <div className="xl:col-span-2">
                      <TextareaAutosize
                        {...register("termsAndConditions")}
                        control={control}
                        minRows={2}
                        placeholder="Terms & Conditions"
                        style={{
                          width: "100%",
                          border: "1px solid gray",
                          padding: "1rem",
                        }}
                        name="termsAndConditions"
                        value={termsConditions}
                        onChange={(e) => {
                          setTermsCondition(e.target.value);
                          console.log("Terms value is:", termsConditions);
                        }}
                      />
                    </div>
                    <div className="flex justify-end gap-2 col-span-2 xl:col-span-1">
                      <ResetButton
                        onClick={() => {
                          setNewHeader("");
                          reset(defaultValues);
                        }}
                      />
                      <SubmitButton />
                    </div>
                  </div>
                </div>
            </fieldset>
              </form>
            <HeaderModal
              headerStore={headerStore}
              setHeaderStore={setHeaderStore}
              openHeader={openHeader}
              setOpenHeader={setOpenHeader}
              handleHeaderOpen={handleHeaderOpen}
              handleHeaderClose={handleHeaderClose}
            />
          </Box>
        </Modal>
        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={handleClosePost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
      </div>
    </>
  );
};

export default PurchaseEnquiryModal;

