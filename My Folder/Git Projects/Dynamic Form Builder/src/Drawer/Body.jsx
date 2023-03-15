import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
Avatar,
Button,
Grid,
ListSubheader,
Menu,
MenuItem,
Tooltip,
Typography,
} from "@mui/material";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
BrowserRouter,
Link,
Navigate,
Route,
Routes,
Redirect,
} from "react-router-dom";
import { useEffect,useState,useContext } from "react";
import { useDispatch, } from "react-redux";
import { useForm } from "react-hook-form";
import { ElementsContext } from "../DrawerContextApi/elementsContextArr";
import DashboardPage from "../Components/DashBoard/DashboardPage";
import Login from "../Components/Login/Login";

const drawerWidth = 280;

const openedMixin = (theme) => ({
    width: drawerWidth,
    color:'#ffffff',
    backgroundColor: "rgb(22, 82, 120)",
    transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    backgroundColor: "rgb(22, 82, 120)",
transition: theme.transitions.create("width", {
easing: theme.transitions.easing.sharp,
duration: theme.transitions.duration.leavingScreen,
}),
overflowX: "hidden",
width: `calc(${theme.spacing(7)} + 1px)`,
[theme.breakpoints.up("sm")]: {
width: `calc(${theme.spacing(7)} + 1px)`,
},
});

const DrawerHeader = styled("div")(({ theme }) => ({
display: "flex",
alignItems: "center",
justifyContent: "flex-end",
padding: theme.spacing(0, 1),
// necessary for content to be below app bar
...theme.mixins.toolbar,
}));

// color i want = #164d78
const AppBar = styled(MuiAppBar, {
shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
zIndex: theme.zIndex.drawer + 1,
transition: theme.transitions.create(["width", "margin"], {
easing: theme.transitions.easing.sharp,
duration: theme.transitions.duration.leavingScreen,
}),
...(open && {
marginLeft: drawerWidth,
width: `calc(100% - ${drawerWidth}px)`,
transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
}),
}),
}));

const Drawer = styled(MuiDrawer, {
shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
width: drawerWidth,
flexShrink: 0,
whiteSpace: "nowrap",
boxSizing: "border-box",
...(open && {
...openedMixin(theme),
"& .MuiDrawer-paper": openedMixin(theme),
}),
...(!open && {
...closedMixin(theme),
"& .MuiDrawer-paper": closedMixin(theme),
}),
}));

// Dummy Datas
let subfunctionMenu = {
    "message": "Drawer menu",
    "result": [
        {
            "id": 0,
            "functionality": "DashBoard ",
            "routerLink": "/",
        }
    ],
    "statusCode": 200
}

