import { Button } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
let imgDetails;

const Webcapture = (props) => {
  const { setProfilePic, setOpenWeb, setOpen, setProfilePicName } = props;
  const [image, setImage] = useState("");
  const [checkWebCam, setCheckWebCam] = useState(false);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    imgDetails = "Profilepic" + new Date().getTime();
    console.log(imgDetails);
    setImage(imageSrc);
  }, [webcamRef]);

  const handlePopupClose = () => {
    setProfilePicName(imgDetails);
    setProfilePic(image);
    setOpenWeb(false);
    setOpen(false);
  };

  function detectWebcam(callback) {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) return callback(false);
    md.enumerateDevices().then((devices) => {
      callback(devices.some((device) => "videoinput" === device.kind));
    });
  }

  detectWebcam(function(hasWebcam) {
    console.log("Webcam: " + hasWebcam);
    hasWebcam === true ? setCheckWebCam(true) : setCheckWebCam(false);
  });

  useEffect(() => {
    detectWebcam();
  }, []);

  return (
    <>
      <div className="webcam-container">
        <div className="webcam-img">
          {checkWebCam === true ? (
            image === "" ? (
              <div className="flex mx-6">
                <Webcam
                  audio={false}
                  height={800}
                  ref={webcamRef}
                  screenshotFormat="image/*"
                  width={640}
                  videoConstraints={videoConstraints}
                />
              </div>
            ) : (
              <div>
                <img src={image} alt="patientProfilePic" />
              </div>
            )
          ) : (
            <div className="text-center">
              <p>Web Cam is Not Available</p>
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
