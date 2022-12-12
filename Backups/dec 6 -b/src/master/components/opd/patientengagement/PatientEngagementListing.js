//imports from react library
import React, { createContext, useEffect, useState } from "react";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";
//fromfield control liberary componant import
import CommonTable from "../patientengagement/common/CommonTable";
import SearchIcon from "@mui/icons-material/Search";
//fromfield control liberary componant import
import SearchBar from "../../../../Common Components/FormFields/SearchBar";
import PatientVisitMarkedListingTable from "./common/PatientVisitMarkedListingTable";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import ListOfGroupsDetails from "../patientengagement/ListOfGroupsDetails";
import PatientVisitMarkListingModal from "./PatientVisitMarkListingModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function PatientEngagement() {
  const schema = yup.object().shape({});
  const defaultValues = {
    patienttype: "ALL",
  };
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const previousDeatilsData = {
    message: "Apache Score list found ",
    result: [
      {
        Id: 1,
        DateAndTime: "01/02/2022 11:30 AM",
        PatientName: "OPD",
        AddedBy: "Lorem Ipsum Lorem",
        Description: "Lorem Ipsum has been the industry",
        Upload: "",
      },
      {
        Id: 2,
        DateAndTime: "02/02/2022 10:30 AM",
        PatientName: "IPD",
        AddedBy: "Lorem Ipsum Lorem",
        Description: "Lorem Ipsum has been the industry",
        Upload: "",
      },
      {
        Id: 3,
        DateAndTime: "02/02/2022 10:30 AM",
        PatientName: "OPD",
        AddedBy: "Lorem Ipsum Lorem",
        Description: "Lorem Ipsum has been the industry",
        Upload: "",
      },
      {
        Id: 4,
        DateAndTime: "06/02/2022 04:30 AM",
        PatientName: "IPD",
        AddedBy: "Lorem Ipsum Lorem",
        Description: "Lorem Ipsum has been the industry",
        Upload: "",
      },
      {
        Id: 5,
        DateAndTime: "08/02/2022 01:30 AM",
        PatientName: "OPD",
        AddedBy: "Lorem Ipsum Lorem",
        Description: "Lorem Ipsum has been the industry",
        Upload: "",
      },
      {
        Id: 5,
        DateAndTime: "08/02/2022 01:30 AM",
        PatientName: "OPD",
        AddedBy: "Lorem Ipsum Lorem",
        Description: "Lorem Ipsum has been the industry",
        Upload: "",
      },
      {
        Id: 5,
        DateAndTime: "08/02/2022 01:30 AM",
        PatientName: "OPD",
        AddedBy: "Lorem Ipsum Lorem",
        Description: "Lorem Ipsum has been the industry",
        Upload: "",
      },
      {
        Id: 5,
        DateAndTime: "08/02/2022 01:30 AM",
        PatientName: "OPD",
        AddedBy: "Lorem Ipsum Lorem",
        Description: "Lorem Ipsum has been the industry",
        Upload: "",
      },
    ],
    actions: ["xyz"],
    statusCode: 200,
    count: 5,
  };

  const resultList = {
    message: "List Of Groups Details Found",
    result: [
      {
        SrNo: 1,
        Description: "Lorem Ipsum is simply dummy text of the printing",
        SelectOptions: "",
        ReScheduleDate: "",
      },
      {
        SrNo: 2,
        Description: "Lorem Ipsum is simply dummy text of the printing",
        SelectOptions: "",
        ReScheduleDate: "",
      },
      {
        SrNo: 3,
        Description: "Lorem Ipsum is simply dummy text of the printing",
        SelectOptions: "",
        ReScheduleDate: "",
      },
      {
        SrNo: 4,
        Description: "Lorem Ipsum is simply dummy text of the printing",
        SelectOptions: "",
        ReScheduleDate: "",
      },
      {
        SrNo: 5,
        Description: "Lorem Ipsum is simply dummy text of the printing",
        SelectOptions: "",
        ReScheduleDate: "",
      },
      {
        SrNo: 6,
        Description: "Lorem Ipsum is simply dummy text of the printing",
        SelectOptions: "",
        ReScheduleDate: "",
      },
      {
        SrNo: 7,
        Description: "Lorem Ipsum is simply dummy text of the printing",
        SelectOptions: "",
        ReScheduleDate: "",
      },
      {
        SrNo: 8,
        Description: "Lorem Ipsum is simply dummy text of the printing",
        SelectOptions: "",
        ReScheduleDate: "",
      },
      {
        SrNo: 9,
        Description: "Lorem Ipsum is simply dummy text of the printing",
        SelectOptions: "",
        ReScheduleDate: "",
      },
      {
        SrNo: 10,
        Description: "Lorem Ipsum is simply dummy text of the printing",
        SelectOptions: "",
        ReScheduleDate: "",
      },
    ],
    actions: ["checkbox"],
    statusCode: 200,
    count: 5,
  };
  const data = {
    message: "Patient list found ",
    result: [
      {
        Id: 1,
        UHID: "2012512",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Male",
        Age: "27",
        Address: "Kothrud",
      },
      {
        Id: 2,
        UHID: "2012513",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Female",
        Age: "30",
        Address: "Kothrud",
      },
      {
        Id: 3,
        UHID: "2012514",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Male",
        Age: "25",
        Address: "Kothrud",
      },
      {
        Id: 4,
        UHID: "2012515",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Female",
        Age: "50",
        Address: "Kothrud",
      },
      {
        Id: 5,
        UHID: "2012516",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Male",
        Age: "25",
        Address: "Kothrud",
      },
      {
        Id: 6,
        UHID: "2012517",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Male",
        Age: "78",
        Address: "Kothrud",
      },
      {
        Id: 7,
        UHID: "2012518",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Female",
        Age: "25",
        Address: "Kothrud",
      },
      {
        Id: 8,
        UHID: "2012519",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Male",
        Age: "25",
        Address: "Kothrud",
      },
      {
        Id: 9,
        UHID: "2012520",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Female",
        Age: "25",
        Address: "Kothrud",
      },
      {
        Id: 10,
        UHID: "2012521",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Male",
        Age: "25",
        Address: "Kothrud",
      },
      {
        Id: 11,
        UHID: "2012524",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Female",
        Age: "25",
        Address: "Kothrud",
      },
      {
        Id: 12,
        UHID: "2012530",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Male",
        Age: "25",
        Address: "Kothrud",
      },
      {
        Id: 13,
        UHID: "2012821",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Female",
        Age: "25",
        Address: "Kothrud",
      },
      {
        Id: 14,
        UHID: "2012921",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Male",
        Age: "25",
        Address: "Kothrud",
      },
      {
        Id: 15,
        UHID: "2012451",
        PatientName: "Lorem ipsum dolor sit Lorem",
        Gender: "Female",
        Age: "25",
        Address: "Kothrud",
      },
    ],
  };

  const patienttype = [
    {
      id: "ALL",
      value: "ALL",
      label: "ALL",
    },
    {
      id: "OPD",
      value: "OPD",
      label: "OPD",
    },
    {
      id: "IPD",
      value: "IPD",
      label: "IPD",
    },
  ];
  return (
    <>
      <div className="mt-20 px-2 w-full bg-white pb-6">
        <div className="lg:flex lg:space-x-1 w-full">
          <form className="lg:w-[33%] xl:w-[25%]">
            <div className="  lg:grid-cols-1 grid gap-2 w-full my-2 lg:my-0 ">
              <div className="w-full lg:grid lg:grid-cols-1  md:grid md:grid-cols-3 gap-2 md:items-center">
                <fieldset className="border border-gray-300 col-span-3 md:col-span-1 w-full md:py-0 lg:py-2 text-left lg:px-2 rounded ">
                  <legend className="font-semibold text-sm text-gray-700 ml-2 lg:ml-1 lg:px-2">
                    Patient Type
                  </legend>

                  <div className="flex w-full justify-center items-center">
                    <RadioField
                      label=""
                      name="patienttype"
                      control={control}
                      dataArray={patienttype}
                    />
                  </div>
                </fieldset>

                <div className="flex lg:items-center gap-2 w-full col-span-2 lg:col-span-1 lg:pt-2 md:pt-2">
                  {/* searchable */}
                  <div className="w-full">
                    <SearchBar
                      type="button"
                      name="SearchableSelect"
                      placeholder="UHID/Patient Name"
                      // dataArray={options}
                      isSearchable={true}
                      // handleInputChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 ">
                    <button
                      className="h-9 px-3 border border-blue-500 rounded-md text-blue-500"
                      type="button"
                      variant="outlined"
                      size="small"
                      // onClick={filterData}
                    >
                      <SearchIcon className="cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="">
                <PatientVisitMarkedListingTable data={data} />
              </div>
            </div>
          </form>
          <div className="lg:border-l-2 w-full lg:grid  lg:grid-cols-1 xl:gap-2 md:mt-2 lg:mt-2 px-2">
            <div className="">
              {" "}
              <fieldset className="border border-gray-300 col-span-3 w-full lg:py-1 text-left lg:px-2 md:p-2 rounded ">
                <legend className="text-slate-900 px-4dddddddd font-bold text-lg">
                  OPD Coordinator
                </legend>
                <fieldset className="col-span-3 w-full lg:py-1 text-left lg:px-2 rounded ">
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-start">
                    <div className="flex gap-2">
                      <h1 className=" lg:space-x-24 md:space-x-14  text-black items-center font-semibold flex ">
                        <span className="">UHID</span>
                        <span className="">:</span>
                      </h1>
                      <h1 className="font-normal text-black lg:space-x-20">
                        1-231554{" "}
                      </h1>
                    </div>

                    <div className="flex items-center lg:space-x-6 md:space-x-11">
                      <h5 className="text-slate-900  pr-6 font-bold">
                        Gender{" "}
                      </h5>{" "}
                      <label className="text-slate-700">: Male</label>
                    </div>
                    <div className="flex items-center md:space-x-12">
                      <h5 className="text-slate-900 pr-4 font-bold">Age </h5>{" "}
                      <label className="text-slate-700">: 23 Y 02 M 04 D</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <h5 className="text-slate-900 pr-4 font-bold ">
                        Patient Name
                      </h5>{" "}
                      <label className="text-slate-700">
                        : Mr Suresh Subhash Patil
                      </label>
                    </div>
                    <div className="flex items-center lg:space-x-6 w-full md:space-x-4">
                      <h5 className="text-slate-900 pr-4 font-bold">
                        Address{" "}
                      </h5>{" "}
                      <label className="text-slate-700">: Kothtud , Pune</label>
                    </div>
                  </div>
                </fieldset>
              </fieldset>
            </div>
            <div className="w-full">
              <h6 className="text-slate-900 pr-4 font-bold text-lg py-1">
                Previous Details
              </h6>
              <CommonTable data={previousDeatilsData} />
            </div>
            <div className="w-full">
              <h6 className="text-slate-900 pr-2 font-bold text-lg py-1">
                List Of Groups and Details
              </h6>
              <ListOfGroupsDetails data={resultList} />

              <div className="flex gap-2 xl:col-span-3 justify-end pr-2 py-2">
                {/* Modal for Add */}
                <AddButton
                  onClick={() => {
                    handleOpen();
                  }}
                />
                <SaveButton
                  onClick={() => {
                    handleOpen();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
