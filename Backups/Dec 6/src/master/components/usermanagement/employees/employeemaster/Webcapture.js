import { Button } from "@mui/material";
import React, { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const Webcapture = (props) => {
  const { setProfilePic, setOpenWeb, setOpen } = props;
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setProfilePic(imageSrc);
  }, [webcamRef]);

  const handlePopupClose = () => {
    console.log("sjhgdfhgfhdg");
    setOpenWeb(false);
    setOpen(false);
  };
  return (
    <>
      <div className="webcam-container">
        <div className="webcam-img">
          {image === "" ? (
            <div className="flex mx-6">
              <Webcam
                audio={false}
                height={800}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={640}
                videoConstraints={videoConstraints}
              />
            </div>
          ) : (
            <div>
              <img src={image} alt="patientProfilePic" />
            </div>
          )}
        </div>
        <div className="text-center my-3 p">
          {image !== "" ? (
            <div>
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  setImage("");
                }}
                className="webcam-btn"
              >
                Retake Image
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="success"
                onClick={handlePopupClose}
                sx={{ marginX: "1rem" }}
              >
                Confirm
              </Button>
            </div>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="webcam-btn"
            >
              Capture
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default Webcapture;