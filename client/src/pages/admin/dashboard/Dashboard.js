import React from "react";
import { AppShell, Header } from "@mantine/core";
import NavbarMantaine from "../../../components/NavbarMantaine";
import AdminHome from "../../../components/AdminHome";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Appointement from "../../../components/Appointement";
import UserCalendar from "../../../components/CalendarUser";
import HeaderItem from "../../../components/HeaderAdmin";
import { useSelector } from "react-redux";
import Avaiblities from "../../../components/Avaiblities";
import UserHome from "../../../components/UserHome";
import ChooseAppointement from "../../../components/ChooseAppointement";
import UserAppointments from "../../../components/UserAppointments";
import Settings from "../../../components/Settings";
import Prescription from "../../../components/Prescription";
import RendezVous from "../../../components/RendezVous";
import Patients from "../../../components/Patients";
import DetailPatient from "../../../components/DetailPatient";
import AjoutPrescription from "../../../components/AjoutPrescription";
import EditPrescription from "../../../components/EditPrescription";
import DetailPrescription from "../../../components/DetailPrescription";


const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const userRole = user?.role;
  // const navigate = useNavigate()
  return (
    <AppShell
      padding="md"
      navbar={<NavbarMantaine />}
      header={
        <Header
          sx={{
            backgroundColor: user.role === "admin" ? "#DB3C4E" : "#3F73D7"
          }}
          height={60}
          p="xs"
        >
          <HeaderItem />
        </Header>
      }
    >
      {/* Your application here */}
      <div style={{ padding: "0.8rem", color: "white" }}>
        {userRole === "admin" ? (
          <Routes>
            <Route path="" element={<AdminHome />} />
            <Route path="/appointements" element={<Appointement />} />
            <Route path="/calendar" element={<UserCalendar />} />
            <Route path="/avaiblities" element={<Avaiblities />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="/prescription" element={<Prescription/>} />
            <Route path="/addPrescription" element={<AjoutPrescription/>} />
            <Route path="/Prescription/:id" element={<EditPrescription/>} />
            <Route path="/detail-prescription/:id" element={<DetailPrescription/>} />
            <Route path="/rendezvous" element={<RendezVous/>} />
            <Route path="/patient" element={<Patients/>} />
            <Route path="/detail-patient/:id" element={<DetailPatient/>} />
          </Routes>
        ) : userRole === "client" ? (
          <Routes>
            <Route path="" element={<UserAppointments />} />
            <Route path="appointements" element={<ChooseAppointement />} />
            <Route path="user" element={<UserHome />} />
          </Routes>
        ) : (
          <Navigate to="/" />
        )}
      </div>
    </AppShell>
  );
};

export default Dashboard;
