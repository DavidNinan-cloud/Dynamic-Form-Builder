import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import SearchBar from "../../../Common Components/FormFields/SearchBar";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import InputField from "../../../Common Components/FormFields/InputField";
import AddButton from "../../../Common Components/Buttons/AddButton";
import ResetButton from "../../../Common Components/Buttons/ResetButton";
import PrintButton from "../../../Common Components/Buttons/PrintButton";
import SubmitButton from "../../../Common Components/Buttons/SubmitButton";
import PurchaseQuotationTable from "./PurchaseQuotationTable";
import QuatationModal from "./HeaderModal";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { Box } from "@mui/system";
import HeaderModal from "./HeaderModal";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import {
  getAllItemCategory,
  getAllSupplier,
  getItemType,
  getUnitlist,
} from "../../commonservices/CommonService";
import { autoItemService } from "../../services/enquiry/EnquiryServices";
import AddTypeButton from "../../../Common Components/Buttons/AddTypeButton";

const PurchaseQuotationModal = (props) => {
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
    py: 2,
    px: 2,
  };

  const [openHeader, setOpenHeader] = React.useState(false);
  const handleHeaderOpen = () => setOpenHeader(true);
  const handleHeaderClose = () => setOpenHeader(false);
  const [noteValue, setNoteValue] = React.useState("");
  const [termsConditions, setTermsCondition] = React.useState("");
  const [quotationdata, setQuotationData] = React.useState([]);
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

  const [headerStore, setHeaderStore] = React.useState(
    "Dear Sir, \n Please quote your lowest rates for the following as per the Terms & Conditions mentioned here below."
  );
  const defaultValues = {
    unit: null,
    itemType: null,
    itemCategory: null,
    supplier: null,
    store: null,
    itemMaster: null,
    uom: "",
    rate: "",
    quantity: "",
    amount: "",
    excise: "",
    tax: "",
    concession: "",
    netAmount: "",
    remarks: "",
    termsAndConditions: "",
    note:"",
    other: "",
    totalAmount: "",
    finalAmount: "",
    itemSearch: "",
  };

  const schema = yup.object().shape({
    supplier: yup
      .array()
      .required("Select atleast 1 supplier")
      .nullable()
      .min(1, "Required")
      .of(
        yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        })
      ),

    rate: yup
      .string()
      .required("Required")
      .min(0, "Required")
      .matches(/^[0-9]+$/, "Enter numeric value"),

    quantity: yup
      .string()
      .required("Required")
      .matches(/^\d+$/, "Enter numeric value"),

    excise: yup
      .string()
      .required("Required")
      .matches(/^\d+$/, "Enter numeric value"),

    tax: yup
      .string()
      .required("Required")
      .matches(/^\d+$/, "Enter numeric value"),

    itemSearch: yup
      .object()
      .required("Search item")
      .nullable()
      .shape({
        value: yup.string().required("Search item"),
        label: yup.string().required("Search item"),
      }),
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    register,
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

          setItemOption(res.result);
          // setItemErrorMessage("");
          // setpacksizeErrorMessage("");
          // setQtyErrorMessage("");
        })
        .catch((error) => {
          console.log("Item Error is: ", error);
        });
    }
  };

  let item = watch("itemMaster");
  // console.log("Item Master Object Here:", item);
  useEffect(() => {
    if (item !== null) {
      setValue("uom", item.uom);
      setValue("quantity", 1);
    }
  }, [item]);

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );

    // if (value === null) {
    //   setAutoCompleteObj("");
    // } else {
    //   setAutoCompleteObj(value);
    //   console.log(JSON.stringify(value));
    //   unitIdValue = getValues("unit").id;
    //   console.log("The unit id is " + unitIdValue);
    // }
  };

  const onSubmitDataHandler = (data) => {
    console.log("The Value is" + JSON.stringify(data));
  };

  let rate = watch("rate");
  let quantity = watch("quantity");
  let amount = Number(rate) * Number(quantity);
  setValue("amount", amount);

  let excise = watch("excise");
  useEffect(() => {
    if (excise !== null) {
      setValue("excise", 0);
    }
  }, []);
  let exciseVal = watch("excise");

  let tax = watch("tax");
  let gstTaxVal = (amount / 100) * Number(tax);

  console.log("gstTaxVal",gstTaxVal);
  // Amount-Conccesion = acVal
  // Excise+Tax = etVal

  // acVal+etVal = TotalAmount

  let concession = watch("concession");
  let amountMconceession = amount - Number(concession);

  console.log("amountMconceession", amountMconceession);


  let netAmount = amountMconceession + Number(exciseVal)+Number(gstTaxVal);
  setValue("netAmount", netAmount);

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
  }, [itemsTypeId]);

  const addQuotationItemData = () => {
    let itemMaster = getValues("itemMaster");
    let uom = getValues("uom");
    let quantity = getValues("quantity");
    let rate = getValues("rate");
    let amount = getValues("amount");
    let excise = getValues("excise");
    let tax = getValues("tax");
    let concession = getValues("concession");
    let netAmount = getValues("netAmount");
    let remarks = getValues("remarks");

    if (
      itemMaster !== null &&
      uom !== "" &&
      quantity !== "" &&
      rate !== "" &&
      amount !== "" &&
      excise !== "" &&
      tax !== "" &&
      concession !== "" &&
      netAmount !== ""
    ) {
      console.log("Items Master", itemMaster);
      // {uom: 1, label: 'ACUTRET TAB 20MG', value: 5, id: 5}
      let itemObj = {
        itemMaster: {
          id: itemMaster.id,
          label: itemMaster.label,
        },
        uom: uom,
        rate: rate,
        amount: amount,
        excise: excise,
        tax: tax,
        concession: concession,
        netAmount: netAmount,
        quantity: quantity,
        remark: remarks,
      };
      let arr = [...quotationdata];
      arr.push(itemObj);
      setQuotationData(arr);
      console.log("Quotation ItemObj is ", itemObj);
    }
  };

  return (
    <>
      <div className="m-2 border">
        <Modal
          open={props.openModal}
          onClose={() => {
            props.handleClose();
            reset(defaultValues);
            setQuotationData([]);
          }}
        >
          <Box sx={ModalStyle} className="h-[80%] max-h-[80%]">
            <div className="grid grid-cols-1 md:grid-cols-1 w-full ">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                  reset(defaultValues);
                  setQuotationData([]);
                }}
              />
            </div>
            <fieldset className="border border-gray-300 text-left px-4  py-2 rounded mt-4">
              <legend className="px-2 ml-3 lg:ml-0 font-bold text-gray-800">
                Quotation
              </legend>
              {/* <div className="text-xl text-center text-gray-700 mb-1">
              Add Quotation
            </div> */}
              <form onSubmit={handleSubmit(onSubmitDataHandler)}>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full gap-2">
                  <div className="w-full">
                    <DropdownField
                      control={control}
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
                      error={errors.supplierMasters}
                      name="supplierMasters"
                      dataArray={suppliers}
                      placeholder="Suppliers*"
                      isMulti={false}
                      isSearchable={false}
                      isClearable={false}
                    />
                  </div>
                  <div className="w-full">
                    <DropdownField
                      control={control}
                      name="store"
                      placeholder="Store"
                      isMulti={true}
                      isSearchable={false}
                      isClearable={false}
                    />
                  </div>
                  <div className="w-full underline text-blue-500 text-base pt-4">
                    <a
                      href="#"
                      onClick={() => {
                        handleHeaderOpen();
                      }}
                    >
                      Show Header
                    </a>
                  </div>
                </div>

                <hr className="w-full my-2 border-t-2 border-customBlue" />

                <div className="gap-2 my-2 grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
                  <div className="text-xl text-gray-700 mb-1 text-center xl:text-left col-span-3 lg:col-span-4 xl:col-span-1 2xl:col-span-1">
                    Item Inform.
                  </div>
                  <div className="col-span-2 lg:col-span-2">
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
                    {/* <p className="text-customRed text-sm">
                          {itemErrorMessage}
                        </p> */}
                  </div>
                  <div className="w-full">
                    <InputField
                      name="uom"
                      variant="outlined"
                      label="U.O.M"
                      disabled={true}
                      // error={errors.uom}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="rate"
                      variant="outlined"
                      label="Rate(Rs.)"
                      error={errors.rate}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="quantity"
                      variant="outlined"
                      label="Quantity"
                      error={errors.quantity}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="amount"
                      variant="outlined"
                      label="Amount(Rs.)"
                      // error={errors.amount}
                      control={control}
                      disabled={true}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="excise"
                      variant="outlined"
                      label="Excise(Rs.)"
                      error={errors.excise}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="tax"
                      variant="outlined"
                      label="GST(%)"
                      error={errors.tax}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="concession"
                      variant="outlined"
                      label="Concession(Rs.)"
                      // error={errors.concession}
                      control={control}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="netAmount"
                      variant="outlined"
                      label="Net Amount(Rs.)"
                      // error={errors.amount}
                      control={control}
                      disabled={true}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </div>
                  <div>
                    <AddTypeButton
                      onClick={() => {
                        // handleItemMasterErrorMesg();
                        // handlePackSizeErrorMesg();
                        // handleQtyErrorMesg();
                        addQuotationItemData();
                        setValue("itemMaster", null);
                        setValue("uom", "");
                        setValue("quantity", "");
                        setValue("rate", "");
                        setValue("amount", "");
                        setValue("excise", "");
                        setValue("tax", "");
                        setValue("concession", "");
                        setValue("netAmount", "");
                      }}
                    />
                  </div>
                </div>

                <div className="w-full">
                  {/* {data.hasOwnProperty("result") &&
                  data.result.length > 0 &&
                  data.statusCode === 200 ? ( */}
                  <>
                    <PurchaseQuotationTable
                      quotationdata={quotationdata}
                      setQuotationData={setQuotationData}
                    />
                  </>
                  {/* ) : null} */}
                </div>
                <div className="my-2">
                  <div className="flex gap-4 my-2 px-6 py-4 border border-slate-300 border-solid rounded">
                    <div className="w-full">
                      <InputField
                        name="totalAmount"
                        variant="outlined"
                        label="Total Amount(Rs.)"
                        // error={errors.totalAmount}
                        control={control}
                        disabled={true}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="other"
                        variant="outlined"
                        label="Other(Rs.)"
                        // error={errors.other}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="finalAmount"
                        variant="outlined"
                        label="Final Amount(Rs.)"
                        // error={errors.finalAmount}
                        control={control}
                        disabled={true}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-[70%]">
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
                    <div className="w-[30%]">
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
                  </div>
                  <div className=" my-1 flex justify-end gap-2">
                    <PrintButton />
                    <ResetButton
                      onClick={() => {
                        reset(defaultValues);
                      }}
                    />
                    <SubmitButton />
                  </div>
                </div>
              </form>
              <HeaderModal
                openHeader={openHeader}
                setOpenHeader={setOpenHeader}
                handleHeaderOpen={handleHeaderOpen}
                handleHeaderClose={handleHeaderClose}
              />
            </fieldset>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default PurchaseQuotationModal;
