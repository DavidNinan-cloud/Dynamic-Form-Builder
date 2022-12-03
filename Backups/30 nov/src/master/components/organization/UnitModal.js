//imports from material ui library
import { Modal, Box, Button } from "@mui/material";

import * as React from "react";

import { useEffect } from "react";

//icon for closing the modal form
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import AddButton from "../../../Common Components/Buttons/AddButton";

import ResetButton from "../../../Common Components/Buttons/ResetButton";

import CancelButton from "../../../Common Components/Buttons/CancelButton";

import UpdateButton from "../../../Common Components/Buttons/UpdateButton";
import CommonBackDrop from "../../../Common Components/CommonBackDrop/CommonBackDrop";
//imports from react hook form
import { useForm } from "react-hook-form";
import UploadFile from "../organization/infrastructure/components/room/assets/UploadFile.png";
import BlankProfile from "../organization/infrastructure/components/room/assets/blankProfile.jpeg";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
//importing the style of modal ; which is common to all
import { ModalStyle } from "../common/ModalStyleUnitOrg";

//imports from the common FormControl folder
import InputField from "../common/formfields/InputField";
import DropdownField from "../common/formfields/DropdownField";
import CheckBoxField from "../common/formfields/CheckBoxField";
import SearchDropdown from "../common/formfields/SearchDropdown";

//importing the asynchronous function for using in the react query hooks
import {
  addNewUnit,
  getUnitById,
  updateUnit,
} from "../../services/organization/UnitServices";

import { getDetailsonPincodeId } from "../../../OPD/services/RegistrationServices/PatientRegistrationServices/patientRegistrationServices";

//importing the asynchronous function
import {
  autoSearchPincode,
  getPincodeById,
} from "../../services/area/PincodeService";

import { getOrganizationDropdown } from "../../services/organization/OrganizationServices";

import {
  getCountryDropdown,
  getCountryById,
} from "../../services/area/CountryService";

import {
  getStateDropdown,
  getStateById,
} from "../../services/area/StateService";

import {
  getDistrictDropdown,
  getDistrictById,
} from "../../services/area/DistrictService";

import {
  getTalukaDropdown,
  getTalukaById,
} from "../../services/area/TalukaService";

import { getCityDropdown, getCityById } from "../../services/area/CityService";

import { getAreaDropDown } from "../../services/area/AreaService";

import ConfirmationModal from "../../../Common Components/ConfirmationModal";

// imports from react-query library
import {
  successAlert,
  updateAlert,
  errorAlert,
} from "../../../Common Components/Toasts/Toasts";

// imports from react-query library
import { useQuery, useMutation } from "@tanstack/react-query";

const UrlRegex = new RegExp(
  "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
);
//phone number validation
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

//GST number validation
const GSTRegExp = "[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$";

