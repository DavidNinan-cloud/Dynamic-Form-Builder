import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardContent,
  Modal,
} from "@mui/material";
import React, { useState } from "react";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { operationData } from "../../utils/constants/dashboardContants/dashboardTables/operationData";
import { Box } from "@mui/system";
import pdf from "../../../OPD/assets/Images/pdf.pdf";

const Operations = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h1 className="p-3 font-bold text-gray-800 text-base font-Poppins">
            Operations
          </h1>
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  {Object.keys(operationData[0]).map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-left p-2 pl-3 text-black text-sm font-bold font-Poppins"
                      >
                        {data}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {operationData.map((row, index) => (
                  <tr
                    key={index}
                    className="h-12 p-12 border-b-2 border-slate-100"
                  >
                    <td className="text-left p-2">
                      <Avatar alt="pic" src={row["#"]} variant="rounded" />
                    </td>
                    <td className="text-left p-2 text-black text-sm font-Poppins">
                      {row["Patient Name"]}
                    </td>
                    <td className="text-left">
                      <AvatarGroup
                        max={4}
                        sx={{
                          width: "8rem",
                          marginLeft: "-0.8rem",
                          "& .MuiAvatar-root": { width: 30, height: 30 },
                        }}
                      >
                        {row["Doctors List"].map((item, index) => (
                          <Avatar
                            alt="drlist"
                            src={item}
                            sx={{ width: 24, height: 24 }}
                            key={index}
                          />
                        ))}
                      </AvatarGroup>
                    </td>
                    <td className="text-left pl-2 text-black text-sm">
                      {row["Date"]}
                    </td>
                    <td
                      className="text-left pl-4 p-2 text-red-600"
                      onClick={handleOpen}
                    >
                      <PictureAsPdfOutlinedIcon />
                    </td>
                    <td className="text-left text-black pl-4 text-sm font-Poppins">
                      {row["Diseases"]}
                    </td>
                    <td className="text-left">
                      <DriveFileRenameOutlineOutlinedIcon className="text-blue-500 mr-5" />
                      <DeleteOutlineOutlinedIcon className="text-red-500" />
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
          <div className=" bg-white font-bold">
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

export default Operations;
