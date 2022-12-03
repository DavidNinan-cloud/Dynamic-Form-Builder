import React from "react";
import DropdownField from "../../../../common/formfields/DropdownField";
import {
  getTariffDropdown,
  getGroupDropdown,
  getSubGroupDropdown,
  autoSearchService,
} from "../../../../../services/billing/ot/serviceratematrix/categoryratematrixServices/CategoryRateMaterixService";
import { useForm, FormProvider } from "react-hook-form";
import RadioField from "../../../../../../Common Components/FormFields/RadioField";
import SearchIconButton from "../../../../../../Common Components/Buttons/SearchIconButton";
import CategoryRateMatrixTable from "./CategoryRateMatrixTable";
import CancelButton from "../../../../../../Common Components/Buttons/CancelButton";
import SaveButton from "../../../../../../Common Components/Buttons/SaveButton";
import ResetButton from "../../../../../../Common Components/Buttons/ResetButton";
import SearchBar from "../../../../../../Common Components/FormFields/SearchBar";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

const CategoryDescription = {
  message: "Category Rate Matrux list found ",
  result: [
    {
      id: "1",
      categoryDescription: "Category1",
    },
    {
      id: "2",
      categoryDescription: "Category2",
    },
    {
      id: "3",
      categoryDescription: "Category3",
    },
    {
      id: "4",
      categoryDescription: "Category4",
    },
    {
      id: "5",
      categoryDescription: "Category5",
    },
    {
      id: "6",
      categoryDescription: "Category6",
    },
    {
      id: "7",
      categoryDescription: "Category7",
    },
    {
      id: "8",
      categoryDescription: "Category8",
    },
    {
      id: "9",
      categoryDescription: "Category9",
    },
    {
      id: "10",
      categoryDescription: "Category10",
    },
    {
      id: "11",
      categoryDescription: "Category11",
    },
    {
      id: "12",
      categoryDescription: "Category12",
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

const CategoryClassArray = [
  {
    id: 1,
    class: "Class1",
    rate: 1000,
  },
  {
    id: 2,
    class: "Class2",
    rate: 8900,
  },
  {
    id: 3,
    class: "Class3",
    rate: 5000,
  },
  {
    id: 4,
    class: "Class4",
    rate: 9600,
  },
  {
    id: 5,
    class: "Class5",
    rate: 8900,
  },
  // {
  //   id: 6,
  //   class: "Class6",
  //   rate: 5000,
  // },
  // {
  //   id: 7,
  //   class: "Class7",
  //   rate: 9600,
  // },
  // {
  //   id: 8,
  //   class: "Class8",
  //   rate: 8900,
  // },
  // {
  //   id: 9,
  //   class: "Class9",
  //   rate: 5000,
  // },
  // {
  //   id: 10,
  //   class: "Class10",
  //   rate: 9600,
  // },
];

export default function CategoryRateMatrix() {
  // const schema = yup.object().shape({
  //   categoryMatrix: yup
  //   .array()
  //   .required("Required")
  //   .of(
  //     yup.object().shape({
  //       rate: yup.number().typeError('you must specify a number').min(1, 'Min value 1.').required("Please Add this field"),
  //     })
  //   )
  //   .nullable(false, "Required")
  //   .min(1, "Requird")
  //   .required("Required"),
  // });

  const defaultValues = {
    tariff: null,
    subgroup: null,
    group: null,
    subgroup: null,
    services: null,
    opdipd: "OPD",
  };
  const methods = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = methods;

  const [tariffOptions, setTariffOptions] = React.useState([]);
  const [groupOptions, setGroupOptions] = React.useState([]);
  const [subGroupOptions, setSubGroupOptions] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState([]);
  const [dataResult, setDataResult] = React.useState([]);
  const [categoryData, setCategoryData] = React.useState({
    result: [],
    actions: [],
  });
  const [searchString, setSearchString] = React.useState("");
  const [spinner, showSpinner] = React.useState(false);
  const [recordWarning, showRecordWarning] = React.useState(false);
  const [service, setService] = React.useState([]); //use for service
  //uing custom radiobtn bydefault select BOTH n Select only one radiobtn
  const opdipd = [
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

  //using custom checjbox byDefault BOTH option Selected
  const opdipdbothVal = watch("opdipdboth");
  React.useEffect(() => {
    console.log("opdipdboth radio field is " + opdipdbothVal);
  }, [opdipdbothVal]);

  const onSubmitDataHandler = (data) => {
    console.log("data", data);
  };

  //   Dispaly data in the table
  React.useEffect(() => {
    setCategoryData(CategoryDescription.result);
  }, []);

  React.useEffect(() => {
    setData(CategoryClassArray);
    setDataResult(CategoryClassArray);
  }, []);

  //Store options of the Tariff Dropdown before the component gets mounted
  React.useEffect(() => {
    console.log("getTariffList() is going to be executed");
    getTariffList();
  }, []);
  function getTariffList() {
    getTariffDropdown()
      .then((response) => {
        console.log("The list of all the Tariff are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setTariffOptions(response.data.result);
      })
      .catch((error) => {
        console.log("Gives Error", error);
      });
  }

  //Store options of the Group Dropdown before the component gets mounted
  React.useEffect(() => {
    console.log("getGroupList() is going to be executed");
    getGroupList();
  }, []);
  function getGroupList() {
    getGroupDropdown()
      .then((response) => {
        console.log("The list of all the group are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setGroupOptions(response.data.result);
      })
      .catch((error) => {
        console.log("Gives Error", error);
      });
  }

  //Store options of the SubGroup Dropdown before the component gets mounted
  React.useEffect(() => {
    console.log("getSubgroupList() is going to be executed");
    getSubGroupList();
  }, []);
  function getSubGroupList() {
    getSubGroupDropdown()
      .then((response) => {
        console.log("The list of all the subgroup are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setSubGroupOptions(response.data.result);
      })
      .catch((error) => {
        console.log("Gives Error", error);
      });
  }

  //API For Service
  const handleChange = (autoServceSearchString) => {
    console.log(
      "The value of service that was typed is " + autoServceSearchString
    );
    if (autoServceSearchString !== "") {
      autoSearchService(autoServceSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setService(res.result);
        })
        .catch((error) => {
          console.log("Service Error is: ", error);
        });
    }
  };

  //after search get selected value and set selected value to object i.e (setSelectedObj) from this hook
  const autoSelectedValue = (value) => {
    console.log(
      "The auto-complete object clicked by user is " + JSON.stringify(value)
    );

    if (value !== null) {
      let obj = value;
      let requiredObj = {};
      requiredObj["id"] = obj.id;
      requiredObj["Service Code"] = obj.value;
      requiredObj["Service Name"] = obj.label;
      console.log("after modified requiredObj is ", requiredObj);
      let arr = [...data];
      arr.push(requiredObj);
      setData(arr);
    }
  };
  return (
    <>
      <div className="w-full grid pt-10 md:px-6 lg:px-4 xl:px-6 mt-8 md:rounded-md">
        <div className="flex justify-center text-xl">
          <h1 className=" text-gray-700 font-Poppins lg:hidden ">
            Category Rate Matrix
          </h1>
        </div>

        {/*searchable dropdown */}

        <h1 className="text-xl text-gray-700 font-Poppins hidden lg:block">
          Category Rate Matrix
        </h1>
        <FormProvider {...methods}>
          <form
            className="grid grid-cols-1 w-full gap-2 pt-2"
            onSubmit={handleSubmit(onSubmitDataHandler)}
          >
            <div className="border-2 border-gray-300 bg-white rounded-md p-2 ">
              <div className="grid grid-cols-3 gap-2">
                <div className="">
                  <DropdownField
                    control={control}
                    error={errors.tariff}
                    name="tariff"
                    placeholder="Tariff"
                    dataArray={tariffOptions}
                    isSearchable={false}
                  />
                </div>
                <div className="w-full">
                  <DropdownField
                    control={control}
                    error={errors.group}
                    name="group"
                    placeholder="Group"
                    dataArray={groupOptions}
                    isSearchable={false}
                  />
                </div>
                <div className="">
                  <DropdownField
                    control={control}
                    error={errors.subgroup}
                    name="subgroup"
                    placeholder="Sub Group"
                    dataArray={subGroupOptions}
                    isSearchable={false}
                  />
                </div>

                 <div className="z-50">
                  {/* <DropdownField
                  control={control}
                  name="service"
                  placeholder="Service"
                  isSearchable={false}
                  // dataArray={subGroupOptions}
                /> */}

                  <SearchBar
                    name="services"
                    searchIcon={true}
                    placeholder="Services"
                    dataArray={service}
                    handleInputChange={handleChange}
                    onChange={autoSelectedValue}
                  />
                </div>
                <div className="flex col-span-2 items-center gap-2 text-sm">
                  <label className="text-sm md:mr-3 md:mb-2 ">
                    Applicable to
                  </label>
                  <RadioField
                    label=""
                    name="opdipd"
                    control={control}
                    dataArray={opdipd}
                  />
                  <SearchIconButton
                  //    onClick={filterData}
                  />
                  <ResetButton onClick={() => reset(defaultValues)} />
                </div>
              </div>
            </div>

            {data && data.length > 0 ? (
              <>
                <CategoryRateMatrixTable
                  //  tableApiFunc={fetchAllGender}
                  searchString={searchString}
                  categoryData={categoryData}
                  dataResult={dataResult}
                  setDataResult={setDataResult}
                  data={data}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  count={count}
                  // editRow={editRow}
                  // setOpen={setOpen}
                  //   deleteRow={deleteRow}
                  //   displayView={displayView}
                />
              </>
            ) : (
              ""
            )}

            <div className="flex justify-end gap-x-2">
              <CancelButton />
              <SaveButton />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
