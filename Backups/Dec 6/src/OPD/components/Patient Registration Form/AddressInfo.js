import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";

import {
  getArea,
  getCity,
  getCountry,
  getDetailsonPincodeId,
  getDistrict,
  getPincodeBySearchId,
  getState,
  getTahshil,
} from "../../services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";

// const country = [
//   { value: "country1", label: "Country 1" },
//   { value: "country2", label: "Country 2" },
// ];

// const state = [
//   { value: "state1", label: "State 1" },
//   { value: "state2", label: "State 2" },
// ];

// const district = [
//   { value: "district1", label: "District 1" },
//   { value: "district2", label: "District 2" },
// ];

// const taluka = [
//   { value: "tehsil1", label: "taluka 1" },
//   { value: "tehsil2", label: "taluka 2" },
// ];

// const city = [
//   { value: "city1", label: "City 1" },
//   { value: "city2", label: "City 2" },
// ];

// const pincode = [
//   { value: "123123", label: "123123" },
//   { value: "122122", label: "122122" },
// ];

// const area = [
//   { value: "area1", label: "Area 1" },
//   { value: "area2", label: "Area 2" },
// ];

const AddressInfo = (props) => {
  const [country, setCountry] = useState();
  const [countryId, setCountryId] = useState();
  const [state, setState] = useState();
  const [stateId, setStateId] = useState();
  const [district, setDistrict] = useState();
  const [districtId, setDistrictId] = useState();
  const [taluka, setTaluka] = useState();
  const [tehsilId, setTehsilId] = useState();
  const [city, setCity] = useState();
  // const [cityId, setCityId] = useState();
  const [pincodes, setPincodes] = useState();
  // const [pincodeId, setPincodeId] = useState(0);
  // const [area, setArea] = useState();

  const { pincodeId, setPincodeId, area, setArea } = props;

  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
    reset,
  } = useFormContext();

  let getPincodeDetails = watch("pinCode");
  useEffect(() => {
    if (props.searchData !== null) {
      console.log("AddressInfo", props.searchData);
      setCountryId(props.searchData.country.value);
      setStateId(props.searchData.state.value);
      setDistrictId(props.searchData.district.value);
      setTehsilId(props.searchData.taluka.value);
      // setValue("area", props.searchData.area)

      getArea(props.searchData.pinCode.value)
        .then((response) => {
          let areaArr = response.data.result;
          let val = areaArr.find(
            (x) => x.label === props.searchData.area.label
          );
          console.log("value Area", val);
          if (val) {
            setValue("area", val, {
              shouldValidate: true,
            });
          }
          setArea(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [getPincodeDetails]);

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
      setValue("taluka", null);
      setValue("city", null);
      setState(null);
      setDistrict(null);
      setPincodes(null);
      setArea(null);
      setTaluka(null);
      setCity(null);
    } else if (changeField === "state") {
      setValue("district", null);
      setValue("pinCode", null);
      setValue("area", null);
      setValue("taluka", null);
      setValue("city", null);
      setDistrict(null);
      setPincodes(null);
      setArea(null);
      setTaluka(null);
      setCity(null);
    } else if (changeField === "district") {
      setValue("pinCode", null);
      setValue("area", null);
      setValue("taluka", null);
      setValue("city", null);
      setPincodes(null);
      setArea(null);
      setTaluka(null);
      setCity(null);
    } else if (changeField === "pinCode") {
      setValue("country", null);
      setValue("state", null);
      setValue("district", null);
      setValue("area", null);
      setValue("taluka", null);
      setValue("city", null);
      // setState(null);
      // setDistrict(null);
      setArea(null);
      setTaluka(null);
      setCity(null);
    } else if (changeField === "taluka") {
      setValue("pinCode", null);
      setValue("area", null);
      setValue("city", null);
      setArea(null);
      setPincodes([]);
      setCity(null);
    } else if (changeField === "city") {
      setValue("pinCode", null);
      setValue("area", null);
      setPincodes(null);
      setArea(null);
    }
  };

  //Api to get State List
  const getStateList = (countryId) => {
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
  };
  useEffect(() => {
    getStateList(countryId);
  }, [countryId]);

  //Api to get District  List
  const getDistrictList = (stateId) => {
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
  };
  useEffect(() => {
    getDistrictList(stateId);
  }, [stateId]);

  //Api to get Tahshil List
  const getTahshilList = (districtId) => {
    if (typeof districtId === "number") {
      getTahshil(districtId)
        .then((response) => {
          console.log(response);
          setTaluka(response.data.result);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };
  useEffect(() => {
    getTahshilList(districtId);
  }, [districtId]);

  // Api to get City List
  const getCityList = (tehsilId) => {
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
  };
  useEffect(() => {
    getCityList(tehsilId);
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
          setValue("area", null, { shouldValidate: true });
          setValue("state", response.data.result.city.taluka.district.state, {
            shouldValidate: true,
          });
          setValue(
            "country",
            response.data.result.city.taluka.district.state.country,
            { shouldValidate: true }
          );
          setCountryId(
            response.data.result.city.taluka.district.state.country.value
          );
          setStateId(response.data.result.city.taluka.district.state.value);
          setDistrictId(response.data.result.city.taluka.district.value);
          setTehsilId(response.data.result.city.taluka.value);
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      setValue("state", null);
      setValue("district", null);
      setValue("country", null);
      setValue("area", null);
      setValue("taluka", null);
      setValue("city", null);
    }
  }, [pincodeId]);

  return (
    <div>
      <div className="grid grid-cols-7 gap-3">
        {/* //House No.// */}
        <div className="col-span-2">
          {/* <Controller
            control={control}
            name="houseno"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="House No./Flat No./Building Name"
                fullWidth
                size="small"
                {...field}
                error={Boolean(errors.houseno)}
                helperText={errors.houseno?.message}
              />
            )}
          /> */}
          <InputField
            name="houseFlatNumber"
            variant="outlined"
            label="House No./Flat No./Building Name"
            //error={errors.houseFlatNumber}
            control={control}
            disabled={false}
            inputProps={{ maxLength: 100 }}
          />
        </div>
        {/* //Street Address// */}
        <div className="col-span-2">
          {/* <Controller
            control={control}
            name="streetaddress"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Street Address"
                fullWidth
                size="small"
                {...field}
                error={Boolean(errors.streetaddress)}
                helperText={errors.streetaddress?.message}
              />
            )}
          /> */}
          <InputField
            name="streetAddress"
            variant="outlined"
            label="Street Address"
            // error={errors.streetAddress}
            control={control}
            disabled={false}
            inputProps={{ maxLength: 255 }}
          />
        </div>
        {/* //Country and State// */}
        <div className="flex col-span-3 gap-3">
          {/* //Country// */}
          <div className="w-6/12">
            {/* <Controller
              control={control}
              name="country"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormControl
                  size="small"
                  fullWidth
                  error={Boolean(errors.country)}
                >
                  <InputLabel id="country">Country</InputLabel>
                  <Select
                    labelId="country"
                    id="demo-simple-select"
                    label="Country"
                    name="country"
                    defaultValue={""}
                    {...field}
                  >
                    <MenuItem value={"country1"}>Country 1</MenuItem>
                    <MenuItem value={"country2"}>Country 2</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.country && <p>{errors.country.message}</p>}
                  </FormHelperText>
                </FormControl>
              )}
            /> */}
            <DropdownField
              control={control}
              error={errors.country}
              name="country"
              label="Country"
              dataArray={country}
              placeholder="Country"
              inputRef={{
                ...register("country", {
                  onChange: (e) => {
                    console.log("Country", e.target.value.id);
                    handleResetOnChange(e.target.name);
                    getStateList(e.target.value.id);
                  },
                }),
              }}
            />
          </div>
          {/* //State // */}
          <div className="w-6/12">
            {/* <Controller
              control={control}
              name="state"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormControl
                  size="small"
                  fullWidth
                  error={Boolean(errors.state)}
                >
                  <InputLabel id="state">State</InputLabel>
                  <Select
                    labelId="state"
                    id="demo-simple-select"
                    label="State"
                    name="state"
                    defaultValue={""}
                    {...field}
                  >
                    <MenuItem value={"state1"}>State 1</MenuItem>
                    <MenuItem value={"state2"}>State 2</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.state && <p>{errors.state.message}</p>}
                  </FormHelperText>
                </FormControl>
              )}
            /> */}
            <DropdownField
              control={control}
              error={errors.state}
              name="state"
              label="State"
              dataArray={state}
              placeholder="State"
              inputRef={{
                ...register("state", {
                  onChange: (e) => {
                    console.log(e.target.value.id);
                    handleResetOnChange(e.target.name);
                    getDistrictList(e.target.value.id);
                  },
                }),
              }}
            />
          </div>
        </div>

        {/* //District and PinCode// */}
        <div className="flex col-span-4 lg:col-span-2 gap-3">
          {/* //District// */}
          <div className="w-6/12">
            {/* <Controller
              control={control}
              name="district"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormControl
                  size="small"
                  fullWidth
                  error={Boolean(errors.district)}
                >
                  <InputLabel id="district">District</InputLabel>
                  <Select
                    labelId="district"
                    id="demo-simple-select"
                    label="District"
                    name="district"
                    defaultValue={""}
                    {...field}
                  >
                    <MenuItem value={"district1"}>District 1</MenuItem>
                    <MenuItem value={"district2"}>District 2</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.district && <p>{errors.district.message}</p>}
                  </FormHelperText>
                </FormControl>
              )}
            /> */}
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
                    getTahshilList(e.target.value.id);
                  },
                }),
              }}
            />
          </div>

          {/* //Pin Code // */}
          <div className="w-6/12">
            {/* <Controller
              control={control}
              name="pincode"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  label="Pin Code"
                  fullWidth
                  size="small"
                  {...field}
                  error={Boolean(errors.pincode)}
                  helperText={errors.pincode?.message}
                />
              )}
            /> */}

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
                      setArea([]);
                    }
                  },
                }),
              }}
            />
          </div>
        </div>

        {/* //Area// */}
        <div className="col-span-3 lg:col-span-2">
          {/* <Controller
              control={control}
              name="area"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  label="Area"
                  fullWidth
                  size="small"
                  {...field}
                  error={Boolean(errors.area)}
                  helperText={errors.area?.message}
                />
              )}
            /> */}
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

        {/* //City and taluka// */}
        <div className="flex col-span-4 lg:col-span-3 gap-3">
          {/* //taluka // */}
          <div className="w-6/12">
            {/* <Controller
              control={control}
              name="taluka"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormControl
                  size="small"
                  fullWidth
                  error={Boolean(errors.taluka)}
                >
                  <InputLabel id="taluka">taluka</InputLabel>
                  <Select
                    labelId="taluka"
                    id="demo-simple-select"
                    label="taluka"
                    name="taluka"
                    defaultValue={""}
                    {...field}
                  >
                    <MenuItem value={"tehsil1"}>taluka 1</MenuItem>
                    <MenuItem value={"tehsil2"}>taluka 2</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.taluka && <p>{errors.taluka.message}</p>}
                  </FormHelperText>
                </FormControl>
              )}
            /> */}
            <DropdownField
              control={control}
              error={errors.taluka}
              name="taluka"
              label="Taluka"
              dataArray={taluka}
              // isSearchable={false}
              placeholder="Taluka"
              isClearable={false}
              inputRef={{
                ...register("taluka", {
                  onChange: (e) => {
                    console.log(e.target.value.id);
                    handleResetOnChange(e.target.name);
                    getCityList(e.target.value.id);
                  },
                }),
              }}
            />
          </div>

          {/* //City// */}

          <div className="w-6/12 ">
            {/* <Controller
              control={control}
              name="city"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormControl
                  size="small"
                  fullWidth
                  error={Boolean(errors.city)}
                >
                  <InputLabel id="city">City/Village/Town</InputLabel>
                  <Select
                    labelId="city"
                    id="demo-simple-select"
                    label="City/Village/Town"
                    name="city"
                    defaultValue={""}
                    {...field}
                  >
                    <MenuItem value={"city1"}>City 1</MenuItem>
                    <MenuItem value={"city2"}>City 2</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.city && <p>{errors.city.message}</p>}
                  </FormHelperText>
                </FormControl>
              )}
            /> */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;