const baseUrl = ''
export default function Body() {
    
    const [login, setLogin] = React.useState(true);
    const [username, setUsername] = React.useState(false);
    
    const [fullScreen, setFullScreen] = useState(false);
    
    const [openMenu, setOpenMenu] = useState({});
    const [searchValue, setSearchValue] = React.useState("");
    const [anchorElUser, setAnchorElUser] = useState(null);
    // const [sideBarMenus, setSideBarMenus] = React.useState({ result: [] });
    const [sideBarMenus, setSideBarMenus] = useState(subfunctionMenu);
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => {
    setModalOpen(false);
    setSearchValue("");
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [open,setOpen] = useState(false)
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setOpenMenu(false);
    };

    const fullscreenDrawer = () => {
        setFullScreen(!fullScreen);
        // console.log(fullScreen);
        if (fullScreen === true) {
            document.body.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleClick = (param) => {
    setOpenMenu((prevState) => {
        // console.log("prev", prevState);
        return { ...prevState, [param]: !prevState[param] };
    });
    };

    const handleIconClick = (rowdetails) => {
    // console.log("SideDetails", typeof rowdetails.subMenuFunctionality);
    handleDrawerOpen();
    handleClick(rowdetails.functionality);
    };

    //API to get Sidebar Menu
    const getDrawerMenu = () => {
    // console.log("URL", baseUrl);
    // getSidebarMenus()
    //     .then((response) => {
    //     console.log("Sidebar Menu", response.data.result);
    //     setSideBarMenus(response.data);
    //     getSidebarIcon(response.data.result);
    //     })
    //     .catch((response) => {
    //     console.log(response);
    //     });
    };
// this is where i started
    useEffect(() => {
        getDrawerMenu();
    }, []);


    const methods = useForm({
        mode: "onChange",
        // resolver: yupResolver(paymentSchemaObj),
        defaultValues:{
            selectAll:false,
        } 
      });
      const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch  } = methods;
      
    const { overAlldata,  Q1data, Q2data, Q3data, Q4data,} = useContext(ElementsContext)
    
  const [seasonDetails,setSeasonDetails] = React.useState()

  const InfiniteDrawer = ({row,index, indexArr}) => {

    return(
        <>
            {/* 2nd Level Menu  */}
            {row.subMenuFunctionality != null ? (
                            <div>
                                <div
                                className="flex justify-between w-full"
                                onClick={() => {
                                    handleClick(row.functionality)
                                }}

                                >
                                <ListItemText>
                                    <p className={indexArr.length < 2 ? "font-bold text-sm font-Poppins":" text-sm font-Poppins "}>
                                    {/* Main Menu Name  */}
                                    {row.functionality}
                                    </p>
                                </ListItemText>

                                {openMenu[row.functionality] ? (
                                    <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                ) : (
                                    <KeyboardArrowDownOutlinedIcon fontSize="small" />
                                )}
                                </div>
                                <Collapse
                                in={openMenu[row.functionality]}
                                timeout="auto"
                                unmountOnExit
                                >
                                {row.subMenuFunctionality.map(
                                    (item, innerIndex) => {
                                    return (
                                        <List component="div" disablePadding key={index}>
                                        {/* <Link key={index} to={item.routerLink}  onClick={()=>{
                                                    console.log("working")
                                            setSeasonDetails(row)}}> */}
                                        <ListItemButton
                                            sx={{ paddingY: "0.2rem" }}
                                            disableRipple
                                        >
                                            <ListItemText
                                            sx={{ opacity: open ? 1 : 0 }}
                                            >
                                                <InfiniteDrawer row={item} index={innerIndex} indexArr={[...indexArr,innerIndex]}/>
                                            </ListItemText>
                                        </ListItemButton>
                                        {/* </Link> */}
                                        </List>
                                    );
                                    }
                                )}
                                </Collapse>
                            </div>
            ) : (
            //1st Lavel Menu
            <>
                <Link to={row.routerLink}  onClick={()=>{
                                    console.log("working")
                    // setSeasonDetails(row)
                    }}>
                <ListItemButton
                    disableRipple
                    sx={{ paddingY: 0 }}
                >
                    <ListItemText
                    // onClick={handleDrawerClose}
                    >
                        <p className={indexArr.length < 2 ? "font-bold  text-sm font-Poppins ":" text-sm  -ml-5 font-Poppins "}>
                            {row.functionality}
                        </p>
                    </ListItemText>
                </ListItemButton>
                </Link>
            </>
            )}
        </>
    )

  }
    return (
        <>
    {
        login == true ? (
          <Login
            setLogin={setLogin}
            getDrawerMenu={getDrawerMenu}
            setUsername={setUsername}
          />
        ) : (
        <div className="mt-6">
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar sx={{
                    backgroundColor: "rgb(22, 82, 120)",
                    }} position="fixed" open={open}>
                    {/* bg-[#164d78] */}
                    <Toolbar className="text-black  h-7">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        size="large"
                        sx={{
                        ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon className="text-orange-500" />
                    </IconButton>
                    </Toolbar>
                </AppBar>

                
                <Drawer sx={{
                    backgroundColor: "rgb(22, 82, 120)",
                    }} variant="permanent" open={open}>
                    <DrawerHeader sx={{
                    backgroundColor: "rgb(22, 82, 120)",
                    }} >
                    <div className="flex mx-auto">
                        {/* text-[#0B83A5] */}
                        <h6 className=" text-[#ffffff] text-2xl text-center mt-2 ml-2 font-Poppins">
                        @2022 <span className="text-orange-500">
                            {/* title */}
                        </span>
                    </h6>
                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                        <ChevronRightIcon className="bg-orange-500 text-white rounded-full" />
                        ) : (
                        <ChevronLeftIcon className="bg-orange-500 text-white rounded-full" />
                        )}
                    </IconButton>
                    </DrawerHeader>
                    
                    <Divider />
                    {/* /// Side Bar Menu //// */}
                    <List sx={{
                    backgroundColor: "rgb(22, 82, 120)",
                    }} >
                    {sideBarMenus.result.map((row, index) => (
                        <ListItemButton
                            key={index}
                            disableRipple
                            sx={{
                                minHeight: 20,
                                justifyContent: open ? "initial" : "center",
                                alignItems: "flex-start",
                                px: 2,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                minWidth: 0,
                                mr: open ? 1 : "auto",
                                justifyContent: "center",
                                }}
                            >
                                {typeof row.subMenuFunctionality !== "object" ? (
                                    <>
                                    {/* <Link to={row.routerLink} onClick={()=>{
                                                    console.log("working")
                                        setSeasonDetails(row)}}> */}
                                        {open === false ? (
                                        <Tooltip
                                            title={row.functionality}
                                            placement="left-start"
                                            arrow
                                        >
                                            <img
                                            src={`${baseUrl}/file${row.drawerMenuPath}`}
                                            alt="i"
                                            className="h-6 w-6"
                                            onClick={() => handleIconClick(row)}
                                            />
                                        </Tooltip>
                                        ) : (
                                        <img
                                            src={`${baseUrl}/file${row.drawerMenuPath}`}
                                            alt="i"
                                            className="h-6 w-6"
                                            onClick={() => handleIconClick(row)}
                                        />
                                        )}
                                    {/* </Link> */}
                                    </>
                                ) : open === false ? (
                                <Tooltip
                                    title={row.functionality}
                                    placement="left-start"
                                    arrow
                                >
                                    <img
                                    src={`${baseUrl}/file${row.drawerMenuPath}`}
                                    alt="i"
                                    className="h-6 w-6"
                                    onClick={() => handleIconClick(row)}
                                    />
                                </Tooltip>
                                ) : (
                                <img
                                    src={`${baseUrl}/file${row.drawerMenuPath}`}
                                    alt="i"
                                    className="h-6 w-6"
                                    onClick={() => handleIconClick(row)}
                                />
                                )}
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                                <InfiniteDrawer row={row} index={index} indexArr={[index]} />
                                
                            </ListItemText>
                        </ListItemButton>
                    ))}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                    flexGrow: 1,
                    pt: 1,
                    pr: 1,
                    // ml: 1,
                    overflowX: "visible",
                    overflowY: "visible",
                    backgroundColor: "rgb(248 250 252)",
                    height: "100vh",
                    width: "96vh",
                    }}
                >
                    <Routes>
                        <Route exact path="/" element={<DashboardPage />} />
                    </Routes>
                </Box>

            </Box>
        </div>
        )}
        </>
    );
    
}
