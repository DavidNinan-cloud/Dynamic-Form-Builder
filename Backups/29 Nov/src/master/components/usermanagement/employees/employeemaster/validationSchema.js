import * as yup from "yup";

export const validationSchema = yup.object().shape({
  // employeeType: yup.string().required("Select employeeType"),

  // registrationNo: yup
  // .string()
  // .matches(/^[0-9]+$/, "Provide Valid employee Code")
  // .min(10, "Provide Valid employee Code")
  // .max(10, "Provide Valid employee Code")
  // .required("Provide Valid employee Code"),

  prefix:  yup.object().nullable().shape({
    value: yup.string().required("Required"),
    label: yup.string().required("Required")
  }).required("Required"),

  firstName: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Please Give First Name in Proper Format"
    )
    .required("First Name is Required")
    .min(2),

  // middleName: yup
  //   .string()
  //   .matches(
  //     /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
  //     "Please Give Middle Name in Proper Format"
  //   )
  //   .required("Middle Name is Required")
  //   .min(1),

  lastName: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Please Give Last Name in Proper Format"
    )
    .required("Last Name is Required")
    .min(2),

    // commented here
  email: yup
    .string()
    // .matches(
    //   /^[a-z][a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
    //   "Please Give Email Id in Valid Format"
    // )
    .email(),
    // .required("Email Id is required"),

  employeeType: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Please Mention Your employeeType"),
      label: yup.string().required("Please Mention Your employeeType"),
    })
    .required("Required"),
  age: yup
  .string()
  .min(18, "Invalid")
  .matches(/^(110|[1-9]?[0-9])$/, "Invalid")
  .required("Required"),
  
  mobileNo: yup
  .string()
  .matches(/^[0-9]+$/, "Please Provide Valid Mobile No.")
  .min(10, "Please Provide Valid Mobile No.")
  .max(14, "Please Provide Valid Mobile No.")
  .required("Please Provide Valid Mobile No."),
  // dob: yup
  //   .date()
  //   .typeError("Please Provide Date of Birth in Valid Format")
  //   // .min("01/01/1950", "Not Eligible")
  //   // .max(new Date(), "Not Eligible!")
  //   .required(),

  // gender: yup.string().nullable().required("Please Select Your Gender"),

  // // maritalStatus: yup.object().nullable().shape({
  // //   value: yup.string().required("Required"),
  // //   label: yup.string().required("Required")
  // // }).required("Required"),
  // // indentificationFile: yup.mixed().required("File is required"),

  // //   Address Information //////
  address: yup.string().required("Address is Required").min(3),

  // // pincode: yup
  // //   .string()
  // //   .matches(/^[0-9]+$/, "Invalid Pincode.")
  // //   .min(6, "Invalid Pincode.")
  // //   .max(6, "Invalid Pincode.")
  // //   .required("Invalid Pincode."),
  pinCode: yup
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
  //
  nationality: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Required"),
      label: yup.string().required("Required"),
    })
    .required("Required"),
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
    taluka: yup
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

  // //  Employee Position //////
  // qualification: yup.string().required("Required"),

  educationInfo: yup
    .array()
    .of(
      yup.object().shape({
        collegeName: yup
          .string()
          .required("Required")
          .min(2, "Add Aleast 2 Characters"),

          passingYear:  yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Invalid Year")
        .min(4, "Please Provide Valid Year")
        .max(4, "Please Provide Valid Year"),

        qualification: yup
          .object()
          .nullable()
          .shape({
            value: yup.string().required("Required"),
            label: yup.string().required("Required"),
          })
          .required("Required"),
      })
    )
    .min(1, "Please Add Education Details"),

  // // registrationNo: yup.string().when("isClinical", (type) => {
  // //   if (type !== tr) {
  // //     if (type) {
  // //       return yup.string().required("Required");
  // //     }
  // //   }
  // // }),
  // //
  // designation: yup
  //   .object()
  //   .nullable()
  //   .shape({
  //     value: yup.string().required("Required"),
  //     label: yup.string().required("Required"),
  //   })
  //   .required("Required"),

  //   experience: yup.string().required("Required"),
  // // employeeTimeSlot: yup.string().required("Required"),

  // //  Employee Documents //////
  aadharNo: yup
    .string()
    .matches(/^[0-9]+$/, "Required")
    .min(12, "Please Provide Valid Aadhar No.")
    .max(12, "Please Provide Valid Aadhar No.")
    .required("Required"),

    panNo: yup
    .string()
    .matches(
      /[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "Required "
    )
    .min(10, "Please Provide Valid Pan No.")
    .max(10, "Please Provide Valid Pan No.")
    .required("Required"),

  employeeUAN: yup
    .string()
    .nullable()
    .matches(/^[0-9]+$/, "Please Provide Valid Uan No.")
    .min(12, "Please Provide Valid Uan No.")
    .max(12, "Please Provide Valid Uan No."),
    // .required("Please Provide Valid Uan No."),

  // employeePfNo: yup
  //   .string()
  //   .nullable()
  //   //.matches(/^[0-9]+$/, "Please Provide Valid Pf No.")
  //   .min(22, "Please Provide Valid Pf No.")
  //   .max(22, "Please Provide Valid Pf No."),
  //   // .required("Please Provide Valid Pf No."),

  // //
  // bank: yup
  //   .object()
  //   .nullable()
  //   .shape({
  //     value: yup.string().required("Required"),
  //     label: yup.string().required("Required"),
  //   })
  //   .required("Required"),

  //   ifsCode: yup.string().required("Required"),

  accountNo: yup
    .string().nullable()
    .matches(/^[0-9]+$/, "Invalid Account Number."),
    // .required("Invalid Account Number."),
  // //
  units: yup
    .array()
    .nullable(false, "Required")
    .min(1, "Required")
    .of(
      yup.object().shape({
        label: yup.string().required("Please Mention Your category"),
        value: yup.string().required("Please Mention Your category"),
      })
    ),

    departments: yup
    .array()
    .nullable(false, "Required")
    .min(1, "Required")
    .of(
      yup.object().shape({
        label: yup.string().required("Please Mention Your category"),
        value: yup.string().required("Please Mention Your category"),
      })
    ),
});
