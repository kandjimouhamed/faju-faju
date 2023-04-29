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
