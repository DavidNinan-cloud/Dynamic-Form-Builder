import * as yup from "yup";

export const personalValidationSchema = yup.object().shape({
  prefix: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Prefix"),
      label: yup.string().required("Please Select Prefix"),
    })
    .required("Required"),

  firstName: yup
    .string()
    .nullable()
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
    .nullable()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Please Give Last Name in Proper Format"
    )
    .required("Required")
    .min(1),

  // email: yup
  //   .string()
  //   .matches(
  //     /^[a-z][a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  //     "Please Give Email Id in Valid Format"
  //   )
  //   .email()
  //   .notRequired("Email Id is required"),

  bloodGroup: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Blood Group"),
      label: yup.string().required("Please Select Blood Gropup"),
    })
    .notRequired(),

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
    .max(10, "Provide Valid Mobile No.")
    .required("Provide Valid Mobile No."),

  // dob: yup
  //   .date()
  //   .typeError("Please Provide Date of Birth in Valid Format")
  //   .min("01/01/1950", "You are Not Eligible")
  //   .max(new Date(), "You can't be born in the future!")
  //   .required(),

  age: yup
    .string()
    .matches(/^[0-9]+$/, "Not Valid")
    .min(1, "Not Valid")
    .max(3, "Not Valid")
    .required("Required"),

  gender: yup
    .string()
    .nullable()
    .required("Please Select Gender"),

  maritalStatus: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Marital Status"),
      label: yup.string().required("Please Select Marital Status"),
    })
    .notRequired(),

  nationality: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Nationality"),
      label: yup.string().required("Please Select Nationality"),
    })
    .notRequired("Required"),

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

  houseFlatNumber: yup
    .string()
    .nullable()
    .notRequired("Please Provide Address"),

  streetAddress: yup
    .string()
    .nullable()
    .notRequired("Please Provide  Street Address"),

  area: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Area"),
      label: yup.string().required("Please Select Area"),
    })
    .notRequired("Required"),

  city: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select City"),
      label: yup.string().required("Please Select City"),
    })
    .notRequired("Required"),

  taluka: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Tehsil"),
      label: yup.string().required("Please Select Tehsil"),
    })
    .notRequired(),

  district: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select District"),
      label: yup.string().required("Please Select District"),
    })
    .notRequired("Required"),

  state: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select State"),
      label: yup.string().required("Please Select State"),
    })
    .notRequired("Required"),

  country: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Country"),
      label: yup.string().required("Please Select Country"),
    })
    .notRequired("Required"),

  pinCode: yup
    .object()
    .nullable()
    .when("country", (country) => {
      if (country !== null) {
        if (country.label.toLowerCase() === "india") {
          return yup
            .object()
            .nullable()
            .shape({
              value: yup.string().notRequired("Required"),
              label: yup.string().notRequired("Required"),
            })
            .required("Required");
        }
      } else {
        return yup
          .object()
          .nullable()
          .shape({
            value: yup.string().notRequired("Required"),
            label: yup.string().notRequired("Required"),
          })
          .required("Required");
      }
    }),
  // Income Details /////
  income: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Income Range"),
      label: yup.string().required("Please Select Income Range"),
    })
    .notRequired(),

  incomeDocument: yup
    .string()
    .nullable()
    .notRequired(),

  //Representative Info

  nameOfRepresentative: yup
    .string()
    .nullable()
    .notRequired(),

  mobileNumberOfRepresentative: yup
    .string()
    .nullable()
    .when("nameOfRepresentative", (nameOfRepresentative) => {
      if (nameOfRepresentative !== null) {
        return yup
          .string()
          .nullable()
          .matches(/^$|^[0-9X]{10}$/, "Please Provide Valid Mobile No.")
          .max(10, "Please Provide Valid Mobile No.")
          .notRequired();
        // .required("Please Provide Valid Mobile No.");
      }
    })
    .notRequired(),

  relationshipWithPatient: yup
    .string()
    .nullable()
    .when("nameOfRepresentative", (nameOfRepresentative) => {
      if (nameOfRepresentative !== null) {
        return yup
          .string()
          .nullable()

          .notRequired();
        // .required("Required");
      }
    }),

  // address: yup
  //   .string()
  //   .nullable()
  //   .when("nameOfRepresentative", (nameOfRepresentative) => {
  //     if (nameOfRepresentative !== null) {
  //       return yup.string().notRequired("Please Provide Address");
  //     }
  //   }),

  //Remark for Account
  remarkForAccount: yup
    .string()
    .nullable()
    .notRequired(),

  remarkForBill: yup
    .string()
    .nullable()
    .notRequired(),
});

