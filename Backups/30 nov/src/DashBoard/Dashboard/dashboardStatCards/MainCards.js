import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardCard from "./DashboardCard";
import { getDashboardCardDetails } from "../../services/dashboardServices/dashboardService";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};
const Cards = () => {
  const [appointments, setAppointments] = useState(null);
  const [operations, setOperations] = useState(null);
  const [newPatient, setNewPatient] = useState(null);
  const [patientQueue, setPatientQueue] = useState(null);
  const [earning, setEarning] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    getDashboardCardDetails()
      .then((response) => {
        console.log("response.data.result.appointments",response.data.result.appointments)
        setAppointments(response.data.result.appointments);
        setOperations(response.data.result.operations);
        setNewPatient(response.data.result.newPatient);
        setPatientQueue(response.data.result.patientQueue);
        setEarning(response.data.result.earning);
      })
      .catch((response) => {
        console.log(response);
      });
  }, [appointments, operations, newPatient, patientQueue]);

  useEffect(() => {
    let userRole = localStorage.getItem("role");
    setRole(userRole);
    console.log("Role", role);
  }, [role]);

  return (
    <div className="mt-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 w-full h-auto">
        <DashboardCard
          backColor="bg-purple-700 rounded-lg "
          cardIcon={<AccountCircleIcon />}
          cardTitle={"Appointments"}
          cardDetails={appointments}
          strokeColor={"#8854d0"}
          fillColor={"#8884d8"}
        />
        <DashboardCard
          backColor="bg-yellow-500 rounded-lg "
          cardIcon={<ContentCutIcon />}
          cardTitle={"Operations"}
          cardDetails={operations}
          strokeColor={"#f19066"}
          fillColor={"#f5cd79"}
        />
        {role.toLowerCase() !== "admin" ? (
          <DashboardCard
            backColor="bg-green-600 rounded-lg "
            cardIcon={<PersonAddIcon />}
            cardTitle={"New Patients"}
            cardDetails={newPatient}
            strokeColor={"#27ae60"}
            fillColor={"#badc58"}
          />
        ) : (
          ""
        )}
        <DashboardCard
          backColor="bg-blue-600 rounded-lg "
          cardIcon={<FolderSpecialIcon />}
          cardTitle={"Patient Queue"}
          cardDetails={patientQueue}
          strokeColor={"#1B9CFC"}
          fillColor={"#7eFFF5"}
        />
        {role.toLowerCase() === "admin" ? (
          <DashboardCard
            backColor="bg-green-600 rounded-lg "
            cardIcon={<CurrencyRupeeIcon />}
            cardTitle={"Earning"}
            cardDetails={newPatient}
            strokeColor={"#27ae60"}
            fillColor={"#badc58"}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cards;
