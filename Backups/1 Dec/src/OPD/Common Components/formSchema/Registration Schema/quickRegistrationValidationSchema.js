import * as yup from "yup";

export const quickRegistrationValidationSchema = yup.object().shape({
  unit: yup
    .object()
    .nullable()
    .when("showUnit", (showUnit) => {
      if (showUnit) {
        return yup
          .object()
          .nullable()
          .shape({
            value: yup.string().required("Please Mention Unit"),
            label: yup.string().required("Please Mention Unit"),
          })
          .required("Please Mention Unit");
      }
    }),

  prefix: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Prefix"),
      label: yup.string().required("Please Select Prefix"),
    })
    .required("Required"),

  // registrationDate: yup
  //   .date()
  //   .typeError("Please Provide Date of Birth in Valid Format")
  //   .min("01/01/1950", "You are Not Eligible")
  //   .max(new Date(), "You can't be born in the future!")
  //   .required(),

  firstName: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Please Give First Name in Proper Format"
    )
    .required("Required")
    .min(1),

  // middleName: yup
  //   .string()
  //   .matches(
  //     /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
  //     "Please Give Middle Name in Proper Format"
  //   )
  //   .required("Middle Name Required")
  //   .min(1),

  lastName: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Please Give Last Name in Proper Format"
    )
    .required("Required")
    .min(1),

  email: yup
    .string()
    .nullable()
    .email()
    .when("showEmail", (showEmail) => {
      if (showEmail) {
        return yup
          .string()
          .nullable()
          .email()
          .matches(
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            "Invalid Email Format"
          )
          .required("Required");
      }
    })
    .notRequired(),

  // bloodGroup: yup
  //   .object()
  //   .nullable()
  //   .shape({
  //     value: yup.string().required("Please Select Blood Group"),
  //     label: yup.string().required("Please Select Blood Gropup"),
  //   })
  //   .notRequired(),

  isd: yup
    .object()
    .shape({
      value: yup.string().required("Required"),
      label: yup.string().required("Required"),
    })
    .required("Required"),

  mobileNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Provide Valid Mobile No.")
    .min(10, "Provide Valid Mobile No.")
    .max(14, "Provide Valid Mobile No.")
    .required("Provide Valid Mobile No."),

  // dob: yup
  //   .date()
  //   .typeError("Please Provide Date of Birth in Valid Format")
  //   .min("01/01/1950", "You are Not Eligible")
  //   .max(new Date(), "You can't be born in the future!")
  //   .required(),

  // age: yup
  //   .string()
  //   .matches(/^[0-9]+$/, "Not Valid")
  //   .min(1, "Not Valid")
  //   .max(3, "Not Valid")
  //   .required("Required"),

  age: yup
    .string()
    .matches(/^(?:10[0-9]|110|[0-9][0-9]|[2-9][0-9]|[0-9])$/, "Invalid")
    .required("Required"),

  gender: yup
    .string()
    .nullable()
    .required("Please Select Gender"),

  // maritalStatus: yup
  //   .object()
  //   .nullable()
  //   .shape({
  //     value: yup.string().required("Please Select Marital Status"),
  //     label: yup.string().required("Please Select Marital Status"),
  //   })
  //   .notRequired(),

  nationality: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Nationality"),
      label: yup.string().required("Please Select Nationality"),
    })
    .notRequired(),

  // ethnicity: yup.string().required("Select Ethnicity"),

  citizenIdProof: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Identification Document"),
      label: yup.string().required("Please Select Identification Document"),
    })
    .notRequired(),

  identificationDocumentNumber: yup
    .string()
    .nullable()
    // .required("Identification No. Required")
    .when("citizenIdProof", (citizenIdProof) => {
      if (citizenIdProof !== null) {
        if (citizenIdProof.label.toLowerCase() === "pan") {
          return (
            yup
              .string()
              .nullable()
              .matches(
                /[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                "Please Provide Valid Pan No."
              )
              .min(10, "Please Provide Valid Pan No.")
              .max(10, "Please Provide Valid Pan No.")
              // .typeError("Pancard No. is required")
              .notRequired()
          );
        } else if (citizenIdProof.label.toLowerCase() === "aadhar") {
          return (
            yup
              .string()
              .nullable()
              .matches(/^[0-9]+$/, "Please Provide Valid Aadhar No.")
              .min(12, "Please Provide Valid Aadhar No.")
              .max(12, "Please Provide Valid Aadhar No.")
              // .typeError("Aadhar No. is required")
              .notRequired()
          );
        } else {
          return yup
            .string()
            .nullable()
            .notRequired();
        }
      }
    })
    .notRequired(),

  identificationFile: yup.mixed().when("citizenIdProof", (citizenIdProof) => {
    if (citizenIdProof !== null) {
      return yup.mixed().notRequired();
    }
  }),
  //   Address Information //////

  //houseFlatNumber: yup.string().required("Please Provide Address"),

  //streetAddress: yup.string().required("Please Provide  Street Address"),

  area: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Area"),
      label: yup.string().required("Please Select Area"),
    })
    .notRequired(),
  //  .required("Required"),

  city: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select City"),
      label: yup.string().required("Please Select City"),
    })
    .notRequired(),

  taluka: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Taluka"),
      label: yup.string().required("Please Select Taluka"),
    })
    .notRequired(),

  district: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select District"),
      label: yup.string().required("Please Select District"),
    })
    .notRequired(),

  state: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select State"),
      label: yup.string().required("Please Select State"),
    })
    .notRequired(),

  country: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Country"),
      label: yup.string().required("Please Select Country"),
    })
    .notRequired(),

  pinCode: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Pincode"),
      label: yup.string().required("Please Select Pincode"),
    })
    .required("Required"),

  // Referral Doctor Details /////
  referralType: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Referral Type"),
      label: yup.string().required("Please Select Referral Type"),
    })
    .notRequired(),

  referralDoctor: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Referral Doctor"),
      label: yup.string().required("Please Select Referral Doctor"),
    })
    .notRequired(),
  // Quick Registration //
  // visitDate: yup
  //   .date()
  //   .typeError("Please Provide Vist Date in Valid Format")
  //   .max(new Date(), "Please give Correct Date")
  //   .required(),

  // patientType: yup
  //   .object()
  //   .nullable()
  //   .shape({
  //     value: yup.string().required("Please Select Patient Type"),
  //     label: yup.string().required("Please Select Patient Type"),
  //   })
  //   .required("Required"),

  visitType: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Visit Type"),
      label: yup.string().required("Please Select Visit Type"),
    })
    .required("Required"),

  patientCategory: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Patient Category"),
      label: yup.string().required("Please Select Patient Category"),
    })
    .required("Required"),

  company: yup
    .object()
    .nullable()
    .when("patientCategory", (patientCategory) => {
      if (patientCategory !== null) {
        if (typeof patientCategory.label !== "undefined") {
          if (patientCategory.label.toLowerCase() === "insurance") {
            console.log("patientCategory", patientCategory.label);
            return yup
              .object()
              .nullable()
              .shape({
                value: yup.string().notRequired("Please Select Company"),
                label: yup.string().notRequired("Please Select Company"),
              })
              .required("Required");
          } else if (patientCategory.label.toLowerCase() === "corporate") {
            console.log("patientCategory1", patientCategory.label);
            return yup
              .object()
              .nullable()
              .shape({
                value: yup.string().notRequired("Please Select Company"),
                label: yup.string().notRequired("Please Select Company"),
              })
              .required("Required");
          }
        }
      }
    }),

  tariff: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Doctor"),
      label: yup.string().required("Please Select Doctor"),
    })
    .required("Required"),
  doctor: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Doctor"),
      label: yup.string().required("Please Select Doctor"),
    })
    .required("Required"),
  department: yup
    .object()
    .nullable()
    .shape({
      label: yup.string().required("Required"),
      value: yup.string().required("Required"),
    })
    .required("Required"),

  cabin: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Cabin"),
      label: yup.string().required("Please Select Cabin"),
    })
    .required("Required"),

  // subDepartment: yup
  //   .object()
  //   .nullable()
  //   .shape({
  //     value: yup.string().required("Please Select Sub Department"),
  //     label: yup.string().required("Please Select Sub Department"),
  //   })
  //   .notRequired(),

  // remark: yup.string().notRequired(),

  patientSource: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Patient Source"),
      label: yup.string().required("Please Select Patient Source"),
    })
    .required("Required"),
});
