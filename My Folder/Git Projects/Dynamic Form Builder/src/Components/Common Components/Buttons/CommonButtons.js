import { Button } from "@mui/material";
import React from "react";

// for all Forms
// mui version
export function SubmitButton() {
  return (
    <Button type="submit" variant="contained" color="success">
      Submit
    </Button>
  );
}
export function CustomSubmitButton({ label }) {
  return (
    <Button type="submit" variant="contained" color="success">
      {label}
    </Button>
  );
}
export function ResetButton({ onClick }) {
  return (
    <Button
      type="reset"
      variant="outlined"
      color="error"
      sx={{ border: "2px solid" }}
      onClick={onClick}
    >
      Reset
    </Button>
  );
}

export function CancelButton({ onClick }) {
  return (
    <Button
      variant="outlined"
      color="error"
      sx={{ border: "2px solid" }}
      onClick={onClick}
    >
      Cancel
    </Button>
  );
}
export function ConfirmButton({ onClick, confirmationButtonMsg }) {
  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "#4CAF50" }}
      onClick={onClick}
    >
      {confirmationButtonMsg}
    </Button>
  );
}

// for lists
export function AddNewButton({ label }) {
  return (
    <Button type="submit" variant="contained" color="success">
      + Add {label}
    </Button>
  );
}

///
// tailwind version

export function AddButton() {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3 text-base font-medium  bg-customGreen text-white rounded "
      >
        Add
      </button>
    </div>
  );
}
// export function ConfirmButton({onClick}) {
// return (
//     <div>
//     <button
//         type="button"
//         className="h-[38px] px-3 text-base font-medium  bg-green-700 text-white rounded "
//         onClick={onClick}
//     >
//         Confirm
//     </button>
//     </div>
// );
// }

// export function SubmitButton() {
//     return (
//       <div>
//         <button
//           type="submit"
//           className="h-[38px] px-3 text-base font-medium  bg-green-700 text-white rounded "
//         >
//           Submit
//         </button>
//       </div>
//     );
//   }

export function SaveButton() {
  return (
    <div>
      <button
        type="submit"
        className="h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium"
      >
        Save
      </button>
    </div>
  );
}

// export function CancelButton({ onClick }) {
// return (
//     <div>
//     <button
//         type="button"
//         className="h-[38px] px-3 border border-red-600 text-red-600 rounded text-base font-medium"
//         onClick={onClick}
//     >
//         Cancel
//     </button>
//     </div>
// );
// }

// export function ResetButton({ onClick }) {
// return (
//     <div>
//     <button
//         type="button"
//         className="h-[38px] px-3 border border-red-600 text-red-600 rounded text-base font-medium"
//         onClick={onClick}
//     >
//         Reset
//     </button>
//     </div>
// );
// }

export function UpdateButton() {
  return (
    <div>
      <button
        type="submit"
        className="h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium"
      >
        Update
      </button>
    </div>
  );
}

// For Lists
// export function AddNewButton({ onClick }) {
// return (
//     <div>
//     <button
//         type="submit"
//         className="h-[38px] px-3 w-full bg-green-700 text-white rounded text-base font-medium"
//         onClick={onClick}
//     >
//         + Add New
//     </button>
//     </div>
// );
// }
