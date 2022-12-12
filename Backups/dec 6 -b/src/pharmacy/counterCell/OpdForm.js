import React from "react";
import InputField from "../../Common Components/FormFields/InputField";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import ResetButton from "../../Common Components/Buttons/ResetButton";
import SearchBillsButton from "../../Common Components/Buttons/SearchBillsButton";
import ProceedButton from "../../Common Components/Buttons/ProceedButton";
import CheckBoxField from "../../Common Components/FormFields/CheckBoxField";
import { useForm } from "react-hook-form";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
function OpdForm(props) {

    const schema = yup.object().shape({
      remark: yup
        .string()
        .required("Required")
        .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
      discount: yup
        .string()
        .required("Required")
        .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
      discountAmount: yup
        .string()
        .required("Required")
        .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
      tax: yup
        .object()
        .required("Required")
        .nullable()
        .shape({
          value: yup.string().required("Please Select Group"),
          label: yup.string().required("Please Select Group"),
        }),
      paidAmount: yup
        .string()
        .required("Required")
        .matches(/^[a-zA-Z\s]+$/, "Numbers & Special Char Not Allow"),
    });

  const defaultValues = {
 
    remark: "",
    discount: "",
    discountAmount: "",
    tax: null,
    paidAmount: "",
  };
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    //to set the form fields as blank
    reset(defaultValues);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitDataHandler)}>
        <div className=" grid grid-cols-2 lg:grid-cols-4 items-center gap-2 border-t-2  border-t-customBlue py-2">
       
          <div>
            <h1 className="flex items-center space-x-5">
              <span className="flex space-x-12">
                <span>Total Item</span> <span>:</span>
              </span>
              <span>25</span>
            </h1>
          </div>
          <div>
            <h1 className="flex items-center space-x-5">
              <span className="flex space-x-5">
                <span>Total Quantity</span>
                <span>:</span>
              </span>
              <span>255</span>
            </h1>
          </div>
          <div>
            <h1 className="flex items-center space-x-5">
              <span className="flex space-x-20">
                <span>Credit</span>
                <span>:</span>
              </span>
              <span>255</span>
            </h1>
          </div>
          <InputField
            name="remark"
            variant="outlined"
            label="Remark*"
            error={errors.remark}
            control={control}
            inputProps={{ style: { textTransform: "capitalize" } }}
          />
          <div className="flex items-center space-x-2">
            <InputField
              name="discount"
              variant="outlined"
              label="Discount (%)"
              error={errors.discount}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
            <InputField
              name="discountAmount"
              variant="outlined"
              label="Discount Amount"
              error={errors.discountAmount}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
          </div>
          <div>
            <DropdownField
              control={control}
              error={errors.tax}
              name="tax"
              placeholder="Tax"
              //   dataArray={groupOptions}
              isDisabled={props.edit}
            />
          </div>
          <div>
            <h1 className="flex items-center space-x-5">
              <span className="flex space-x-16">
                <span>GST Amt</span> <span>:</span>
              </span>
              <span>12322</span>
            </h1>
          </div>
          <div>
            <h1 className="flex items-center space-x-5">
              <span className="flex space-x-4 items-center">
                <spn>Rounding Amt</spn>
                <span>:</span>
              </span>
              <span>0.25</span>
            </h1>
          </div>
          <div>
            <h1 className="flex items-center space-x-5">
              <span className="flex space-x-8 ">
                <span>Net Pay Amt</span> <span className="pl-0.5"> :</span>
              </span>
              <span>25</span>
            </h1>
          </div>

          <div>
            <CheckBoxField
              control={control}
              name="cashPayment"
              label="Cash Payment"
              value="Cash Payment"
            />
          </div>
          <div>
            <InputField
              name="paidAmount"
              variant="outlined"
              label="Paid Amount"
              error={errors.paidAmount}
              control={control}
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
          </div>
        </div>
        <div className="flex justify-end items-center space-x-3 my-2">
          <SearchBillsButton />
          <ResetButton />
          <ProceedButton />
        </div>
      </form>
    </div>
  );
}

export default OpdForm;
