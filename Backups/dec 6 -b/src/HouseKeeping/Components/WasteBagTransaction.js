import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Divider, TextField } from "@mui/material";
import SearchIconButton from "../../Common Components/Buttons/SearchIconButton";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import InputField from "../../Common Components/FormFields/InputField";
import RadioField from "../../Common Components/FormFields/RadioField";
import CommonTable from "../Common/CoomonTable";
import AddButton from "../../Common Components/Buttons/AddButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const WasteBagTransaction = () => {
  const BagType = [
    {
      label: "Red-Red Bag",
      value: "Red-Red Bag",
    },
    {
      label: "Blue-Blue Bag",
      value: "Blue-Blue Bag",
    },
    {
      label: "Black-Black Bag",
      value: "Black-Black Bag",
    },
    {
      label: "Yellow-Yellow Bag",
      value: "Yellow-Yellow Bag",
    },
    {
      label: "Green-Green Bag",
      value: "Green-Green Bag",
    },
  ];
  const covid = [
    {
      id: "Covid",
      value: "Covid",
      label: "Covid",
    },
    {
      id: "Non-Covid",
      value: "Non-Covid",
      label: "Non-Covid",
    },
  ];

  const WasteBag = {
    result: [
      {
        "Transaction Date": "30/11/2022",
        "Bag Type": "Red-Red Bag",
        Quantity: 2,
        Weight: "15 kg",
        IsNonCovid: true,
      },
      {
        "Transaction Date": "30/11/2022",
        "Bag Type": "Blue-Blue Bag",
        Quantity: 2,
        Weight: "15 kg",
        IsNonCovid: true,
      },
      {
        "Transaction Date": "30/11/2022",
        "Bag Type": "Black-Black Bag",
        Quantity: 2,
        Weight: "15 kg",
        IsNonCovid: true,
      },
      {
        "Transaction Date": "30/11/2022",
        "Bag Type": "Yellow-Yellow Bag",
        Quantity: 2,
        Weight: "15 kg",
        IsNonCovid: true,
      },
      {
        "Transaction Date": "30/11/2022",
        "Bag Type": "Green-Green Bag",
        Quantity: 2,
        Weight: "15 kg",
        IsNonCovid: true,
      },
    ],
    statusCode: 200,
    actions: ["Edit", "Print"],
  };

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const schema = yup
    .object()
    .shape({
      bagType: yup
        .object()
        .required("Required")
        .nullable()
        .shape({
          value: yup.string().required("Please Select Bag Type"),
          label: yup.string().required("Please Select Bag Type"),
        }),
      qty: yup.number().required("Required"),
      weight: yup.string().required("Required"),
    })
    .required();

  const defaultValues = {
    bagType: null,
    qty: "",
    weight: "",
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmitDataHandler = (data) => {
    console.log("Data is", data);
  };
  return (
    <>
      <div className="mt-20 mx-2 text-xl font-semibold">Waste Bag Transaction</div>
      <div className="lg:flex lg:flex-row-reverse lg:gap-x-2">
        <div className="lg:w-[45%] xl:w-[35%]">
          <div className="flex gap-2">
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="From Date"
                  value={fromDate}
                  disableFuture
                  onChange={(newValue) => {
                    setFromDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="To Date"
                  value={toDate}
                  disableFuture
                  onChange={(newValue) => {
                    setToDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div>
              <SearchIconButton />
            </div>
          </div>
          <hr className="my-2" />
          <form onSubmit={handleSubmit(onSubmitDataHandler)}>
            <div className="flex lg:grid lg:grid-cols-4 gap-2 items-center">
              <div className="w-full lg:col-span-2">
                <DropdownField
                  control={control}
                  placeholder="Bag Type"
                  name="bagType"
                  dataArray={BagType}
                  error={errors.bagType}
                />
              </div>
              <div className="">
                <InputField
                  control={control}
                  label="Qty"
                  name="qty"
                  error={errors.qty}
                />
              </div>
              <div className="">
                <InputField
                  control={control}
                  label="Weight"
                  name="weight"
                  error={errors.weight}
                />
              </div>
              <div className="flex w-[45rem] lg:w-full lg:col-span-3">
                <RadioField control={control} name="covid" dataArray={covid} />
              </div>
              <div>
                <AddButton />
              </div>
            </div>
          </form>
        </div>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ color: "black", borderRightWidth: 2 }}
        />
        <div className="lg:w-[55%] xl:w-[65%]">
          <CommonTable data={WasteBag} />
        </div>
      </div>
    </>
  );
};

export default WasteBagTransaction;
