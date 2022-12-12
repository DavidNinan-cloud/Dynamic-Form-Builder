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
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import logo from "../../OPD/assets/Images/logo1.png";
import drawerLogo from "../../OPD/assets/Images/logo.png";
import flag from "../../OPD/assets/Images/flag.png";
import bed from "../../OPD/assets/Images/bed.svg";
import doctorProfilePic from "../../OPD/assets/Images/DoctorProfile.jpg";
import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ModulesPopup from "./ModulesPopup";

import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  Redirect,
  useLocation,
} from "react-router-dom";
import DashboardPage from "../DashboardPage";
import PatientRegistrationForm from "../../OPD/components/Patient Registration Form/PatientRegistrationForm";
import QuickRegistrationForm from "../../OPD/components/Quick Registration/QuickRegistrationForm";
import RegisterPatientList from "../../OPD/components/Patient List/RegisterPatientList";
import VisitPatientList from "../../OPD/components/Patient List/VisitPatientList";
import AppointmentPage from "../../OPD/components/AppointmentPage/AppointmentPage";
import AppointmentList from "../../OPD/components/AppointmentList/AppointmentList";
import EMR from "../../OPD/components/emr/EMR";
import { useEffect } from "react";
import {
  getSidebarIcon,
  getSidebarMenus,
} from "../services/sidebarMenuService/sidebarMenuService";
import Login from "../../LoginComponent/Login/Login";
import { logoutservice } from "../../LoginComponent/services/loginServices";
import { baseUrl } from "../http-common";

import OPDBill from "../../Billing/Components/OpdBill/OPDBill";
import Country from "../../master/components/area/Country";
import State from "../../master/components/area/State";
import District from "../../master/components/area/District";
import Taluka from "../../master/components/area/Taluka";
import City from "../../master/components/area/City";
import Pincode from "../../master/components/area/Pincode";
import Area from "../../master/components/area/Area";
import Organization from "../../master/components/organization/Organization";
import Unit from "../../master/components/organization/Unit";

import Department from "../../master/components/organization/Department";
import SubDepartment from "../../master/components/organization/SubDepartment";
import Gender from "../../master/components/gender/Gender";
import IdProofInfo from "../../master/components/idproofinfo/IdProofInfo";
import PatientCategory from "../../master/components/patientcategory/PatientCategory";
import TypeOfAppointment from "../../master/components/appointment/TypeOfAppointment";
import ReferBy from "../../master/components/referral/ReferBy";
import WeekDay from "../../master/components/scheduling/weekday/WeekDay";

//Add OPD EMR - ICDCode , Instruction , Complaints
import ICDCode from "../../master/components/opd/icdcode/ICDCode";
import Complaint from "../../master/components/opd/complaint/Complaint";
import Instruction from "../../master/components/opd/instruction/Instruction";
import DoctorAdvice from "../../master/components/opd/doctoradvice/DoctorAdvice";
import Allergy from "../../master/components/opd/allergy/Allergy";
import DoseFrequency from "../../master/components/opd/dosefrequency/DoseFrequency";
import Drug from "../../master/components/pharmacy/drugs/Drug";
import Symptoms from "../../master/components/opd/symptoms/Symptoms";
import Vital from "../../master/components/opd/vital/Vital";
import PatientEngagement from "../../master/components/opd/patientengagement/PatientEngagement";
import PrescriptionRoute from "../../master/components/opd/route/PrescriptionRoute";
import ModalityMaster from "../../master/components/lims/radiology/modalitymaster/ModalityMaster";

import Cabin from "../../master/components/organization/Cabin";

import Company from "../../master/components/organization/Company";
import ReferType from "../../master/components/referral/ReferType";
import AppointmentBookingSource from "../../master/components/appointment/AppointmentBookingSource";

import EmergencyPatient from "../../OPD/components/emergency/EmergencyPatient";
import Emergency from "../../emergency/Emergency";

import PatientPrefix from "../../master/components/prefix/Prefix";
import EmployeeType from "../../master/components/usermanagement/employees/employeetype/EmployeeType";

//import billing
import Payment from "../../master/components/billing/paymenttype/Payment";
import Tariff from "../../master/components/billing/tariff/Tariff";
import Group from "../../master/components/billing/group/Group";
import SubGroup from "../../master/components/billing/subgroup/SubGroup";
import DiscountDetails from "../../master/components/billing/discountdetails/DiscountDetails";
import Breadcrumbs from "./Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../authentication/slices/auth";
import EventBus from "../../authentication/EventBus";
import Class from "../../master/components/billing/class/Class";

// import Service Master
import ServiceCreation from "../../master/components/billing/service/components/serviceCreation/ServiceCreation";
import ServiceListing from "../../master/components/billing/service/components/serviceListing/ServiceListings";

import EmployeeMaster from "../../master/components/usermanagement/employees/employeemaster/EmployeeMaster";
import EmployeeList from "../../master/components/usermanagement/employees/employeelist/EmployeeList";

import AssignFunctionality from "../../master/components/usermanagement/assignfunctionality/AssignFunctionality";
import AssignFunctionalityCards from "../../master/components/usermanagement/assignfunctionality/AssignFunctionalityCards";
import Block from "../../master/components/organization/infrastructure/components/block/Block";
import Floor from "../../master/components/organization/infrastructure/components/floor/Floor";
import DischargeType from "../../master/components/organization/infrastructure/components/dischargeType/DischargeType";
import Ward from "../../master/components/organization/infrastructure/components/ward/Ward";
import Room from "../../master/components/organization/infrastructure/components/room/Room";

