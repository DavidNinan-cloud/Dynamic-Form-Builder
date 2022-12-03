import React, { useState } from "react";
import { todaysAppointmentData } from "../../utils/constants/dashboardContants/dashboardTables/todaysAppointmentData";
import pdf from "../../../OPD/assets/Images/pdf.pdf";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { Avatar, Box, Button, Card, CardContent, Modal } from "@mui/material";

const TodaysAppointments = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h1 className="p-3 font-bold text-gray-800 text-base font-Poppins">
            Todays Appointments
          </h1>
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  {Object.keys(todaysAppointmentData[0]).map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-left text-sm font-bold font-Poppins"
                      >
                        {data}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {todaysAppointmentData.map((row, index) => (
                  <tr
                    key={index}
                    className="h-12 p-12 border-b-2 border-slate-100"
                  >
                    <td className="text-left p-2">
                      <Avatar alt="pic" src={row["#"]} variant="rounded" />
                    </td>
                    <td className="text-left  p-2 text-black text-sm font-Poppins">
                      {row["Patient Name"]}
                    </td>
                    <td className="text-left text-black  p-2 text-sm font-Poppins">
                      {row["Gender"]}
                    </td>
                    <td className="text-left text-black text-sm font-Poppins">
                      {row["Last Visit"]}
                    </td>
                    <td className="text-left p-2 text-sm font-Poppins">
                      {row["Diseases"] === "fever" ? (
                        <button className="outline outline-2 px-2 text-red-500 font-semibold outline-red-300 rounded">
                          Fever
                        </button>
                      ) : row["Diseases"] === "cholera" ? (
                        <button className="outline outline-2 px-2 text-green-500  font-semibold outline-green-300 rounded">
                          Cholera
                        </button>
                      ) : row["Diseases"] === "jaundice" ? (
                        <button className="outline outline-2 px-2 text-purple-500  font-semibold  outline-purple-300 rounded">
                          Jaundice
                        </button>
                      ) : row["Diseases"] === "typhoid" ? (
                        <button className="outline outline-2 px-2 text-purple-500  font-semibold  outline-purple-300 rounded">
                          Typhoid
                        </button>
                      ) : row["Diseases"] === "malaria" ? (
                        <button className="outline outline-2 px-2 text-yellow-500  font-semibold  outline-orange-300 rounded">
                          Malaria
                        </button>
                      ) : (
                        <button className="outline outline-2 px-2 text-blue-500  font-semibold  outline-blue-300 rounded">
                          Infection
                        </button>
                      )}
                    </td>
                    <td
                      className="text-left pl-4  p-2 text-red-600"
                      onClick={handleOpen}
                    >
                      <PictureAsPdfOutlinedIcon />
                    </td>
                    <td className="text-left text-sm">
                      <button className="bg-blue-700 text-white px-2 py-1 font-Poppins rounded-sm">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ////Model//// */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            marginX: "auto",
            position: "absolute",
            top: "1%",
            left: "10%",
            width: "70%",
            height: "90%",
          }}
        >
          <embed src={pdf} frameborder="0" width="100%" height="100%" />
          <div className=" bg-white font-bold font-Poppins">
            <Button
              onClick={handleClose}
              sx={{ color: "black", fontWeight: "bold", paddingLeft: "90%" }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TodaysAppointments;
