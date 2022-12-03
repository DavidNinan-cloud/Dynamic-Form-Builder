import React, { useEffect } from "react";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import BedImageView from "./BedImageView";
import BedListView from "./BedListView";

const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: selectedColor,
  },
}));

const theme = createTheme({
  palette: {
    text: {
      primary: "#00ff00",
    },
  },
});

export default function ToggleBedView(props) {
  const [selected, setSelected] = React.useState(false);
  const [checkedLabel, setCheckedLabel] = React.useState(false);
  // toggle button
  const handleChanger = (e) => {
    setSelected(e.target.value);
  };
  //radio button
  const handleChangerLabel = (e) => {
    setCheckedLabel(e.target.value);
  };
  //toggle button
  useEffect(() => {
    setSelected("bedAllocation");
  }, []);
  //radio button
  useEffect(() => {
    setCheckedLabel("all");
  }, []);

  return (
    <div className=" text-xl  w-full item bg-white overflow-hidden">
      <div className=" bg-white py-2 w-full">
        <div className="flex items-center justify-end w-full">
          <div className="grid ml-6 lg:ml-0 lg:justify-end w-full">
            <ThemeProvider theme={theme}>
              <ToggleButtonGroup
                value={selected}
                exclusive
                onChange={handleChanger}
              >
                <ToggleButton
                  sx={{ height: "30px" }}
                  selectedColor="#0B83A5"
                  checked={selected === "bedAllocation"}
                  value="bedAllocation"
                >
                  Image View
                </ToggleButton>
                <ToggleButton
                  sx={{ height: "30px" }}
                  selectedColor="#0B83A5"
                  checked={selected === "allTableList"}
                  value="allTableList"
                >
                  List View
                </ToggleButton>
              </ToggleButtonGroup>
            </ThemeProvider>
          </div>
          <div className="flex justify-end space-x-4 px-2 w-[68%] mr-6">
            <div className="flex space-x-2 items-center text-sm font-semibold absolute -top-56">
              <p className="w-4 h-4 rounded-full bg-purple-600"></p>
              <label>Bed No.</label>
            </div>
            {/* <div className="flex space-x-2 items-center text-sm font-semibold">
              <p className="w-4 h-4 rounded-full bg-green-700"></p>
              <label>Available</label>
            </div>
            <div className="flex space-x-2 items-center text-sm font-semibold">
              <p className="w-4 h-4 rounded-full bg-red-600"></p>
              <label>Not Available</label>
            </div> */}
          </div>
        </div>
      </div>
      <div>
        <div hidden={selected !== "bedAllocation" ? true : false}>
          <BedImageView
            bedListData={props.bedListData}
            handleCloseTransfer={props.handleCloseTransfer}
          />
        </div>
        <div hidden={selected !== "allTableList" ? true : false}>
          <BedListView
            bedListData={props.bedListData}
            handleCloseTransfer={props.handleCloseTransfer}
          />
        </div>
      </div>
    </div>
  );
}