export default function UnitModal(props) {
  // yup Schema validation for form fields

  //All the state variables for the storage of dropdown options coming from api
  const [countryOptions, setCountryOptions] = React.useState([]);
  const [stateOptions, setStateOptions] = React.useState([]);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [cityOptions, setCityOptions] = React.useState([]);
  const [talukaOptions, setTalukaOptions] = React.useState([]);
  const [areaOptions, setAreaOptions] = React.useState([]);

  const [pincodeId, setPincodeId] = React.useState(0);
  //state variable for storing the response of pincode autocomplete
  const [pincodeOptions, setPincodeOptions] = React.useState([]);
  //upload room img
  const [profile, setProfile] = React.useState(BlankProfile);
  const [profilePicName, setProfilePicName] = React.useState();
  //All the options in the unit drop down list are going to be stored in this state variable
  const [organizationOptions, setorganizationOptions] = React.useState([]);

  const [idStorage, setIdStorage] = React.useState({
    cityId: "",
    talukaId: "",
    districtId: "",
    stateId: "",
    countryId: "",
  });

  //state variable to open the confirmation modal for POST request
  const [openPost, setOpenPost] = React.useState(false);

  //state variable to open the confirmation modal for PUT request
  const [openPut, setOpenPut] = React.useState(false);

  const schema = yup.object().shape({
    organization: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required("Required"),
    unitCode: yup
      .string()
      .required("Required")
      .matches(/^[A-Za-z0-9\s]+$/, "Must be Only Digits"),
    unitName: yup
      .string()
      .required("Required")
      .min(4, "Add Unit Name")
      .matches(/^[A-Za-z\s]+$/, "Only Alphabets Are Allowed For This Field "),
    unitAbbreviation: yup
      .string()

      .required("Required")
      .matches(/^[A-Za-z\s]+$/, "Only Alphabets Are Allowed For This Field"),

    unitAddress: yup
      .string()
      .required("Required")
      .min(5, "Add Minimum 2 Character")

      .matches(
        /^[A-Za-z0-9,.\s]+$/,
        "Only Alphabets Are Allowed For This Field "
      ),
    // drop down m
    country: yup
      .object()

      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),

    state: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),

    district: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    city: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    taluka: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    area: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),
    pinCode: yup
      .object()
      .nullable()

      .shape({
        value: yup.string().required("Required"),
        label: yup.string().required("Required"),
      })
      .required("Required"),

    contactNo: yup
      .string()
      .required("Required")
      .matches(phoneRegExp, "Please Enter Valid Contact No")
      .min(10, "Please Enter Valid Contact No")
      .max(14, "Please Enter Valid Contact No"),
    emailID: yup
      .string()
      .required("Required")
      .email("Invalid Email Address "),

    pharmacyEmail: yup
      .string()
      .required("Required")
      .email("Invalid Email Address "),
    uhidprefix: yup
      .string()
      .required("Required")
      .matches(/^[ A-Za-z0-9_@./#&+-]*$/, "Add valid UHID")
      .min(2, "Enter  at Least Two Character")
      .max(10, "You Add More Than 10 Character UHID"),
    unitRegistrationNo: yup
      .string()
      .required("Required")
      .matches(/^[0-9_@./#&+-]*$/, "Add Valid Unit Registration Number")
      .min(2, "Enter  at Least Two Character"),
    unitWebsite: yup
      .string()
      .required("Required")
      .matches(UrlRegex, "Required"),
    pharmacyName: yup
      .string()
      .required("Required")
      .min(2, "Add Minimum 2 Character")

      .matches(/^[A-Za-z\s]+$/, "Only Alphabets Are Allowed For This Field "),
    pharmacyGSTNo: yup
      .string()
      .required("Required")
      .matches(GSTRegExp, "Pharmacy GST Number Not Valid")
      .min(15, "Enter Min 15 digit GST Number")
      .max(15, "Only Min 15 digit Required"),
    unitGstNo: yup
      .string()
      .required("Required")
      .matches(GSTRegExp, "Unit GST Number Not Valid")
      .min(15, "Enter Min 15 Digit GST Number")
      .max(15, "Only Min 15 Digit Required"),
    pharmacyLicenseNo: yup
      .string()
      .required("Required ")
      .matches(/^[0-9]+$/, "Pharmacy License Number Not Valid")
      .min(10, "Enter  License Number"),
    pharmacyContactNo: yup
      .string()
      .required("Required")
      .matches(phoneRegExp, "Please Enter Valid Contact No")
      .min(10, "Please Enter Valid Contact No")
      .max(14, "Please Enter Valid Contact No"),
  });
  const defaultValues = {
    id: "",
    organization: null,
    unitCode: "",
    unitName: "",
    unitAbbreviation: "",
    unitAddress: "",
    unitGstNo: "",
    country: null,
    state: null,
    district: null,
    taluka: null,
    city: null,
    area: null,
    pinCode: null,
    contactNo: "",
    emailID: "",
    uhidprefix: "",
    unitRegistrationNo: "",
    unitWebsite: "",
    pharmacyName: "",
    pharmacyGSTNo: "",
    pharmacyContactNo: "",
    pharmacyEmail: "",
    pharmacyLicenseNo: "",
    active: true,
    roomImageName: null,
    roomImageBase64: null,
  };

  //state variable to close the confirmation modal for POST request
  const handleClosePost = () => {
    if (openPost) {
      setOpenPost(false);
    }
  };

  //state variable to close the confirmation modal for PUT request
  const handleClosePut = () => {
    if (openPut) {
      setOpenPut(false);
    }
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = ({ target: { result } }) => {
        setProfile(result);
        console.log("Image", typeof result, result);
        console.log(file.name);
        setProfilePicName(file.name);
      };

      reader.readAsDataURL(file);
    } else {
      setProfile(BlankProfile);
    }
  };

  //APi to get PinCode List
  //props for the SearchDropdown
  const handleChange = (autoSearchString) => {
    console.log("handleChange has been invoked");
    console.log("The value of pincode that was typed is " + autoSearchString);

    if (autoSearchString !== "") {
      autoSearchPincode(autoSearchString)
        .then((response) => response.data)
        .then((res) => {
          console.log(
            "The response of auto-complete / auto-search is " +
              JSON.stringify(res)
          );
          setPincodeOptions(res.result);
        });
    }
  };

  const [finalData, setFinalData] = React.useState({});

  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  //event listener function for the Add button on the modal form
  function addRecord() {
    console.log("A new record has been added");

    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);

    props.setOpenBackdrop(true);
    postUnit(finalData);
  }

  //This function is called after clicking on the Update button of modal form and after clicking on the Add button of modal form
  const onSubmitDataHandler = (data) => {
    data.roomImagePath = roomImageName;
    // let previewStr = profile.toString();
    // data.roomImageBase64 = previewStr.split(",")[1];
    // data.file = data.roomImageBase64;
    data.roomImageName = profilePicName;
    let roomPicString = profile.toString().split(",")[1];
    data.roomImageBase64 = roomPicString;
    // data.file = data.roomImageBase64;
    console.log(roomPicString);
    console.log("onSubmitDataHandler function has been invoked");

    if (props.edit === true) {
      console.log(
        "Put request is going to be sent to the api and the data is "
      );
      console.log(data);
      let updateObj = {
        id: data.id,
        active: data.active,
        area: {
          id: data.area.value,
        },
        city: {
          id: data.city.value,
        },
        contactNo: data.contactNo,
        country: {
          id: data.country.value,
        },
        district: {
          id: data.district.value,
        },
        emailID: data.emailID,
        organization: {
          id: data.organization.value,
        },
        pharmacyContactNo: data.pharmacyContactNo,
        pharmacyEmail: data.pharmacyEmail,
        pharmacyGSTNo: data.pharmacyGSTNo,
        pharmacyLicenseNo: data.pharmacyLicenseNo,
        pharmacyName: data.pharmacyName,
        pinCode: {
          id: data.pinCode.value,
        },
        state: {
          id: data.state.value,
        },
        taluka: {
          id: data.taluka.value,
        },
        uhidprefix: data.uhidprefix,
        unitAbbreviation: data.unitAbbreviation,
        unitAddress: data.unitAddress,
        unitCode: data.unitCode,
        unitGstNo: data.unitGstNo,
        unitName: data.unitName,
        unitRegistrationNo: data.unitRegistrationNo,
        unitWebsite: data.unitWebsite,
        logoImageBase64: data.roomPicString,
        logoImagePath: data.profilePicName,
      };
      console.log("record id", data.id);
      setOpenPut(true);
      setFinalData(updateObj);
    } else if (props.edit === false) {
      console.log(
        "Post request is going to be sent to the api and the data is "
      );
      // console.log(JSON.stringify(data));

      let postObj = {
        area: {
          id: data.area.id,
        },
        city: {
          id: data.city.id,
        },
        contactNo: data.contactNo,
        country: {
          id: data.country.id,
        },
        district: {
          id: data.district.id,
        },
        emailID: data.email,
        organization: {
          id: data.organization.id,
        },
        pharmacyContactNo: data.pharmacyContactNo,
        pharmacyEmail: data.pharmacyEmail,
        pharmacyGSTNo: data.pharmacyGSTNo,
        pharmacyLicenseNo: data.pharmacyLicenseNo,
        pharmacyName: data.pharmacyName,
        pinCode: {
          id: data.pinCode.value,
        },
        state: {
          id: data.state.id,
        },
        taluka: {
          id: data.taluka.id,
        },
        uhidprefix: data.uhidprefix,
        unitAbbreviation: data.unitAbbreviation,
        unitAddress: data.unitAddress,
        unitCode: data.unitCode,
        unitGstNo: data.unitGstNo,
        unitName: data.unitName,
        unitRegistrationNo: data.unitRegistrationNo,
        unitWebsite: data.unitWebsite,
        logoImageBase64: roomPicString,
        logoImagePath: profilePicName,
      };

      console.log("Posted obj is ", JSON.stringify(postObj));

      setOpenPost(true);
      setFinalData(postObj);
    }
  };
  //event listener function for the Update button on the Confirmation modal
  function updateRecord() {
    handleClosePut();
    props.setOpenBackdrop(true);
    updateUnit(finalData)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode === 200) {
          updateAlert(response.data.message);
          console.log("Record has been updated successfully");
          props.populateTable();
          props.setEdit(false);
          reset(defaultValues);
          props.setOpenBackdrop(false);
          props.setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
        props.setOpenBackdrop(false);
        errorAlert(error.message);
      });
  }

  //update the state options upon change in country dropdown. This is event listener function for country dropdown
  function updateStateOptions(requiredCountryId) {
    getStateDropdown(requiredCountryId)
      .then((response) => {
        console.log(response);

        setValue("state", null);
        setStateOptions(response.data.result);

        setValue("district", null);
        setDistrictOptions([]);

        setValue("taluka", null);
        setTalukaOptions([]);

        setValue("city", null);
        setCityOptions([]);

        setValue("pinCode", null);
        setPincodeOptions([]);

        setValue("area", null);
        setAreaOptions([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //update the district dropdown upon change in state dropdown. This is event listener function for state dropdown
  function updateDistrictOptions(requiredStateId) {
    console.log("State id is " + requiredStateId);
    getDistrictDropdown(requiredStateId)
      .then((response) => {
        console.log(response);

        setValue("district", null);
        setDistrictOptions(response.data.result);

        setValue("taluka", null);
        setTalukaOptions([]);

        setValue("city", null);
        setCityOptions([]);

        setValue("pinCode", null);
        setPincodeOptions([]);

        setValue("area", null);
        setAreaOptions([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //update the taluka dropdown upon change in district dropdown. This is event listener function for district dropdown
  function updateTalukaOptions(requiredDistrictId) {
    console.log("Taluka id is " + requiredDistrictId);
    getTalukaDropdown(requiredDistrictId)
      .then((response) => {
        console.log(response);

        setValue("taluka", null);
        setTalukaOptions(response.data.result);

        setValue("city", null);
        setCityOptions([]);

        setValue("pinCode", null);
        setPincodeOptions([]);

        setValue("area", null);
        setAreaOptions([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //update the city dropdown upon change in taluka dropdown. This is event listener function for taluka dropdown
  function updateCityOptions(requiredTalukaId) {
    console.log("Taluka Object is " + requiredTalukaId);
    getCityDropdown(requiredTalukaId)
      .then((response) => {
        console.log(response);

        setValue("city", null);
        setCityOptions(response.data.result);

        setValue("pinCode", null);
        setPincodeOptions([]);

        setValue("area", null);
        setAreaOptions([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //update the area options upon change in Pincode dropdown
  function updateAreaOptions(requiredPincodeId) {
    console.log("Pincode id is " + requiredPincodeId);

    getAreaDropDown(requiredPincodeId)
      .then((response) => {
        console.log("area dropdown is " + JSON.stringify(response));

        setValue("area", null);
        setAreaOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //axios get request to have all the list of organizations
  function getOrganizationsList() {
    getOrganizationDropdown()
      .then((response) => {
        console.log("The list of all the unit are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setorganizationOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //axios get request to have all the list of countries. This request belongs to the country-controller on swagger
  function getCountryList() {
    getCountryDropdown()
      .then((response) => {
        console.log("The list of all the countries are as follows" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);

        console.log(
          "The id of the default country is " + response.data.result[0].id
        );

        console.log(
          "The single object of the default country is " +
            JSON.stringify(response.data.result[0])
        );

        const countryPatch = {
          id: "",
          organization: null,
          country: response.data.result[0],
          state: null,
          district: null,
          taluka: null,
          city: null,
          pinCode: null,
          area: null,
          active: true,
        };

        reset(countryPatch);

        //send the axios GET request to get all the list of states of the default country.
        getStateList(response.data.result[0].id);

        setCountryOptions(response.data.result);

        //send
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //GET request to have all the list of countries. This request belongs to the state-controller on swagger
  function getStateList(requiredCountryId) {
    getStateDropdown(requiredCountryId)
      .then((response) => {
        console.log(
          "The list of all the states for the selected country are as follows" +
            response
        );
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setStateOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //populate the city dropdown
  function populateCityById(requiredCityId) {
    console.log("requiredCityId to be populated is " + requiredCityId);

    //update the current display of the city dropdown
    getCityById(requiredCityId).then((response) => {
      console.log("The response of getCityById is " + JSON.stringify(response));

      console.log(
        "City options before populating city dropdown is " + cityOptions
      );

      setValue("city", {
        id: response.data.result.id,
        value: response.data.result.id,
        label: response.data.result.cityName,
      });
    });

    //update the city options also
    getCityDropdown(idStorage.talukaId).then((response) => {
      setCityOptions(response.data.result);
    });
  }

  //populate the taluka dropdown
  function populateTalukaById(requiredTalukaId) {
    console.log("requiredTalukaId to be populated is " + requiredTalukaId);

    //populate the current display of taluka dropdown
    getTalukaById(requiredTalukaId).then((response) => {
      console.log(
        "The response of getTalukaById is " + JSON.stringify(response)
      );

      setValue("taluka", {
        id: response.data.result.id,
        value: response.data.result.id,
        label: response.data.result.talukaName,
      });
    });

    //populate the taluka options also
    getTalukaDropdown(idStorage.districtId).then((response) => {
      setTalukaOptions(response.data.result);
    });
  }

  //populate the district dropdown
  function populateDistrictById(requiredDistrictId) {
    console.log("requiredDistrictId to be populated is " + requiredDistrictId);

    //populate the current display of the district dropdown
    getDistrictById(requiredDistrictId).then((response) => {
      console.log(
        "The response of getDistrictById is " + JSON.stringify(response)
      );

      setValue("district", {
        id: response.data.result.id,
        value: response.data.result.id,
        label: response.data.result.districtName,
      });
    });

    //populate the district options also
    getDistrictDropdown(idStorage.stateId).then((response) => {
      setDistrictOptions(response.data.result);
    });
  }

  //populate the state dropdown
  function populateStateById(requiredStateId) {
    console.log("requiredStateById to be populated is " + requiredStateId);

    //populate the current display of state dropdown
    getStateById(requiredStateId).then((response) => {
      console.log(
        "The response of getStateById is " + JSON.stringify(response)
      );

      setValue("state", {
        id: response.data.result.id,
        value: response.data.result.id,
        label: response.data.result.stateName,
      });
    });

    //populate also the current options of the state dropdown
    getStateDropdown(idStorage.countryId).then((response) => {
      setStateOptions(response.data.result);
    });
  }

  //populate the country dropdown
  function populateCountryById(requiredCountryId) {
    console.log("requiredCountryById to be populated is" + requiredCountryId);

    //populate the current display of country dropdown
    getCountryById(requiredCountryId).then((response) => {
      console.log(
        "The response of getCountryById is " + JSON.stringify(response)
      );

      setValue("country", {
        id: response.data.result.id,
        value: response.data.result.id,
        label: response.data.result.countryName,
      });
    });

    //populate also the current options of the country dropdown
    getCountryDropdown().then((response) => {
      setCountryOptions(response.data.result);
    });
  }

  //Api to get Details Based on Pincode
  useEffect(() => {
    console.log("useEffect with pinCode dependency was executed");
    if (pincodeId !== null) {
      getDetailsonPincodeId(pincodeId)
        .then((response) => {
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
      setValue("taluka", null);
      setValue("city", null);
    }
  }, [pincodeId]);

  //For updating the dataArray options of the dropdowns ; when the edit icon is clicked
  function updateDropdownOptions(idObj) {
    console.log("The idObj is " + JSON.stringify(idObj));

    // The idObj is {"pincodeId":6,"cityId":5,"talukaId":6,"districtId":1,"stateId":1,"countryId":1}

    //populate the current options of the area dropdown
    getAreaDropDown(idObj.pincodeId).then((response) => {
      console.log("area dropdown is " + JSON.stringify(response));
      setAreaOptions(response.data.result);
    });

    //populate the current options of the state dropdown
    getStateDropdown(idObj.countryId).then((response) => {
      console.log(response);
      setStateOptions(response.data.result);
    });

    //populate the current options of district dropdown
    getDistrictDropdown(idObj.stateId).then((response) => {
      console.log(response);
      setDistrictOptions(response.data.result);
    });

    //populate the current options of taluka dropdown
    getTalukaDropdown(idObj.districtId).then((response) => {
      console.log(response);
      setTalukaOptions(response.data.result);
    });

    //populate the current options of city dropdown
    getCityDropdown(idObj.talukaId).then((response) => {
      console.log(response);
      setCityOptions(response.data.result);
    });
  }

  //Store all the options of the unit Dropdown before the component gets mounted
  useEffect(() => {
    console.log("useEffect with empty dependency array is ");
    console.log("getOrganizationsList() is going to be executed");
    getOrganizationsList();

    console.log("getCountryList() is going to be executed");
    getCountryList();

    console.log("cabin in ModalCabin" + JSON.stringify(props.selected));
  }, []);

  //useEffect to patch all the area dropdowns on the basis of the state variable idStorage
  useEffect(() => {
    console.log("useEffect with idStorage as dependency array is executed");
    console.log("The id storage object is " + JSON.stringify(idStorage));

    populateCityById(idStorage.cityId);
    populateTalukaById(idStorage.talukaId);
    populateDistrictById(idStorage.districtId);
    populateStateById(idStorage.stateId);
    populateCountryById(idStorage.countryId);
  }, [idStorage]);

  //useQuery hook for the functionality of edit icon click
  const { status } = useQuery(
    ["Unit", props.idValue],

    //to avoid the automatic firing of the query. Because CountryModal is a child component of Country.js
    () => {
      if (props.idValue) {
        return getUnitById(props.idValue);
      }
    },

    {
      enabled: props.edit,

      staleTime: 0,

      cacheTime: 0,

      refetchOnWindowFocus: false,

      onSuccess: (data) => {
        console.log(
          "data fetched with no problem by using the react query library"
        );

        console.log(status);
        console.log(
          "Data fetched form api after clicking on the edit icon is " +
            JSON.stringify(data)
        );

        let resetObj = {
          id: data.data.result.id,
          area: data.data.result.area,
          city: data.data.result.city,
          contactNo: data.data.result.contactNo,
          country: data.data.result.country,
          district: data.data.result.district,
          emailID: data.data.result.emailId,
          organization: data.data.result.organization,
          pharmacyContactNo: data.data.result.pharmacyContactNo,
          pharmacyEmail: data.data.result.pharmacyEmail,
          pharmacyGSTNo: data.data.result.pharmacyGSTNo,
          pharmacyLicenseNo: data.data.result.pharmacyLicenseNo,
          pharmacyName: data.data.result.pharmacyName,
          pinCode: data.data.result.pinCode,
          state: data.data.result.state,
          taluka: data.data.result.taluka,
          uhidprefix: data.data.result.uhidprefix,
          unitAbbreviation: data.data.result.unitAbbreviation,
          unitAddress: data.data.result.unitAddress,
          unitCode: data.data.result.unitCode,
          unitGstNo: data.data.result.unitGstNo,
          unitName: data.data.result.unitName,
          unitRegistrationNo: data.data.result.unitRegistrationNo,
          unitWebsite: data.data.result.unitWebsite,
          active: data.data.result.status,
          roomImageName: data.data.result.roomImagePath,
        };
        console.log(resetObj);
        if (data) {
          reset(resetObj);

          console.log("The value of reset obj is " + JSON.stringify(resetObj));

          let idObj = {
            pincodeId: data.data.result.pinCode.value,
            cityId: data.data.result.city.value,
            talukaId: data.data.result.taluka.value,
            districtId: data.data.result.district.value,
            stateId: data.data.result.state.value,
            countryId: data.data.result.country.value,
          };

          updateDropdownOptions(idObj);
        }
      },

      onError: (error) => {
        console.log(error);
        //Code for React Toast
      },
    }
  );

  //useMutation hook for the implementation of post request data saving
  const { mutate: postUnit } = useMutation(addNewUnit, {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
      props.setOpenBackdrop(false);

      successAlert(result.data.message);
      console.log("Record has been created");

      props.populateTable({
        page: 0,
        size: 10,
        searchString: "",
      });
      props.setEdit(false);
      reset(defaultValues);
      props.setOpen(false);
    },
    onError: (error) => {
      errorAlert(error.message);
      //Code for React toast
      props.setOpenBackdrop(false);
      handleClosePost();
    },
  });

  return (
    <>
      {/* Model and table name start */}
      <div className="w-full grid justify-center items-center rounded lg:px-0 mt-4">
        <Modal
          open={props.open}
          onClose={() => {
            props.handleClose();
            props.setEdit(false);
            reset(defaultValues);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <div className="grid grid-cols-1 md:grid-cols-1  w-full">
              <CancelPresentationIconButton
                onClick={() => {
                  props.handleClose();
                  props.setEdit(false);
                  reset(defaultValues);
                }}
              />
            </div>
            <div className="row">
              <fieldset className="border border-gray-300 text-left   lg:mx-auto lg:px-4 md:ml-0 md:mr-0 py-4 rounded  lg:mt-6 lg:m-2">
                <legend className="md:mx-2 lg:px-2 font-bold text-gray-700">
                  Unit
                </legend>
                <form
                  onSubmit={handleSubmit(onSubmitDataHandler)}
                  className="grid grid-cols-1 md:grid-cols-1  gap-2"
                >
                  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:px-2">
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.organization}
                        name="organization"
                        placeholder="Organization Name *"
                        dataArray={organizationOptions}
                        isSearchable={false}
                        // isMulti={false}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="unitCode"
                        variant="outlined"
                        label="Unit Code *"
                        error={errors.unitCode}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="unitName"
                        variant="outlined"
                        label="Unit Name *"
                        error={errors.unitName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="unitAbbreviation"
                        variant="outlined"
                        label="Unit Abbreviation *"
                        error={errors.unitAbbreviation}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:px-2">
                    <div className="w-full">
                      <InputField
                        name="unitRegistrationNo"
                        variant="outlined"
                        label="Unit Registration No *"
                        error={errors.unitRegistrationNo}
                        control={control}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="unitGstNo"
                        variant="outlined"
                        label="Unit GST No *"
                        error={errors.unitGstNo}
                        control={control}
                      />
                    </div>
                    <div className="grid col-span-2">
                      <InputField
                        name="unitAddress"
                        variant="outlined"
                        label="Unit Address *"
                        error={errors.unitAddress}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:px-2">
                    {/*Select Country drop down menu*/}
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.country}
                        name="country"
                        label="Select Country"
                        placeholder="Select Country *"
                        dataArray={countryOptions}
                        isSearchable={false}
                        isDisabled={props.edit}
                        inputRef={{
                          ...register("country", {
                            onChange: (e) => {
                              //api call
                              updateStateOptions(e.target.value.id);
                              console.log(e.target.value);
                            },
                          }),
                        }}
                      />
                    </div>

                    {/* State Dropdown */}
                    <div className="w-full z-50">
                      <DropdownField
                        control={control}
                        error={errors.state}
                        name="state"
                        label="Select State *"
                        placeholder="Select State *"
                        dataArray={stateOptions}
                        isSearchable={false}
                        inputRef={{
                          ...register("state", {
                            onChange: (e) => {
                              //api call
                              updateDistrictOptions(e.target.value.id);
                              console.log(e.target.value);
                            },
                          }),
                        }}
                      />
                    </div>

                    {/*Select District Dropdwon menu*/}
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.district}
                        name="district"
                        placeholder="Select District *"
                        dataArray={districtOptions}
                        isSearchable={false}
                        inputRef={{
                          ...register("district", {
                            onChange: (e) => {
                              //api call
                              console.log(
                                "Selected district obj is " +
                                  JSON.stringify(e.target.value)
                              );
                              console.log(e.target.value);
                              updateTalukaOptions(e.target.value.id);
                            },
                          }),
                        }}
                      />
                    </div>

                    {/* Select Taluka dropdown field */}
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.taluka}
                        name="taluka"
                        placeholder="Select Taluka *"
                        dataArray={talukaOptions}
                        isSearchable={false}
                        inputRef={{
                          ...register("taluka", {
                            onChange: (e) => {
                              //api call
                              console.log(
                                "Selected taluka obj is " +
                                  JSON.stringify(e.target.value)
                              );
                              console.log(e.target.value);

                              updateCityOptions(e.target.value.id);
                            },
                          }),
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:px-2">
                    {/* Select City dropdown field */}
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.city}
                        name="city"
                        placeholder="Select City *"
                        dataArray={cityOptions}
                        isSearchable={false}
                        inputRef={{
                          ...register("city", {
                            onChange: (e) => {
                              //api call
                              console.log(
                                "Selected city obj is " +
                                  JSON.stringify(e.target.value)
                              );
                              console.log(e.target.value);
                            },
                          }),
                        }}
                      />
                    </div>

                    {/*Pincode searchbar*/}
                    <div className="w-full z-40 ">
                      <SearchDropdown
                        control={control}
                        error={errors.pinCode}
                        searchIcon={false}
                        name="pinCode"
                        dataArray={pincodeOptions}
                        isSearchable={true}
                        placeholder=" Pincode *"
                        isClearable={false}
                        handleInputChange={handleChange}
                        inputRef={{
                          ...register("pinCode", {
                            onChange: (e) => {
                              console.log(
                                "The selected pincode object is",
                                e.target
                              );

                              if (e.target.value !== null) {
                                console.log(
                                  "The id of the selected pincode object is " +
                                    e.target.value.value
                                );

                                //Get the ids of city , taluka , district , state , country
                                getPincodeById(e.target.value.value).then(
                                  (response) => {
                                    console.log(
                                      "The response of getPincodeById is " +
                                        JSON.stringify(response)
                                    );

                                    let idObj = {
                                      cityId: response.data.result.city.value,
                                      talukaId:
                                        response.data.result.city.taluka.value,
                                      districtId:
                                        response.data.result.city.taluka
                                          .district.value,
                                      stateId:
                                        response.data.result.city.taluka
                                          .district.state.value,
                                      countryId:
                                        response.data.result.city.taluka
                                          .district.state.country.value,
                                    };

                                    //Store all the ids into this state variable object
                                    setIdStorage(idObj);
                                  }
                                );

                                //Update the area dropdown on the basis of id of pincode
                                updateAreaOptions(e.target.value.value);

                                if (e.target.value !== null) {
                                  setPincodeId(e.target.value.value);
                                } else {
                                  setPincodeId(null);
                                }
                              }
                            },
                          }),
                        }}
                      />
                    </div>

                    {/* Area dropdown */}
                    <div className="w-full">
                      <DropdownField
                        control={control}
                        error={errors.area}
                        name="area"
                        dataArray={areaOptions}
                        placeholder="Search Area *"
                        isSearchable={false}
                      />
                    </div>

                    <div className="w-full">
                      <InputField
                        name="contactNo"
                        variant="outlined"
                        label="Contact No *"
                        error={errors.contactNo}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:px-2">
                    <div className="w-full">
                      <InputField
                        name="emailID"
                        variant="outlined"
                        label="Unit Email *"
                        error={errors.emailID}
                        control={control}
                      />
                    </div>

                    <div className="w-full">
                      <InputField
                        name="uhidprefix"
                        variant="outlined"
                        label="UHID Prefix *"
                        error={errors.uhidprefix}
                        control={control}
                      />
                    </div>

                    <div className="w-full">
                      <InputField
                        name="pharmacyLicenseNo"
                        variant="outlined"
                        label="Pharmacy License No *"
                        data-max="6"
                        error={errors.pharmacyLicenseNo}
                        control={control}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="pharmacyEmail"
                        variant="outlined"
                        label="Pharmacy Email *"
                        error={errors.pharmacyEmail}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:px-2">
                    <div className="w-full">
                      <InputField
                        name="unitWebsite"
                        variant="outlined"
                        label="Unit Website *"
                        error={errors.unitWebsite}
                        control={control}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="pharmacyName"
                        variant="outlined"
                        label="Pharmacy Name *"
                        error={errors.pharmacyName}
                        control={control}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="pharmacyGSTNo"
                        variant="outlined"
                        label="Pharmacy GST No *"
                        error={errors.pharmacyGSTNo}
                        control={control}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="pharmacyContactNo"
                        variant="outlined"
                        label="Pharmacy Contact No *"
                        error={errors.pharmacyContactNo}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:px-2">
                    <div className="w-full col-span-2">
                      <TextField
                        type="file"
                        size="small"
                        accept="image/*"
                        fullWidth
                        label="Upload Unit Logo"
                        name="logoImagePath"
                        id="roomImageName"
                        // required
                        // {...register("profilePic")}
                        // error={errors.profilePic ? true : false}
                        onChange={fileHandler}
                        // sx={{
                        //   "& fieldset": { border: 'none' },
                        // }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <img
                                src={UploadFile}
                                alt=""
                                className="h-5 md:h-7"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div className="w-full">
                      {" "}
                      <CheckBoxField
                        defaultChecked={defaultValues}
                        control={control}
                        name="active"
                        label="Active"
                        placeholder="Active"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 ml-6 justify-end md:p-2">
                    {props.edit ? (
                      <CancelButton
                        onClick={() => {
                          props.handleClose();
                          props.setEdit(false);
                          reset(defaultValues);
                        }}
                      />
                    ) : (
                      <ResetButton
                        onClick={() => {
                          reset(defaultValues);
                        }}
                      />
                    )}

                    {props.edit ? <UpdateButton /> : <AddButton />}
                  </div>
                </form>
              </fieldset>
              <CommonBackDrop openBackdrop={props.openBackdrop} />
            </div>
          </Box>
        </Modal>
        {/* Confirmation modal for PUT request */}
        <ConfirmationModal
          confirmationOpen={openPut}
          confirmationHandleClose={handleClosePut}
          confirmationSubmitFunc={updateRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to update this record ?"
          confirmationButtonMsg="Update"
        />

        {/* Confirmation modal for POST request */}
        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={handleClosePost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
      </div>
      {/* model and table name button end */}
    </>
  );
}
