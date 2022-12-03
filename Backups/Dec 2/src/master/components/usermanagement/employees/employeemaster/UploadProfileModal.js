import { Button, Modal } from "@mui/material";
import React, { useEffect } from "react";
import patientProfile from "./image4.jpg"
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
// import Webcapture from "../WebcamPhoto/Webcapture";
import Webcapture from "./Webcapture";

const UploadProfileModal = (props) => {
  const { setProfilePic, setOpen, SetPicText,profilePicName,setProfilePicName } = props;
  //useState for Webcam Popup
  const [openWeb, setOpenWeb] = React.useState(false);
  const handleOpenWeb = () => setOpenWeb(true);
  const handleCloseWeb = () => setOpenWeb(false);

  //Function used to convert Image to Base 64
  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
      setProfilePicName(file.name)
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  //Get the Selected file and set Converted Base64 image
  const onProfilePicChange = ({ target }) => {
    if (target.files < 1 || !target.validity.valid) {
      return;
    }
    fileToBase64(target.files[0], (err, result) => {
      if (result) {
        setProfilePic(result);
        setOpen(false);
        SetPicText("Update Profile Image")
      }
    });
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center my-6">
        <img src={patientProfile} alt="profileModal" className="w-16 h-16" />
        <p className="text-sm my-4 mx-8 text-center">
          Please make sure your photo is clearly shows your face
        </p>
        <div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="outlined-button-file"
            onChange={onProfilePicChange}
          />
          <label htmlFor="outlined-button-file">
            <Button
              variant="outlined"
              component="span"
              sx={{
                paddingY: "0.5rem",
                color: "#7B1FA2",
                borderColor: "#7B1FA2",
                "& MuiButton-outlined.mui-focused": { borderColor: "#7B1FA2" },
              }}
            >
              <FileUploadRoundedIcon className="mr-1" />
              Upload A Picture From Device
            </Button>
          </label>
        </div>
        {/* <Link to="/webcam"> */}
        <button
          className="border border-purple-700 text-purple-700 mt-4 px-4 py-2 rounded-md"
          onClick={handleOpenWeb}
        >
          <PhotoCameraIcon className="mr-1" />
          Take a Photo
        </button>
        {/* </Link> */}
      </div>

      {/* // Webcam Modal // */}
      <Modal
        open={openWeb}
        onClose={handleCloseWeb}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "70%",
            backgroundColor: "white",
            padding: "1rem",
          }}
        >
          <Webcapture
            setProfilePic={setProfilePic}
            setOpenWeb={setOpenWeb}
            setOpen={setOpen}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default UploadProfileModal;
