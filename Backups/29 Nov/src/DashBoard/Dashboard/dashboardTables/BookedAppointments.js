import { Avatar, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { bookAppointmentData } from "../../utils/constants/dashboardContants/dashboardTables/bookAppointmentData";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { getBookedAppointment } from "../../services/dashboardServices/dashboardService";
import CommonDashboardTable from "./CommonDashboardTable";
import { Link } from "react-router-dom";

const BookedAppointments = () => {
  const [data, setData] = useState({ result: [] });

  let defaultParam = {
    fromDate: new Date(),
    page: 0,
    searchString: "",
    size: 10,
    toDate: new Date(),
  };

  useEffect(() => {
    getBookedAppointment(defaultParam)
      .then((res) => {
        setData(res.data);
      })
      .catch((res) => {
        console.log("Error", res);
      });
  }, []);

  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: "10px", height: "483px" }}>
        <CardContent sx={{ height: "100%" }}>
          <div className="flex justify-between mx-3">
            <h1 className="p-3 font-bold text-gray-800 text-base font-Poppins">
              Booked Appointments
            </h1>
            <Link to="/appointment/appointmentlist">
              <button className="border border-blue-500 px-4 py-2 rounded-md h-10 text-blue-400 hover:bg-blue-400 hover:text-white">
                View All
              </button>
            </Link>
          </div>

          {data.result.length > 0 ? (
            <CommonDashboardTable data={data} />
          ) : (
            <div className="flex justify-center h-full">
              <p className="my-auto flex items-center">
                Appointments are not Available
              </p>
            </div>
          )}
          {/* <table className="w-full">
              <thead>
                <tr className="bg-slate-200 h-12">
                  {Object.keys(bookAppointmentData[0]).map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-left p-2 pl-3 text-gray-600 text-sm font-bold font-Poppins"
                      >
                        {data}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {bookAppointmentData.map((row, index) => (
                  <tr
                    key={index}
                    className="h-12 p-12 border-b-2 border-slate-100"
                  >
                    <td className="text-left p-2">
                      <Avatar alt="pic" src={row["#"]} variant="rounded" />
                    </td>
                    <td className="text-left p-2 text-slate-700 text-sm font-Poppins">
                      {row["Patient Name"]}
                    </td>
                    <td className="text-left text-blue-500 text-sm p-2 font-Poppins">
                      {row["Assigned Doctor"]}
                    </td>
                    <td className="text-left text-sm text-slate-700 font-Poppins">
                      {row["Date"]}
                    </td>
                    <td className="text-left text-sm p-2">
                      {row["Diseases"] === "fever" ? (
                        <button className=" px-2 text-red-500 font-Poppins font-semibold  outline-red-300 rounded">
                          Fever
                        </button>
                      ) : row["Diseases"] === "cholera" ? (
                        <button className=" px-2 text-green-500 font-Poppins  font-semibold outline-green-300 rounded">
                          Cholera
                        </button>
                      ) : row["Diseases"] === "jaundice" ? (
                        <button className="px-2 text-purple-500  font-Poppins font-semibold  outline-purple-300 rounded">
                          Jaundice
                        </button>
                      ) : row["Diseases"] === "typhod" ? (
                        <button className="px-2 text-purple-500 font-Poppins  font-semibold  outline-purple-300 rounded">
                          Typhoid
                        </button>
                      ) : row["Diseases"] === "maleria" ? (
                        <button className="px-2 text-yellow-500  font-Poppins font-semibold  outline-orange-300 rounded">
                          Maleria
                        </button>
                      ) : (
                        <button className="px-2 text-blue-500   font-semibold  outline-sky-300 rounded">
                          Infection
                        </button>
                      )}
                    </td>
                    <td className="text-left text-sm">
                      <DriveFileRenameOutlineOutlinedIcon className="text-blue-500 mr-5" />
                      <DeleteOutlineOutlinedIcon className="text-red-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookedAppointments;