import Refund from "../../Billing/Components/refund/Refund";
import PatientAdvance from "../../Billing/Components/patientAdvance/PatientAdvance";

import Bed from "../../master/components/organization/infrastructure/components/bed/Bed";

import Scheduling from "../../master/components/scheduling/Scheduling";
import ScheduleListing from "../../master/components/scheduling/ScheduleListing";

import AdmissionList from "../../IPD/components/admissionList/AdmissionList";
import AdmissionTabs from "../../IPD/components/admissonForm/AdmissionTabs";

import RadioTemplate from "../../master/components/lims/radiology/RadioTemplate";
import Role from "../../master/components/usermanagement/roles/Role";
import Users from "../../master/components/usermanagement/employees/users/Users";
import IPDCharges from "../../Billing/Components/ipdCharges/IPDCharges";
import IPDBill from "../../Billing/Components/ipdbill/IPDBill";
import PatientTransfer from "../../IPD/components/patienttransfer/PatientTransfer";
import PaymentSettlement from "../../Billing/Components/paymentsettelment/PaymentSettlement";
import CompanySettlement from "../../Billing/Components/companysettelment/CompanySettelment";
import InvestigationPrint from "../../reportPrints/emr/investigationPrint/InvestigationPrint";
import PrescriptionPrint from "../../reportPrints/emr/priscriptionPrint/PrescriptionPrint";
import Category from "../../master/components/lims/pathology/category/Category";
import Parameter from "../../master/components/lims/pathology/parameter/Parameter";
import ParameterUnit from "../../master/components/lims/pathology/parameterUnit/ParameterUnit";
import Template from "../../master/components/lims/pathology/template/Template";
import Antibiotic from "../../master/components/lims/pathology/antibiotic/Antibiotic";
import PathologistList from "../../master/components/lims/pathology/pathologistList/PathologistList";
import Machine from "../../master/components/lims/pathology/machine/Machine";
import OTTable from "../../master/components/operationtheater/ottable/OTTable";
import Anesthesia from "../../master/components/operationtheater/anesthesia/Anesthesia";

import Consent from "../../master/components/operationtheater/consent/Consent";

import OperationStatus from "../../master/components/operationtheater/operationstatus/OperationStatus";
import OtTheater from "../../master/components/operationtheater/ottheater/OtTheater";
import PostOperativeInstruction from "../../master/components/operationtheater/postoperativeinstruction/PostOperativeInstruction";

import PreOperativeInstruction from "../../master/components/operationtheater/preoperativeinstruction/PreOperativeInstruction";

import ProcedureType from "../../master/components/operationtheater/proceduretype/ProcedureType";

import MachineParameter from "../../master/components/lims/pathology/machineParameter/MachineParameter";
import Organism from "../../master/components/lims/pathology/organism/Organism";
import PathologyProfile from "../../master/components/lims/pathology/pathologyProfile/PathologyProfile";
import PathologyMachineParameterLinking from "../../LIMS/Pathology/components/machineParameterLinking/PathologyMachineParameterLinking";
import PatientDischargeCancel from "../../IPD/components/patientDischargeCancel/PatientDischargeCancel";
import DoctorListing from "../../master/components/scheduling/DoctorListing";
import PatientPainAssessment from "../../nursing/patientpainassessment/PatientPainAssessment";
import DrugAdministrationChart from "../../nursing/drugAdministrationChart/DrugAdministrationChart";
import BedAllocation from "../../IPD/components/admission/BedAllocation";
import BedAllowModal from "../../IPD/components/admission/BedAllowModal";

// import BedAllocationCards from "../../IPD/components/bedSelectionsCards/BedAllocationCards";
import TestDetails from "../../LIMS/Pathology/components/testDetails.js/TestDetails";
import WorkOrder from "../../LIMS/Pathology/components/workOrderGeneration/WorkOrder";
import SampleCollection from "../../LIMS/Pathology/components/sampleCollection/SampleCollection";
import WorkOrderView from "../../LIMS/Pathology/components/workOrderView/WorkOrderView";
import ReportDetails from "../../LIMS/Pathology/components/reportDetails/ReportDetails";
import WorkOrderStatus from "../../LIMS/Pathology/components/workOrderStatus/WorkOrderStatus";
import AdmissionForm from "../.././admission/admissionform/AdmissionForm";
import PageNotFound from "../pageUnavailable/PageNotFound";
import LoadingSpinner from "../../Common Components/loadingspinner/loadingSpinner";

import ServicesRateMatrix from "../../master/components/billing/service/ot/ServiceRateMatrix";

import Reports from "../../Reports/Reports";
import DrugTimeTable from "../../nursing/drugAdministrationChart/DrugTimeTable";

// const reportsRoutes = [
//   {
//     routerLink:'/reports/opd',
//     module:'Reports'
//   },{
//     routerLink:'/reports/appointments',
//     module:'Reports'
//   },{
//     routerLink:'/reports/transactionRevenue',
//     module:'Reports'
//   },
// ]
const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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

