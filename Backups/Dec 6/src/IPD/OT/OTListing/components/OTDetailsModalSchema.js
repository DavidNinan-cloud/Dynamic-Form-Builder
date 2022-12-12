import * as yup from "yup";

export const OTDetailsModalSchema = yup
  .object()
  .shape({
    theater: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Theater"),
        label: yup.string().required("Please Select Theater"),
      }),

    otType: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select OT Type"),
        label: yup.string().required("Please Select OT Type"),
      }),

    otCategory: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select OT Category"),
        label: yup.string().required("Please Select OT Category"),
      }),

    subGroup: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select OT Category"),
        label: yup.string().required("Please Select OT Category"),
      }),

    theaterService: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select OT Category"),
        label: yup.string().required("Please Select OT Category"),
      }),

    subGroup: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select SubGroup"),
        label: yup.string().required("Please Select SubGroup"),
      }),

    drType: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Dr. Type"),
        label: yup.string().required("Please Select Dr. Type"),
      }),

    drName: yup
      .object()
      .required("Required")
      .nullable()
      .shape({
        value: yup.string().required("Please Select Dr. Name"),
        label: yup.string().required("Please Select Dr. Name"),
      }),

    startTime: yup.string().nullable().required("Time Required"),

    endTime: yup.string().nullable().required("Time Required"),

    surgeonArrivalTime: yup.string().nullable().required("Time required"),

    anesthesiaStartTime: yup.string().nullable().required("Time required"),

    anesthesiaEndTime: yup.string().nullable().required("Time required"),

    surgeonArrivalTime: yup.string().nullable().required("Time required"),

    anesthetistArrivalTime: yup.string().nullable().required("Time required"),

    patientArrivalTime: yup.string().nullable().required("Time required"),

    ADMAnesthesiaTime: yup.string().nullable().required("Time required"),

    wheelInTime: yup.string().nullable().required("Time required"),

    wheelOutTime: yup.string().nullable().required("Time required"),

    OTCleanStartTime: yup.string().nullable().required("Time required"),

    OTCleanEndTime: yup.string().nullable().required("Time required"),

    antibioticInWardTime: yup.string().nullable().required("Time required"),

    antibioticInOtTime: yup.string().nullable().required("Time required"),

    patientShiftTime: yup.string().nullable().required("Time required"),

  })
  .required();
