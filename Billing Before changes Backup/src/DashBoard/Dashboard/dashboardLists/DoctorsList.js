import { Avatar, Card, CardContent } from "@mui/material";
import React from "react";
import { doctorListData } from "../../utils/constants/dashboardContants/dashboardLists/doctorListData";

const DoctorsList = () => {
  return (
    <div>
      <Card
        elevation={5}
        sx={{ borderRadius: "10px", marginX: "auto", width: "100%" }}
      >
        <CardContent>
          <h1 className="px-3  font-bold text-gray-800 text-base font-Poppins">
            Doctors List
          </h1>
          <table className="w-full ">
            <thead>
              <tr className="bg-gray-200 h-12 ">
                <th className="text-left p-2 pl-3 text-gray-700 text-sm">#</th>
                <th className="text-left p-2 text-gray-700 text-sm font-Poppins">
                  Doctor Name
                </th>
                <th className="text-left p-2 text-gray-700 text-sm font-Poppins">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {doctorListData.map((row, index) => (
                <tr
                  key={index}
                  className="h-12 py-12 border-b-2 border-gray-200"
                >
                  <td className="text-left p-2 text-xs">
                    <Avatar alt="pic" src={row["#"]} variant="rounded" />
                  </td>
                  <td className="text-left  p-2 text-slate-700 ">
                    <h6 className="text-left text-blue-500 text-xs font-bold font-Poppins">
                      {row["Doctor Name"]}
                    </h6>
                    <p className="text-left text-xs font-light text-black font-Poppins">
                      {row["Doctor Degree"]}
                    </p>
                  </td>
                  <td className="text-left text-xs font-Poppins">
                    {row["Status"] === "available" ? (
                      <button className="p-2 text-green-500 border-2 rounded-md border-green-500">
                        Available
                      </button>
                    ) : (
                      <button className="p-2 text-red-600 border-2 rounded-md border-red-600 ">
                        Absent
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorsList;