export const admissionValidationSchema = yup.object().shape({
  //Admission Details
  // ipdNo: yup
  //   .string()
  //   .nullable()
  //   .required("Enter IPD No."),

  unit: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Unit"),
      label: yup.string().required("Please Select Unit"),
    })
    .required("Required"),

  department: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Department"),
      label: yup.string().required("Please Select Department"),
    })
    .required("Required"),

  // subDepartment: yup
  //   .object()
  //   .nullable()
  //   .shape({
  //     value: yup.string().required("Please Select Sub Department"),
  //     label: yup.string().required("Please Select Sub Department"),
  //   })
  //   .required("Required"),

  employee: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Doctor"),
      label: yup.string().required("Please Select Doctor"),
    })
    .required("Required"),

  patientSource: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Source"),
      label: yup.string().required("Please Select Source"),
    })
    .notRequired(),

  camp: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Camp"),
      label: yup.string().required("Please Select Camp"),
    })
    .notRequired(),
    
  tariff: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Doctor"),
      label: yup.string().required("Please Select Doctor"),
    })
    .required("Required"),

  patientCategory: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Category"),
      label: yup.string().required("Please Select Category"),
    })
    .required("Required"),

  //Company Details
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

  assistantCompany: yup
    .string()
    .nullable()
    .when("patientCategory", (patientCategory) => {
      if (patientCategory !== null) {
        if (typeof patientCategory.label !== "undefined") {
          if (patientCategory.label.toLowerCase() === "insurance") {
            return yup
              .string()
              .nullable()
              .required("Required");
          } else if (patientCategory.label.toLowerCase() === "corporate") {
            return yup
              .string()
              .nullable()
              .required("Required");
          }
        }
      }
    }),

  idNo: yup
    .string()
    .nullable()
    .when("patientCategory", (patientCategory) => {
      if (patientCategory !== null) {
        if (typeof patientCategory.label !== "undefined") {
          if (patientCategory.label.toLowerCase() === "insurance") {
            return yup
              .string()
              .nullable()
              .required("Required");
          } else if (patientCategory.label.toLowerCase() === "corporate") {
            return yup
              .string()
              .nullable()
              .required("Required");
          }
        }
      }
    }),

  //Employee Details
  code: yup
    .string()
    .nullable()
    .when("patientCategory", (patientCategory) => {
      if (patientCategory !== null) {
        if (typeof patientCategory.label !== "undefined") {
          if (patientCategory.label.toLowerCase() === "staff") {
            return yup
              .string()
              .nullable()
              .required("Required");
          }
        }
      }
    }),
  ipdLimit: yup
    .string()
    .nullable()
    .when("patientCategory", (patientCategory) => {
      if (patientCategory !== null) {
        if (typeof patientCategory.label !== "undefined") {
          if (patientCategory.label.toLowerCase() === "staff") {
            return yup
              .string()
              .nullable()
              .required("Required");
          }
        }
      }
    }),
  used: yup
    .string()
    .nullable()
    .when("patientCategory", (patientCategory) => {
      if (patientCategory !== null) {
        if (typeof patientCategory.label !== "undefined") {
          if (patientCategory.label.toLowerCase() === "staff") {
            return yup
              .string()
              .nullable()
              .required("Required");
          }
        }
      }
    }),
  empname: yup
    .string()
    .nullable()
    .when("patientCategory", (patientCategory) => {
      if (patientCategory !== null) {
        if (typeof patientCategory.label !== "undefined") {
          if (patientCategory.label.toLowerCase() === "staff") {
            return yup
              .string()
              .nullable()
              .required("Required");
          }
        }
      }
    }),

  //Representative Details
  referralType: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Category"),
      label: yup.string().required("Please Select Category"),
    })
    .notRequired(),

  referralDoctor: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Select Category"),
      label: yup.string().required("Please Select Category"),
    })
    .notRequired(),
});
