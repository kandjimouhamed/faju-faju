import React from "react";
import { AppShell, Header, createStyles } from "@mantine/core";
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
import Rendezvous from "../../../components/Rendezvous";
import Patients from "../../../components/Patients";
import DetailPatient from "../../../components/DetailPatient";
import AjoutPrescription from "../../../components/AjoutPrescription";
import EditPrescription from "../../../components/EditPrescription";
import DetailPrescription from "../../../components/DetailPrescription";
import AjoutRendezvous from "../../../components/AjoutRendezvous";
import EditRendezvous from "../../../components/EditRendezvous";
import DetailRendezvous from "../../../components/DetailRendezvous";


const useStyles = createStyles((theme) => ({
  Dashboard : {
    width : '80%',
    justifyContent : "end",

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      width : '100%'
    },
    marginLeft : 'auto',
  }
}))

const Dashboard = () => {

  const {classes} = useStyles()
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
      <div className={classes.Dashboard} style={{ padding: "0rem", color: "white" }}>
        {userRole === "admin" ? (
          <Routes>
            <Route path="" element={<AdminHome />} />
            <Route path="/appointements" element={<Appointement />} />
            <Route path="/calendar" element={<UserCalendar />} />
            <Route path="/avaiblities" element={<Avaiblities />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />

                  {/*############ Prescription ############*/}
            <Route path="/prescription" element={<Prescription/>} />
            <Route path="/addPrescription" element={<AjoutPrescription/>} />
            <Route path="/Prescription/:id" element={<EditPrescription/>} />
            <Route path="/detail-prescription/:id" element={<DetailPrescription/>} />
                  {/*############ Rendez-vous ############*/}
            {/* <Route path="/rendezvous" element={<RendezVous/>} /> */}
            <Route path="/rendezvous" element={<Rendezvous/>} />
            <Route path="/addRendezvous" element={<AjoutRendezvous/>} />
            <Route path="/rendezvous/:id" element={<EditRendezvous/>} />
            <Route path="/detail-rendezvous/:id" element={<DetailRendezvous/>} />
                  {/*############ Patient ############*/}
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
