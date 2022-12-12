import { Avatar, Card, CardContent, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import infoicon from "../../../OPD/assets/Images/info.png";
import { getDoctorList } from "../../services/dashboardServices/dashboardService";
// import { doctorListData } from "../../utils/constants/dashboardContants/dashboardTables/doctorListData";

const DoctorList = () => {
  const [doctorListData, setDoctorListData] = useState(null);
  useEffect(() => {
    getDoctorList()
      .then((res) => {
        setDoctorListData(res.data.result);
      })
      .catch((res) => {
        console.log("Error", res);
      });
  }, []);

  return (
    <div className="h-[10rem]">
      <Card
        className="doctorListDashboard"
        elevation={5}
        sx={{ borderRadius: "10px", height: "483px", overflowY: "scroll" }}
      >
        <CardContent>
          <h1 className="p-3 font-bold text-gray-800 text-base font-Poppins">
            Doctors List
          </h1>
          {doctorListData !== null ? (
            <table className="w-full">
              <thead>
                <tr className="bg-slate-200 h-12">
                  {/* <th className="text-left p-2 pl-3 text-gray-600 text-sm font-bold font-Poppins">
                  #
                </th> */}
                  <th className="text-left p-2 text-gray-600 text-sm font-bold font-Poppins">
                    Doctor Name
                  </th>
                  {/* <th className="text-left p-2 text-gray-600 mt-1 sm:block lg:hidden">
                  <div className="lg:hidden sm:block">
                    <p className="text-left text-gray-600 text-sm font-bold font-Poppins">
                      Department
                    </p>
                  </div>
                </th> */}
                  <th className="text-left p-2 text-gray-600 text-sm font-bold font-Poppins">
                    Status
                  </th>
                  {/* <th className="sm:hidden lg:block">
                  <div className="lg:hidden sm:block">
                    <p className="text-left text-gray-600 text-sm font-bold font-Poppins">
                      Department
                    </p>
                  </div>
                </th> */}
                </tr>
              </thead>
              <tbody>
                {doctorListData.map((row, index) => (
                  <tr
                    key={index}
                    className="h-12 p-12 border-b-2 border-slate-100"
                  >
                    {/* <td className="text-left p-2">
                    <Avatar alt="pic" src={row["#"]} variant="rounded" />
                  </td> */}
                    <td className="text-left p-2 text-slate-700 ">
                      <h6 className="text-left text-blue-500 text-sm font-bold font-Poppins">
                        {row.name}
                      </h6>
                      {/* <p className="text-left text-xs font-light text-black font-Poppins">
                      {row["Doctor Degree"]}
                    </p> */}
                    </td>
                    {/* <td className="text-left p-2 sm:block lg:hidden">
                    <div className="text-sky-300 lg:hidden sm:block text-center">
                      <p className="text-left text-sky-500 medium mt-2 text-sm font-Poppins">
                        {row["Department"]}
                      </p>
                    </div>
                  </td> */}
                    <td className="text-left p-2">
                      {row.status === "available" ? (
                        <button className=" px-1 text-green-600 bg-green-100 font-Poppins font-semibold text-sm">
                          Available
                        </button>
                      ) : (
                        <button className="px-1 text-red-500 bg-red-100 font-Poppins font-semibold text-sm">
                          Absent
                        </button>
                      )}
                    </td>
                    {/* <td className="text-left p-2 sm:hidden lg:block">
                    <div className="text-blue-500 sm:hidden lg:block text-center font-Poppins">
                      <Tooltip
                        title={row["Department"]}
                        placement="left-start"
                        arrow
                      >
                        <img src={infoicon} alt="/" className="w-4 h-4 mt-3" />
                      </Tooltip>
                    </div>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center h-full">
              <p className="my-auto flex items-center">
                Doctor List Is Not Available
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorList;