export default function Layout() {
  //modal bedallocation
  const [openBed, setOpenBed] = React.useState(false);
  const handleOpenBed = () => setOpenBed(true);
  const handleCloseBed = () => setOpenBed(false);

  const [fullScreen, setFullScreen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState({});
  const [searchValue, setSearchValue] = React.useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [sideBarMenus, setSideBarMenus] = React.useState({ result: [] });
  const [login, setLogin] = React.useState(null);
  const [username, setUsername] = React.useState();
  const [routerLinks, setRouterLinks] = React.useState([]);
  const [isValidLink, setIsValidLink] = React.useState(false);
  const [spinner, setSpinner] = React.useState(true);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [reportsRoutes, setReportsRoutes] = React.useState([]);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = React.useCallback(() => {
    // console.log("1111111111");
    dispatch(logout());
    setOpenMenu(false);
  }, [dispatch]);

  //Check Local Storage
  useEffect(() => {
    // const loginStatus = localStorage.getItem("loginStatus");
    if (currentUser) {
      console.log("Login ");
      setLogin(false);
    } else {
      console.log("Not Login");
      setLogin(true);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

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

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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

  //API for Logout Service
  const handleLogout = () => {
    setAnchorElUser(null);
    // logoutservice()
    //   .then((response) => {
    logOut();
    // console.log(response);
    // localStorage.removeItem("loginToken");
    // localStorage.removeItem("loginStatus");
    localStorage.removeItem("username");
    setLogin(true);
    // })
    // .catch((response) => {
    //   console.log(response);
    // });
  };

  //API to get Sidebar Menu
  const getDrawerMenu = () => {
    // console.log("URL", baseUrl);
    getSidebarMenus()
      .then((response) => {
        setSideBarMenus(response.data);
        const ReportsData = response.data.result.find(
          (o) => o.functionality === "Reports"
        );
        if (ReportsData) {
          setReportsRoutes(ReportsData.subMenuFunctionalityOne);
        }
        setRouterLinks(response.data.components);
        getSidebarIcon(response.data.result);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  let path = useLocation();

  useEffect(() => {
    console.log("routerLinks", routerLinks);
    let obj = routerLinks.find((o) => o.routerLink === path.pathname);
    if (routerLinks.length > 0) {
      console.log("Obj", path);
      if (typeof obj !== "undefined") {
        setIsValidLink(true);
      } else {
        setIsValidLink(false);
      }
      setSpinner(false);
    }
  }, [routerLinks, path]);

  // const routeComponents = routerLinks.map(({ routerLink, module }, key) => (
  //   <Route exact path={routerLink} element={module} key={key} />
  // ));

  useEffect(() => {
    // setUsername(
    //   localStorage
    //     .getItem("username")
    //     .charAt(0)
    //     .toUpperCase() +
    //     localStorage
    //       .getItem("username")
    //       .slice(1)
    //       .toLowerCase()
    // );
    setUsername(localStorage.getItem("username"));
  }, [username]);

  useEffect(() => {
    getDrawerMenu();
  }, []);

  //Handling multiple tab logout
  window.addEventListener("click", (event) => {
    let tokenStatus = localStorage.getItem("loggedUser");
    handleRedirect(tokenStatus);
  });

  const handleRedirect = (tokenDetails) => {
    if (tokenDetails === null) {
      setLogin(true);
    }
  };

  return (
    <>
      {login !== null ? (
        login === true ? (
          <Login
            setLogin={setLogin}
            getDrawerMenu={getDrawerMenu}
            setUsername={setUsername}
          />
        ) : (
          <div>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <AppBar position="fixed" open={open}>
                <Toolbar
                  className="text-black bg-white h-7 pl-5"
                  disableGutters
                >
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
                  {/* <Avatar
                    alt="logo"
                    src={logo}
                    sx={{
                      // paddingY: "2px",
                      width: "20rem",
                      height: "3rem",
                      ...(open && { display: "none" }),
                    }}
                    variant="rounded"
                    className="cursor-pointer"
                  /> */}

                  <img
                    src={logo}
                    alt="logo"
                    className="h-8 ml-2"
                    style={{ ...(open && { display: "none" }) }}
                  />
                  {/* <Typography sx={{ ...(open && { display: "none" }) }}>
                    <h6 className="text-[#0B83A5] text-2xl text-center mt-2 ml-2 font-Poppins">
                      Doc<span className="text-orange-500">IT</span>Health
                    </h6>
                  </Typography> */}

                  <div className="w-full mr-4">
                    <div className="flex justify-end space-x-6 items-center">
                      <button onClick={handleOpenBed}>
                        <img
                          className="h-5 rounded-sm hover:cursor-pointer"
                          src={bed}
                          alt=""
                        />
                      </button>
                      {openBed ? (
                        <BedAllowModal
                          handleOpen={handleOpenBed}
                          handleClose={handleCloseBed}
                          open={openBed}
                          setOpen={setOpenBed}
                        />
                      ) : null}

                      <AppsOutlinedIcon
                        onClick={handleOpen}
                        className="cursor-pointer"
                      />

                      <CropFreeRoundedIcon
                        onClick={fullscreenDrawer}
                        className="cursor-pointer"
                      />

                      <NotificationsActiveOutlinedIcon
                        color="action"
                        className="cursor-pointer"
                      />

                      <img className="h-5 rounded-sm" src={flag} alt="" />
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold">
                          {localStorage.getItem("username")}
                        </p>
                      </div>
                      <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            className="cursor-pointer"
                            alt="profilepic"
                            src={doctorProfilePic}
                            sx={{ width: 35, height: 35 }}
                          />
                        </IconButton>

                        <Menu
                          sx={{ mt: "45px" }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                          <MenuItem onClick={handleLogout}>
                            <Typography textAlign="center">Logout</Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                    </div>
                  </div>
                </Toolbar>
              </AppBar>
              <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                  <div className="flex mx-auto">
                    {/* <img src={drawerLogo} alt="logo" className="h-8 mx-2" /> */}
                    <img src={logo} alt="logo" className="h-8 ml-8" />
                    {/* <h6 className="text-[#0B83A5] text-2xl text-center mt-2 ml-2 font-Poppins">
                      Doc<span className="text-orange-500">IT</span>Health
                    </h6> */}
                  </div>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon className="bg-orange-500 text-white rounded-full" />
                    ) : (
                      <ChevronLeftIcon className="bg-orange-500 text-white rounded-full" />
                    )}
                  </IconButton>
                </DrawerHeader>
                {/* <Divider /> */}
                <div className={open === true ? "block" : "hidden"}>
                  <div className="flex flex-col items-center mt-2 mb-2">
                    <img
                      src={doctorProfilePic}
                      alt="profile"
                      className="h-16 w-16 border-2 border-white rounded-lg"
                    />
                    <p className="font-bold text-sm">
                      {localStorage.getItem("username")}
                    </p>
                    <p className="font-bold text-xs text-orange-500">
                      {localStorage.getItem("role")}
                    </p>
                  </div>
                </div>
                <Divider />
                {/* /// Side Bar Menu //// */}
                <List>
                  {sideBarMenus.result.map((row, index) => (
                    <ListItemButton
                      key={index}
                      disableRipple
                      sx={{
                        minheight: 20,
                        justifyContent: open ? "initial" : "center",
                        alignItems: "flex-start",
                        px: 2,
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {typeof row.subMenuFunctionalityOne !== "object" ? (
                          <Link to={row.routerLink}>
                            {open === false ? (
                              <Tooltip
                                title={row.functionality}
                                placement="left-start"
                                arrow
                              >
                                <img
                                  src={`${baseUrl}/file${row.drawerMenuPath}`}
                                  alt="icons"
                                  className="h-6 w-6"
                                  onClick={() => handleIconClick(row)}
                                />
                              </Tooltip>
                            ) : (
                              <img
                                src={`${baseUrl}/file${row.drawerMenuPath}`}
                                alt="icons"
                                className="h-6 w-6"
                                onClick={() => handleIconClick(row)}
                              />
                            )}
                          </Link>
                        ) : open === false ? (
                          <Tooltip
                            title={row.functionality}
                            placement="left-start"
                            arrow
                          >
                            <img
                              src={`${baseUrl}/file${row.drawerMenuPath}`}
                              alt="icons"
                              className="h-6 w-6"
                              onClick={() => handleIconClick(row)}
                            />
                          </Tooltip>
                        ) : (
                          <img
                            src={`${baseUrl}/file${row.drawerMenuPath}`}
                            alt="icons"
                            className="h-6 w-6"
                            onClick={() => handleIconClick(row)}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                        {/* 2nd Level Menu  */}
                        {row.subMenuFunctionalityOne != null ? (
                          <div>
                            <div
                              className="flex justify-between"
                              onClick={() => handleClick(row.functionality)}
                            >
                              <ListItemText>
                                <p className="font-bold text-sm font-Poppins">
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
                              {row.subMenuFunctionalityOne.map(
                                (item, index) => {
                                  return (
                                    <List
                                      component="div"
                                      disablePadding
                                      key={index}
                                    >
                                      {/* <Link key={index} to={item.routerLink}> */}
                                      <ListItemButton
                                        sx={{
                                          paddingY: "0rem",
                                          backgroundColor: "white",
                                          "&:hover": {
                                            backgroundColor: "white",
                                          },
                                        }}
                                        disableRipple
                                      >
                                        <ListItemText
                                          sx={{ opacity: open ? 1 : 0 }}
                                        >
                                          {item.subMenuFunctionalityTwo !=
                                          null ? (
                                            <div>
                                              <div
                                                className="flex justify-between w-[10.125rem]"
                                                onClick={() =>
                                                  handleClick(
                                                    item.functionality
                                                  )
                                                }
                                              >
                                                <ListItemText
                                                  sx={{ marginLeft: "-1rem" }}
                                                  // onClick={handleDrawerClose}
                                                >
                                                  <p className="font-light text-sm font-Poppins whitespace-normal">
                                                    {item.functionality}
                                                  </p>
                                                </ListItemText>
                                                {openMenu[
                                                  item.functionality
                                                ] ? (
                                                  <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                                ) : (
                                                  <KeyboardArrowDownOutlinedIcon fontSize="small" />
                                                )}
                                              </div>
                                              <Collapse
                                                in={
                                                  openMenu[item.functionality]
                                                }
                                                timeout="auto"
                                                unmountOnExit
                                              >
                                                {item.subMenuFunctionalityTwo.map(
                                                  (item, index) => {
                                                    return (
                                                      <List
                                                        component="div"
                                                        disablePadding
                                                        key={index}
                                                      >
                                                        {/* <Link
                                                            key={index}
                                                            to={item.routerLink}
                                                          > */}
                                                        <ListItemButton
                                                          disableRipple
                                                          sx={{
                                                            paddingY: "0.2rem",
                                                            backgroundColor:
                                                              "white",

                                                            "&:hover": {
                                                              backgroundColor:
                                                                "white",
                                                            },
                                                          }}
                                                        >
                                                          <ListItemText
                                                            sx={{
                                                              marginLeft:
                                                                "-1rem",
                                                            }}
                                                            // onClick={handleDrawerClose}
                                                          >
                                                            {/* //Third Level// */}

                                                            {item.subMenuFunctionalityThree !=
                                                            null ? (
                                                              <div>
                                                                <div
                                                                  className="flex justify-between w-[10.125rem]"
                                                                  onClick={() =>
                                                                    handleClick(
                                                                      item.functionality
                                                                    )
                                                                  }
                                                                >
                                                                  <ListItemText
                                                                    sx={{
                                                                      marginLeft:
                                                                        "-0.5rem",
                                                                    }}
                                                                    // onClick={handleDrawerClose}
                                                                  >
                                                                    <p className="font-light text-sm font-Poppins whitespace-normal">
                                                                      {
                                                                        item.functionality
                                                                      }
                                                                    </p>
                                                                  </ListItemText>
                                                                  {openMenu[
                                                                    item
                                                                      .functionality
                                                                  ] ? (
                                                                    <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                                                  ) : (
                                                                    <KeyboardArrowDownOutlinedIcon fontSize="small" />
                                                                  )}
                                                                </div>
                                                                <Collapse
                                                                  in={
                                                                    openMenu[
                                                                      item
                                                                        .functionality
                                                                    ]
                                                                  }
                                                                  timeout="auto"
                                                                  unmountOnExit
                                                                >
                                                                  {item.subMenuFunctionalityThree.map(
                                                                    (
                                                                      item,
                                                                      index
                                                                    ) => {
                                                                      return (
                                                                        <List
                                                                          component="div"
                                                                          disablePadding
                                                                          key={
                                                                            index
                                                                          }
                                                                        >
                                                                          <Link
                                                                            key={
                                                                              index
                                                                            }
                                                                            to={
                                                                              item.routerLink
                                                                            }
                                                                          >
                                                                            <ListItemButton
                                                                              disableRipple
                                                                              sx={{
                                                                                paddingY:
                                                                                  "0rem",
                                                                                backgroundColor:
                                                                                  "white",
                                                                                height:
                                                                                  "2rem",
                                                                                "&:hover": {
                                                                                  backgroundColor:
                                                                                    "white",
                                                                                },
                                                                              }}
                                                                            >
                                                                              <ListItemText
                                                                                sx={{
                                                                                  marginLeft:
                                                                                    "-1rem",
                                                                                }}
                                                                                // onClick={handleDrawerClose}
                                                                              >
                                                                                <p className="font-light text-sm font-Poppins whitespace-normal">
                                                                                  {
                                                                                    item.functionality
                                                                                  }
                                                                                </p>
                                                                              </ListItemText>
                                                                            </ListItemButton>
                                                                          </Link>
                                                                        </List>
                                                                      );
                                                                    }
                                                                  )}
                                                                </Collapse>
                                                              </div>
                                                            ) : (
                                                              <Link
                                                                to={
                                                                  row.functionality ==
                                                                  "Reports"
                                                                    ? {
                                                                        pathname:
                                                                          item.routerLink,
                                                                        state: {
                                                                          functionalityId:
                                                                            item.id,
                                                                        },
                                                                      }
                                                                    : {
                                                                        pathname:
                                                                          item.routerLink,
                                                                      }
                                                                }
                                                                // {
                                                                //   item.routerLink
                                                                // }
                                                              >
                                                                {/* {console.log("route one or ",row)} */}
                                                                <ListItemButton
                                                                  disableRipple
                                                                  sx={{
                                                                    paddingY: 0,
                                                                    width:
                                                                      "10rem",
                                                                    height:
                                                                      "2rem",
                                                                    backgroundColor:
                                                                      "white",
                                                                    "&:hover": {
                                                                      backgroundColor:
                                                                        "white",
                                                                    },
                                                                  }}
                                                                >
                                                                  <ListItemText
                                                                  // onClick={handleDrawerClose}
                                                                  >
                                                                    <p className="text-sm -ml-5 py-4 h-auto font-Poppins text-ellipsis whitespace-normal">
                                                                      {
                                                                        item.functionality
                                                                      }
                                                                    </p>
                                                                  </ListItemText>
                                                                </ListItemButton>
                                                              </Link>
                                                            )}

                                                            {/* <p className="font-light text-sm font-Poppins">
                                                                {
                                                                  item.functionality
                                                                }
                                                              </p>
                                                              // */}
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
                                            <Link
                                              to={{ pathname: item.routerLink }}
                                              state={
                                                row.functionality == "Reports"
                                                  ? { functionalityId: item.id }
                                                  : null
                                              }
                                            >
                                              {/* {console.log("route 1 or ",row)}
                                              {console.log("route 1 or ",item.id)} */}
                                              <ListItemButton
                                                disableRipple
                                                sx={{
                                                  paddingY: 0,
                                                  width: "10rem",
                                                  height: "2rem",
                                                  backgroundColor: "white",
                                                  "&:hover": {
                                                    backgroundColor: "white",
                                                  },
                                                }}
                                              >
                                                <ListItemText
                                                // onClick={handleDrawerClose}
                                                >
                                                  <p className="text-sm -ml-5 h-auto py-4 font-Poppins text-ellipsis whitespace-normal">
                                                    {item.functionality}
                                                  </p>
                                                </ListItemText>
                                              </ListItemButton>
                                            </Link>
                                          )}
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
                          <Link
                            to={
                              row.functionality !== "Reports"
                                ? {
                                    pathname: row.routerLink,
                                    state: { functionalityId: row.id },
                                  }
                                : { pathname: row.routerLink }
                            }
                            // to={row.routerLink}
                          >
                            <ListItemButton
                              disableRipple
                              sx={{
                                paddingY: "0px",
                                width: "12rem",
                                height: "1.5rem",
                                backgroundColor: "white",
                                "&:hover": {
                                  marginRight: "0.5rem",
                                  backgroundColor: "white",
                                },
                              }}
                            >
                              <ListItemText
                                sx={{ marginTop: "-10px" }}
                                // onClick={handleDrawerClose}
                              >
                                <p className="font-bold text-sm -ml-5 py-4 h-auto font-Poppins text-ellipsis">
                                  {row.functionality}
                                </p>
                              </ListItemText>
                            </ListItemButton>
                          </Link>
                        )}
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
                  overflowX: "hidden",
                  backgroundColor: "rgb(248 250 252)",
                  height: "100vh",
                }}
              >
                {spinner ? (
                  <div className="grid justify-center mt-32">
                    <LoadingSpinner />
                  </div>
                ) : isValidLink === false ? (
                  <PageNotFound />
                ) : (
                  <>
                    <Breadcrumbs />
                    <Routes>
                      {/* DashboardPage */}
                      {/* <Route exact path="/" element={<Login />} /> */}
                      <Route exact path="/" element={<DashboardPage />} />
                      <Route path="/opd">
                        <Route
                          path="/opd/patientregistrationform"
                          element={<PatientRegistrationForm />}
                        />
                        <Route
                          path="/opd/quickregistration"
                          element={<QuickRegistrationForm />}
                        />
                        <Route
                          path="/opd/patientlist"
                          element={
                            <RegisterPatientList routerLinks={routerLinks} />
                          }
                        />
                        <Route
                          path="/opd/visitlist"
                          element={<VisitPatientList />}
                        />
                        <Route path="/opd/emr" element={<EMR />} />
                      </Route>

                      {/* //Admission//
                      <Route path="/admission" element={<AdmissionForm />} /> */}

                      <Route path="/appointment">
                        <Route
                          path="/appointment/bookappointment"
                          element={<AppointmentPage />}
                        />
                        <Route
                          path="/appointment/appointmentlist"
                          element={<AppointmentList />}
                        />
                      </Route>

                      {/* //IPD// */}
                      <Route path="/ipd">
                        <Route
                          path="/ipd/admissionlist"
                          element={<AdmissionList />}
                        />
                        <Route
                          path="/ipd/admission"
                          element={<AdmissionForm />}
                        />
                        <Route
                          path="/ipd/patienttransfer"
                          element={<PatientTransfer />}
                        />
                        <Route
                          path="/ipd/patiendischargecancel"
                          element={<PatientDischargeCancel />}
                        />
                        <Route
                          path="/ipd/bedallocation"
                          element={<BedAllocation />}
                        />
                      </Route>

                      {/* Billing */}
                      <Route path="/billing">
                        <Route path="/billing/opd" element={<OPDBill />} />
                        <Route
                          path="/billing/paymentrefund"
                          element={<Refund />}
                        />
                        <Route
                          path="/billing/patientadvance"
                          element={<PatientAdvance />}
                        />
                        <Route
                          path="/billing/ipdcharges"
                          element={<IPDCharges />}
                        />

                        <Route path="/billing/ipdbill" element={<IPDBill />} />
                        <Route
                          path="/billing/paymentsettlement"
                          element={<PaymentSettlement />}
                        />

                        <Route
                          path="/billing/companysettlement"
                          element={<CompanySettlement />}
                        />
                        {/* Service Master */}
                      </Route>

                      {/* LIMS */}
                      <Route path="/lims">
                        <Route path="/lims/pathology">
                          <Route
                            path="/lims/pathology/pathologymachineparameterlinking"
                            element={<PathologyMachineParameterLinking />}
                          />

                          <Route
                            path="/lims/pathology/workOrderGeneration"
                            element={<WorkOrder />}
                          />
                          <Route
                            path="/lims/pathology/sampleCollection"
                            element={<SampleCollection />}
                          />
                          <Route
                            path="/lims/pathology/workOrderView"
                            element={<WorkOrderView />}
                          />
                          <Route
                            path="/lims/pathology/reportDetails"
                            element={<ReportDetails />}
                          />
                          <Route
                            path="/lims/pathology/workOrderStatus"
                            element={<WorkOrderStatus />}
                          />
                        </Route>
                      </Route>

                      <Route
                        path="/masters/organization/blocks"
                        element={<Block />}
                      />

                      <Route
                        path="/masters/organization/organizations"
                        element={<Organization />}
                      />
                      <Route
                        path="/masters/organization/units"
                        element={<Unit />}
                      />
                      <Route
                        path="/masters/referral/refertype"
                        element={<ReferType />}
                      />
                      <Route
                        path="/masters/referral/referby"
                        element={<ReferBy />}
                      />

                      <Route
                        path="/masters/organization/floors"
                        element={<Floor />}
                      />
                      <Route
                        path="/masters/organization/rooms"
                        element={<Room />}
                      />
                      <Route
                        path="/masters/ipd/dischargetype"
                        element={<DischargeType />}
                      />
                      <Route
                        path="/masters/organization/wards"
                        element={<Ward />}
                      />

                      <Route
                        path="/masters/organization/beds"
                        element={<Bed />}
                      />
                      {/* billing */}
                      <Route path="/masters/billing">
                        <Route
                          path="/masters/billing/servicecreation"
                          element={<ServiceCreation />}
                        />
                        <Route
                          path="/masters/billing/servicelisting"
                          element={<ServiceListing />}
                        />
                      </Route>
                      {/* UserManagement */}

                  <Route path="/masters/usermanagement">
                          <Route
                            path="/masters/usermanagement/employee"
                            element={<EmployeeList />}
                          />
                          <Route
                            path="/masters/usermanagement/employee/employeetype"
                            element={<EmployeeType />}
                          />
                          <Route
                            path="/masters/usermanagement/employeemaster"
                            element={<EmployeeMaster />}
                          />
                          <Route
                            path="/masters/usermanagement/assignfunctionalities"
                            // element={<AssignFunctionality />}
                            element={<AssignFunctionalityCards />}
                          />

                          {/* </Route> */}
                          <Route
                            path="/masters/usermanagement/roles"
                            element={<Role />}
                          />
                          <Route
                          path="/masters/usermanagement/employees/users"
                          element={<Users />}
                          />
                  </Route>
                      {/* Add ICDCode , Complaint , Instruction */}
                      <Route
                        path="/masters/opd/icdcode"
                        element={<ICDCode />}
                      />
                      <Route
                        path="/masters/opd/complaint"
                        element={<Complaint />}
                      />
                      <Route
                        path="/masters/opd/instructions"
                        element={<Instruction />}
                      />
                      <Route
                        path="/masters/opd/doctoradvice"
                        element={<DoctorAdvice />}
                      />
                      <Route
                        path="/masters/opd/allergy"
                        element={<Allergy />}
                      />
                      <Route
                        path="/masters/opd/dosefrequency"
                        element={<DoseFrequency />}
                      />
                      <Route
                        path="/masters/opd/symptoms"
                        element={<Symptoms />}
                      />
                      <Route path="/masters/opd/vitals" element={<Vital />} />
                      <Route
                        path="/masters/opd/patientengagement "
                        element={<PatientEngagement />}
                      />
                      <Route
                        path="/masters/opd/route"
                        element={<PrescriptionRoute />}
                      />

                      <Route path="/masters/drug" element={<Drug />} />

                      <Route path="/masters/genders" element={<Gender />} />
                      <Route
                        path="/masters/area/countries"
                        element={<Country />}
                      />
                      <Route path="/masters/area/state" element={<State />} />
                      <Route
                        path="/masters/area/districts"
                        element={<District />}
                      />
                      <Route
                        path="/masters/area/talukas"
                        element={<Taluka />}
                      />
                      <Route path="/masters/area/cities" element={<City />} />
                      <Route
                        path="/masters/area/pinCode"
                        element={<Pincode />}
                      />
                      <Route path="/masters/area/areas" element={<Area />} />

                      <Route
                        path="/masters/organization/cabins"
                        element={<Cabin />}
                      />
                      <Route
                        path="/masters/billing/discountdetails"
                        element={<DiscountDetails />}
                      />
                      <Route
                        path="/masters/organization/departments"
                        element={<Department />}
                      />
                      <Route
                        path="/masters/appointment/typeofappointments"
                        element={<TypeOfAppointment />}
                      />
                      <Route
                        path="/masters/appointment/appointmentbookingsource"
                        element={<AppointmentBookingSource />}
                      />
                      <Route
                        path="/masters/emergencypatient"
                        element={<EmergencyPatient />}
                      />
                      <Route
                        path="emergency/emergency"
                        element={<Emergency />}
                      />
                      <Route
                        path="masters/prefix"
                        element={<PatientPrefix />}
                      />
                      
                      <Route
                        path="/masters/citizenidproofs"
                        element={<IdProofInfo />}
                      />
                      <Route
                        path="/masters/patientcategory"
                        element={<PatientCategory />}
                      />
                      {/* operation theater masters */}
                      <Route path="/masters/operationtheater">
                        <Route
                          path="/masters/operationtheater/ottable"
                          element={<OTTable />}
                        />
                        <Route
                          path="/masters/operationtheater/anesthesia"
                          element={<Anesthesia />}
                        />

                        <Route
                          path="/masters/operationtheater/consent"
                          element={<Consent />}
                        />
                        <Route
                          path="/masters/operationtheater/operationstatus"
                          element={<OperationStatus />}
                        />

                        <Route
                          path="/masters/operationtheater/ottheater"
                          element={<OtTheater />}
                        />

                        <Route
                          path="/masters/operationtheater/postoperativeinstruction"
                          element={<PostOperativeInstruction />}
                        />

                        <Route
                          path="/masters/operationtheater/preoperativeinstruction"
                          element={<PreOperativeInstruction />}
                        />

                        <Route
                          path="/masters/operationtheater/proceduretype"
                          element={<ProcedureType />}
                        />
                      </Route>

                      {/* LIMS */}
                      <Route path="/masters/lims">
                        {/* Pathology */}
                        <Route path="/masters/lims/pathology">
                          <Route
                            path="/masters/lims/pathology/category"
                            element={<Category />}
                          />
                          <Route
                            path="/masters/lims/pathology/parameter"
                            element={<Parameter />}
                          />
                          <Route
                            path="/masters/lims/pathology/parameterUnit"
                            element={<ParameterUnit />}
                          />
                          <Route
                            path="/masters/lims/pathology/template"
                            element={<Template />}
                          />
                          <Route
                            path="/masters/lims/pathology/antibiotic"
                            element={<Antibiotic />}
                          />
                          <Route
                            path="/masters/lims/pathology/pathologistList"
                            element={<PathologistList />}
                          />
                          <Route
                            path="/masters/lims/pathology/machine"
                            element={<Machine />}
                          />
                          <Route
                            path="/masters/lims/pathology/machineParameter"
                            element={<MachineParameter />}
                          />
                          <Route
                            path="/masters/lims/pathology/organism"
                            element={<Organism />}
                          />
                          <Route
                            path="/masters/lims/pathology/pathologyProfile"
                            element={<PathologyProfile />}
                          />
                          <Route
                            path="/masters/lims/pathology/addTestDetails"
                            element={<TestDetails />}
                          />
                        </Route>
                        <Route path="/masters/lims/radiology">
                          <Route
                            path="/masters/lims/radiology/radiotemplate"
                            element={<RadioTemplate />}
                          />
                          <Route
                            path="/masters/lims/radiology/modalitymaster"
                            element={<ModalityMaster />}
                          />
                        </Route>
                      </Route>

                      {/* Add ICDCode , Complaint , Instruction */}
                      <Route
                        path="/masters/opd/icdcode"
                        element={<ICDCode />}
                      />
                      <Route
                        path="/masters/opd/complaint"
                        element={<Complaint />}
                      />
                      <Route
                        path="/masters/opd/instructions"
                        element={<Instruction />}
                      />
                      <Route
                        path="/masters/opd/doctoradvice"
                        element={<DoctorAdvice />}
                      />

                      <Route
                        path="/masters/opd/allergy"
                        element={<Allergy />}
                      />
                      <Route
                        path="/masters/opd/dosefrequency"
                        element={<DoseFrequency />}
                      />
                      <Route
                        path="/masters/opd/symptoms"
                        element={<Symptoms />}
                      />
                      <Route path="/masters/opd/vitals" element={<Vital />} />
                      <Route
                        path="/masters/opd/route"
                        element={<PrescriptionRoute />}
                      />
                      <Route
                        path="/masters/opd/patientengagement"
                        element={<PatientEngagement />}
                      />

                      <Route path="/masters/drug" element={<Drug />} />

                      <Route path="/masters/genders" element={<Gender />} />
                      <Route
                        path="/masters/area/countries"
                        element={<Country />}
                      />
                      <Route path="/masters/area/state" element={<State />} />
                      <Route
                        path="/masters/area/districts"
                        element={<District />}
                      />
                      <Route
                        path="/masters/area/talukas"
                        element={<Taluka />}
                      />
                      <Route path="/masters/area/cities" element={<City />} />
                      <Route
                        path="/masters/area/pinCode"
                        element={<Pincode />}
                      />
                      <Route path="/masters/area/areas" element={<Area />} />

                      <Route
                        path="/masters/billing/discountdetails"
                        element={<DiscountDetails />}
                      />
                      <Route
                        path="/masters/appointment/typeofappointments"
                        element={<TypeOfAppointment />}
                      />
                      <Route
                        path="/masters/appointment/appointmentbookingsource"
                        element={<AppointmentBookingSource />}
                      />
                      <Route
                        path="/masters/emergencypatient"
                        element={<EmergencyPatient />}
                      />
                      <Route
                        path="/masters/billing/patientcategory"
                        element={<PatientCategory />}
                      />
                      {/* operation theater masters */}
                      <Route path="/masters/operationtheater">
                        <Route
                          path="/masters/operationtheater/ottable"
                          element={<OTTable />}
                        />
                        <Route
                          path="/masters/operationtheater/anesthesia"
                          element={<Anesthesia />}
                        />
                        <Route
                          path="/masters/operationtheater/consent"
                          element={<Consent />}
                        />
                        <Route
                          path="/masters/operationtheater/operationstatus"
                          element={<OperationStatus />}
                        />

                        <Route
                          path="/masters/operationtheater/ottheater"
                          element={<OtTheater />}
                        />

                        <Route
                          path="/masters/operationtheater/postoperativeinstruction"
                          element={<PostOperativeInstruction />}
                        />

                        <Route
                          path="/masters/operationtheater/preoperativeinstruction"
                          element={<PreOperativeInstruction />}
                        />

                        <Route
                          path="/masters/operationtheater/proceduretype"
                          element={<ProcedureType />}
                        />
                      </Route>

                      {/* operation theater masters */}

                      <Route
                        path="/masters/billing/serviceratematrix"
                        element={<ServicesRateMatrix />}
                      />

                      <Route
                        path="/masters/billing/serviceratematrix"
                        element={<ServicesRateMatrix />}
                      />

                      <Route path="/nursing">
                        <Route
                          path="/nursing/patientpainassessment"
                          element={<PatientPainAssessment />}
                        />
                       
                      </Route>
                      <Route
                          path="/nursing/drugAdministrationChart"
                          // element={<DrugTimeTable />}
                          element={<DrugAdministrationChart />}
                        />
                      {/* Scheduling */}
                      <Route path="/masters/scheduling">
                        <Route
                          path="/masters/scheduling/doctorListing"
                          element={<DoctorListing />}
                        />

                        <Route
                          path="/masters/scheduling/scheduling"
                          element={<ScheduleListing />}
                        />
                        <Route
                          path="/masters/scheduling/weekday"
                          element={<WeekDay />}
                        />
                      </Route>

                      {/* Reports */}
                      {/* <Route path="/reports" > */}

                      {reportsRoutes &&
                        reportsRoutes.map((routeElement, index) => {
                          const Component = routeElement.module;
                          return (
                            <Route
                              path={routeElement.routerLink}
                              key={index}
                              element={
                                <Reports
                                  routeElement={routeElement}
                                  handleDrawerOpen={handleDrawerOpen}
                                  handleDrawerClose={handleDrawerClose}
                                />
                              }
                            />
                          );
                        })}
                      {/* <Route path="/reports/opd" element={<Reports />} />
                      <Route path="/reports/appointments" element={<Reports />} />
                      <Route path="/reports/transactionrevenue" element={<Reports />} /> */}

                      {/* </Route> */}
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </>
                )}
              </Box>
            </Box>

            {/* //Popup Module// */}
            <ModulesPopup
              modalOpen={modalOpen}
              handleClose={handleClose}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
        )
      ) : (
        ""
      )}
    </>
  );
}
