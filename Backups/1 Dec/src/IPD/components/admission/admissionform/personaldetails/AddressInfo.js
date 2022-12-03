import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import InputField from "../../../../../Common Components/FormFields/InputField";
import SearchDropdown from "../../../../../Common Components/FormFields/searchDropdown";
import {
  getArea,
  getCity,
  getCountry,
  getDetailsonPincodeId,
  getDistrict,
  getPincodeBySearchId,
  getState,
  getTahshil,
} from "../../../../services/personaldetails/personalDetailsServices";
import { Box } from "@mui/system";
import AddNewCountry from "./AddNewCountry";

const AddressInfo = () => {
  const [country, setCountry] = useState();
  const [countryId, setCountryId] = useState();
  const [state, setState] = useState();
  const [stateId, setStateId] = useState();
  const [district, setDistrict] = useState();
  const [districtId, setDistrictId] = useState();
  const [tehsil, setTehsil] = useState();
  const [tehsilId, setTehsilId] = useState();
  const [city, setCity] = useState();
  // const [cityId, setCityId] = useState();
  const [pincodes, setPincodes] = useState();
  const [pincodeId, setPincodeId] = useState(0);
  const [area, setArea] = useState();
  const [visibleField, setVisibleField] = useState(true);
  const [openCountry, setOpenCountry] = useState(false);

  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();

  const getCountryName = watch("country");
  const getStateName = watch("state");
  const getCityName = watch("city");

  useEffect(() => {
    console.log("getCountryName", getCountryName);
    if (getCountryName) {
      if (getCountryName.label.toLowerCase() !== "india") {
        setVisibleField(false);
      } else {
        setVisibleField(true);
      }
    }
  }, [getCountryName]);

  useEffect(() => {
    getCountry()
      .then((response) => {
        // console.log(response.data.result);
        setCountry(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  //
  const handleResetOnChange = (changeField) => {
    console.log(changeField);
    if (changeField === "country") {
      setValue("state", null);
      setValue("district", null);
      setValue("pinCode", null);
      setValue("area", null);
      setValue("tehsil", null);
      setValue("city", null);
    } else if (changeField === "state") {
      setValue("district", null);
      setValue("pinCode", null);
      setValue("area", null);
      setValue("tehsil", null);
      setValue("city", null);
    } else if (changeField === "district") {
      setValue("pinCode", null);
      setValue("area", null);
      setValue("tehsil", null);
      setValue("city", null);
    }
    // else if (changeField === "pincode") {
    //   setValue("country", null);
    //   setValue("state", null);
    //   setValue("district", null);
    //   setValue("area", null);
    //   setValue("tehsil", null);
    //   setValue("city", null);
    // }
    else if (changeField === "tehsil") {
      setValue("pinCode", null);
      setValue("area", null);
      setValue("city", null);
    } else if (changeField === "city") {
      setValue("pinCode", null);
      setValue("area", null);
    }
  };

  //Api to get State List
  useEffect(() => {
    if (typeof countryId === "number") {
      getState(countryId)
        .then((response) => {
          // console.log("State", response);
          setState(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [countryId]);

  //Api to get District  List
  useEffect(() => {
    if (typeof stateId === "number") {
      getDistrict(stateId)
        .then((response) => {
          // console.log(response);
          setDistrict(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [stateId]);

  //Api to get Tahshil List
  useEffect(() => {
    // console.log("distric", districtId);
    if (typeof districtId === "number") {
      getTahshil(districtId)
        .then((response) => {
          console.log(response);
          setTehsil(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [districtId]);

  // Api to get City List
  useEffect(() => {
    if (typeof tehsilId === "number") {
      getCity(tehsilId)
        .then((response) => {
          // console.log(response);
          setCity(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [tehsilId]);

  // Api to get Area List
  useEffect(() => {
    if (typeof pincodeId === "number") {
      getArea(pincodeId)
        .then((response) => {
          // console.log(response);
          setArea(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [pincodeId]);

  //APi to get PinCode List
  const handleChange = (e) => {
    console.log(e.length);
    if (e.length > 0) {
      getPincodeList(e);
    }
  };
  const getPincodeList = (e) => {
    console.log("ListPIN", e);
    getPincodeBySearchId(e)
      .then((response) => {
        // console.log(response);
        getPincodes(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const getPincodes = (pinCodes) => {
    // console.log(pinCodes);
    setPincodes(pinCodes);
  };

  //Api to get Details Based on Pincode
  useEffect(() => {
    if (pincodeId !== null) {
      getDetailsonPincodeId(pincodeId)
        .then((response) => {
          // console.log("pincode Deatils", response.data.result.city.taluka);
          setValue("city", response.data.result.city, { shouldValidate: true });
          setValue("taluka", response.data.result.city.taluka, {
            shouldValidate: true,
          });
          setValue("district", response.data.result.city.taluka.district, {
            shouldValidate: true,
          });
          setValue("state", response.data.result.city.taluka.district.state, {
            shouldValidate: true,
          });
          setValue(
            "country",
            response.data.result.city.taluka.district.state.country,
            { shouldValidate: true }
          );
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      setValue("state", null);
      setValue("district", null);
      setValue("country", null);
      setValue("area", null);
      setValue("tehsil", null);
      setValue("city", null);
    }
  }, [pincodeId]);

  return (
    <div>
      <div className="grid grid-cols-7 gap-3">
        {/* //House No.// */}
        <div className="col-span-2">
          <InputField
            name="houseFlatNumber"
            variant="outlined"
            label="House No./Flat No./Building Name"
            error={errors.houseFlatNumber}
            control={control}
            disabled={false}
            inputProps={{ maxLength: 100 }}
          />
        </div>
        {/* //Street Address// */}
        <div className="col-span-2">
          <InputField
            name="streetAddress"
            variant="outlined"
            label="Street Address"
            error={errors.streetAddress}
            control={control}
            disabled={false}
            inputProps={{ maxLength: 255 }}
          />
        </div>
        {/* //Country and State// */}
        <div className="flex col-span-3 gap-3">
          {/* //Country// */}
          <div className="w-6/12 flex">
            <DropdownField
              control={control}
              error={errors.country}
              name="country"
              label="Country"
              dataArray={country}
              // isSearchable={false}
              placeholder="Country"
              isClearable={false}
              inputRef={{
                ...register("country", {
                  onChange: (e) => {
                    console.log("Country", e.target.name);
                    handleResetOnChange(e.target.name);
                    setCountryId(e.target.value.id);
                  },
                }),
              }}
            />
            <AddRoundedIcon
              fontSize="small"
              className="my-auto bg-green-500 rounded-full mx-0.5"
              onClick={() => {
                setOpenCountry(true);
              }}
            />
          </div>
          {/* //State // */}
          <div className="w-6/12 flex">
            <DropdownField
              control={control}
              error={errors.state}
              name="state"
              label="State"
              dataArray={state}
              // isSearchable={false}
              placeholder="State"
              isClearable={false}
              inputRef={{
                ...register("state", {
                  onChange: (e) => {
                    console.log(e.target.value.id);
                    handleResetOnChange(e.target.name);
                    setStateId(e.target.value.id);
                  },
                }),
              }}
            />
            {getCountryName !== null ? (
              <AddRoundedIcon
                fontSize="small"
                className="my-auto bg-green-500 rounded-full mx-0.5"
                onClick={() => {
                  setOpenCountry(true);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* //District and PinCode// */}
        {visibleField === true ? (
          <div className="flex col-span-4 lg:col-span-2 gap-3">
            {/* //District// */}
            <div className="w-6/12">
              <DropdownField
                control={control}
                error={errors.district}
                name="district"
                label="District"
                dataArray={district}
                // isSearchable={false}
                placeholder="District"
                isClearable={false}
                inputRef={{
                  ...register("district", {
                    onChange: (e) => {
                      console.log(e.target.value.id);
                      handleResetOnChange(e.target.name);
                      setDistrictId(e.target.value.id);
                    },
                  }),
                }}
              />
            </div>

            {/* //Pin Code // */}
            <div className="w-6/12">
              <SearchDropdown
                control={control}
                error={errors.pinCode}
                searchIcon={true}
                name="pinCode"
                label="Pincode *"
                dataArray={pincodes}
                isSearchable={true}
                placeholder="Pincode *"
                isClearable={false}
                handleInputChange={handleChange}
                inputRef={{
                  ...register("pinCode", {
                    onChange: (e) => {
                      console.log("PIn", e.target);
                      handleResetOnChange(e.target.name);
                      if (e.target.value !== null) {
                        setPincodeId(e.target.value.value);
                      } else {
                        setPincodeId(null);
                      }
                    },
                  }),
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        {/* //Area// */}
        {visibleField === true ? (
          <div className="col-span-3 lg:col-span-2">
            <DropdownField
              control={control}
              error={errors.area}
              name="area"
              label="Area"
              dataArray={area}
              isSearchable={true}
              placeholder="Area"
              isClearable={false}
            />
          </div>
        ) : (
          ""
        )}

        {/* //City and taluka// */}
        <div className="flex col-span-4 lg:col-span-3 gap-3">
          {/* //taluka // */}
          {visibleField === true ? (
            <div className="w-6/12">
              <DropdownField
                control={control}
                error={errors.taluka}
                name="taluka"
                label="Taluka"
                dataArray={tehsil}
                // isSearchable={false}
                placeholder="Taluka"
                isClearable={false}
                inputRef={{
                  ...register("taluka", {
                    onChange: (e) => {
                      console.log(e.target.value.id);
                      handleResetOnChange(e.target.name);
                      setTehsilId(e.target.value.id);
                    },
                  }),
                }}
              />
            </div>
          ) : (
            ""
          )}

          {/* //City// */}

          <div className="w-6/12 flex">
            <DropdownField
              control={control}
              error={errors.city}
              name="city"
              label="City"
              dataArray={city}
              // isSearchable={false}
              placeholder="City"
              isClearable={false}
              inputRef={{
                ...register("city", {
                  onChange: (e) => {
                    console.log(e.target.value.id);
                    // setCityId(e.target.value.id);
                  },
                }),
              }}
            />
            {getStateName !== null ? (
              <AddRoundedIcon
                fontSize="small"
                className="my-auto bg-green-500 rounded-full mx-0.5"
                onClick={() => {
                  setOpenCountry(true);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* //Country Modal// */}
      <Modal
        open={openCountry}
        onClose={() => {
          setOpenCountry(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddNewCountry
            getCountryName={getCountryName}
            getStateName={getStateName}
            getCityName={getCityName}
            setOpenCountry={ setOpenCountry}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default AddressInfo;
