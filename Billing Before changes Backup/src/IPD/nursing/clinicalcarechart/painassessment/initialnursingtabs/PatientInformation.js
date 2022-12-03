import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../Common Components/FormFields/InputField";
import RadioField from "../../../../../Common Components/FormFields/RadioField";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import OnClickSaveButton from "../../../../../Common Components/Buttons/OnClickSaveButton";
import OnClickUpdateButton from "../../../../../Common Components/Buttons/OnClickUpdateButton";
import DropdownField from "../../../../../Common Components/FormFields/DropdownField";
import ConfirmationModal from "../../../../../Common Components/ConfirmationModal";
import CommonBackDrop from "../../../../../Common Components/CommonBackDrop/CommonBackDrop";
import {
  addNewPatient,
  getNurseList,
  getPatientInformation,
} from "../../../services/nursingServices/patientinformation/patientInformationServices";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../../Common Components/Toasts/CustomToasts";
import { VisitContext } from "../../ClinicalCareChart";

function PatientInformation() {
  const [nurseList, setNurseList] = React.useState([]);

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [patientInformation, setPatientInformation] = React.useState("");

  const [formData, setFormData] = React.useState({});

  //state variable to open and close the confirmation modal for updation
  const [openUpdateConfirmation, setUpdateConfirmation] = React.useState(false);

  //state variable to open the confirmation modal adding the patient data
  const [openPostConfirmation, setPostConfirmation] = React.useState(false);

  // Context
  const patientVisitId = useContext(VisitContext);

  const bandWithArray = [
    {
      id: true,
      value: true,
      label: "Yes",
    },
    {
      id: false,
      value: false,
      label: "No",
    },
  ];

  const defaultValues = {
    disabilities: "",
    externalEquipments: [],
    height: "",
    //id of patched patient
    //the response of getPatientInitialAssessment
    //contains the property called id.
    //if the patient doesnt exist ; keep the id as null
    id: null,
    isBandWithCorrectInformation: true,
    knownAllergies: "",
    staff: {
      _id: 0, //id taken from the dropdown
    },
    //taken from the parent component ClinicalCare
    visitId: patientVisitId,
    weightInKgs: 0,
  };

  //state variable to close the confirmation modal for POST request
  const closeAddConfirmation = () => {
    if (openPostConfirmation) {
      setPostConfirmation(false);
    }
  };

  //state variable to close the confirmation modal for PUT request
  const closeUpdateConfirmation = () => {
    if (openUpdateConfirmation) {
      setUpdateConfirmation(false);
    }
  };

  //event listener function for the Add button of the confirmation modal
  function addNewPatientInfo() {
    //Close the confirmation modal
    closeAddConfirmation();

    setOpenBackdrop(true);

    console.log("The Add button of the confirmation modal has been clicked");

    //Post request
    addNewPatient(formData)
      .then((response) => {
        setOpenBackdrop(false);
        // successAlert(result.data.message);
        console.log("The response of the post request is ", response);
      })
      .catch((error) => {
        // errorAlert(error.message);
        setOpenBackdrop(false);
      });
  }

  //event listener function for the Update button of the confirmation modal
  function updatePatientInfo() {
    //Close the confirmation modal
    closeUpdateConfirmation();

    setOpenBackdrop(true);

    console.log("The Update button of the confirmation modal has been clicked");

    console.log("formData in updatePatientInfo function is ", formData);

    //Post request
    addNewPatient(formData)
      .then((response) => {
        setOpenBackdrop(false);
        // successAlert(result.data.message);
        console.log("The response of the post request is ", response);
      })
      .catch((error) => {
        // errorAlert(error.message);
        setOpenBackdrop(false);
      });
  }

  const { control, handleSubmit, reset, watch, register, setValue } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmitDataHandler = (data) => {
    console.log("The submitted form data is ", data);

    if (data.isBandWithCorrectInformation === "false") {
      data.isBandWithCorrectInformation = false;
    } else if (data.isBandWithCorrectInformation === "true") {
      data.isBandWithCorrectInformation = true;
    }

    let staffId;

    if (data.staff.hasOwnProperty("id")) {
      staffId = data.staff.id;
    }

    data.staff = {
      _id: staffId,
    };

    console.log("The required object is ", data);

    if (patientInformation === "") {
      //open the confirmation modal for adding new patient
      setPostConfirmation(true);
      setFormData(data);
    } else if (patientInformation !== "") {
      //open the confirmation modal for updating the patient data
      setUpdateConfirmation(true);
      //call the function for updating the record
    }
  };

  React.useEffect(() => {
    const subscription = watch((data) => {
      console.log("The subscribed data is ");
      console.log(data);

      console.log(typeof data);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  React.useEffect(() => {
    getNurseList().then((response) => {
      console.log("The employee list or nurse list is ", response.data.result);
      setNurseList(response.data.result);
    });

    //get the patient information ; if the patientVisitId exists
    if (patientVisitId) {
      getPatientInformation(patientVisitId).then((response) => {
        console.log("The patient information is ", response);

        //staffObj object to patch the dropdown values
        let staffObj = {
          id: response.data.result.staffId,
          value: response.data.result.staffId,
          label: response.data.result.staffName,
        };

        //if the result is empty then open the confirmation modal for adding the record
        //if the result is not empty then open the confirmation modal for updating the record
        if (response.data.hasOwnProperty("result")) {
          reset(response.data.result);
          setPatientInformation(response.data.result);
          setValue("staff", staffObj);
        }
      });
    }
  }, []);

  React.useEffect(() => {
    console.log("patienInformation is ", patientInformation);
  }, [patientInformation]);

  return (
    <div className=" px-3">
      <form
        className="grid grid-cols-1 w-full gap-2 "
        onSubmit={handleSubmit(onSubmitDataHandler)}
      >
        <div className="grid grid-cols-2 gap-7 items-center">
          <div className="flex gap-2 items-center">
            <InputField
              name="height"
              variant="outlined"
              label="Height in cm"
              control={control}
            />
            <InputField
              name="weightInKgs"
              variant="outlined"
              label="Weight In Kgs"
              control={control}
            />
          </div>

          <div className="flex gap-2 items-center">
            <h6 className="font-bold md:text-sm lg:text-base">
              ID Band on Wrist With Correct Information
            </h6>
            <RadioField
              label=""
              name="isBandWithCorrectInformation"
              control={control}
              dataArray={bandWithArray}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <InputField
            name="knownAllergies"
            variant="outlined"
            label="Known Allergies"
            control={control}
          />
          <InputField
            name="disabilities"
            variant="outlined"
            label="Disabilities If Any"
            control={control}
          />

          {/* grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 */}

          <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Denutures"
                {...register("externalEquipments")}
              />
              <p>Denutures</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Contact Lenses"
                {...register("externalEquipments")}
              />
              <p>Contact Lenses</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Artificial Limbs"
                {...register("externalEquipments")}
              />
              <p>Artificial Limbs</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Implants"
                {...register("externalEquipments")}
              />
              <p>Implants</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Ryle's Tube"
                {...register("externalEquipments")}
              />
              <p>Ryle's Tube</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Gastro Jejunomstomy"
                {...register("externalEquipments")}
              />
              <p>Gastro Jejunomstomy</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Central Line"
                {...register("externalEquipments")}
              />
              <p>Central Line</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="ArterialLine"
                {...register("externalEquipments")}
              />
              <p>ArterialLine</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Tracheotomy"
                {...register("externalEquipments")}
              />
              <p>Tracheotomy</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Intubated"
                {...register("externalEquipments")}
              />
              <p>Intubated</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Fistula"
                {...register("externalEquipments")}
              />
              <p>Fistula</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-5 w-5"
                value="Foleys Catheter"
                {...register("externalEquipments")}
              />
              <p>Foleys Catheter</p>
            </div>
          </div>

          <DropdownField
            control={control}
            name="staff"
            variant="outlined"
            placeholder="Receiving Staff Name"
            label="Receiving Staff Name"
            dataArray={nurseList}
            isMulti={false}
            isClearable={false}
            isSearchable={false}
          />
        </div>

        {patientInformation === "" ? (
          <div className="flex gap-2 justify-end">
            <ResetButton onClick={() => reset(defaultValues)} />
            <OnClickSaveButton
              onClick={() => {
                handleSubmit(onSubmitDataHandler)();
              }}
            />
          </div>
        ) : (
          <div className="flex gap-2 justify-end">
            <ResetButton onClick={() => reset(defaultValues)} />
            <OnClickUpdateButton
              onClick={() => {
                handleSubmit(onSubmitDataHandler)();
              }}
            />
          </div>
        )}
      </form>

      {/* Backdrop component to disable the screen after submitting the form */}
      <CommonBackDrop openBackdrop={openBackdrop} />

      {/* Confirmation modal for PUT request */}
      <ConfirmationModal
        confirmationOpen={openUpdateConfirmation}
        confirmationHandleClose={closeUpdateConfirmation}
        confirmationSubmitFunc={updatePatientInfo}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure you want to update this assessment ?"
        confirmationButtonMsg="Update"
      />

      {/* Confirmation modal for POST request */}
      <ConfirmationModal
        confirmationOpen={openPostConfirmation}
        confirmationHandleClose={closeAddConfirmation}
        confirmationSubmitFunc={addNewPatientInfo}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure you want to add this record ?"
        confirmationButtonMsg="Add"
      />
    </div>
  );
}

export default PatientInformation;
