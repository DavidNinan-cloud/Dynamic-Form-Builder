import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddButton } from "../../../../Common Components/Buttons/CommonButtons";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import InputField from "../../../../Common Components/FormFields/InputField";
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import SurgeryTable from "../../OTBooking/SurgeryTable"
import { useEffect } from "react";
const SurgeryDiscription = {
  result: [
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
    {
      Code: 1,
      "Surgery Discription": "Anesthesiologists",
      Rate: "5000",
      Quantity: "1",
      "Dr. Type": "Anesthesiologists",
      "Dr. Name": "Dr. Jayant Patil",
      "Dr. Fees": "1000",
      Employee: "Amol Palekar, Amit Jadhav",
      "Total Amount": "6000",
      "Net Amount": "6000",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

const SurgeryDetails = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({ result: [], actions: [] });
  const [dataResult, setDataResult] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);

  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();

  useEffect(() => {
    setData(SurgeryDiscription);
    setDataResult(SurgeryDiscription.result);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <div>
          <Controller
            control={control}
            name="group"
            render={({ field }) => (
              <DropdownField
                name="group"
                placeholder="Group"
                control={control}
              />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="subGroup"
            render={({ field }) => (
              <DropdownField
                name="subGroup*"
                placeholder="Sub Group"
                control={control}
                error={errors.subGroup}
              />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="theaterService"
            render={({ field }) => (
              <DropdownField
                name="theaterService"
                placeholder="Theater Service"
                control={control}
                error={errors.theaterService}
              />
            )}
          />
        </div>
        <div className="col-span-2 xl:col-span-3 text-base font-semibold">
          Surgery Description
        </div>
        <div>
          <SearchBar
            name="surgeryProcedure"
            placeholder="Surgery Procedure"
            searchIcon={true}
          />
        </div>
        <div className="flex gap-2">
          <div>
            <InputField name="surgeryRate" label="Surgery Rate" />
          </div>
          <div>
            <InputField name="qty" label="Qty" />
          </div>
        </div>
        <div>
          <DropdownField
            name="drType"
            placeholder="Dr. Type*"
            control={control}
            error={errors.drType}
          />
        </div>
        <div>
          <DropdownField
            name="drName"
            placeholder="Dr. Name*"
            control={control}
            error={errors.drName}
          />
        </div>
        <div>
          <InputField name="drFees" label="Dr. Fees" control={control} />
        </div>
        <div>
          <DropdownField
            name="employeeName"
            placeholder="Employee Name"
            control={control}
            isMulti={true}
          />
        </div>
        <div className="flex justify-end col-span-2 xl:col-span-3">
          <AddButton />
        </div>
      </div>
      <div>
        {data.hasOwnProperty("result") &&
        data.result.length > 0 &&
        data.statusCode === 200 &&
        spinner === false ? (
          <SurgeryTable
            searchString={searchString}
            dataResult={dataResult}
            setDataResult={setDataResult}
            data={data}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            count={count}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SurgeryDetails;
