import React from "react";
import { useForm } from "react-hook-form";
import ResetButton from "../../../../../Common Components/Buttons/ResetButton";
import OnClickSaveButton from "../../../../../Common Components/Buttons/OnClickSaveButton";
import InputField from "../../../../../Common Components/FormFields/InputField";

// post obj is
// {
//   "assessedBy": {
//     "_id": 0,
//     "email": "string",
//     "employeeCode": "string",
//     "employeeType": "string",
//     "firstName": "string",
//     "lastName": "string",
//     "middleName": "string",
//     "mobileNo": 0
//   },
//   "assessedByName": "string",
//   "dateTime": "2022-11-30T14:11:28.085Z",
//   "handOverToName": "string",
//   "id": "string",
//   "onAdmissionConsultantBy": [
//     "string"
//   ],
//   "onAdmissionConsultants": [
//     {
//       "_id": 0,
//       "email": "string",
//       "employeeCode": "string",
//       "employeeType": "string",
//       "firstName": "string",
//       "lastName": "string",
//       "middleName": "string",
//       "mobileNo": 0
//     }
//   ],
//   "patientPersonalBelongings": "string",
//   "preOpOrders": "string",
//   "reasonForHospitalization": "string",
//   "receiversRelationToPatient": "string",
//   "symptoms": "string",
//   "visitId": 0
// }

function BedScoreAssessment() {
  const defaultValues = {
    patientAdmitted: "",
    doctorInform: "",
    patientSymptoms: "",
    patientSurgery: "",
    patientHandOver: "",
    handOverToName: "",
    relationToPatient: "",
    assessedByName: "",
  };

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmitDataHandler = (data) => {
    console.log(data);
  };
  return (
    <div className="mx-2 ">
      <form
        className="grid grid-cols-1 w-full gap-2 "
        onSubmit={handleSubmit(onSubmitDataHandler)}
      >
        <div className="grid items-center gap-2">
          <h6 className="text-base font-bold">
            Reason for hospitalization patient was admitted to
          </h6>
          <div className="w-full">
            <InputField
              name="patientAdmitted"
              variant="outlined"
              label=""
              control={control}
            />
          </div>
        </div>

        <div className="grid items-center gap-2">
          <h6 className="text-base font-bold">
            On admission the following consultant / hospital doctors were
            Informed :
          </h6>
          <div className="w-full">
            <InputField
              name="doctorInform"
              variant="outlined"
              label=""
              control={control}
            />
          </div>
        </div>

        <div className="grid items-center gap-2">
          <h6 className="text-base font-bold">
            {" "}
            On admission patient had the following symptoms :
          </h6>
          <div className="w-full">
            <InputField
              name="patientSymptoms"
              variant="outlined"
              label=""
              control={control}
            />
          </div>
        </div>

        <div className="grid items-center gap-2">
          <h6 className="text-base font-bold">
            Patient has been sceduled for surgery with following pre opration
            orders :
          </h6>
          <div className="w-full">
            <InputField
              name="patientSurgery"
              variant="outlined"
              label=""
              control={control}
            />
          </div>
        </div>

        <div className="grid items-center gap-2">
          <h6 className="text-base font-bold">
            The following personal belongings of the patient were hand over :
          </h6>
          <div className="w-full">
            <InputField
              name="patientHandOver"
              variant="outlined"
              label=""
              control={control}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-2">
          <InputField
            name="handOverToName"
            variant="outlined"
            label="Handed Over To Name"
            control={control}
          />

          <InputField
            name="relationToPatient"
            variant="outlined"
            label="Receivers Relation To Patient"
            control={control}
          />
        </div>

        <div className="w-full">
          <InputField
            name="assessedByName"
            variant="outlined"
            label="Assessed By (Name)"
            control={control}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <ResetButton onClick={() => reset(defaultValues)} />
          <OnClickSaveButton
            onClick={() => {
              handleSubmit(onSubmitDataHandler)();
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default BedScoreAssessment;
