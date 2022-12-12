import React from "react";

function BookAppointmentButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-10 px-3 text-base font-medium  bg-customBlue text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
      >
        Book Appointment
      </button>
    </div>
  );
}

export default BookAppointmentButton;