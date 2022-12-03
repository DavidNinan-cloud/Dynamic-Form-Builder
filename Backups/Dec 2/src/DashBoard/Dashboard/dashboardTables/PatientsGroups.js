import { Avatar, Card, CardContent } from "@mui/material";
import React from "react";
import { patientsGroupData } from "../../utils/constants/dashboardContants/dashboardTables/patientsGroupData";

///Different Avatar bg Colors //
function differentBg() {
  let colourcode = Math.floor(Math.random() * 0xffffff);
  let color = "#" + colourcode.toString(16);
  return color;
}

const PatientsGroups = () => {
  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h1 className="p-3 font-bold text-gray-800 text-base font-Poppins">
            Patients Group
          </h1>
          <table className="w-full mt-5">
            <tbody>
              {patientsGroupData.map((row, index) => (
                <tr
                  key={index}
                  className="h-12 p-12 border-b-2 border-slate-100"
                >
                  <td className="text-left p-2">
                    <Avatar sx={{ bgcolor: differentBg() }}>
                      {row.diseases.charAt(0).toUpperCase()}
                    </Avatar>
                  </td>
                  <td className="text-left font-semibold p-2 text-black text-sm ">
                    <h6 className="text-left text-black font-semibold font-Poppins">
                      {row.diseases}
                    </h6>
                  </td>
                  <td className="text-left p-2">
                    <p className="text-left text-sm font-light text-gray-600 font-Poppins">
                      {row.numberOfPatients} Patients
                    </p>
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

export default PatientsGroups;
