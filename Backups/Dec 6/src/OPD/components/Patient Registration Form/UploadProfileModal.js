import { Button, Modal } from "@mui/material";
import React, { useEffect, useRef } from "react";
import patientProfile from "../../assets/Images/patientProfile.png";
import BlankProfile from "../../../OPD/assets/Images/blankProfile.jpeg";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Box } from "@mui/system";
import Webcapture from "../../Common Components/Webcam Photo Capture/Webcapture";
import useFileUpload from "../../Common Components/hooks/useFileUpload";

const UploadProfileModal = (props) => {
  const data = useFileUpload();
  const { setProfilePic, setOpen, setProfilePicName, profilePic } = props;
  //useState for Webcam Popup
  const [openWeb, setOpenWeb] = React.useState(false);
  const handleOpenWeb = () => setOpenWeb(true);
  const handleCloseWeb = () => setOpenWeb(false);

  const handleProfilePicChange = (target) => {
    const result = data.onProfilePicChange(target);
  };

  const inputFileRef = React.useRef();

  const keyPressHandler = (e) => {
    if (e.keyCode === 13) {
      inputFileRef.current.click();
    }
  };

  useEffect(() => {
    data.fileName.length === 0
      ? setProfilePic(profilePic)
      : setProfilePic(data.path);
    setProfilePicName(data.fileName);
    if (data.fileName !== "") {
      setOpen(false);
    }
  }, [data]);

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
            accept="image/*, .pdf"
            style={{ display: "none" }}
            id="uploadBtn"
            ref={inputFileRef}
            onChange={handleProfilePicChange}
          />
          <label htmlFor="uploadBtn" onKeyDown={keyPressHandler}>
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

        <button
          className="border border-purple-700 text-purple-700 text-sm mt-4 px-4 py-2 rounded-md"
          onClick={handleOpenWeb}
        >
          <PhotoCameraIcon className="mr-1" />
          TAKE A PHOTO
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
            setProfilePicName={setProfilePicName}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default UploadProfileModal;
