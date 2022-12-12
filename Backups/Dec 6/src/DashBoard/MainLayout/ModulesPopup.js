import {
  AppBar,
  Card,
  CardContent,
  Dialog,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Slide,
  Toolbar,
} from "@mui/material";
import React from "react";
import { modulePopup } from "../../DashBoard/utils/constants/layoutContants/modulePopup";
import logo from "../../OPD/assets/Images/logo1.png";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModulesPopup = (props) => {
  const { modalOpen, handleClose, searchValue, setSearchValue } = props;

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            marginY: "1rem",
            minHeight: "90%",
            "&::-webkit-scrollbar": {
              width: 7,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "white",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "dfe6e9",
              borderRadius: 2,
              border: "1px solid #b2bec3",
            },
          },
        }}
      >
        <AppBar
          elevation={2}
          sx={{
            position: "sticky",
            backgroundColor: "#FFFAFA",
          }}
        >
          <Toolbar>
            <div className="flex mx-auto">
              <img src={logo} alt="logo" className="h-10" />
            </div>
            <FormControl sx={{ m: 1, flex: 1 }} variant="outlined">
              <OutlinedInput
                id="search"
                type="text"
                size="small"
                className="w-2/4"
                placeholder="Search Module"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  borderRadius: "0.5rem",
                  marginX: "auto",
                  backgroundColor: "white",
                }}
              />
            </FormControl>
            {/* <IconButton
              edge="start"
              color="error"
              size="small"
              onClick={handleClose}
              aria-label="close"
              sx={{ backgroundColor: "white", border: "1px solid gray" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton> */}
            <CancelPresentationIcon
              className="text-red-600  rounded cursor-pointer"
              onClick={handleClose}
            />
          </Toolbar>
        </AppBar>
        <div className="flex flex-wrap pt-5 mb-8 justify-center lg:justify-start bg-gray-100 border-white w-full">
          {modulePopup
            .filter((name) => name.mainmenu.match(new RegExp(searchValue, "i")))
            .map((row, index) => (
              <Card
                key={index}
                sx={{
                  margin: "0.5rem",
                  width: "8.2rem",
                  height: "6.5rem",
                  borderRadius: "0.5rem",
                }}
              >
                <CardContent>
                  <img
                    src={row.icon}
                    alt="icons"
                    className="h-10 w-10 mx-auto"
                  />
                  <p className="text-center text-xs font-Poppins">
                    {row.mainmenu}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </Dialog>
    </div>
  );
};

export default ModulesPopup;
