import { Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../redux/services/appointmentsServices";
import { getUnAvaiblities } from "../redux/services/unAvaiblitiesServices";
import { getUsers } from "../redux/services/usersServices";
import DetailsAppointment from "./DetailsAppointment";
import EmptyList from "./EmptyList";
import List from "./List";

const UserAppointments = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const allAvaiblities = useSelector((state) => state.unavaiblities);
  const allUnAppointments = useSelector((state) => state.appointments);
  const allUsers = useSelector(state => state.users.users)
  const unAvaiblities = allAvaiblities.data;
  const appointments = allUnAppointments?.appointments;
  const [show, setShow] = useState(null);
  const [opened, setOpened] = useState(false);
  const [appointmentId, SetAppointmentId] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    // get all avaiblities && appointments
    dispatch(getUnAvaiblities())
    dispatch(getAppointments())
    dispatch(getUsers())
  }, [])

  return (
    <div>
      {!allUnAppointments.loading ? (
        appointments
          ?.filter((appointment) => appointment.userId === user._id).length !==
          0 ? (
          <>
            <h1 style={{ marginBottom: "1rem" }}>Mes rendez-vous</h1>
            <div className="table-container">
              <div
                style={{ padding: "0.5rem 0" }}
                className="table-container--time"
              >
                <button
                  style={{
                    borderBottom: show === null ? "2px solid #3F73D7" : null,
                    color: show === null ? '#3F73D7' : null
                  }}
                  onClick={() => setShow(null)}
                  to="passe"
                >
                  En attente
                </button>
                <button
                  style={{
                    borderBottom: show ? "2px solid #3F73D7" : null,
                    color: show ? '#3F73D7' : null
                  }}
                  onClick={() => setShow(true)}
                  to="passe"
                >
                  Confirmé
                </button>
                <button
                  style={{
                    borderBottom: show === false ? "2px solid #3F73D7" : null,
                    color: show === false ? '#3F73D7' : null
                  }}
                  onClick={() => setShow(false)}
                  to="a-venir"
                >
                  Annulé
                </button>
              </div>
              <div>
                <ul className="t-items">
                  <li className="t-head">
                    <span className="t-left">Description</span>
                    <span>Date</span>
                  </li>
                  {
                    appointments
                      ?.filter((appointment) => appointment.isConfirmed === show)
                      .filter((appointment) => appointment.userId === user._id).length !== 0 ? appointments
                        ?.filter((appointment) => appointment.isConfirmed === show)
                        .filter((appointment) => appointment.userId === user._id)
                        .map((appointment) => (
                          <List
                            SetAppointmentId={SetAppointmentId}
                            show={show}
                            key={appointment._id}
                            {...appointment}
                            unAvaiblities={unAvaiblities}
                            onClick={() => {
                              const selectedUser = allUsers.find(user => user._id === appointment.userId)
                              setSelectedUser(selectedUser)
                              setOpened(true)
                            }}
                          />
                        )) : <p style={{marginTop: '0.5rem'}}>{show ? "Pas de rendez-vous confirmé" : "Pas de rendez-vous annulé"}</p>
                  }
                </ul>
              </div>
            </div>
          </>
        ) : (
          <EmptyList text="Vous n'avez pas encore pris de rendez-vous" />
        )
      ) : (
        <Loader variant="dots" />
      )}
      {
        opened && <DetailsAppointment appointmentId={appointmentId} opened={opened} setOpened={setOpened} {...selectedUser} />
      }
    </div>
  );
};

export default UserAppointments;
